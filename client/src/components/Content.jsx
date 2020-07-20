import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { Sidebar } from './sidebar/Sidebar';
import { List } from './vacancies/List';
import { ModalSearch } from './search/ModalSearch';
import { ModalResume } from './sidebar/ModalResume';
import { DataIsLoaded } from './Loader';

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 100px);
  display: flex;
  align-items: flex-start;
`;

export const Content = () => {
  const { isLoadingData } = useSelector((state) => state.reducerVacancies);
  return (
    <Wrapper>
      <Sidebar />
      <DataIsLoaded isLoading={isLoadingData}>
        <List />
      </DataIsLoaded>
      <ModalSearch />
      <ModalResume />
    </Wrapper>
  );
};
