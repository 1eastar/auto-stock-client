const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const path = require('path')

app.engine('html', require('ejs').renderFile);
app.set('view engine','ejs');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.render(path.join(__dirname, '../build/index.html'))
})

app.use('/', express.static(path.join(__dirname, '../build')))

app.use('/api', (req, res, next) => res.json({username:'bryan'}));

app.listen(port)