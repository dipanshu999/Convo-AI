import React  from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className=' mx-auto tab:ml-[20rem] tab1:ml-[22rem] lap:ml-[25rem] lap1:mx-auto'>

      <div className="hello mx-auto w-[14rem] mob:w-[20rem] mt-10 mob:mt-6">
        <img src="../hello.gif" alt="" />
      </div>


    <p className='text-center text-2xl w-[80vw] mob:text-3xl font-normal mt-12'> Hii, I am <b>Convo-AI</b> , your AI chatbot</p>
    <div className="link flex justify-center mt-6">
       <Link className='text-center bg-red-500 px-2 py-2 text-xl rounded-md text-white font-semibold' to={'/chat'} >Let's start !!</Link>
    </div>
    </div>
  )
}
