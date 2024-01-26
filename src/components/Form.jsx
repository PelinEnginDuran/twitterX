import React, { useState } from 'react'
import { BsCardImage } from "react-icons/bs"
import {addDoc, collection, serverTimestamp} from "firebase/firestore"
import { db, storage } from '../firebase/config'
import { ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { v4 } from 'uuid'
import { toast } from 'react-toastify'
import SpinnerTweet from "../components/SpinnerTweet"


const Form = ({user}) => {
  const [uploading, setUploading] =useState(false)
  
  const tweetsCol = collection(db, "tweets")

    //dosya resimse storage a yukle 
    //url ini fonks cagrıldığı yere döndür

   const uploadImg = async (file)=>{


      //dosya resim değilse fonks durdur
      if(!file || !file.type.startsWith("image")) return null

      //yükleneceği yerin referansını oluştur
      const fileRef = ref(storage, v4() + file.name)

      //ref. oluşturduğumuz yere dosyaları yükle
      await uploadBytes(fileRef, file)
      //yüklenen dosyanın url ine eriş

     return await getDownloadURL(fileRef)


    }


    const handleSubmit = async(e)=>{
        e.preventDefault()
        const textContent = e.target[0].value
        const imageContent = e.target[1].files[0]
       
        
        //yazı veya resim içeriği yoksa uyarı ver

       if (!textContent && !imageContent )
        return toast.info("Yazı veya Media yükleyiniz!")

       try{
       setUploading(true)
       const url = await uploadImg(imageContent)
        

        await addDoc(tweetsCol,{
            textContent,
            imageContent: url,
            createdAt: serverTimestamp(),
            user: {
            id: user.uid,
            name: user.displayName,
            photo: user.photoURL},
            like:[],
            isEdited:false,

        })
      }catch(error){
          console.error("dosya yükleme hatası", error)
        }finally{
         
          setUploading(false)
          e.target.reset()
        }
     }
  return (
   <form onSubmit={handleSubmit}
   className='flex gap-3 p-4 border-b-[1px] border-gray-700'>
     <img className='rounded-full h-[35px] md:h-[45px] mt-1'
      src={user?.photoURL} alt="profile-pic" />

    <div className='w-full'>
    <input
     className='w-full bg-transparent my-2 outline-none md:text-lg'
    placeholder='Neler Oluyor?'
     type="text" />

    <div className='flex justify-between items-center'>
        <label htmlFor="image-input"
         className='hover:bg-gray-800 text-lg transition p-4 rounded-full cursor-pointer'>
        <BsCardImage/>
        </label>
        <input onChange={()=>{}}
        className='hidden'
         id='image-input' 
         type="file" />


      
        <button disabled={uploading}
        className='bg-blue-600 hover:bg-blue-800 flex items-center justify-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full'
        >
          {uploading ? <SpinnerTweet /> : "Tweetle"}
        </button>
        
    </div>
    </div>
   </form>
  )
}

export default Form