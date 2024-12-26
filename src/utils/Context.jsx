import React, { createContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';

const ChatContext = createContext();

export default function Context({ children }) {
  const [chats, setChats] = useState({});
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [SideToggle,setSideToggle ] = useState(false);

  const handleToggle=()=>{
    setSideToggle((prev)=>!prev)
  }
  console.log(SideToggle)

  const generateAnswer = useCallback(async (query, chatId = null) => {
    if (!chatId) {
      chatId = nanoid();
      setChatHistory(prev => [...prev, { id: chatId, title: query }]);
    }

    // Add the question with a loading flag
    setChats(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), { question: query, answer: '', loading: true }]
    }));
    
    setCurrentChatId(chatId);

    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyB89Qtsyy3gH8x-w6B2wx3anfbjcAgYvoc",
        method: "post",
        data: {
          "contents": [{ "parts": [{ "text": query }] }]
        }
      });

      const answer = response.data.candidates[0].content.parts[0].text;

      // Update the specific chat item with the answer and remove loading flag
      setChats(prev => ({
        ...prev,
        [chatId]: prev[chatId].map((item, index) => {
          if (index === prev[chatId].length - 1) {
            return { ...item, answer, loading: false };
          }
          return item;
        })
      }));

      return chatId;
    } catch (err) {
      console.error("Error occurred", err);
      // Handle error, remove loading flag if needed
    }
  }, []);

  const startNewChat = useCallback(() => {
    setCurrentChatId(null);
  }, []);

  const loadChat = useCallback((chatId) => {
    if (chats[chatId]) {
      setCurrentChatId(chatId);
    } else {
      console.error(`Chat with ID ${chatId} not found`);
    }
  }, [chats]);

  return (
    <ChatContext.Provider value={{
      generateAnswer,
      chatHistory,
      currentChatId,
      startNewChat,
      loadChat,
      currentChat: chats[currentChatId] || [],
      SideToggle,setSideToggle,handleToggle
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export { ChatContext };
