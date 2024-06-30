// ActiveLinkContext.js

import { createContext, useState, useEffect } from 'react';

export const ActiveLinkContext = createContext(null);

const ActiveLinkProvider = ({ children }) => {
  const [activeLinkId, setActiveLinkId] = useState(
    parseInt(window.location.pathname.slice(1)) || 1
  );

  useEffect(() => {
    const handleLocationChange = () => {
      const updatedId = parseInt(window.location.pathname.slice(1)) || 1;
      if (updatedId === 1) {
        setActiveLinkId(1);
        localStorage.removeItem('activeLinkId');
      } else {
        setActiveLinkId(updatedId);
      }
    };
    window.addEventListener('popstate', handleLocationChange);

    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const handleLinkClick = (id) => {
    if (id === 1) {
      setActiveLinkId(1);
      console.log(id);
      localStorage.removeItem('activeLinkId');
    } else {
      setActiveLinkId(id);
      localStorage.setItem('activeLinkId', id);
    }
  };

  return (
    <ActiveLinkContext.Provider value={{ activeLinkId, handleLinkClick }}>
      {children}
    </ActiveLinkContext.Provider>
  );
};

export default ActiveLinkProvider;
