import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { sendUserResumeApi } from '../../../redux/actions/vacancies';

import { Button, Alert } from 'antd';

const Item = styled.div`
  display: flex;
  align-items: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const ItemMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: center;
  width: 260px;
  @media (max-width: 1400px) {
    width: 220px;
  }
`;

const ItemSidebar = styled.div`
  display: flex;
  align-items: center;
`;

const CompanyLink = styled.a`
  color: #6193e8;
  font-size: 14px;
  font-weight: 500;
  @media (max-width: 1400px) {
    font-size: 12px;
  }
`;

const SalaryText = styled.span`
  color: #86888c;
  font-size: 14px;
  font-weight: 500;
  @media (max-width: 1400px) {
    font-size: 12px;
  }
`;

const Title = styled.a`
  margin: 6px 0 0 6px;
  color: ${({ myColor }) => myColor};
  font-size: 20px;
  font-weight: 500;
  transition: 0.7s;

  &:hover {
    color: #1890ff;
  }

  @media (max-width: 1400px) {
    font-size: 14px;
    margin: 0 0 0 6px;
  }
`;

const ButtonSendResume = styled(Button)`
  display: none;
  margin: 6px 0 0 6px;
  @media (max-width: 1400px) {
    margin: 0;
  }
`;

export const Vacancy = ({ item }) => {
  const { activeResume, accessToken } = useSelector(
    (state) => state.reducerAuth
  );
  const dispatch = useDispatch();

  const handleSendResume = () => {
    dispatch(
      sendUserResumeApi({
        accessToken,
        vacancyId: item.id,
        resumeId: activeResume.id,
      })
    );
  };

  const handleEmptyData = (data, arg) => (data && data[arg]) || null;

  const renderSalary = (salary) => {
    let res = '';
    const salaryFrom = handleEmptyData(salary, 'from');
    const salaryTo = handleEmptyData(salary, 'to');
    const salaryCurrency = handleEmptyData(salary, 'currency');
    if (salaryFrom) {
      res += `от ${salaryFrom} `;
    }
    if (salaryTo) {
      res += `до ${salaryTo} `;
    }
    if (salaryCurrency) {
      res += `${salaryCurrency}`;
    }
    return res === '' ? 'Не указана' : res;
  };

  const renderCompany = (item) => {
    let company = null;
    company = handleEmptyData(item, 'name');
    if (company === null) {
      return 'Не указана';
    }
    return company && company.length > 19
      ? company.slice(0, 19) + '...'
      : company;
  };

  const renderRelations = (relations) => {
    if (relations === 'got_invitation')
      return { name: ' - Пригласили', color: '#21c10e' };
    if (relations === 'got_response')
      return { name: ' - Откликались', color: '#115fd4' };
    if (relations === 'got_rejection')
      return { name: ' - Отказ', color: 'red' };
    return { name: '', color: '#000' };
  };

  const relations = item.relations;

  return (
    <Item>
      <ItemMain>
        <ButtonSendResume
          className="btn__send_resume"
          onClick={handleSendResume}
          disabled={!!(relations && relations[0])}
        >
          Отправить резюме
        </ButtonSendResume>
        <Title
          myColor={relations && renderRelations(relations[0]).color}
          href={`https://spb.hh.ru/vacancy/${item.id}`}
          target="_blank"
        >
          {item.name.length > 44 ? item.name.slice(0, 44) + '...' : item.name}
          {relations && renderRelations(relations[0]).name}
        </Title>
      </ItemMain>
      <ItemSidebar>
        <ItemInfo>
          <SalaryText>Зарплата: {renderSalary(item.salary)}</SalaryText>
          <CompanyLink
            href={handleEmptyData(item.employer, 'alternate_url')}
            target="_blank"
          >
            Компания: {renderCompany(item.employer)}
          </CompanyLink>
        </ItemInfo>
      </ItemSidebar>
    </Item>
  );
};
