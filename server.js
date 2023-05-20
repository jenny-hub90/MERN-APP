const express = require('express');
const dotenv = require('dotenv')
dotenv.config();
const mongoose = require('mongoose');
const {notFound, errorHandler} = require('./middleware/errorMiddleware');
const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req,res) => res.send('Server is ready'));
app.use("/api/users", require('./routes/userRoutes'));
app.use(notFound);
app.use(errorHandler);


mongoose.connect(
    process.env.DBCONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true }
    ,).then(()=> console.log('connected to database')).
    catch((err)=> {console.error(err)});

app.listen(port, ()=> console.log(`Server is running on port ${port}`))