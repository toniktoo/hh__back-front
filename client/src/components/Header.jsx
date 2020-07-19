import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { Divider } from 'antd';
import { HomeFilled } from '@ant-design/icons';

const Wrapper = styled.div`
  max-width: 100vw;
  height: 50px;
  display: flex;
  align-items: center;
`;

const LinkCustom = styled.a`
  & *:not(:last-child) {
    margin-right: 4px;
  }
`;

const LINK_LOGIN_HH =
  'https://hh.ru/oauth/authorize?response_type=code&client_id=VFV0TMH6A9FJQV8USEMPTMM98PGRTGI6KBIG6N820L25U937H6UMSVUOMQV3RF5D';

export const Header = () => {
  const { isAuth, userInfo } = useSelector((state) => state.reducerAuth);

  const renderUsername = () => {
    return isAuth ? (
      <span>
        {userInfo.first_name} {userInfo.last_name}
      </span>
    ) : (
      <LinkCustom href={LINK_LOGIN_HH}>
        <HomeFilled />
        <span>Sign in</span>
      </LinkCustom>
    );
  };

  return (
    <Wrapper>
      <Divider orientation="right">{renderUsername()}</Divider>
    </Wrapper>
  );
};
