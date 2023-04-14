const express = require('express');
const expressLayouts = require('express-ejs-layouts');

app = express()
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));

app.listen(8000, () => {
    console.log("Server started on port 8000");
});

// bsa/mru routes
app.use('/', async function (req, res) {
    res.render('index');
  });

app.use('/simulate', async function (req, res) {
    res.render('index');
  });