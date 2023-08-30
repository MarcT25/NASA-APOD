import  config  from "./config.js";

const APIKey = config.accessKey;
//reference to datepicker in the html element
const datePicker = document.getElementById("datepicker");


//fetch data from NASA API
async function getData() {

  try{
    let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${APIKey}`);
    const data = await response.json();

    useData(data);

  } catch(error) {
    console.log(error);
  }
}

function useData(data) {
  document.getElementById("img-name").innerHTML = data.title;
  document.getElementById("image").src = data.url;
  document.getElementById("description").innerHTML = data.explanation;
}

//function to get current day date.
function currentDate() {
  var date = new Date();

  //toLocaleDateString returns a string of the current date in format of YYYY-MM-DD.
  document.getElementById("current-date").innerHTML = date.toLocaleDateString();
}

//returns random date
 function randomDate() {

  const startDate = new Date(1995,5,16); // Start date (year, month, day)
  const endDate = new Date(); // Current date

  const randomTimestamp = Math.random() * (endDate - startDate) + startDate.getTime();
  const randomDate = new Date(randomTimestamp);

  return randomDate.toISOString().slice(0,10);

}


window.onload = function() {
  getData();
  currentDate();

  document.getElementById("random").addEventListener("click", async () => {
    
    let date = randomDate();

    try{
      let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${APIKey}&date=${date}`);
      const data = await response.json();
  
      useData(data);
  
    } catch(error) {
      console.log(error);
    }

    document.getElementById("current-date").innerHTML = date.toLocaleDateString();

  });

  document.getElementById("datepicker").addEventListener("change", async () => {
    
    const day = datePicker.value;
    var date = new Date(day);

    try{
      let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${APIKey}&date=${day}`);
  
      const data = await response.json();
  
      useData(data);
  
    } catch(error) {
      console.log(error);
    }
    document.getElementById("current-date").innerHTML = date.toLocaleDateString();
  });
}