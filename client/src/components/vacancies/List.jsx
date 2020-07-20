import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import ReactHover from 'react-hover';
import { setCountItemsOnPage } from '../../redux/actions/utils';

import { Modal } from './Modal';
import { Vacancy } from './vacancy/Vacancy';
import { AlertCustom } from '../AlertCustom';

const Wrapper = styled.div`
  max-width: calc(100vw - 298px);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  /* Отстпу справа - размер sidebar */
  padding-right: 250px;
  margin-left: 16px;
`;

const ListWparrer = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  list-style: none;
  padding: 0 32px;
  margin: 0 0 10px 0;
`;

const ItemWrapper = styled.li`
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #e0d6d6;
  cursor: pointer;
  box-sizing: border-box;
  transition: 0.7s;

  &:hover {
    background-color: #e4e6ef;
  }
  &:hover .btn__send_resume {
    display: inline-block;
    transition: 0.7s;
  }
  @media (max-width: 1400px) {
    padding: 4px;
    height: 40px;
  }
`;

export const List = () => {
  const refList = useRef();
  const refItem = useRef();
  const [itemHeight, setItemHeight] = useState(40);
  const dispatch = useDispatch();

  const { fullVacancies } = useSelector((state) => state.reducerVacancies);
  const { countItemsOnPage, isOpenAlertResume } = useSelector(
    (state) => state.reducerUtils
  );

  const optionsModalHover = (index) => {
    return {
      followCursor: true,
      shiftX: 20,
      shiftY: -index * itemHeight,
    };
  };

  const renderList = () =>
    fullVacancies.map((item, index) => {
      return (
        <ItemWrapper key={item.id} ref={refItem}>
          <ReactHover options={optionsModalHover(index)}>
            <ReactHover.Trigger type="trigger">
              <Vacancy item={item} />
            </ReactHover.Trigger>
            <ReactHover.Hover type="hover">
              <Modal item={item} />
            </ReactHover.Hover>
          </ReactHover>
        </ItemWrapper>
      );
    });

  useEffect(() => {
    /* Узнаем сколько поместится item на странице относительно высоты окна
     */
    if (refList.current && refItem.current) {
      let count = Math.trunc(
        refList.current.clientHeight / refItem.current.clientHeight
      );
      /* Максимум 21 за один запрос */
      if (count > 21) {
        count = 21;
      }
      dispatch(setCountItemsOnPage({ count }));
      setItemHeight(refItem.current.clientHeight);
    }
  }, [countItemsOnPage, dispatch]);
  return (
    <Wrapper>
      <ListWparrer ref={refList}>{renderList()}</ListWparrer>
      <AlertCustom
        isShow={isOpenAlertResume}
        text="Резюме успешно отправлено!"
      />
    </Wrapper>
  );
};
