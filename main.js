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


window.onload = function() {
  getData();
  currentDate();

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