var con=require('./connection');
const multer=require('multer');
const express = require('express');
const path = require('path')

const app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));


// Assuming "style.css" is in the same directory as "app.js"
app.use(express.static(__dirname));

const baseURL = 'http://localhost:3000/imagesuploaded/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, 'imagesuploaded');
    },

    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});


const upload=multer({storage: storage})

// Your database credentials


// Assuming you have already set up your express app and MySQL connection

// Define a route for the read page
app.get('/participant/:id', function (req, res) {
    var participantId = req.params.id; // Get the participant ID from the URL
  
    // Fetch participant data from the database using the participantId
    con.query('SELECT * FROM CHILD WHERE id = ?', [participantId], function (error, results) {
      if (error) throw error;
  
      if (results.length === 0) {
        // If no participant with the given ID is found, handle the error appropriately
        return res.status(404).send('Participant not found');
      }
  
      var participant = results[0];
  
      // Render the read page with the participant data
      res.render('read-page', { participant: participant });
    });
  });
  
























// Define your routes here


app.get('/', function(req, res){
    res.sendFile(__dirname+ '/index.html');
});

const port = 3000; // You can choose any available port

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});




// defining the routes and logic for handling HTTP requests from your website.

var bodyParse=require('body-parser');

app.use(bodyParse.json());

app.use(bodyParse.urlencoded({extended:true}));


app.post('/', upload.single("image") ,function(req, res){
   var name=req.body.name;
   var mno=req.body.mno;
   var email=req.body.email;
   var imagePath = baseURL + req.file.filename;

   con.connect(function(error){
    if(error) throw error;

    var sql = `INSERT INTO CHILD (name, mno, email, image_url) VALUES ('${name}', '${mno}', '${email}', '${imagePath}')`;

    con.query(sql, function(error, result){
        if(error) throw error;
        // res.send('participant registration successgul'+result.insertId);
        var participantId = result.insertId;
        // Redirect to the read page with the participant ID
        res.redirect('/participant/' + participantId);
    });

   });
});

