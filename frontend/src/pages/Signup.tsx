import { Link } from 'react-router-dom'
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [error, setError] = useState("")
  
    return (
      <>
        <div className=''>
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register</h2>
            </div>
  
            {
              error
              &&
              <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-red-200 p-4'>
                {error}
              </div>
            }
  
  
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Username</label>

                  </div>
                  <div className="mt-2">
                    <input id="name" name="name" type="name" autoComplete="current-username" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Email</label>

                  </div>
                  <div className="mt-2">
                    <input id="email" name="email" type="email" autoComplete="current-email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>


                <div>  
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                  </div>
                  <div className="mt-2">
                    <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div>  
                  <div className="flex items-center justify-between">
                    <label htmlFor="confirmpassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                  </div>
                  <div className="mt-2">
                    <input id="confirmpassword" name="confirmpassword" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
  
                <div>
                  <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
                </div>
              </form>
            </div>

            <div className="register flex justify-center">
            <p className='mt-7 mr-2'>Already have an account</p>
            <Link to='/signin' className='pt-7 text-blue-900 '>Sign In Here</Link>
          </div>
          </div>
  
  
        </div>
      </>
    
    )
}

export default Signup