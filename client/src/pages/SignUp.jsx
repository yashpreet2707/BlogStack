import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function SignUp() {

  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all the fields.')
    }
    try {
      setLoading(true);
      setErrorMessage(null)
      const result = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await result.json();
      if (data.success === false) {
        return setErrorMessage(data.message)
      }
      setLoading(false)
    } catch (err) {
      setErrorMessage(err.message)
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen mt-20'>
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


        <div className='flex-1'>
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
            <Button className='bg-gradient-to-r from-purple-600 to-indigo-600 ' type='submit' disabled={loading}>{loading ? (<><Spinner size='sm' /> <span>Loading...</span></>) : 'Sign Up'}</Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account ? </span>
            <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>

      </div>
    </div>
  )
}

export default SignUp