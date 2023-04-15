const expr = require('express');
const https = require('https'); // native node module to make https request to another websites server
const bodyParser = require('body-parser');  // To extract data from users input

const app = expr();

app.use(bodyParser.urlencoded({ extended: true })); // Using bodyparser's urlencoded method

app.get("/", function (req, res) {  // Home route

    res.sendFile(__dirname + "/index.html");    // Sending index.html to home route

})

app.post("/", function (req, res) { // Accepting post request at home route

    const city = req.body.cityName; // Getting city name from users input using bodyParser
    const apid = "3f866c103be49230630750ee22bf0292";    // My api id
    const unit = "metric"   // celcius = metric

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apid + "&units=" + unit;  // API url

    https.get(url, function (response) {    // Making get request to openWeather's server
        console.log(response.statusCode);   // Printing Status Code of getting response

        response.on('data', function (data) {   // Data is actual response of API in hexadecimal form

            const weatherData = JSON.parse(data);   // Converting hexadecimal data into JSON format

            const temperature = weatherData.main.temp;  // getting temperature from JSON
            // console.log(temperature);

            const description = weatherData.weather[0].description  // getting temperature description from JSON
            // console.log(description);

            const iconId = weatherData.weather[0].icon;  // getting icon id from JSON
            const imageUrl = "http://openweathermap.org/img/wn/" + iconId + "@2x.png";

            // To send multiple responses we can use res.write() method
            res.write("<h1>Temperature of " + city + " is " + temperature + " celcius.</h1>");
            res.write("<p>Temperature Description : " + description + "</p>");
            res.write("<img src='" + imageUrl + "' alt='Weather Image'>")

            res.send();
        })

    })

})


app.listen(3000, function () {  // Listening to port 3000
    console.log("Server is running at port 3000");
})