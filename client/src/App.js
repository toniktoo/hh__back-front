import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import queries from './api/index';
import { setAccessToken, setUserInfo } from './redux/actions/auth';
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

  /* Проверяем авторизовался ли user */
  useEffect(() => {
    try {
      axios({
        method: 'get',
        url: 'http://localhost:8080/auth-hh',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        if (res) {
          dispatch(setAccessToken({ accessToken: res.data.accessToken }));
          queries
            .getUserInfo({
              accessToken: res.data.accessToken,
            })
            .then((res) =>
              dispatch(setUserInfo({ userInfo: res, isAuth: true }))
            );
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <Wrapper>
      <Header />
      <Content />
      <Footer />
    </Wrapper>
  );
};

export default App;
