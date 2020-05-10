//Neccessaire pour l'application 
const express = require('express')
const app = express()
var bodyParser = require('body-parser')

app.set('view engine', 'ejs');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


require('dotenv').config()
var router = express.Router();


//Connection à la bdd
var mongoose = require('mongoose');
console.log(process.env.lien)

mongoose.connect("mongodb://localhost/projet", {useNewUrlParser: true,useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connection :'));
db.once('open', function() {
  // we're connected!
  console.log("La connection a réuissit !")
});

controllers = require('./controllers/urls')

//Definition des routes 
app.get('/', function(req, res) {
    res.render('pages/index');
});


//Definition des routes api
app.get('/api/urls',controllers.url_get_all)
app.post('/api/urls/shortener',controllers.url_shortener)
app.get('/api/urls/:urlCode',controllers.url_get_one)

PORT = process.env.PORT || 5000
app.listen(PORT, function () {
  console.log(`L'application tourne sous le port ${PORT}`)
})
