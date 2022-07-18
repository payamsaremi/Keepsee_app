import React, { createContext } from 'react';
const DataContext = createContext();

const DataProvider = ({ children }) => {
  const value = {
    data: ['hello'],
  };
  return (
    <>
      <DataContext.Provider value={value}>{children}</DataContext.Provider>
    </>
  );
};

const withData = (Child) => (props) => {
  <DataContext.Consumer>
    {(context) => <Child {...props} {...context} />}
  </DataContext.Consumer>;
};

export { DataProvider, withData };
