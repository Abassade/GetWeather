const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = 'fdfcba1097622977925d52619997f5fb';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/weather', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/weather', function (req, res) {
  let city = req.body.city;

  // to input frm console we can import const argv = require('yargs').argv;  then say let city = argv.c || 'any';
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
     // console.log('body: ', body)
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let bodyJson = JSON.parse(body);
      let weather_content = JSON.parse(body);
      let { weather } = bodyJson;
      let { main } = weather[0]
      let { description } = weather[0]
      console.log('weather', weather);
      console.log('main', main);
      console.log('description', description);
      console.log('name', weather_content.name)
    
      if(weather == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `In ${weather_content.name} the main : ${main} and the description : ${description}`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(3000, function () {
console.log('Example app listening on port 3000!')
})