import React, { useContext, useState } from "react";

type SearchContext = {
  destination: string;
  tourId: string;
  countPeople: number;
  bookDate: Date;
  saveSearchValues: (
    destination: string,
    countPeople: number,
    bookDate: Date
  ) => void;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProviderProps = {
  children: React.ReactNode;
};

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  const [destination, setDestination] = useState<string>(
    () => sessionStorage.getItem("destination") || ""
  );

  const [bookDate, setBookDate] = useState<Date>(
    () =>
      new Date(sessionStorage.getItem("bookDate") || new Date().toISOString())
  );

  const [tourId, setTourId] = useState<string>(
    () => sessionStorage.getItem("tourId") || " "
  );

  const [countPeople, setCountPeople] = useState<number>(() =>
    parseInt(sessionStorage.getItem("countPeople"))
  );

  const saveSearchValues = (
    destination: string,
    countPeople?: number,
    bookDate?: Date,
    tourId?: string
  ) => {
    setDestination(destination);
    setBookDate(bookDate || new Date());
    setCountPeople(countPeople);
    if (tourId) {
      setTourId(tourId);
    }
    sessionStorage.setItem("destination", destination);
  
    if (bookDate) {
      setBookDate(bookDate);
      sessionStorage.setItem("bookDate", bookDate.toISOString());
    } else {
      setBookDate(new Date());
      sessionStorage.setItem("bookDate", new Date().toISOString());
    }

    sessionStorage.setItem("countPeople", countPeople?.toString() || "0");
    
    if(tourId){
    sessionStorage.setItem("tourId", tourId);  
    }
    
  };

  return (
    <SearchContext.Provider
      value={{ destination, tourId, bookDate, countPeople, saveSearchValues }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context as SearchContext;
};
