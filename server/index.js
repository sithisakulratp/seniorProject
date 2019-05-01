const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname will resolve to the folder of the file
});

app.get('/api', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/demographics', (req, res) => {
  res.sendFile(path.join(__dirname+'/demographics.html'))
});

app.get('/intersectionality', (req, res) => {
  res.sendFile(path.join(__dirname+'/intersectionality.html'))
});

app.get('/comparison', (req, res) => {
  res.sendFile(path.join(__dirname+'/comparison.html'))
});

app.get('/mediaDiscrimination', (req, res) => {
  res.sendFile(path.join(__dirname+'/mediaDiscrimination.html'))
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname+'/about.html'))
});

// router.get('/piechart', (req, res) => {
//   res.sendFile(path.join(__dirname+'/piechart.html'))
// });

app.use('/static', express.static(path.join(__dirname, 'public')));
// store all html files in view folder
app.use(express.static(__dirname + '/View'));
// store all js and css files in scripts folder
app.use(express.static(__dirname + '/Script'));

// app.use('/', router);
app.listen()
