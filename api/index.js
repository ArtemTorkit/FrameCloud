const express = require('express')
//const cors = require('cors')
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser")
    
// Load environment variables from .env file
dotenv.config();

const app = express()

// Simplified CORS configuration
app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
        "http://localhost:5173"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
    //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
    res.setHeader("Access-Control-Max-Age", 7200);

    next();
});


// Use the cors middleware with the specified options

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

app.listen(5000, () => {
    console.log('server is listening on port 5000...')
})
