import axios from 'axios';
import { message } from 'antd';

class Queries {
  constructor() {
    this.base_url = 'https://api.hh.ru';
    axios.interceptors.response.use(this.handleSuccess, this.handleError);
  }

  handleSuccess = (response) => {
    return response;
  };

  handleError = (error) => {
    if (error.message === 'Network Error' && !error.response) {
      message.error('Сетевая ошибка');
    }

    if (error.message === 'Request failed with status code 500') {
      message.error('Сервер не отвечает');
    }
  };
  /* Получение всех вакансий с краткой информ. */
  getVacancies = async ({
    textSearch = '',
    areaId = 1,
    countVacancies,
    currentPage = 1,
    experience = '',
  }) => {
    const query = `text=${textSearch}&area=${areaId}&per_page=${countVacancies}&page=${
      currentPage - 1
    }${experience}`;

    const res = await axios.get(`${this.base_url}/vacancies?${query}`);
    return res.data;
  };
  /* Получение одной вакансии с полной информ. */
  getVacancy = async ({ id }) => {
    const res = await axios.get(`${this.base_url}/vacancies/${id}`);
    return res.data;
  };

  getUserInfo = async ({ accessToken }) => {
    const res = await axios({
      method: 'get',
      url: 'https://api.hh.ru/me',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  };
}

export default new Queries();
