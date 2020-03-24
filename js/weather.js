window.addEventListener('load', ()=> {
    
    let long;
    let lat;
    const temperature = document.querySelector('.temperature');
    const timezone = document.querySelector('.timezone');
    const summary = document.querySelector('.summary');

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/7ff1d3031ba1062de2c45088705b5786/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    //set DOM elements from the API
                    const currentCelsius = Math.round((data.currently.temperature-32)*5/9);
                    const countryCity = data.timezone.split("/");

                    timezone.innerText = countryCity[1];
                    summary.innerText = data.currently.summary;
                    temperature.innerText = currentCelsius;

                    const weather = document.querySelector(".weather");
                    const background = document.querySelector(".weather");
                    const icon = document.querySelector(".icon");
                    if(data.currently.icon == "clear-day"){
                        weather.style.color = "black";
                        background.style.backgroundColor= "rgb(242,228,140)";
                        icon.style.backgroundImage= "url('img/sun.png')";
                    }else if(data.currently.icon == "rain"){
                        background.style.backgroundColor= "rgb(130, 130, 130)";
                        icon.style.backgroundImage= "url('img/rain.png')";
                    }else if(data.currently.icon == "snow" || data.currently.icon == "sleet"){
                        weather.style.color = "black";
                        background.style.backgroundColor = "rgb(215,215,215)";
                        icon.style.backgroundImage= "url('img/snowflake.png')";
                    }else if(data.currently.icon == "wind" || data.currently.icon == "cloudy" ||  data.currently.icon == "partly-cloudy-day" || data.currently.icon == "fog"){
                        background.style.backgroundColor= "rgb(117, 117, 117)";
                        icon.style.backgroundImage= "url('img/cloud.png')";
                    }else if(data.currently.icon == "clear-night" || data.currently.icon == "partly-cloudy-night"){
                        background.style.backgroundColor= "rgb(13, 0, 97)";
                        icon.style.backgroundImage= "url('img/night.png')";
                    }
                });
        });
    }else{
        document.querySelector('.summary').innerText = "Can't use your location information.";
    }

}); 