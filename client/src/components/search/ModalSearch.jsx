import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchSnippetVacanciesRequest,
  fetchSnippetVacanciesSuccess,
  fetchSnippetVacanciesFailure,
  fetchFullVacanciesRequest,
  fetchFullVacanciesSuccess,
  fetchFullVacanciesFailure,
} from '../../redux/actions/jobs';
import {
  setIsOpenModalSearch,
  setFirstLoaded,
} from '../../redux/actions/utils';

import { Button, Modal } from 'antd';
import queries from '../../api/index';
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

  const { snippetVacancies } = useSelector((state) => state.reducerJobs);
  const {
    countItemsOnPage,
    currentPage,
    isOpenModalSearch,
    firstLoadedApp,
  } = useSelector((state) => state.reducerUtils);
  const { city, experience } = useSelector((state) => state.reducerUserInfo);
  const { accessToken } = useSelector((state) => state.reducerAuth);

  const fetchFullVacancies = async () => {
    dispatch(fetchFullVacanciesRequest({ isLoadingData: true }));
    try {
      let arrayIds = [];
      /* Получаем все id вакансий из краткого описания вакансий (snippetVacancies) */
      await snippetVacancies.items.forEach((item) => arrayIds.push(item.id));

      const fullVacancies = [];
      /* Отправляем запрос по каждой id чтобы получить описане полной вакансии */
      await arrayIds.forEach(async (id, index) => {
        const vacancy = await queries.getVacancy({ id });
        await fullVacancies.push(vacancy);
        await arrayIds.shift();
        if (0 === arrayIds.length) {
          dispatch(
            fetchFullVacanciesSuccess({ fullVacancies, isLoadingData: false })
          );
        }
      });
    } catch (err) {
      dispatch(fetchFullVacanciesFailure({ isLoadingData: false }));
    }
  };

  /* Опыт работы */

  const validateExperience = (experience) => {
    switch (experience) {
      case 1:
        return '';
      case 2:
        return '&experience=noExperience';
      case 3:
        return '&experience=between1And3';
      case 4:
        return '&experience=between3And6';
      default:
        return '';
    }
  };

  const fetchSnippetVacancies = async (textSearch, areaId) => {
    dispatch(fetchSnippetVacanciesRequest({ isLoadingData: true }));
    try {
      /* Получаем краткое описание вакансий */
      const snippetVacancies = await queries.getVacancies({
        textSearch,
        areaId,
        countVacancies: countItemsOnPage,
        currentPage: currentPage,
        experience: validateExperience(experience),
      });
      dispatch(
        fetchSnippetVacanciesSuccess({ snippetVacancies, isLoadingData: false })
      );
    } catch (err) {
      dispatch(fetchSnippetVacanciesFailure({ isLoadingData: false }));
    }
  };

  /* Когда получаем краткое описане вакансии, сразу делаем запрос за полным описанием */
  useEffect(() => {
    snippetVacancies.length !== 0 && fetchFullVacancies();
  }, [snippetVacancies]);

  /* Если переходим на другую страницу */
  useEffect(() => {
    if (firstLoadedApp) {
      fetchSnippetVacancies(textValue, city.areaId);
    }
  }, [currentPage]);

  const handleSubmit = async () => {
    dispatch(setFirstLoaded({ firstLoadedApp: true }));
    await fetchSnippetVacancies(textValue, city.areaId);
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
          <ComponentExperience />
        </Item>
        <Item>
          <ComponentSalary />
        </Item>
      </Modal>
    </>
  );
};
