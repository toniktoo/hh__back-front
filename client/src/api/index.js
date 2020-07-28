import axios from 'axios';
import { message } from 'antd';

// TODO НУЖНО ДОБАВИТЬ ИНТЕРЦЕПТОРС ДЛЯ ОТПРВКИ accessToken

class Queries {
  constructor() {
    this.url_api_hh = 'https://api.hh.ru';
    this.url_backend = 'http://localhost:8080';
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
    const res = await axios.get(`${this.url_api_hh}/vacancies?${query}`);
    return res.data;
  };
  getTokenBackend = async () => {
    const res = await axios({
      method: 'get',
      url: `${this.url_backend}/auth-hh`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };
  /* Получение одной вакансии с полной информ. */
  getVacancy = async ({ id, accessToken }) => {
    let res;

    if (accessToken !== null) {
      res = await axios({
        method: 'get',
        url: `${this.url_api_hh}/vacancies/${id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res.data;
    }
    res = await axios({
      method: 'get',
      url: `${this.url_api_hh}/vacancies/${id}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  getUserInfo = async ({ accessToken }) => {
    let res;
    if (accessToken !== null) {
      res = await axios({
        method: 'get',
        url: `${this.url_api_hh}/me`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res.data;
    }
    res = await axios({
      method: 'get',
      url: `${this.url_api_hh}/me`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  getUserResume = async ({ accessToken }) => {
    let res;

    if (accessToken !== null) {
      res = await axios({
        method: 'get',
        url: `${this.url_api_hh}/resumes/mine`,

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res.data;
    }
    res = await axios({
      method: 'get',
      url: `${this.url_api_hh}/resumes/mine`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  };

  sendResume = async ({ accessToken, vacancyId, resumeId }) => {
    const query = `vacancy_id=${vacancyId}&resume_id=${resumeId}`;
    let res;

    if (accessToken !== null) {
      res = await axios({
        method: 'post',
        url: `${this.url_api_hh}/negotiations?${query}`,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res.data;
    }

    res = await axios({
      method: 'post',
      url: `${this.url_api_hh}/negotiations?${query}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res;
  };

  disconnect = async () => {
    await axios({
      method: 'get',
      url: `${this.url_backend}/disconnect`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
}

export default new Queries();
