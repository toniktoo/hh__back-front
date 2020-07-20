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
    countItemsOnPage,
    currentPage = 1,
    experience = '',
    salary,
  }) => {
    const query = `text=${textSearch}&area=${areaId}&per_page=${countItemsOnPage}&page=${
      currentPage - 1
    }${experience}${salary}`;

    const res = await axios.get(`${this.base_url}/vacancies?${query}`);
    return res.data;
  };
  /* Получение одной вакансии с полной информ. */
  getVacancy = async ({ id }) => {
    const res = await axios.get(`${this.base_url}/vacancies/${id}`);
    return res.data;
  };

  getTokenBackend = async () => {
    const res = await axios({
      method: 'get',
      url: 'http://localhost:8080/auth-hh',
      headers: {
        'Content-Type': 'application/json',
      },
    });
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

  getUserResume = async ({ accessToken }) => {
    const res = await axios({
      method: 'get',
      url: 'https://api.hh.ru/resumes/mine',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  };

  sendResume = async ({ accessToken, vacancyId, resumeId }) => {
    const query = `vacancy_id=${vacancyId}&resume_id=${resumeId}`;

    const res = await axios({
      method: 'post',
      url: `${this.base_url}/negotiations?${query}`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  };
}

export default new Queries();
