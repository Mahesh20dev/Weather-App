window.addEventListener("load", () => {
    let lon;
    let lat;
    let APIkey = '22fa4960074d9b2b826423321fa1ff3f';
    let temparatureDescription = document.querySelector(".temparature-description");
    let temparatureDegree = document.querySelector(".temparature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temparaturesection = document.querySelector(".temparature");
    let temparaturespan = document.querySelector(".temparature span");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`;
            
            fetch(api)
                .then(Response => {
                    return Response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temp } = data.main;
                    const { description, icon } = data.weather[0];
                    
                    
                    temparatureDegree.textContent = (temp - 273.15).toFixed(2);
                    temparatureDescription.innerText = description;
                    locationTimezone.textContent = data.name;
    
                        
    
                        temparaturesection.addEventListener("click", () => {
                            if (temparaturespan.textContent === "C") {
                                temparaturespan.textContent = "K";
                                temparatureDegree.textContent = temp.toFixed(2);
                            } else if (temparaturespan.textContent === "K") {
                                temparaturespan.textContent = "F";
                                temparatureDegree.textContent = ((temp - 273.15) * 1.8 + 32).toFixed(2);
                            } else {
                                temparaturespan.textContent ="C";
                                temparatureDegree.textContent = (temp - 273.15).toFixed(2);
                            }
                        });
                           
    setIcons(icon, document.querySelector(".icon"));
                        
                    });
            });
        }
  
    




    // Function to fetch weather data by city name
    function getWeatherByCity(city) {
        const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;

        fetch(api)
          .then(Response => {
                return Response.json();
            })
          .then(data => {
                console.log(data);
                const { temp } = data.main;
                const { description, icon } = data.weather[0];

                // Update the DOM elements with the fetched weather data
                temparatureDegree.textContent = (temp - 273.15).toFixed(2);
                temparatureDescription.innerText = description;
                locationTimezone.textContent = data.name;

                // Add event listener to toggle temperature unit
                temparaturesection.addEventListener("click", () => {
                    if (temparaturespan.textContent === "C") {
                        temparaturespan.textContent = "K";
                        temparatureDegree.textContent = temp.toFixed(2);
                    } else if (temparaturespan.textContent === "K") {
                        temparaturespan.textContent = "F";
                        temparatureDegree.textContent = ((temp - 273.15) * 1.8 + 32).toFixed(2);
                    } else {
                        temparaturespan.textContent ="C";
                        temparatureDegree.textContent = (temp - 273.15).toFixed(2);
                    }
                });

                // Set the weather icon
                setIcons(icon, document.querySelector(".icon"));
            });
    }

    // Create input field and button for user interaction
    let cityInput = document.querySelector("input");
    // cityInput.type = "text";
    // cityInput.placeholder = "Enter city name";

    let cityButton = document.querySelector(".btn");
    // cityButton.textContent = "Get Weather";

    let currloc=document.querySelector(".btn1")

    cityButton.addEventListener("click", () => {
        let city = cityInput.value;
        getWeatherByCity(city);
        cityInput.value = "";
    });

    currloc.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                lon = position.coords.longitude;
                lat = position.coords.latitude;

                const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`;
                
                fetch(api)
                    .then(Response => {
                        return Response.json();
                    })
                    .then(data => {
                        console.log(data);
                        const { temp } = data.main;
                        const { description, icon } = data.weather[0];
                        
                        
                        temparatureDegree.textContent = (temp - 273.15).toFixed(2);
                        temparatureDescription.innerText = description;
                        locationTimezone.textContent = data.name;
        
                            
        
                            temparaturesection.addEventListener("click", () => {
                                if (temparaturespan.textContent === "C") {
                                    temparaturespan.textContent = "K";
                                    temparatureDegree.textContent = temp.toFixed(2);
                                } else if (temparaturespan.textContent === "K") {
                                    temparaturespan.textContent = "F";
                                    temparatureDegree.textContent = ((temp - 273.15) * 1.8 + 32).toFixed(2);
                                } else {
                                    temparaturespan.textContent ="C";
                                    temparatureDegree.textContent = (temp - 273.15).toFixed(2);
                                }
                            });
                               
        setIcons(icon, document.querySelector(".icon"));
                            
                        });
                });
            }
      
        

    })

    // document.body.appendChild(cityInput);
    // document.body.appendChild(cityButton);

    // Function to set the weather icon based on the provided icon code
    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "black" });
        const iconMapping = {
            // Add mapping for different weather icons
            "01d": Skycons.CLEAR_DAY,
                    "01n": Skycons.CLEAR_NIGHT,
                    "02d": Skycons.PARTLY_CLOUDY_DAY,
                    "02n": Skycons.PARTLY_CLOUDY_NIGHT,
                    "03d": Skycons.CLOUDY,
                    "03n": Skycons.CLOUDY,
                    "04d": Skycons.CLOUDY,
                    "04n": Skycons.CLOUDY,
                    "09d": Skycons.RAIN,
                    "09n": Skycons.RAIN,
                    "10d": Skycons.RAIN,
                    "10n": Skycons.RAIN,
                    "11d": Skycons.SLEET,
                    "11n": Skycons.SLEET,
                    "13d": Skycons.SNOW,
                    "13n": Skycons.SNOW,
                    "50d": Skycons.FOG,
                    "50n": Skycons.FOG
        };

        skycons.add("icon", iconMapping[icon]);
        skycons.play();
        skycons.set(iconID, iconMapping[icon]);
    }
});