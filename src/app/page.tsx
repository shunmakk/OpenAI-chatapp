'use client'
import Sidebar from "./Components/Sidebar";
import Chat from "./Components/Chat";





export default function Home() {








  return (
   <div className="flex md:h-screen md:justify-center md:items-center">
    <div className="h-full flex  md:flex-row  flex-col-reverse " style={{width: "1280px"}} >
      <div className="md:w-1/5 h-full border-r bg-slate-400  ">
        <Sidebar/>
      </div>
      <div className="md:w-4/5 h-full bg-blue-200 ">
        <Chat/>
      </div>
    </div>
   </div>
  );
}
