import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import queries from './api/index';

import {
  checkAuthUserApi,
  fetchUserInfoApi,
  fetchUserResumeApi,
} from './redux/actions/auth';
import { Header } from './components/Header';
import { Content } from './components/Content';
import { Footer } from './components/Footer';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  padding: 0 16px;
  overflow: hidden;
`;

const App = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.reducerAuth);

  /* Проверяем авторизовался ли user */
  useEffect(() => {
    if (!accessToken) {
      dispatch(checkAuthUserApi());
    } else {
      dispatch(fetchUserInfoApi({ accessToken }));
      dispatch(fetchUserResumeApi({ accessToken }));
    }

    return () => queries.disconnect();
  }, [accessToken]);

  return (
    <Wrapper>
      <Header />
      <Content />
      <Footer />
    </Wrapper>
  );
};

export default App;
