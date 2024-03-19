import React from 'react'

const Chat = () => {
  return (
    <div className='h-full p-4 flex flex-col'>
        <h1 className='text-3xl mb-4 ml-2'>Room1</h1>
        <div className='flex-grow overflow-y-auto mb-4'>
            <div className='text-right'>
                <div className='bg-slate-50 inline-block rounded px-4 py-2'>
                    <p>Hello</p>
                </div>
            </div>
            <div className='text-left'>
                <div className='bg-green-200 inline-block rounded px-4 py-2'>
                    <p>Hello,私はAI</p>
                </div>
            </div>
        </div>
        <div className='flex-shrink-0 relative'>
            <input type='text' placeholder='send a message'  className='border-2 rounded w-full pr-10 p-2 focus:outline-none' />
        </div>
    </div>
  )
}

export default Chat