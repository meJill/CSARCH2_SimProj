const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fs = require('fs');

app = express()
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));

app.listen(8000, () => {
    console.log("Server started on port 8000");
});

// Route handler for generating and sending the text file as a download
app.get('/download', async function (req, res) {
  // Dynamic data to include in the text file
  const users = [
    { name: 'John Doe', age: 30 },
    { name: 'Jane Smith', age: 25 },
    { name: 'Bob Brown', age: 35 }
  ];

  // Render the EJS template with the dynamic data
  res.render('download', { users }, function (err, html) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      // Set the appropriate headers for a text file download
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Disposition', 'attachment; filename="test.txt"');
      
      // Send the rendered HTML as the text file content  
      res.send(html);
    }
  });
});



// bsa/mru routes
app.use('/', async function (req, res) {
    res.render('index');
  });

app.use('/simulate', async function (req, res) {
    res.render('index');
  });