const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
require('dotenv').config()
const PORT = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors({
    origin: 'https://portfolio-frontend-nav.netlify.app',
    credentials: true
}));
const connectToDB = require('./services/db');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'portfolio-backend','uploads')));
app.use(morgan('dev'));

app.use('/login', require('./routers/loginRouter'));
app.use('/admin',require('./routers/adminRouter'));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../portfolio/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../portfolio/dist", "index.html"));
  });
}

connectToDB()
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
    })
    .catch(err => {
        console.error("DB connection failed:", err);
    });