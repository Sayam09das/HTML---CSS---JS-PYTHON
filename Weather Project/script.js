const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

search.addEventListener('click', () => {
    const APIKey = '606c6a0fa3b9466d0fb215cacbb83247';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.humidity .info-humidity span');
            const wind = document.querySelector('.wind .info-wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdkWmVT5ognPMscRiC2wEaZXjoIMRhjhs5ClsseQwRzg&s';
                    break;
                case 'Rain':
                    image.src = 'https://t4.ftcdn.net/jpg/04/37/44/91/360_F_437449197_IDoojJnXvjykOgHtGcdQZIoAOzpsAeXI.jpg';
                    break;
                case 'Snow':
                    image.src = 'https://cdn-icons-png.flaticon.com/512/6221/6221304.png';
                    break;
                case 'Clouds':
                    image.src = 'https://cdn.iconscout.com/icon/free/png-256/free-cloudy-weather-11-1147979.png';
                    break;
                case 'Mist':
                    image.src = 'https://thumbs.dreamstime.com/b/blue-outlined-forecast-weather-app-icon-mist-white-background-167505595.jpg';
                    break;
                case 'Haze':
                    image.src = 'https://cdn-icons-png.flaticon.com/512/1779/1779862.png';
                    break;
                default:
                    image.src = 'https://cdn-icons-png.freepik.com/512/7133/7133364.png';
                    break;
            }

            temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${Math.round(json.wind.speed)} Km/h`;

            weatherBox.style.display = 'block';
            weatherDetails.style.display = 'flex';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Failed to fetch weather data. Please try again later.');
        });
});
