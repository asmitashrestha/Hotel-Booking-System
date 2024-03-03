import React, { useContext, useState } from "react";

type SearchContext = {
  location: string; // Changed from destination to location
  setLocation: (location: string) => void; // Setter function for location
  tourType: string;
  setTourType: (tourType: string) => void; // Setter function for tourType
  budget: number;
  setBudget: (budget: number) => void; // Setter function for budget
  tourId: string;
  countPeople: number;
  bookDate: Date;
  saveSearchValues: (
    location: string, // Changed from destination to location
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
  const [location, setLocation] = useState<string>(
    () => sessionStorage.getItem("location") || ""
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

  const [tourType, setTourType] = useState<string>(""); // State for tourType
  const [budget, setBudget] = useState<number>(0); // State for budget

  const saveSearchValues = (
    location: string, // Changed from destination to location
    countPeople?: number,
    bookDate?: Date,
    tourId?: string
  ) => {
    setLocation(location);
    setBookDate(bookDate || new Date());
    setCountPeople(countPeople);
    if (tourId) {
      setTourId(tourId);
    }
    sessionStorage.setItem("location", location);

    if (bookDate) {
      setBookDate(bookDate);
      sessionStorage.setItem("bookDate", bookDate.toISOString());
    } else {
      setBookDate(new Date());
      sessionStorage.setItem("bookDate", new Date().toISOString());
    }

    sessionStorage.setItem("countPeople", countPeople?.toString() || "0");

    if (tourId) {
      sessionStorage.setItem("tourId", tourId);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        location, // Changed from destination to location
        setLocation, // Include setLocation in context value
        tourType,
        setTourType,
        budget,
        setBudget,
        tourId,
        countPeople,
        bookDate,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context as SearchContext;
};
