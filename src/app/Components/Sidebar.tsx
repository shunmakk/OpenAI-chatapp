'use client'
import { Timestamp, collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { IoIosLogOut } from "react-icons/io";
import { db } from '../../../firebase';


type Room = {
    id: string,
    name: string,
    createdAt: Timestamp;
}


const Sidebar = () => {

    const [rooms, setRooms]  = useState<Room[]>([])

    useEffect(()=> {
        const fetchRooms = async () => {
            const roomCollectionRef = collection(db,  "rooms");
            const q = query(roomCollectionRef , where("userId", "==","NRhE9Fhy1uf2hXgLYe3dRfuObXV2"),orderBy("createdAt"))
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const newRooms:Room[] = snapshot.docs.map((docs) => ({
                    id: docs.id,
                    name: docs.data().name,
                    createdAt:  docs.data().createdAt,
                }))
                setRooms(newRooms);
            })
            return () => unsubscribe();
        };

        fetchRooms();
    
    },[])



  return (
    <div className='h-full overflow-y-auto px-5  flex flex-col'>
        <div className='flex-grow'>
            <div className='cursor-pointer flex justify-evenly items-center border  mt-4 rounded-md hover:bg-blue-500 duration-100'>
                <span className='text-white p-4 text-2xl'>+</span>
                <h1 className='text-white tetx-2xl font-semibold p-4'>チャットを追加</h1>
            </div>
            <ul className='pt-4'>
                {rooms.map((room) => (
                   <li key={room.id}  className='cursor-pointer border-b-2  p-4 text-slate-100 hover:bg-blue-800 duration-150'>{room.name}</li> 
                ))}
            </ul>
        </div>
        <div className=' flex items-center justify-evenly  mb-4 cursor-pointer p-4 text-slate-100 hover:bg-slate-500 duration-150'>
         <IoIosLogOut />
            <span className='text-sm'>ログアウト</span>
        </div>
    </div>
  )
}

export default Sidebar