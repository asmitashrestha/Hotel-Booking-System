import React, { useContext, useState } from "react";

type SearchContext = {
  destination: string;
  tourId: string;
  saveSearchValues: (destination: string) => void;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProviderProps = {
  children: React.ReactNode;
};

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  const [destination, setDestination] = useState<string>("");
  const [tourId, setTourId] = useState<string>(" ")

  const saveSearchValues = (destination: string, tourId?:string) => {
    setDestination(destination);
    if(tourId){
      setTourId(tourId)
    }
    
  };

  return (
    <SearchContext.Provider value={{ destination,tourId, saveSearchValues }}>
      {children}
    </SearchContext.Provider>
  );
};


export const useSearchContext = () =>{
  const context = useContext(SearchContext)
  return context as SearchContext
}