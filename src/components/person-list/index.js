import React from 'react';

const PersonList = ({ personList }) => {
  //создание списка людей
  const renderList = (data) => {
    const list = data.map((data) => {
      return (
        <li key={data.id}>
          {data.lastName} {data.firstName}
        </li>
      );
    });
    return list;
  };

  return <ul>{renderList(personList)}</ul>;
};

export default PersonList;
