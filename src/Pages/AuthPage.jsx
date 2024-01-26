import React, { useState } from 'react'
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const AuthPage = () => {
    const [isSignUp, setIsSignUp] =useState(false)
    const [ email, setEmail] =useState("")
    const [ pass, setPass] =useState("")
    const navigate = useNavigate()
    const [isError, SetIsError]=useState(false)



    const handleSubmit =(e)=>{
        e.preventDefault()
        

        if(isSignUp){
            createUserWithEmailAndPassword(auth, email, pass)
            .then(()=>{
                toast.info("Hesabınız Oluşturuldu")
                navigate("/home")
            })
            .catch((err)=> toast.error(err.code))

        }else{
            signInWithEmailAndPassword(auth, email, pass)
            .then(()=>{
                toast.info("Hesabınıza Giriş Yapıldı")
                navigate("/home")
            })
           .catch((err)=>{
            if(err.code === "auth/invalid-credential")
            SetIsError(true)


           })

        }
    }

    const sendMail=()=>{
        sendPasswordResetEmail(auth,email)
        .then(()=>{
            toast.info("E-mailinize şifre sıfırlama isteği gönderildi")
        })
    }

    const loginWithGoogle=()=>{
        signInWithPopup(auth,provider)
        .then(()=>navigate("/home"))
        
    }




  return (
   <section className='h-screen grid place-items-center'>
   <div className=' bg-black gap-10 py-7 px-32 rounded-lg flex flex-col '>
        <div className='flex justify-center'>
            <img className="h-8"
            src="./public/x.png" alt="logo" />
             </div>
            <h1 className='font-bold text-center'>Twitter'a Giriş Yap</h1>
            
       
        <div className='flex'>
            
        <button onClick={loginWithGoogle}
         className='flex items-center font-bold p-1 bg-white text-black rounded-full transition hover:bg-gray-300 '
            > <img className='h-6'
            src="./public/google.png" alt="" />
                Google ile Giriş Yap</button>
        </div>
        <div className='flex flex-col'>
           
            <form onSubmit={handleSubmit}
            className='flex flex-col gap-3'>
                <label>E-mail</label>
                <input onChange={(e)=>setEmail(e.target.value)}
                className='p-1 rounded-md text-black'
                type="text" 
                placeholder='Mailinizi Giriniz'
                required />
                <label>Şifre</label>
                <input onChange={(e)=>setPass(e.target.value)}
                className='p-1 rounded-md text-black'
                type="password"
                 placeholder='Şifrenizi Giriniz'
                 required />
           
           <button
           className='font-bold p-1 mt-5 bg-white text-black rounded-full transition hover:bg-gray-300'>
            {isSignUp ? "Kaydol" : "Giriş Yap"}</button>
           </form>
           
        </div>
        <div>
            <span onClick={()=>setIsSignUp(!isSignUp)}
            className='text-white font-bold cursor-pointer'>
            {isSignUp ? "Hesabınız Varsa" : "Hesabınız Yoksa"}
                 <span className='text-blue-600'>
                 {isSignUp ? " Giriş Yap" : " Kaydol"}</span></span>

            {isError && (
                <p onClick={sendMail}
                className='text-red-600 font-bold cursor-pointer'>
                Şifrenizi mi Unuttunuz ?</p>
            )}
        </div>
       
    </div>
    </section>
  )
}

export default AuthPage