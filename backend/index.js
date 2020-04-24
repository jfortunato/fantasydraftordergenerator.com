const cors = require('cors');
const express = require('express')
const app = express()
const port = 8000

const EspnFFL = require('./espn');

app.use(cors());
app.options('*', cors());

app.get('/', async (req, res) => {
    const username = req.query.username;
    const password = req.query.password;

    const espn = new EspnFFL();
    const results = await espn.getLeagues(username, password);

    return res.json(results);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
