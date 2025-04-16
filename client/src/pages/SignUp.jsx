import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

function SignUp() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error: errorMessage } = useSelector(state => state.user);
  const { currentUser } = useSelector(state => state.user)

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all the fields.'))
    }
    try {
      dispatch(signInStart());
      const result = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await result.json();
      if (data.success == false) {
        return dispatch(signInFailure(data.message))
      }
      if (result.ok) {
        dispatch(signInSuccess(data))
        navigate('/home')
      }
    } catch (err) {
      dispatch(signInFailure(err.message))
    }
  }

  return (
    <div className='min-h-[100vh] sm:min-h-[67vh] lg:min-h-[105vh] flex justify-center items-center -mt-15'>
      <div>
        <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-10'>

          <div className='flex-1'>
            <div className='flex items-center text-4xl'>
              <div className="w-20 h-18 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                B
              </div>
              <span className="font-bold ml-3  dark:text-white">
                Blog<span className="text-purple-600">Stack</span>
              </span>
            </div>
            <p className='mt-5 '>This is a demo project. You can sign up with your email and password or with Google.</p>
          </div>


          <div className='flex-1 mt-[5vh] sm:mt-0'>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              <div>
                <Label htmlFor='username'>Your username</Label>
                <TextInput id='username' type='text' placeholder='Enter your username' onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor='username'>Your email</Label>
                <TextInput id='email' type='email' placeholder='name@company.com' onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor='username'>Your password</Label>
                <TextInput id='password' type='password' placeholder='Enter your password' onChange={handleChange} />
              </div>
              <Button className='bg-gradient-to-r from-purple-600 to-indigo-600 ' type='submit' disabled={loading}>{loading ? (<span>Loading...</span>) : 'Sign Up'}</Button>
              <OAuth />
            </form>
            <div className='flex gap-2 text-sm mt-5'>
              <span>Have an account ? </span>
              <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
            </div>
          </div>
        </div>
        {errorMessage && (
          <Alert className='mt-3 w-[95vw] mx-auto md:ml-[51%] md:w-[25vw]' color='failure'>
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  )
}

export default SignUp