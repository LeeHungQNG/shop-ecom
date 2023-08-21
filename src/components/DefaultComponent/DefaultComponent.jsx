import React from 'react';
import HeaderComponent from '../HeaderComponent/HeaderComponent';

const DefaultComponent = ({ children }) => {
  return (
    <div>
      <HeaderComponent></HeaderComponent>
      {children}
    </div>
  );
};

export default DefaultComponent;
