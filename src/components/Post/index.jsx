import React, { useState } from 'react'
import { BiMessageRounded } from 'react-icons/bi';
import { FaRetweet } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiShare2 } from 'react-icons/fi';
import moment from 'moment';
import 'moment/locale/tr'  
import {arrayRemove, arrayUnion, doc, updateDoc, deleteDoc} from "firebase/firestore"
import { auth, db } from '../../firebase/config';
import Dropdown from './Dropdown';
import EditMode from './EditMode';


const Post = ({tweet}) => {
    const isLiked = tweet.likes?.includes(auth.currentUser.uid)
    const [isEditMode, setisEditMode]=useState(false)

   
    const date = moment(tweet?.createdAt?.toDate()).fromNow()
    const handleLike = async()=>{
        //tweet dök. likes dizisine oturumu açık olan
        //kullanıcının id sini ekle
        //dök. ref. al

        const ref = doc(db, "tweets", tweet.id)

        //dök. bir değerini güncelleme
        await updateDoc(ref,{
            likes: isLiked 
            ? arrayRemove(auth.currentUser.uid)
            : arrayUnion(auth.currentUser.uid)
        })

    }
    const handleDelete = async()=>{
        if(confirm("Tweet'i silmek istediğinize emin misiniz?")){
           const tweetRef = (doc(db, "tweets", tweet.id))
           await deleteDoc(tweetRef)
        }

    }
    const handleUpdate =async()=>{

    }


   
  return (
   <div className='relative flex gap-3 py-6 px-3 border-b-[1px] border-gray-700'> 
    <img className='w-12 h-12 rounded-full'
    src={tweet.user.photo} alt="profie-pic" />

    <div className='w-full'>
    <div className='flex justify-between'>
<div className='flex items-center gap-3 '>
    <p className='font-bold'>{tweet.user.name}</p>
    <p className='text-gray-400'>{tweet.user.name}</p>
    <p className='text-gray-400'>{date}</p>
    <span className='text-sm text-gray-400 italic'>
          {tweet.isEdited && "Düzenlendi"}
         </span>
</div>
{tweet.user.id === auth.currentUser.uid && 
<Dropdown 
    setisEditMode={setisEditMode}
    handleDelete={handleDelete}/>
}

    </div>
    <div className='my-4'>
        {isEditMode && <EditMode tweet={tweet} close={()=> setisEditMode(false)}/>}
        {tweet.textContent && !isEditMode && <p>{tweet.textContent}</p>}
        {tweet.imageContent && !isEditMode &&
        
        <img 
        className='my-2 rounded-lg w-full object-cover max-h-[300px]'
         src={tweet.imageContent} />}
        
    </div>
    <div className='flex justify-between'>
        <div className='grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#00b7ff69]'>
            <BiMessageRounded/>
        </div>
        <div className='grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#00ff4436]'>
            <FaRetweet/>
        </div>
        <div onClick={handleLike}
         className='flex justify-center items-center gap-2 py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#e85757cc]'>
            {isLiked ? <FcLike/> : <AiOutlineHeart/>}
            <span>{tweet.likes?.length}</span>
            
        </div>
        <div className='grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#7e7e7ea8]'>
            <FiShare2/>
        </div>
    </div>
    </div>
   </div>
  )
}

export default Post