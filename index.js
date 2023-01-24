const express = require('express');
const app = express();
const { sequelize } = require('./models');
const router = require('./routes');
const port = process.env.PORT || 3000;
const cors = require('cors');

// const morgan = require("morgan");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(
//   morgan(":method :url :status :res[content-length] - :response-time ms")
// );
app.use(router);

app.listen(port, async function () {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return console.log(`listening on port ${port}`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
