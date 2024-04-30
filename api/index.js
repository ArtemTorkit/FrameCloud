const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser")
    
// Load environment variables from .env file
dotenv.config();

const app = express()

// Simplified CORS configuration
const corsOptions = {
    origin: 'https://coruscating-cupcake-f1e86a.netlify.app',
    methods: ['GET', 'POST'],
    credentials: true,
};

// Use the cors middleware with the specified options
app.use(cors(corsOptions));
app.use(express.json({ limit: '30mb'}))
app.use(cookieParser())

//add auth route
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes); 

//add auth route
const postRoutes = require('./routes/post');
app.use('/post', postRoutes);

//add user route
const userRoutes = require('./routes/user');
app.use('/user', userRoutes);

//add postFetching route
const postFetchingRoutes = require('./routes/postFetching');
app.use('/post-fetching', postFetchingRoutes);

app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
        "https://coruscating-cupcake-f1e86a.netlify.app"
        //"http://localhost:5173"
    )
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    )
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST"
    )
})

app.listen(5000, () => {
    console.log('server is listening on port 5000...')
})
