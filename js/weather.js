window.addEventListener('load', ()=> {
    
    const weather = document.querySelector(".weather");
    const temperature = document.querySelector('.weather-temperature');
    const timezone = document.querySelector('.weather-timezone');
    const summary = document.querySelector('.weather-summary');
    const weeklyDay = document.querySelectorAll(".weather-day");
    const weeklyIcon = document.querySelectorAll(".weather-icon");

    let long;
    let lat;
    
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

                    if(data.currently.icon == "clear-day"){
                        weather.style.backgroundImage= "linear-gradient(#95c2db, #65a3c4)";
                    }else if(data.currently.icon == "rain"|| data.currently.icon == "wind" || data.currently.icon == "cloudy" ||  data.currently.icon == "partly-cloudy-day" || data.currently.icon == "fog"){
                        weather.style.backgroundImage= "linear-gradient(#7a8a9a, #515c68)";
                    }else if(data.currently.icon == "snow" || data.currently.icon == "sleet"){
                        weather.style.backgroundImage= "linear-gradient(#87929d, #91a8be)";
                    }else if(data.currently.icon == "clear-night" || data.currently.icon == "partly-cloudy-night"){
                        weather.style.backgroundImage= "linear-gradient(#0f122b, #1e223f)";
                    }

                    for(i=0; i<weeklyDay.length; i++){
                        const today = new Date();
                        const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN", "MON", "TUE", "WED", "THU", "FRI"];
                        
                        weeklyDay[i].innerText = dayNames[today.getDay()+i+1];
                        weeklyIcon[i].style.background = "url('img/"+data.daily.data[i+1].icon+".png') no-repeat center top";
                        weeklyIcon[i].style.backgroundSize = "25px";
                    }
                });
        });
    }else{
        document.querySelector('.summary').innerText = "Can't use your location information.";
    }

}); 