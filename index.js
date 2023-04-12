// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Testando o new Date()
// app.get('/api/2015-12-25', (req, res) => {
  
//   // Pega a data desejada
//   const date = new Date('2015-12-25')
  
//   // Colocar no formato unix
//   const unixTimeStamp = date.getTime()
  
//   // Pega a string com UTC
//   const utcDateString = date.toUTCString();

//   // Renderizando
//   res.json({unix: unixTimeStamp + ' ', utc: utcDateString})
  
// })

app.get('/api/:date?', (req, res, next) => {
  // Pegando o valor da URL
  let date;
  if (req.params.date) {
    date = decodeURIComponent(req.params.date);
    
    // Verifica se na URL tem traço ou não
    if(date.includes('-') || date.includes(' ')) {
      date = new Date(date)
    } else {
      date = new Date(parseInt(date))
    }
  } else {
    date = new Date();
  }
  
  // Com essa data, transforma para unix e UTC
  let unixTimeStamp = date.getTime()
  let utcDataString = date.toUTCString()

  // Cria um objeto JSON
  let jsonObj = {
    unix: unixTimeStamp,
    utc: utcDataString
  }

  if(utcDataString == 'Invalid Date') {
    res.json({ error: "Invalid Date" })
  } else {
    res.json(jsonObj)
  }

  // Renderiza o JSON
  // res.json({ unix: unixTimeStamp, utc: utcDataString })
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
