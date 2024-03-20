'use client'

import { User, onAuthStateChanged } from "firebase/auth";
import { ReactNode, createContext, useContext, useEffect, useId, useState } from "react";
import { auth } from "../../firebase";

type  AppProviderProps = {
    children: ReactNode;
}


const defaultContextData = {
    user: null,
    userId: null,
    setUser: () => {},
    selectedRoom: null,
    setSelectedRoom: () => {},
}

type AppContextType = {
    user: User | null
    userId: string | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    selectedRoom: string | null,
    setSelectedRoom:  React.Dispatch<React.SetStateAction<string | null>>
}

//contextAPIを用いてグローバルに管理する
const AppContext  =  createContext<AppContextType>(defaultContextData);

export function AppProvider({children}:AppProviderProps){
    const [user, setUser] = useState<any | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);


    useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, (newUser) => {
            setUser(newUser);
            setUserId(newUser ? newUser.uid : null);
        });

        return () => {
            unsubscribe();
        };
    },[]);


    return(
        <AppContext.Provider value={{user, userId, setUser, selectedRoom, setSelectedRoom}}>
            {children}
        </AppContext.Provider>
    )
}

 {/* コンテキストを各ページで使えるようにする */}
export function useAppcontext(){
    return useContext(AppContext);
}