const accessKey = "FLcgppNZlprQ23HGYvRS7fV33xuvitZ6roT4R3fJ3v8"; // The accessKey variable stores the API access key
const formEl = document.querySelector("form"); // Selects the first <form> element on the webpage
const searchInputEl = document.getElementById("search-input"); // Selects the element with the ID "search-input"
const searchResultsEl = document.querySelector(".search-results"); // Selects the first element with the class "search-results"
const showMoreButtonEl = document.getElementById("show-more-button"); // Selects the element with the ID "show-more-button"

let inputData = "";
let page = 1;
let inputValue;

async function searchImages() {
  inputData = inputValue;

  // The url variable is created using the Unsplash API endpoint, page number, search query, and access key
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url); // Make a GET request to the API endpoint
  const data = await response.json(); // The response data is converted to JSON format

  // If the current page is the first page, the searchResultsEl is cleared
  if (page == 1) {
    searchResultsEl.innerHTML = "";
  }

  const results = data.results; // The results variable stores the array of image search results from the API response

  // The map function is used to iterate over each image result and create the necessary HTML elements to display the image and its description
  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";

    const des = result.alt_description;
    const capitalized =  des.charAt(0).toUpperCase()  + des.slice(1);
    imageLink.textContent = capitalized;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);

    searchResultsEl.appendChild(imageWrapper);
  });

  page++; // Increment the page number for the next search

  if (page >= 1) {
    showMoreButtonEl.style.display = "block"; // If the page number is greater than or equal to 1, display the "Show More" button
  }
}

// Add an event listener to the form element for the "submit" event
formEl.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  page = 1; // Reset the page number to 1 and initiate the image search
  inputValue = searchInputEl.value;
  searchImages();
  searchInputEl.value = "";
});

// Add an event listener to the "Show More" button for the "click" event
showMoreButtonEl.addEventListener("click", () => {
  searchImages();
});
