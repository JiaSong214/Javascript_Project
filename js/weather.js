const weather = (() => {
  const Model = (() => {
    const getAPI = (lat, long) => {
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/7ff1d3031ba1062de2c45088705b5786/${lat},${long}`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          Controller.renderScreen(data);
        });
    };

    return {
      getAPI,
    };
  })();

  const View = {
    setBackground: function (icon) {
      const weather = document.querySelector('#weather');
      switch (icon) {
        case 'clear-day':
          weather.style.backgroundImage = 'linear-gradient(#95c2db, #65a3c4)';
          break;
        case 'rain':
        case 'wind':
        case 'cloudy':
        case 'partly-cloudy-day':
        case 'fog':
          weather.style.backgroundImage = 'linear-gradient(#7a8a9a, #515c68)';
          break;
        case 'snow':
        case 'sleet':
          weather.style.backgroundImage = 'linear-gradient(#87929d, #91a8be)';
          break;
        case 'clear-night':
        case 'partly-cloudy-night':
          weather.style.backgroundImage = 'linear-gradient(#0f122b, #1e223f)';
          break;
      }
    },
    setDay: function () {
      const weeklyDay = document.querySelectorAll('.weather__weekly__day');

      for (i = 0; i < weeklyDay.length; i++) {
        const today = new Date();
        const dayNames = [
          'SUN',
          'MON',
          'TUE',
          'WED',
          'THU',
          'FRI',
          'SAT',
          'SUN',
          'MON',
          'TUE',
          'WED',
          'THU',
          'FRI',
        ];

        weeklyDay[i].textContent = dayNames[today.getDay() + i + 1];
      }
    },
    setWeeklyIcon: function (data) {
      const weeklyIcon = document.querySelectorAll('.weather__weekly__icon');

      for (i = 0; i < weeklyIcon.length; i++) {
        weeklyIcon[i].style.background = `url('img/${
          data.daily.data[i + 1].icon
        }.png') no-repeat center top`;
        weeklyIcon[i].style.backgroundSize = '25px';
      }
    },
    setTemperature: function (data) {
      const temperature = document.querySelector('.weather__temperature');
      const currentCelsius = Math.round(
        ((data.currently.temperature - 32) * 5) / 9,
      );
      temperature.textContent = currentCelsius;
    },
    setTimezone: function (data) {
      const timezone = document.querySelector('.weather__timezone');
      const countryCity = data.timezone.split('/');
      timezone.textContent = countryCity[1];
    },
    setSummary: function (data) {
      const summary = document.querySelector('.weather__summary');
      summary.textContent = data.currently.summary;
    },
  };

  const Controller = (() => {
    //if user allowed access to location, get weather Api from Model
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          let lat = position.coords.latitude;
          let long = position.coords.longitude;

          Model.getAPI(lat, long);
        });
      } else {
        console.log('fail to get current location');
      }
    };

    const renderScreen = (data) => {
      View.setBackground(data.currently.icon);
      View.setDay();
      View.setWeeklyIcon(data);
      View.setTimezone(data);
      View.setTemperature(data);
      View.setSummary(data);
    };
    return {
      getLocation,
      renderScreen,
    };
  })();

  Controller.getLocation();
})();
