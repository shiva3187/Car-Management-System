const express = require("express");
require('dotenv').config();
const cors = require("cors");
const database = require('./Database/mongodb');
var cookieParser = require('cookie-parser')

const app = express();

const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({ limit: '16kb' }));
app.use(cookieParser());
database.connect();


app.use(
	cors({
		
		// origin: "http://localhost:3000",
		origin: "*",
		credentials: true,
	})
);


// Setting up routes
const userRoute = require("./Router/userRoute");
app.use('/api/users', userRoute);

const addCar = require("./Router/addCar");
app.use('/api/car', addCar);



app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
});