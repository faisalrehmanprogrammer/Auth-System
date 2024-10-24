const express = require('express');
const db = require('./db.js');
const userRoutes = require('./routes/userRoutes.js');
const pingRouter = require('./routes/pingRouter.js');
const app = express();
const port = 3000;
app.use(express.json());

db.DataBase()

app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

app.use('/ping', pingRouter)
app.use('/user', userRoutes)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port} `)
})