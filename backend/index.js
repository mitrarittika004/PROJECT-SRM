const express =require ("express");
const cors = require("cors");
//create a instance of express
const app =express();
//use middleware such as cors and json parsing
app.use(cors());
app.use(express.json());
//include the main router for handling requests
const mainRouter =require("./routes/index");
app.use("/api/v1" , mainRouter);
//v1 requests  goes to mainRouter(index.js - inside routes folder)

const PORT =4000;

//start the server
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

//Error handling
app.on("error" , (err)=>{
    console.error(`error starting server: ${err.message}`);
});

