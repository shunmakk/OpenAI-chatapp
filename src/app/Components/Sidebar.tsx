'use client'
import { Timestamp, addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { IoIosLogOut } from "react-icons/io";
import { db } from '../../../firebase';
import { useAppcontext } from '@/Context/AppContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
import { win32 } from 'path';


type Room = {
    id: string,
    name: string,
    createdAt: Timestamp;
}


const Sidebar = () => {
    
    const {user, userId, setSelectedRoom, setSelectedRoomname} = useAppcontext();

    const [rooms, setRooms]  = useState<Room[]>([])

    useEffect(()=> {
        if(user){
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

        }
       
    },[userId])

    const selectRoom = (roomId:string, roomName: string) => {
        setSelectedRoom(roomId)
        setSelectedRoomname(roomName)
    }

    const addNewRoom  = async () => {
        const roomname =  prompt("ルーム名を入力してください");
        if(roomname){
            const newRoomRef = collection(db, "rooms");
            await addDoc(newRoomRef, {
                name: roomname,
                userId: userId,
                createdAt: serverTimestamp(),
            })
        }
    }

    const handleLogout = () => {
       const confirm  =   window.confirm('ログアウトしますか?');
        if(confirm){
            auth.signOut();
            window.alert('ログアウトに成功しました！')
        }
    }


  return (
    <div className='h-full overflow-y-auto px-5  flex flex-col'>
        <div className='flex-grow'>
            <div className='cursor-pointer flex justify-evenly items-center border  mt-4 rounded-md hover:bg-blue-500 duration-100'
            onClick={addNewRoom}
            >
                <span className='text-white p-4 text-2xl'>+</span>
                <h1 className='text-white tetx-2xl font-semibold p-4'>チャットを追加</h1>
            </div>
            <ul className='pt-4'>
                {rooms.map((room) => (
                   <li key={room.id}  
                   className='cursor-pointer border-b-2  p-4 text-slate-100 hover:bg-blue-800 duration-150'
                   onClick={() => selectRoom(room.id, room.name)}
                   >{room.name}</li> 
                ))}
            </ul>
        </div>
        {user && (<div className='mb-2 p-4 pr-1 text-slate-100 text-lg font-medium'>{user.email}</div>)}
        <div onClick={() => handleLogout()}   className=' flex items-center justify-evenly  mb-4 cursor-pointer p-4 text-slate-100 hover:bg-slate-500 duration-150'>
         <IoIosLogOut />
            <span className='text-sm'>ログアウト</span>
        </div>
    </div>
  )
}

export default Sidebar