import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchSnippetVacanciesApi,
  fetchFullVacanciesApi,
} from '../../redux/actions/vacancies';
import {
  setIsOpenModalSearch,
  setFirstLoaded,
} from '../../redux/actions/utils';

import { Button, Modal } from 'antd';
import { ComponentSearch } from './ComponentSearch';
import { ComponentExperience } from './ComponentExperience';
import { ComponentCity } from './ComponentCity';
import { ComponentSalary } from './ComponentSalary';

const Item = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const ModalSearch = () => {
  const [textValue, setTextValue] = useState('');
  const dispatch = useDispatch();

  const { snippetVacancies } = useSelector((state) => state.reducerVacancies);
  const {
    countItemsOnPage,
    currentPage,
    isOpenModalSearch,
    firstLoadedApp,
  } = useSelector((state) => state.reducerUtils);
  const { city, experience, salary } = useSelector(
    (state) => state.reducerUserInfo
  );
  const { accessToken } = useSelector((state) => state.reducerAuth);

  const fetchSnippetVacancies = () =>
    dispatch(
      fetchSnippetVacanciesApi({
        textSearch: textValue,
        areaId: city.areaId,
        countItemsOnPage,
        currentPage,
        experience,
        salary,
      })
    );

  const fetchFullVacancies = () =>
    dispatch(fetchFullVacanciesApi({ snippetVacancies }));

  /* Когда получаем краткое описане вакансий, сразу делаем запрос за полным описанием каждой вакансии */
  useEffect(() => {
    snippetVacancies.length !== 0 && fetchFullVacancies();
  }, [snippetVacancies]);

  /* Если переходим на другую страницу */
  useEffect(() => {
    if (firstLoadedApp) {
      fetchSnippetVacancies();
    }
  }, [currentPage]);

  const handleSubmit = async () => {
    dispatch(setFirstLoaded({ firstLoadedApp: true }));
    await fetchSnippetVacancies();
    await toggleSettings();
  };

  const toggleSettings = () => {
    dispatch(setIsOpenModalSearch({ isOpenModalSearch: false }));
  };

  return (
    <>
      <Modal
        title="Настройки поиска"
        visible={isOpenModalSearch}
        centered={true}
        onOk={toggleSettings}
        onCancel={toggleSettings}
        footer={[
          <Button key="back" onClick={toggleSettings}>
            Назад
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Поиск
          </Button>,
        ]}
      >
        <Item>
          <ComponentSearch textValue={textValue} setTextValue={setTextValue} />
        </Item>
        <Item>
          <ComponentCity />
        </Item>
        <Item>
          <ComponentSalary />
        </Item>
        <Item>
          <ComponentExperience />
        </Item>
      </Modal>
    </>
  );
};
