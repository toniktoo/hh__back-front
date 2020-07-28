const express = require('express');
const cors = require('cors');
const axios = require('axios');
// const uniq = require('lodash/uniq');

//  TODO ДОБАВИТЬ НОВОГО ПОЛЬЗОВАТЕЛЯ СОХРАНЯТЬ ПОД СВОИ ID в db

const config = require('./config');
const port = process.env.PORT || 8080;

const { clientID, clientSecret } = config;

const app = express();
const index = require('./routes/index');

app.use(cors());
app.use(index);

let db = {
  accessToken: null,
};
// const db2 = [{ idClient: null, accessToken: null }];

app.get('/headhunter', (req, res) => {
  const requestToken = req.query.code;
  axios({
    method: 'post',
    url: `https://hh.ru/oauth/token?grant_type=authorization_code&client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((response) => {
    const accessToken = response.data.access_token;
    db = {
      ...db,
      accessToken,
    };
    res.redirect('http://localhost:3000');
  });
});

app.get('/auth-hh', (req, res) => {
  const { accessToken } = db;
  if (accessToken) {
    res.status(200).json({ accessToken });
    return;
  }
  res.status(400).send('Вы не авторизированы');
});

app.get('/disconnect', (req, res) => {
  const { accessToken } = db;
  if (accessToken) {
    db = {
      accessToken: null,
    };
    res.status(200);
    return;
  }
  res.status(400).send('Вы не авторизированы');
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
