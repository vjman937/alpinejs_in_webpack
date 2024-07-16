'use strict';

const express = require('express');
const app = express();
const port = 3000;

//创建虚拟路径前缀
app.use('/', express.static('dist'));

app.get('/*', (req, res) => {
  //res.send('hello lklhj!');
  //console.log(__dirname);
  res.sendFile(__dirname + "/dist/" + "index.html");
});

app.listen(port, () => {
  console.log(`Express start on port ${port}`)
});