'use client'
import Sidebar from "./Components/Sidebar";
import Chat from "./Components/Chat";





export default function Home() {








  return (
   <div className="flex h-screen justify-center items-center">
    <div className="h-full flex" style={{width: "1280px"}} >
      <div className="w-1/5 h-full border-r bg-slate-400">
        <Sidebar/>
      </div>
      <div className="w-4/5 h-full bg-blue-200">
        <Chat/>
      </div>
    </div>
   </div>
  );
}
