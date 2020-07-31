const express = require("express");
const path = require("path"); 
const app = express();
const port = 80;
// Above lines are must required 
// npm install pug 
// npm install express 


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())
app.use(express.urlencoded({ extended: true}))

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 // Set the views directory(views is a folder from which we were fetching our data)


// ENDPOINTS
app.get('/', (req, res)=>{ 
    const params = { }
    res.status(200).render('index.pug', params);
})

// START THE SERVER
// Downwards lines are must required 
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});