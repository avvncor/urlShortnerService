const express = require('express');
const app = express();
const connectDB = require('./config/db');
const bodyParser = require('body-parser')

connectDB();
app.use(express.json({extended:false}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine','ejs')
app.set('views','views')

app.use('/', require('./routes/index'));
app.use('/api/url/', require('./routes/url'));


// const PORT = process.env.PORT || 5000;
const PORT =  5000;
app.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`)
});