// const express = require('express');
// const connectToMongo = require('./db'); // Corrected database connection import
// const app = express();
// const port = 5000;

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// app.use(express.json());

// // Connecting to MongoDB and loading food data
// connectToMongo().then(({ data, Catdata }) => {
//   global.foodData = data;
//   global.foodCategory = Catdata;

//   console.log("Food Data and Categories loaded");

//   // Routes
//   app.get('/', (req, res) => {
//     res.send('Hello World!');
//   });

//   // Use the routes after the data is loaded
//   app.use('/api', require('./Routes/CreateUser'));
//   app.use('/api', require('./Routes/DisplayData'));
//   app.use('/api', require('./Routes/OrderData')) // Corrected route path

//   app.listen(port, () => {
//     console.log(`Example app listening on http://localhost:${port}`);
//   });
// }).catch(err => {
//   console.error("Failed to connect to MongoDB or start server:", err);
// });



// global.foodData = require('./db')(function call(err, data, CatData) {
//   // console.log(data)
//   if(err) console.log(err);
//   global.foodData = data;
//   global.foodCategory = CatData;
// })

// const express = require('express')
// const app = express()
// const port = 5000
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
// app.use(express.json())

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.use('/api', require('./Routes/CreateUser'));
//   app.use('/api', require('./Routes/DisplayData'));
// app.use('/api', require('./Routes/OrderData')) // Corrected route path
// app.listen(port, () => {
//   console.log(`Example app listening on http://localhost:${port}`)
// })


const express = require('express');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 5000;

// Configure CORS
const corsOptions = {
    origin: 'http://localhost:3000', // Frontend's origin
    credentials: true, // Allow credentials (cookies, headers, etc.)
};

app.use(cors(corsOptions)); // Apply the CORS middleware with the options

app.use(express.json());

// Assuming your db connection and global variables are set here
global.foodData = require('./db')(function call(err, data, CatData) {
    if (err) console.log(err);
    global.foodData = data;
    global.foodCategory = CatData;
});

// Define your routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData')); // Corrected route path

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});


