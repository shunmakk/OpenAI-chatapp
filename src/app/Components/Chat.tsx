'use client'
import React, { useEffect, useState } from 'react'
import { IoSendSharp } from "react-icons/io5";
import { db } from '../../../firebase';
import { collection, doc, serverTimestamp ,addDoc, query, orderBy,onSnapshot, Timestamp} from 'firebase/firestore';
import { useAppcontext } from '@/Context/AppContext';
import OpenAI from 'openai';

type Message = {
    text: string,
    sender: string,
    createdAt: Timestamp
}

const Chat = () => {

    const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
        dangerouslyAllowBrowser: true
    })


    const {selectedRoom} = useAppcontext()

    const [inputMessage, setInputMessage] = useState<string>();
    const [messages, setMessages] = useState<Message[]>([]);

     //各ルームにおけるメッセージを取得
     useEffect(() => {
        if(selectedRoom){
            const fetchMessages = async () => {
                const roomDocRef = doc(db,  "rooms",selectedRoom);
                const  messageCollectionRef = collection(roomDocRef,"messages")

                const q = query(messageCollectionRef, orderBy("createdAt"))
        
                const unsubscribe = onSnapshot(q, (snapshot) => {
                   const newMessages = snapshot.docs.map((docs) => docs.data() as Message)
                   setMessages(newMessages)
                })
                return () => unsubscribe();
            };     
            
            
            fetchMessages();

        }
     },[selectedRoom])


    const sendMessage = async () => {
        if(!inputMessage?.trim()) return;
        const messageData = {
            text: inputMessage,
            sender: "user",
            createdAt: serverTimestamp(),
        }
        //メッセージをfireStoreに保存する
        const roomdocRef  = doc(db, "rooms", selectedRoom!);
        const messageCollectionRef = collection(roomdocRef, "messages");
        await addDoc(messageCollectionRef, messageData)


        //OpemAIからの返信
        const gptResponce =  await openai.chat.completions.create({
            messages: [{role: "user", content: inputMessage}],
            model: "gpt-3.5-turbo-0125"
        })
        const botResponce = gptResponce.choices[0].message.content;
        await addDoc(messageCollectionRef, {
            text: botResponce,
            sender: "bot",
            createdAt: serverTimestamp()
        })
    }


  return (
    <div className='h-full p-4 flex flex-col'>
        <h1 className='text-3xl mb-4 ml-2'>Room1</h1>
        <div className='flex-grow overflow-y-auto mb-4'>
            {messages.map((message,index) => (
                <div key={index} className={message.sender === "user" ? 'text-right' : 'text-left'}>
                    <div className={message.sender === "user" ? 'bg-slate-50 inline-block rounded px-4 py-2 mt-3 mb-3 mr-5' : 'bg-green-200 inline-block rounded px-4 py-2 mt-3 mb-3'}>
                        <p>{message.text}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className='flex-shrink-0 relative'>
            <input 
             type='text' 
             placeholder='send a message'  
             className='border-2 rounded w-full pr-10 p-2 focus:outline-none' 
             onChange={(e) => setInputMessage(e.target.value)}
             />
            <button className='absolute right-5 inset-y-0 flex items-center' onClick={() => sendMessage()}>
                <IoSendSharp/>
            </button>
        </div>
    </div>
  )
}

export default Chat