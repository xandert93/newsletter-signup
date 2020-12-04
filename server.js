const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/signup.html`);
});

app.post('/', (req, res) => {
  const { firstName, lastName, email } = req.body;
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const apiKey = 'bf536c915d3495b892a1b28d44e8c2e1-us7';
  const audienceID = '0dc71b4046';
  const dC = 'us7';

  const url = `https://${dC}.api.mailchimp.com/3.0/lists/${audienceID}`;
  const options = {
    method: 'POST',
    auth: `xandert93:${apiKey}`,
  };

  const request = https.request(url, options, (response) => {
    response.on('data', (data) => console.log(JSON.parse(data)));
    response.statusCode === 200
      ? res.redirect('/pages/success.html')
      : res.redirect('/pages/failure.html');
  });

  request.write(jsonData);
  request.end();
});

app.post('/failure', (req, res) => res.redirect('/'));

const port_number = server.listen(process.env.PORT || 3000);
app.listen(port_number);
