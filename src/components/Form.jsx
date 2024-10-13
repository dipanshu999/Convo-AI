import React, { useContext, useState } from 'react';
import { ChatContext } from '../utils/Context';
import { useNavigate } from 'react-router-dom';

export default function Form() {
  const { generateAnswer, loading, currentChatId } = useContext(ChatContext);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim() && !loading) {
      const newChatId = await generateAnswer(query, currentChatId);
      if (newChatId && newChatId !== currentChatId) {
        navigate(`/chat/${newChatId}`);
      }
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="Form shadow-xl lap1:left-[30rem] lap:left-[24rem] tab1:left-[20rem] tab:left-[18rem] mob:left-[6rem] left-[2rem] fixed bottom-8 shadow-gray-700 border flex justify-between items-center rounded-xl lap:w-[45%] tab:w-[52%] mob:w-[70%] w-[80%] overflow-hidden bg-white">
      <input
        type="text"
        placeholder='Enter your query'
        className='w-[90%] p-3 mob:p-4 text-lg backdrop-blur-sm focus:outline-none'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className='w-11 h-10 mob:h-12 mob:w-12  mx-auto mr-6 '>
        <button
          type="submit"
          disabled={loading}
          className={`bg-yellow-400 border-2 border-black h-full w-full  flex items-center justify-center ${loading ? 'cursor-not-allowed' : 'null'} rounded-full`}
        >
          <img src="../arrow.png" className='w-7 h-7 mob:w-11 mob:h-11 ' alt="Submit" />
        </button>
      </div>
    </form>
  );
}