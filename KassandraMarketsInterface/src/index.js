const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const docs = require('./docs');
const marketsRouter = require('./routes/markets');
   
const app = express();
const PORT = process.env.PORT || 4000;

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
    