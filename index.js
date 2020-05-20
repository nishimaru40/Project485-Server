// index.js -- server side 

import express from 'express';
const app = express();
const port = 4000;

// entry route for root / request
app.get('/', (req, res) => {
    res.end("Hello World Test");
})

// make server start listening on a specified port
app.listen(port, () => console.log(`Server started at port ${port}`));
