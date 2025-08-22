import React, { createContext, useState } from 'react'
import { useContext } from 'react';

const FilterContextPro = createContext()
function FilterContext({children}) {
    const [search, setSearch] = useState("")
    const [filters, setFilters] = useState({
        course: "",
        batch: "",
        year: "",
        sort: "",
        studyCentre: "",
      });
  return (
    <FilterContextPro.Provider value={{filters, setFilters, search, setSearch}}>
        {children}
    </FilterContextPro.Provider>
  )
}

export default FilterContext


export const useFilters = () => {
    const context = useContext(FilterContextPro);
    if (context === undefined) {
        throw new Error('useFilters must be used within a FilterProvider');
    }
    return context;
};
