import { RegisterFormData } from "./pages/Register";


export const register = async (formData: RegisterFormData) =>{
  const response = await fetch('http://localhost:5000/api/users/register',{
    method:'POST',
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify(formData)
  })

  const responseBody = await response.json()

  if(!response.ok){
    throw new Error(responseBody.message)
  }
}