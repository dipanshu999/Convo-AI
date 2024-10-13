import React, { useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChatContext } from '../utils/Context'
import Response from './Response'
import Form from './Form'

export default function Chat() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { loadChat, currentChatId, chatHistory,handleToggle } = useContext(ChatContext)

  useEffect(() => {
    if (id && id !== currentChatId) {
      if (chatHistory.some(chat => chat.id === id)) {
        loadChat(id)
      } else {
        navigate('/chat')
      }
    }
  }, [id, loadChat, currentChatId, chatHistory, navigate])

  return (
    <div className="form-response  w-[100vw] mx-auto min-h-[100vh] tab:w-[75vw] lap:w-[80vw] tab:ml-[26vw] lap:ml-[20vw] bg-gray-700 ">
      <div className="chat-Area h-full tab:w-[90%] lap:w-[70%] mx-auto shadow-xl shadow-white bg-slate-950 rounded-xl  ">
        <Response/>
        <Form/>

        <button onClick={handleToggle} className="fixed tab:hidden top-1/2 left-0 bg-yellow-400 shadow-md shadow-slate-700 p-2 rounded-r-full">
          <img src="../ahead-arrow.png" alt="Menu" className="w-4 h-6 "/>
        </button>

      </div>
    </div>
    
  )
}