'use strict';

const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;

//允许跨域
app.use(cors({origin: '*'}));

//创建虚拟路径前缀
app.use('/static', express.static('dist'));

app.get('/', (req, res) => {
  //res.send('hello lklhj!');
  res.sendFile(__dirname + "/dist/" + "index.html");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});