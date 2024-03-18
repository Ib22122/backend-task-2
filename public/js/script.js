
let form = document.getElementById('form1')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    weatherFun()
    form.reset()
})
const locations = document.getElementById('locations')
const country = document.getElementById('country')
const capital = document.getElementById('capital')
const icon = document.getElementById('icon')
const temp = document.getElementById('temp')
const witherState = document.getElementById('witherState')
const errorF = document.getElementById('error')


let weatherFun = async () => {
    try {
        const address = document.getElementById('address').value
        const res = await fetch('http://localhost:3000/weather?address=' + address)
        const data = await res.json()
        if (data.error) {
            locations.innerText = ''
            country.innerText = ''
            capital.innerText = ''
            icon.innerHTML = ''
            temp.innerHTML = ''
            witherState.innerText = ''

            errorF.innerText = data.error
        }
        else {
            locations.innerText = `${data.lon}° N, ${data.lat}° E`

            setTimeout(() => {
                country.innerText = `country : ${data.country}`
                capital.innerText = `capital : ${data.capital}`
            }, 1000)
            setTimeout(() => {
                icon.innerHTML = `<img src="${data.icon}">`
                witherState.innerText = data.weatherStatus
                temp.innerHTML = `${data.temp} <sup>°C</sup>`
            }, 2000)

            errorF.innerText = ''

        }
    }
    catch (e) {
        console.log(e)
    }
}