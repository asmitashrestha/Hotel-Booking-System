import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
    const [error, setError] = useState("")
    
    const { register,watch ,handleSubmit} = useForm<RegisterFormData>()

    const onSubmit = handleSubmit((data)=>{
      console.log(data);
      
    })
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
              <form className="space-y-6" onSubmit={onSubmit}>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Username</label>

                  </div>
                  <div className="mt-2">
                    <input id="name" name="name" type="name" autoComplete="current-username" 
                    {...register("name",{required:"This field is required"})} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Email</label>

                  </div>
                  <div className="mt-2">
                  <input id="email" name="email" type="email" autoComplete="current-email" {...register("email",{required:"This field is required"})} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>


                <div>  
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                  </div>
                  <div className="mt-2">
                    <input id="password" name="password" type="password" autoComplete="current-password" {...register("password"
                    ,{required:"This field is required",
                    minLength:{
                      value: 6,
                      message:"Password must be 6 characters",
                    }})} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div>  
                  <div className="flex items-center justify-between">
                    <label htmlFor="confirmpassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                  </div>
                  <div className="mt-2">
                    <input id="confirmpassword" name="confirmpassword" type="password" autoComplete="current-password" {...register("confirmPassword",
                    {validate:(val) => {
                      if(!val){
                        return "This field is required"
                      }else if(watch("password") !== val){
                        return "Your password do not match"
                      }
                    }})} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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

export default Register