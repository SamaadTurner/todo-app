import React, { useState, useEffect } from 'react';

export const SettingsContext = React.createContext();

function SettingsProvider({ children }){
  const [pageItems, setPageItems] = useState(3);
  const [showCompleted, setShowCompleted] = useState(false);
  const [sort, setSort] = useState('difficulty');

  const saveLocally = () => {
    localStorage.setItem('todo', JSON.stringify({pageItems, showCompleted, sort}));
  }

  useEffect(() => {
      let storage = JSON.parse(localStorage.getItem('todo'));
      if(storage){
        setPageItems(storage.pageItems);
        setShowCompleted(storage.showCompleted);
        setSort(storage.sort);
      }
    }, [])

  const values = {
    pageItems,
    setPageItems,
    showCompleted,
    setShowCompleted,
    sort,
    setSort,
    saveLocally,
  }

  return(
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider;