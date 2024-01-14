import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { TourType } from "../../backend/model/TourModel";
import { TourSearchResponse } from "../../backend/shared/types";

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
    const response = await fetch(
      `http://localhost:5000/api/my-package/addtour`,
      {
        method: "POST",
        credentials: "include",
        body: tourFormData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error adding tour. Server response:", errorText);
      throw new Error("Failed to add tour");
    }

    return response.json();
  } catch (error) {
    console.error("Error adding tour:", error.message);
    throw error; // Rethrow the error for further handling if needed
  }
};

// get all tour package

export const fetchTours = async (): Promise<TourType[]> => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/my-package/addtour`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error adding fetch. Server response:", errorText);
      throw new Error("Failed to fetch tour");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching tour:", error.message);
    throw error; // Rethrow the error for further handling if needed
  }
};

export const fetchTourById = async (tourId: string): Promise<TourType> => {
  const response = await fetch(
    `http://localhost:5000/api/my-package/addtour/${tourId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Error fetching tour");
  }

  return response.json();
};

export const updateMyTourById = async (tourFormData: FormData) => {
  const response = await fetch(
    `http://localhost:5000/api/my-package/addtour/${tourFormData.get(
      "tourId"
    )}`,
    {
      method: "PUT",
      body: tourFormData,
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update Hotel");
  }

  return response.json();
};

export const deleteMyTourById = async (tourFormData: FormData) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/my-package/addtour/${tourFormData.get(
        "tourId"
      )}`,
      {
        method: "DELETE",
        body: tourFormData,
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete Hotel");
    }

    return response.json();
  } catch (error) {
    console.error("Error deleting tour:", error);
  }
};

export type SearchParams = {
  destination?: string;
  page?: string;
  facilities?: string[];
  type?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchTour = async (
  searchParams: SearchParams
): Promise<TourSearchResponse> => {
  const queryParams = new URLSearchParams();

  // Append parameters with key-value pairs
  queryParams.set("destination", searchParams.destination || "");
  queryParams.set("page", searchParams.page || "");
  queryParams.set("maxPrice", searchParams.maxPrice || "");
  queryParams.set("sortOption", searchParams.sortOption || "");

  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );

  searchParams.type?.forEach((type) => queryParams.append("types", type));

  searchParams.stars?.forEach((star) => queryParams.append("stars", star));

  try {
    const response = await fetch(
      `http://localhost:5000/api/search-tour/searchs?${queryParams.toString()}`, // Append query parameters to the URL
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      console.error("Error response from server:", response);
      throw new Error("No search data found");
    }
    return response.json();
  } catch (error) {
    console.error("Error searching tour:", error);
  }
};
