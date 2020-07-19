import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeCity } from '../../redux/actions/userInfo';
import { Button } from 'antd';

export const ComponentCity = () => {
  const [isChangeCity, setIsChangeCity] = useState(false);

  const dispatch = useDispatch();
  const { city } = useSelector((state) => state.reducerUserInfo);

  const handleChangeCity = () => setIsChangeCity(!isChangeCity);

  const renderInfoCity = () => {
    return (
      <>
        <h2 style={{ margin: 0 }}>Город поиска: {city.title} </h2>
        <Button onClick={handleChangeCity}>Изменить</Button>
      </>
    );
  };

  const renderChangeCity = () => {
    return (
      <>
        <div>
          <Button
            type="primary"
            onClick={() => {
              const city = { title: 'Москва', areaId: 1 };
              dispatch(changeCity({ city }));
              handleChangeCity();
            }}
            style={{ marginRight: '8px' }}
          >
            Москва
          </Button>
          <Button
            type="primary"
            onClick={() => {
              const city = { title: 'Санкт-Петербург', areaId: 2 };
              dispatch(changeCity({ city }));
              handleChangeCity();
            }}
          >
            Санкт-Петербург
          </Button>
        </div>
        <Button onClick={handleChangeCity}>Назад</Button>
      </>
    );
  };
  return <> {isChangeCity ? renderChangeCity() : renderInfoCity()}</>;
};
