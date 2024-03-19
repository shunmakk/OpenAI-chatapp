import React from 'react'

const Sidebar = () => {
  return (
    <div className='h-full overflow-y-auto px-5  flex flex-col'>
        <div className='flex-grow'>
            <div className='cursor-pointer flex justify-evenly items-center border  mt-4 rounded-md hover:bg-blue-500 duration-100'>
                <span className='text-white p-4 text-2xl'>+</span>
                <h1 className='text-white tetx-2xl font-semibold p-4'>チャットを追加</h1>
            </div>
            <ul className='pt-4'>
                <li className='cursor-pointer border-b-2  p-4 text-slate-100 hover:bg-blue-800 duration-150'>Room  1</li>
                <li className='cursor-pointer border-b-2  p-4 text-slate-100 hover:bg-blue-800 duration-150'>Room  2</li>
                <li className='cursor-pointer border-b-2  p-4 text-slate-100 hover:bg-blue-800 duration-150'>Room  3</li>
                <li className='cursor-pointer border-b-2  p-4 text-slate-100 hover:bg-blue-800 duration-150'>Room  4</li>           
            </ul>
        </div>
    </div>
  )
}

export default Sidebar