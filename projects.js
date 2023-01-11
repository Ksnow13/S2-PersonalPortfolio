//--------------------------------------------------------------------------------

// function to grab the current bitcoin value from an api

document
  .querySelector("#output-1-value")
  .addEventListener("click", getCurrentValue);

window.addEventListener("DOMContentLoaded", getCurrentValue);

function getCurrentValue(e) {
  message();

  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.coindesk.com/v1/bpi/currentprice.json");

  xhr.onload = function () {
    if (this.status === 200) {
      let response = JSON.parse(this.responseText);

      setTimeout(() => {
        updateValue(response);
      }, 5000);

      document.querySelector(
        "#output-1"
      ).innerHTML = `<strong>Date: ${response.time.updated} <br> Current Bitcoin values: <span id="amount">${response.bpi.USD.rate}</span> (USD)`;
    }
  };

  xhr.send();
  e.preventDefault();
}

// making fucntion to create and remove a status message

function message() {
  document.querySelector("#output-1-message").innerHTML =
    "<strong> &nbsp; Your all up to date !</strong>";

  setTimeout(() => {
    document.querySelector("#output-1-message").innerHTML = "";
  }, 3000);
}

// making the updateValue function

function updateValue(newValue) {
  setInterval(() => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.coindesk.com/v1/bpi/currentprice.json");

    xhr.onload = function () {
      let newValue = JSON.parse(this.responseText);
      document.querySelector(
        "#output-1"
      ).innerHTML = `<strong>Date: ${newValue.time.updated} <br> Current Bitcoin values: <span id="amount">${newValue.bpi.USD.rate}</span> (USD)`;
    };

    xhr.send();
  }, 60 * 1000);
}

// --------------------------------------------------------------------------------------------------------------------

// function to get random joke from an api

document.querySelector("#get-r-joke").addEventListener("click", getRandomJoke);

function getRandomJoke(e) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.chucknorris.io/jokes/random");

  xhr.onload = function () {
    if (this.status === 200) {
      let response = JSON.parse(this.responseText);
      document.querySelector(
        "#joke"
      ).innerHTML = `<strong>${response.value}</strong>`;
    }
  };

  xhr.send();
  e.preventDefault();
}

// show all categories

document.querySelector("#get-cate").addEventListener("click", getCate);

function getCate(e) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.chucknorris.io/jokes/categories");

  xhr.onload = function () {
    if (this.status === 200) {
      let response = JSON.parse(this.responseText);

      console.log(response);

      response.forEach((cate) => {
        output = "";

        output += `<ul><li><span id="output-2-btn" class="${cate}">${cate}</span></li></ul>`;

        document.querySelector("#cate").innerHTML += output;
      });
    }
  };

  xhr.send();
  e.preventDefault();
}

// show random joke from entered category

document.querySelector("#cate-texted").addEventListener("click", getCateJoke);

function getCateJoke(e) {
  var category = document.querySelector("#cateinput").value;

  console.log(category);

  let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://api.chucknorris.io/jokes/random?category=${category.toLowerCase()}`
  );

  xhr.onload = function () {
    if (this.status === 200) {
      let responses = JSON.parse(this.responseText);
      document.querySelector(
        "#catejoke"
      ).innerHTML = `<strong>${responses.value}</strong>`;
    } else {
      document.querySelector(
        "#catejoke"
      ).innerHTML = `<strong>Sorry, category not found.</strong>`;
    }
  };

  xhr.send();

  e.preventDefault();
}

//----------------------------------------------------------------------------------------------

// fuction to load list of dog breeds when the page gets loaded

window.addEventListener("DOMContentLoaded", getBreedNames);

function getBreedNames(e) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://dog.ceo/api/breeds/list/all");

  xhr.onload = function () {
    if (this.status === 200) {
      let response = JSON.parse(this.responseText);

      breedName = Object.keys(response.message);

      select = document.querySelector("#breeds");
      line = "";

      for (x of breedName) {
        line += `<option value="${x}">${x}</option>`;
      }

      select.innerHTML = line;
    }
  };

  xhr.send();
  e.preventDefault();
}

//---------------------------------------------------------------------------------------------------

// getting pictures and loading them to screen

submit = document.querySelector("#submit");

submit.addEventListener("click", showImages);

function showImages(e) {
  input = document.querySelector("#image-count");
  input = input.value;
  select = document.querySelector("#breeds");
  select = select.value;

  let xhr = new XMLHttpRequest();
  xhr.open("GET", `https://dog.ceo/api/breed/${select}/images/random/${input}`);

  xhr.onload = function () {
    if (this.status === 200) {
      let response = JSON.parse(this.responseText);
      images = response.message;

      var count = images.length;

      var output = "";

      images.forEach((pic) => {
        output += `<div class="demo"><i class="fa-solid fa-camera id="cam"></i><h5>${select.toUpperCase()}</h5> <img src = '${pic}' style = "border-radius:10%;" id="pic" /> </div>`;

        document.querySelector("#output").innerHTML = output;
      });

      if (input > count) {
        showMessage(
          `<i class="fa-solid fa-circle-exclamation"></i> Sorry, There are only ${count} pictures of a ${select}`,
          "warning"
        );
      }

      showMessage(
        `<i class="fa-solid fa-check"></i> Succesfully loaded ${count} picture(s) of a ${select}.`,
        "success"
      );
    } else {
      showMessage(
        ` <i class="fa-solid fa-bug"></i> Error - Images could not be found`,
        "error"
      );
    }
  };

  xhr.send();
  e.preventDefault();
}

// function for notification messages

function showMessage(message, c) {
  var notifacation = document.querySelector("#notify");
  var div = document.createElement("div");

  div.className = c;
  div.id = "message-box";

  notifacation.appendChild(div);

  div.innerHTML = `<strong>${message}</strong>`;

  setTimeout(function () {
    document.querySelector("#message-box").remove();
  }, 4000);
}
