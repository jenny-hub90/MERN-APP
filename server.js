const path = require('path');
const express = require('express');
const dotenv = require('dotenv')
dotenv.config();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const {notFound, errorHandler} = require('./middleware/errorMiddleware');
const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
  } else {
    app.get('/', (req, res) => {
      res.send('Server is ready');
    });
  }

app.use("/api/users", require('./routes/userRoutes'));
app.use(notFound);
app.use(errorHandler);


mongoose.connect(
    process.env.DBCONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true }
    ,).then(()=> console.log('connected to database')).
    catch((err)=> {console.error(err)});

app.listen(port, ()=> console.log(`Server is running on port ${port}`))