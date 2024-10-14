import React, { useContext } from 'react'
import { ChatContext } from '../utils/Context'
import { useNavigate } from 'react-router-dom'

export default function Sidebar() {
  const { chatHistory, startNewChat, loadChat,SideToggle,handleToggle } = useContext(ChatContext)
  const navigate = useNavigate()

  const handleChatClick = (chatId) => {
    loadChat(chatId)
    navigate(`/chat/${chatId}`)
  }

  const handleNewChat = () => {
    startNewChat()
    navigate('/chat')
  }

  return (
    <div className={`bg-black ${ SideToggle ? 'translate-x-0' : '-translate-x-full'} transform transition-transform duration-500 ease-in-out rounded-r-xl z-10 fixed h-full w-[70vw] xsm:w-[55vw] mob:w-[40vw] tab:w-[26vw] lap:w-[23vw] p-3 tab:block shadow-xl shadow-slate-500`}>

        <button onClick={handleToggle} className={`fixed ${ SideToggle ? 'block' : 'hidden'} z-20 tab:hidden top-1/2  left-[70vw] xsm:left-[55vw] mob:left-[40vw] tab:left-[26vw] lap:left-[23vw] bg-yellow-400 shadow-lg shadow-slate-700 p-2 rounded-r-full`}>
          <img src="../back-arrow.png" alt="Menu" className="w-5 h-7 "/>
        </button>

      <div className='Logo w-full h-40 ' >
        <img src='../logo.jpg' className='h-20 rounded-xl mx-auto mt-2 hover:cursor-pointer' onClick={()=>navigate('/') }/>
        <p className='text-white justify-center text-center text-2xl font-semibold mt-3 hover:cursor-pointer' onClick={()=>navigate('/') }>Convo AI</p>
      </div>

        <hr />

      <div className="chat-history w-full mt-2 h-full overflow-y-auto">

        <div className="btn flex justify-between lap:pr-8 px-4">
          <button onClick={handleNewChat} className='text-white bg-blue-500 p-2 rounded mb-4 text-lg'>New Chat</button>
          <button onClick={()=>navigate('/')} className=' bg-orange-500 w-12  p-2 rounded-full mb-4'><img src="../home.svg" alt="" /></button>
        </div>

      <div className="history-container  h-[19rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300 scroll-smooth">
        {
         chatHistory.length>0 ? (chatHistory.map((chat) => (
          <div key={chat.id} className='w-full h-12 mb-2 bg-slate-700 p-2  rounded-md hover:shadow-md  overflow-hidden hover:scale-95 duration-200 hover:shadow-slate-400'>
            <button 
              className='text-white text-xl hover:bg-gray-700  block w-full text-left'
              onClick={() => handleChatClick(chat.id)}
            >
              { chat?.title && chat.title.split(' ').slice(0, 5).join(' ').replace(/^./, str => str.toUpperCase()) + (chat.title.split(' ').length >= 5 ? ' ...' : '') }
            </button>
          </div>
        ))) 

        : <div className='bg-slate-700 py-24 mt-6 rounded-xl'> <p className='text-red-500 font-bold text-[1.7em] text-center'>!! No chat history</p> </div>
        
        }
        </div>
      </div>
    </div>
  )
}