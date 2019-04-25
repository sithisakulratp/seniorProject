const app = require('express')();
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname will resolve to the folder of the file
});

router.get('/api', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

router.get('/demographics', (req, res) => {
  res.sendFile(path.join(__dirname+'/demographics.html'))
});

router.get('/intersectionality', (req, res) => {
  res.sendFile(path.join(__dirname+'/intersectionality.html'))
});

router.get('/comparison', (req, res) => {
  res.sendFile(path.join(__dirname+'/comparison.html'))
});

router.get('/mediaDiscrimination', (req, res) => {
  res.sendFile(path.join(__dirname+'/mediaDiscrimination.html'))
});

router.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname+'/about.html'))
});

// router.get('/piechart', (req, res) => {
//   res.sendFile(path.join(__dirname+'/piechart.html'))
// });

// run wordCloud.js as static file
router.use('/static', express.static(path.join(__dirname + '/wordCloud.js')))
// store all html files in view folder
router.use(express.static(__dirname + '/View'));
// store all js and css files in scripts folder
router.use(express.static(__dirname + '/Script'));

app.use('/', router);
app.listen()
module.exports = app;
