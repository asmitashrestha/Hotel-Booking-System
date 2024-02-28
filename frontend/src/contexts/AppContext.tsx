import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { loadStripe, Stripe } from "@stripe/stripe-js";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

type AppContext = {
  isLoggedIn: boolean;
  stripePromise: Promise<Stripe | null>;
  userData: {
    user:UserData;
  } | null
};

type UserData ={
  id:string;
  name:string;
  email:string;
  isVerified:boolean;
  role:string;
  user:UserData;
}

const AppContext = React.createContext<AppContext | undefined>(undefined);
const stripePromise = loadStripe(STRIPE_PUB_KEY);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [userData,setUserData]=useState<UserData|null>(null);

  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
    onSuccess:(data:UserData)=>{
      setUserData(data)
    }
  });

  return (
    <AppContext.Provider
      value={{
        isLoggedIn: !isError,
        stripePromise,
        userData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
