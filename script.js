const temperatureField = document.querySelector(".temp p");
const locationField = document.querySelector(".time_location h1");
const dateandtimefield = document.querySelector(".time_location p");
const conditionfield = document.querySelector(".condition h6");
const searchField = document.querySelector(".search_area input");
const form = document.querySelector("form");

let target = "tumakuru";

form.addEventListener("submit", searchForLocation);

async function fetchResults(targetlocation) {
    try {
        let url = `https://api.weatherapi.com/v1/current.json?key=fa20528f7b71404d8a3154152252312&q=${targetlocation}&aqi=no`;

        const res = await fetch(url);
        const data = await res.json();

        let locationName = data.location.name;
        let time = data.location.localtime;
        let temp = data.current.temp_c;
        let condition = data.current.condition.text;

        updateDetails(temp, locationName, time, condition);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function updateDetails(temp, locationName, time, condition) {
    let splitDate = time.split(" ")[0];
    let splitTime = time.split(" ")[1];
    let currentDay = getDayName(new Date(splitDate).getDay());

    temperatureField.innerText = temp;
    locationField.innerText = locationName;
    dateandtimefield.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    conditionfield.innerText = condition;
}

function searchForLocation(e) {
    e.preventDefault();
    target = searchField.value.trim();
    if (target !== "") {
        fetchResults(target);
    }
}

fetchResults(target);

function getDayName(number) {
    switch (number) {
        case 0: return "Sunday";
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday";
    }
}
