import React, { useEffect } from 'react'
import { navSections } from '../constants/index'
import { BiDoorOpen } from 'react-icons/bi';
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/config';


const Nav = ({user}) => {

  return (
    
      <div className='flex flex-col justify-between px-8 py-8'>

    <div>
      <img className='w-8 mb-4' src="./x.png" alt="" />
     
        {navSections.map((i) => (
          <div 
          key={i.title}
          className='flex justify-center md:justify-normal items-center gap-3 text-2x1 md:text-xl p-3 cursor-pointer transition rounded-lg hover:bg-[#505050b]'>
            {i.icon}
            <span className='max-md:hidden whitespace-nowrap'>{i.title}</span>
            </div>

       ))} 
      
    </div>
    <div>
      {!user? (
      <div className='w-12 h-12  bg-gray-300 rounded-full animate-bounce'></div>
        ) : (
       <div className='flex flex-col gap-5'>
        <div className='flex gap-2 items-center'>
          <img 
          className='w-12 h-12 rounded-full'
          src={user?.photoURL} />
          <p className='max-md:hidden'>{user.displayName}</p>
        </div>
        <button 
        onClick={()=>signOut(auth)}
         className='flex justify-center p-1 gap-2 items-center bg-gray-700 rounded text-2x1 md:text-[15px] transition hover:bg-gray-800'>
        <BiDoorOpen />
        <span className='max-md:hidden'>Çıkış Yap</span>
       </button>
       </div>
       )}
     
    </div>
    </div>
  )
}

export default Nav