import React, { useState, useEffect } from 'react';

import PersonList from '../person-list';
import Spinner from '../spinner';
import MonthItem from '../month-item';

import './list-container.css';

const ListContainer = () => {
  const _getLink = 'https://yalantis-react-school-api.yalantis.com/api/task0/users';
  const monthList = [
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Червень',
    'Липень',
    'Серпень',
    'Вересень',
    'Жовтень',
    'Листопад',
    'Грудень',
  ];

  const [data, setData] = useState();
  const [persons, loadPersons] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    getData(_getLink);
  }, []);

  //Запрос данных сохранение в стейт, и отключение лоадера при удачной загрузке
  const getData = (link) => {
    fetch(`${link}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoad(true);
      })
      .catch((error) => {
        alert('Возникла ошибка: ' + error);
      });
  };

  //отрисовка месяцев и цвет в зависимости от количества человек
  const renderMonth = (data, list) => {
    return list.map((month, index) => {
      const peopleList = data.filter((data) => new Date(data.dob).getMonth() === index);

      if (peopleList.length <= 2) {
        return (
          <MonthItem
            key={`${index}_mth`}
            nameClass="month gray"
            index={index}
            filterPersonList={filterPersonList}
            clearPersonList={clearPersonList}>
            {month}
          </MonthItem>
        );
      } else if (peopleList.length >= 3 && peopleList.length <= 6) {
        return (
          <MonthItem
            key={`${index}_mth`}
            nameClass="month blue"
            index={index}
            filterPersonList={filterPersonList}
            clearPersonList={clearPersonList}>
            {month}
          </MonthItem>
        );
      } else if (peopleList.length >= 7 && peopleList.length <= 10) {
        return (
          <MonthItem
            key={`${index}_mth`}
            nameClass="month green"
            index={index}
            filterPersonList={filterPersonList}
            clearPersonList={clearPersonList}>
            {month}
          </MonthItem>
        );
      } else {
        return (
          <MonthItem
            key={`${index}_mth`}
            nameClass="month red"
            index={index}
            filterPersonList={filterPersonList}
            clearPersonList={clearPersonList}>
            {month}
          </MonthItem>
        );
      }
    });
  };

  //очистка списка людей при выходе курсора с елемента
  const clearPersonList = () => {
    return loadPersons((persons) => {
      return [];
    });
  };

  //создание списка людей при наведении на елемент
  const filterPersonList = (array = data, month) => {
    const list = array.filter((data) => new Date(data.dob).getMonth() === month);
    loadPersons((persons) => {
      return list;
    });
  };

  return (
    <div className="list_container">
      {load ? <div id="month-list">{renderMonth(data, monthList)}</div> : <Spinner />}

      {persons && <PersonList personList={persons} />}
    </div>
  );
};
export default ListContainer;
