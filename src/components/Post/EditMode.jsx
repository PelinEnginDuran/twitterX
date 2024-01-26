import { doc, updateDoc } from 'firebase/firestore'
import React, { useRef, useState } from 'react'
import { BiSolidSave } from 'react-icons/bi'
import { ImCancelCircle } from 'react-icons/im'
import { BsTrashFill } from 'react-icons/bs'
import { IoMdReturnLeft } from 'react-icons/io'
import { db } from '../../firebase/config'



const EditMode = ({tweet, close}) => {
const inputRef = useRef()
const [isPicDeleting, setisPicDeleting] = useState(false)


  const handleSave=async()=>{
    const newText = inputRef.current.value
    const tweetRef = doc(db, "tweets", tweet.id)

    if (isPicDeleting){
      await updateDoc(tweetRef,
        { textContent : newText,
          imageContent: null,
         isEdited: true,
         
     })

    }else{
      await updateDoc(tweetRef,
        { textContent : newText,
         isEdited: true,
         
     })

    }
    

close()
  }
  return (
    <>
        <input defaultValue={tweet.textContent}
        ref={inputRef}
         className='bg-transparent border rounded p-1 px-2 text-white'
         type="text" />
       
        <button onClick={handleSave}
        className='mx-5 p-2 text-green-400 rounded-full shadow hover:shadow-green-400'>
          <BiSolidSave/>
        </button>
        <button onClick={close}
         className='mx-5 p-2 text-red-400 rounded-full shadow hover:shadow-red-400'>
          <ImCancelCircle />
        </button>

        {tweet.imageContent && (
          <div className='relative'>
            <img 
            className={`${
              isPicDeleting ? "blur" : ""} my-2 rounded-lg w-full object-cover max-h-[400px]`}
            src={tweet.imageContent}  />


            <button onClick={()=> setisPicDeleting(!isPicDeleting)}
            className='absolute p-2 top-0 right-0 rounded-full transition hover:scale-90 bg-red-400 '>

              {isPicDeleting ? <IoMdReturnLeft /> : <BsTrashFill/>}
             
              </button>
          </div>
        )}
    </>
  )
}

export default EditMode