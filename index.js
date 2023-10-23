<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <title>Random Cocktail Recipe</title>
    <style>

html {
    height: 100%;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-size: cover;
    font-family: sans-serif;
}

#overlay {
    background: rgba(147, 135, 242, 0.9);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}

#dataLocation {
    max-width: 350px;
    text-align: center;
    padding: 30px 30px 12px 30px;
    color: #fff;
    background-color: #7766d7;
    border: 4px solid #9387f2;
    border-radius: 5px;
}

#dataLocation h1 {
    margin: 0 0 15px 0;
    text-transform: uppercase;
}

#dataLocation img {
    max-width: 300px;
    border: 6px solid #fff;
    border-radius: 150px;
}

#dataLocation ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

#dataLocation li {
    padding: 15px 0;
    font-size: 18px;
}

#dataLocation li:not(:last-of-type) {
    border-bottom: 1px solid #fff;
}

    </style>
</head>

<body>
    <div id="dataLocation"></div>
    <div id="overlay"></div>

    <div id="demo"></div>
</body>


<script>
    const x = document.getElementById("demo");
    document.addEventListener("DOMContentLoaded", () => {
        return getLocation();
    })

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        let Latitude = position.coords.latitude;
        let Longtitude = position.coords.longitude;
        let locationMap = Latitude+","+Longtitude;
        let secretKey = " 202150eac70743c29e243350232310";
        let uri = "https://api.weatherapi.com/v1/current.json?key= " + secretKey + "&q="+locationMap+"&aqi=no";
        fetch(uri, {
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "GET"
            },
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("NETWORK RESPONSE ERROR");
            }
        })
        .then(data => {
            console.log(data);
            response(data)
        })
        .catch((error) => console.error("FETCH ERROR:", error));
    }
    

    function response(data) {
        const dataLocation = data.location;
        const dataCurrentLocation = data.current;
        const DataDiv = document.getElementById("dataLocation");
        //Location Time
        const locationTime = dataLocation.localtime;
        const heading1 = document.createElement("h1");
        heading1.innerHTML = locationTime;
        DataDiv.appendChild(heading1);
        // Location name
        const locationName = dataLocation.name;
        const heading = document.createElement("h1");
        heading.innerHTML = locationName;
        DataDiv.appendChild(heading);
        // Location image
        const imageWeather = document.createElement("img");
        imageWeather.src = "http:" + dataCurrentLocation.condition.icon;
        DataDiv.appendChild(imageWeather);
        //document.body.style.backgroundImage = "url('" + dataCurrentLocation.condition.icon + "')";
        // Text Condition
        const ConditionCurrent = dataCurrentLocation.condition.text;
        const heading3 = document.createElement("h1");
        heading3.innerHTML = ConditionCurrent;
        DataDiv.appendChild(heading3);
        // Text Condition
        const ConditionTemp = dataCurrentLocation.temp_c + "°";
        const heading4 = document.createElement("h1");
        heading4.innerHTML = ConditionTemp;
        DataDiv.appendChild(heading4);
    }
</script>

</html>