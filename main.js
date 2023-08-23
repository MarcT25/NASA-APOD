import  config  from "./config.js";

//fetch data from NASA API
async function getData() {

  const APIKey = config.accessKey;

  try{
    let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${APIKey}`);
    const data = await response.json();
    console.log(data);
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
}