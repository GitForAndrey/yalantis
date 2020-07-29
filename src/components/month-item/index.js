import React from 'react';

const MonthItem = ({ children, nameClass, filterPersonList, clearPersonList, index }) => {
  return (
    <div
      className={nameClass}
      onMouseEnter={() => filterPersonList(undefined, index)}
      onMouseLeave={() => clearPersonList()}>
      {children}
    </div>
  );
};

export default MonthItem;
