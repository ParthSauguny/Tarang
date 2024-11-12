const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());

app.listen(PORT , () => console.log("server started at Port" , PORT));