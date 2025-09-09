import { Button } from 'flowbite-react'
import React from 'react';
import { GrGoogle } from "react-icons/gr"
import { app } from '../firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL


  const auth = getAuth();
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider(app);
    provider.setCustomParameters({ prompt: 'select_account' })
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider)

      const res = await fetch(`${BASE_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhotoURL: resultFromGoogle.user.photoURL
        }),
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data))
        navigate('/home')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Button onClick={handleGoogleClick} type='button' className='gap-2 font-bold bg-gradient-to-r from-pink-400 to-orange-400'>
      <GrGoogle className='w-5 h-5' />
      Continue with Google
    </Button>
  )
}

export default OAuth;