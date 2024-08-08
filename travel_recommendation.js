const btnSearch = document.getElementById('search');
const btnClear = document.getElementById('clear');

function createItemDiv(content) {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item-result');
    itemDiv.innerHTML = content;
    return itemDiv;
}

function searchResults() {
    const input = document.getElementById('search-bar').value.toLowerCase().trim();
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let found = false;
            const resultFragment = document.createDocumentFragment(); // For appending multiple items efficiently

            // Map keywords to their respective data types
            const keywordMap = {
                'beach': 'beaches',
                'beaches': 'beaches',
                'temple': 'temples',
                'temples': 'temples',
                'country': 'countries',
                'countries': 'countries',
                'city': 'cities',
                'cities': 'cities'
            };

            // Determine the category based on the input keyword
            const category = keywordMap[input];

            if (category) {
                found = true;

                switch (category) {
                    case 'countries':
                        data.countries.forEach(country => {
                            country.cities.forEach(city => {
                                let content = '';
                                content += `<img src="${city.imageUrl}" alt="${city.name}">`;
                                content += `<h3><strong>${city.name}</strong></h3>`;
                                content += `<p>${city.description}</p>`;
                                resultFragment.appendChild(createItemDiv(content));
                            });
                        });
                        break;

                    case 'cities':
                        data.countries.forEach(country => {
                            country.cities.forEach(city => {
                                let content = '';
                                content += `<img src="${city.imageUrl}" alt="${city.name}">`;
                                content += `<h3><strong>${city.name}</strong></h3>`;
                                content += `<p>${city.description}</p>`;
                                resultFragment.appendChild(createItemDiv(content));
                            });
                        });
                        break;

                    case 'temples':
                        data.temples.forEach(temple => {
                            let content = '';
                            content += `<img src="${temple.imageUrl}" alt="${temple.name}">`;
                            content += `<h3><strong>${temple.name}</strong></h3>`;
                            content += `<p>${temple.description}</p>`;
                            resultFragment.appendChild(createItemDiv(content));
                        });
                        break;

                    case 'beaches':
                        data.beaches.forEach(beach => {
                            let content = '';
                            content += `<img src="${beach.imageUrl}" alt="${beach.name}">`;
                            content += `<h3><strong>${beach.name}</strong></h3>`;
                            content += `<p>${beach.description}</p>`;
                            resultFragment.appendChild(createItemDiv(content));
                        });
                        break;
                }
            } else {
                // If input doesn't match any keyword, search for specific names
                data.countries.forEach(country => {
                    if (country.name.toLowerCase().includes(input)) {
                        found = true;
                        country.cities.forEach(city => {
                            let content = '';
                            content += `<img src="${city.imageUrl}" alt="${city.name}">`;
                            content += `<h3><strong>${city.name}</strong></h3>`;
                            content += `<p>${city.description}</p>`;
                            resultFragment.appendChild(createItemDiv(content));
                        });
                    } else {
                        country.cities.forEach(city => {
                            if (city.name.toLowerCase().includes(input)) {
                                found = true;
                                let content = '';
                                content += `<img src="${city.imageUrl}" alt="${city.name}">`;
                                content += `<h3><strong>${city.name}</strong></h3>`;
                                content += `<p>${city.description}</p>`;
                                resultFragment.appendChild(createItemDiv(content));
                            }
                        });
                    }
                });

                data.temples.forEach(temple => {
                    if (temple.name.toLowerCase().includes(input)) {
                        found = true;
                        let content = '';
                        content += `<img src="${temple.imageUrl}" alt="${temple.name}">`;
                        content += `<h3><strong>${temple.name}</strong></h3>`;
                        content += `<p>${temple.description}</p>`;
                        resultFragment.appendChild(createItemDiv(content));
                    }
                });

                data.beaches.forEach(beach => {
                    if (beach.name.toLowerCase().includes(input)) {
                        found = true;
                        let content = '';
                        content += `<img src="${beach.imageUrl}" alt="${beach.name}">`;
                        content += `<h3><strong>${beach.name}</strong></h3>`;
                        content += `<p>${beach.description}</p>`;
                        resultFragment.appendChild(createItemDiv(content));
                    }
                });
            }

            // Append all results at once
            resultContainer.appendChild(resultFragment);

            // If no results found
            if (!found) {
                resultContainer.innerHTML = 'No results found for your search.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultContainer.innerHTML = 'An error occurred while fetching data.';
        });
}

btnSearch.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form from submitting
    searchResults();
});

btnClear.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form from submitting
    document.getElementById('search-bar').value = '';
    document.getElementById('result').innerHTML = '';
});