const base_url = "https://api.tvmaze.com/shows";

function loadShows() {
    fetch(base_url)
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch shows');
            return response.json();
        })
        .then(shows => {
            renderShowList(shows.slice(0, 12));
        })
        .catch(error => console.error("Error loading shows:", error));
}

function renderShowList(shows) {
    const showListContainer = document.getElementById('datas');
    const showDetailsContainer = document.getElementById('details-container');
    
    showListContainer.innerHTML = '';
    showDetailsContainer.classList.add('d-none');

    shows.forEach(show => {
        const showCard = createShowCard(show);
        showListContainer.appendChild(showCard);
    });
}

function createShowCard(show) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('col');

    cardElement.innerHTML = `
        <div class="card shadow-sm">
            <img src="${show.image?.medium || 'https://via.placeholder.com/210x295'}" class="card-img-top" alt="${show.name}">
            <div class="card-body">
                <h5 class="card-title">${show.name}</h5>
                <p class="card-text">Premiere: ${show.premiered || 'N/A'}</p>
                <p class="card-text">IMDB Rating: ${show.rating?.average || 'N/A'}</p>
                <button class="btn btn-primary" onclick="loadShowDetails(${show.id})">Go to Details</button>
                <a href="${show.officialSite || '#'}" target="_blank" class="btn btn-success">Go to Website</a>
            </div>
        </div>
    `;
    return cardElement;
}

function loadShowDetails(showId) {
    fetch(`${base_url}/${showId}`)
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch show details');
            return response.json();
        })
        .then(show => {
            renderShowDetails(show);
        })
        .catch(error => console.error("Error loading show details:", error));
}

function renderShowDetails(show) {
    const showListContainer = document.getElementById('datas');
    const showDetailsContainer = document.getElementById('details-container');

    showListContainer.innerHTML = ''; 
    showDetailsContainer.classList.remove('d-none');

    showDetailsContainer.innerHTML = `
        <div class="details-container">
            <div class="details-content">
                <img src="${show.image?.original || 'https://via.placeholder.com/300x450'}" alt="${show.name}">
                <div class="summaryStyle">
                    <h1>${show.name}</h1>
                    <p>${show.summary || 'No summary available'}</p>
                    <ul>
                        <li><strong>IMDB Rating: </strong>${show.rating?.average || 'N/A'}</li>
                        <li><strong>Language: </strong>${show.language || 'N/A'}</li>
                        <li><strong>Genres: </strong>${show.genres?.join(', ') || 'N/A'}</li>
                        <li><strong>Premiered: </strong>${show.premiered || 'N/A'}</li>
                        <li><strong>Ended: </strong>${show.ended || 'N/A'}</li>
                    </ul>
                    <a href="${show.officialSite || '#'}" target="_blank" class="btn btn-warning">Go to Website</a>
                    <button class="btn btn-info" onclick="loadShows()">Go Back</button>
                </div>
            </div>
        </div>
    `;
}

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value.trim();
    
    if (query) {
        fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
            .then(response => {
                if (!response.ok) throw new Error('Search failed');
                return response.json();
            })
            .then(data => {
                renderShowList(data.map(item => item.show));
            })
            .catch(error => console.error("Error searching shows:", error));
    }
});

window.onload = loadShows;
