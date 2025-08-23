const express = require("express");
const app = express(); // create web server
// request handler
app.use((req,res)=>{
    res.send("Hello from the server");
})
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
