import {onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { auth } from '../firebase/config'


//outlet alt route un ekranda yerleşeceği yeri belirler
const ProtectedRoute = () => {
  const [isAuth, setIsAuth]=useState(null)
  
    useEffect(()=>{
     
        //anlık olarak oturumu açık olan kullanıcıyı izle herhangi
        //bir değişimde state i güncelle
       const unsub =  onAuthStateChanged(auth, (user) =>{
          if(user){
            setIsAuth(true)
          }else{
            setIsAuth(false)
          }
          
        })
        //sayfadan ayrılırsa izleyiciyi kaldır
        return()=>unsub()
    },[])

    if(isAuth === false) return <Navigate to ={"/"} />
    
    
  return <Outlet />
   
 
}

export default ProtectedRoute