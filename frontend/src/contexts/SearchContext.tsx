import React, { useContext, useState } from "react";

type SearchContext = {
  destination: string;
  tourId: string;
  countPeople:number;
  bookDate:Date;
  saveSearchValues: (destination: string,
    countPeople: number,
    bookDate: Date) => void;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProviderProps = {
  children: React.ReactNode;
};

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  const [destination, setDestination] = useState<string>("");
  const [bookDate, setBookDate] = useState<Date>(new Date())
  const [tourId, setTourId] = useState<string>(" ")
  const [countPeople, setCountPeople] = useState<number>(1)

  const saveSearchValues = (destination: string, countPeople?:number, bookDate?:
    Date,tourId?:string) => {
    setDestination(destination);
    setBookDate(bookDate)
    setCountPeople(countPeople)
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