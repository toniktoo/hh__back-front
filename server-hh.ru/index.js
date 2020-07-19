const express = require('express');
const cors = require('cors');
const axios = require('axios');

const config = require('./config');

const { clientID, clientSecret } = config;

const redirect_uri = 'http://localhost:8080/headhunter';

const app = express();
let db = {
  accessToken: null,
};

app.use(cors());

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

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
