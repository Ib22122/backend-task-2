const request = require('request')
const forecast = (country, callback) => {
    const url = "https://api.weatherapi.com/v1/current.json?key=06090e5257de47c3b2960520241803&q=" + country
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect weather service', undefined)
        }
        else if (response.body.error) {
            callback(response.body.error.message, undefined)
        }
        else {
            callback(undefined, {
                country: response.body.location.country,
                capital: response.body.location.name,
                lat: response.body.location.lat,
                lon: response.body.location.lon,
                weatherStatus: response.body.current.condition.text,
                temp: response.body.current.temp_c,
                icon : response.body.current.condition.icon,
            })
        }
    })
}
module.exports = forecast