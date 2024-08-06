const Search = document.getElementById('search');
const Clear = document.getElementById('clear');
const Book = document.getElementById('book');
const Submit = document.getElementById('submit');

function searchResults () {
    const input = document.getElementById('search-bar').value.toLowerCase();
    const 

    fetch('/travelRecommendation/travel_recommendation_api.json')
        .then((response) => response.json())
        .then((json) => console.log(json));