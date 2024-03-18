const express = require('express')
const app = express()

const port = process.env.PORT || 3000
const path = require("path")


const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))

app.set('view engine', 'hbs');

var hbs = require('hbs');
const partialsPath = path.join(__dirname, "../views/partials")
hbs.registerPartials(partialsPath)

app.get('/', (req, res) => {
    res.render('index', {
        title: "HOME",
        desc: "This is home page"
    })
})
app.get('/info', (req, res) => {
    res.render('info' , {title : "info page"})
})
const forecast = require('./forecastFile')

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }
    forecast(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error })
        }
        res.send(data)
    })
})

app.get('*', (req, res) => {
    res.send('404 Page Not Founded')
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})


