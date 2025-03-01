const base_Url = "https://api.tvmaze.com/shows";

function loadShows() {
    fetch(base_Url)
        .then(function(response) {
            if (!response.ok) throw new Error('Failed to fetch shows');
            return response.json();
        })
        .then(function(shows) {
            renderShowList(shows);
        })
        .catch(function(error) {
            console.error("Error loading shows:", error);
        });
}

function renderShowList(shows) {
    const showListContainer = document.getElementById('datas');
    const showDetailsContainer = document.getElementById('details-container');
    
    showListContainer.innerHTML = '';
    showDetailsContainer.style.display = 'none'; 

    shows.forEach(function(show) {
        const showCard = createShowCard(show);
        showListContainer.appendChild(showCard);
    });
}

function createShowCard(show) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('col-md-3');

    cardElement.innerHTML = `
        <div class="card" style="margin-top:30px;">
            <img src="${show.image?.medium}" class="card-img-top" alt="${show.name}">
            <div class="card-body">
                <h5 class="card-title">${show.name}</h5>
                <p class="card-text">${show.premiered}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">IMDB: ${show.rating.average}</li>
                <li class="list-group-item">Genres: ${show.genres.join(', ')}</li>
                <li class="list-group-item">Language: ${show.language}</li>
            </ul>
            <div class="buttonDiv">
                <button class="btn btn-primary" onclick="viewShowDetails(${show.id})">View Details</button>
                <button class="btn btn-success"><a href="${show.officialSite}" target="_blank" style="text-decoration: none; color: white;">Visit Website</a></button>
            </div>
        </div>
    `;
    return cardElement;
}

function loadShowDetails(showId) {
    fetch(`${apiUrl}/${showId}`)
        .then(function(response) {
            if (!response.ok) throw new Error('Failed to fetch show details');
            return response.json();
        })
        .then(function(show) {
            renderShowDetails(show);
        })
        .catch(function(error) {
            console.error("Error loading show details:", error);
        });
}

function renderShowDetails(show) {
    const showListContainer = document.getElementById('datas');
    const showDetailsContainer = document.getElementById('details-container');

    showListContainer.innerHTML = ''; 
    showDetailsContainer.style.display = 'block'; 

    showDetailsContainer.innerHTML = `
        <div class="detailsStyle">
            <div class="details-content">
                <img src="${show.image?.original}" alt="${show.name}">
                <div class="summaryStyle">
                    <h1>${show.name}</h1>
                    <p>${show.summary}</p>
                    <ul>
                        <li><strong>IMDB Rating: </strong>${show.rating.average}</li>
                        <li><strong>Language: </strong>${show.language}</li>
                        <li><strong>Genres: </strong>${show.genres.join(', ')}</li>
                        <li><strong>Premiered: </strong>${show.premiered}</li>
                        <li><strong>Ended: </strong>${show.ended}</li>
                    </ul>
                    <button class="btn btn-warning"><a href="${show.officialSite}" target="_blank" style="text-decoration: none; color: black;">View More</a></button>
                    <button class="btn btn-info" onclick="loadShows()">Back to List</button>
                </div>
            </div>
        </div>
    `;
}

window.onload = loadShows;

