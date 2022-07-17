const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const docs = require('./docs');
const marketsRouter = require('./routes/markets');
const Moralis = require("moralis/node");
   
const app = express();
const PORT = process.env.PORT || 4000;

const serverUrl = "https://fbjp6fpn9cfk.usemoralis.com:2053/server";
const appId = "2eSJJLFJUsHxYjS0FyMA8YOYyqX44DOKinZkvf8E";

Moralis.start({ serverUrl, appId });

app.use(express.json());
app.use(cors());
app.use('/', marketsRouter);
app.use('/api/',swaggerUI.serve,swaggerUI.setup(docs));

async function initialize(){    
    app.listen(PORT);
};

initialize()
    .finally(
        () => console.log(`app started on port:${PORT}`)
    );
    