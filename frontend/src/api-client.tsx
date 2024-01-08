import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

export const register = async (formData: RegisterFormData) => {
  const response = await fetch("http://localhost:5000/api/users/register", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`http://localhost:5000/api/users/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const validateToken = async () => {
  const response = await fetch(
    "http://localhost:5000/api/users/validate-token",
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Token Invalid!");
  }
  return response.json();
};


// export const signOut = async()=>{
//   const response = await fetch(
//     "http://localhost:5000/api/users/signout",
//     {
//       method: "POST",
//       credentials: "include",
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Error during sign out!");
//   }
//   return response.json();
// }

export const signOut = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/users/signout", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error during sign out!");
    }

    // Check if the response is of type JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    } else {
      // Handle non-JSON response (e.g., success without JSON data)
      return { success: true };
    }
  } catch (error) {
    console.error("Sign-out error:", error.message);
    throw new Error("Sign-out failed");
  }
};



// export const addMyTour = async (tourFormData : FormData) =>{
//   const response = await fetch(`http://localhost:5000/api/my-package/addtour`,{
//     method:'POST',
//     credentials:"include",
//     body:tourFormData,
//   })
//   if(!response.ok){
//     throw new Error("Failed to add tour")
//   }
//   return response.json()
// }


export const addMyTour = async (tourFormData: FormData) => {
  try {
    const response = await fetch(`http://localhost:5000/api/my-package/addtour`, {
      method: 'POST',
      credentials: 'include',
      body: tourFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error adding tour. Server response:', errorText);
      throw new Error('Failed to add tour');
    }

    return response.json();
  } catch (error) {
    console.error('Error adding tour:', error.message);
    throw error; // Rethrow the error for further handling if needed
  }
};





