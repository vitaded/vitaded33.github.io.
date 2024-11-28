let films = document.getElementById('films');
let btnStarships = document.querySelector('.starships-show');
let starships = document.getElementById('starships')

// async logic
async function getAllFilms() {
    const response = await fetch('https://swapi.dev/api/films/')
    const data = await response.json();
    return data;
}

async function getAllStarships() {
    const response = await fetch('https://swapi.dev/api/starships/')
    const data = await response.json();
    return data;
}

async function getFilm(url) {
    const response = await fetch(url)
    const data = await response.json();
    return data;
}

async function getPersonName(charactersUrl) {
    const response = await fetch(charactersUrl)
    const data = await response.json();
    return data;
}


// event logic
document.addEventListener('DOMContentLoaded', initApp);
function initApp() {
    getAllFilms().then(
        function (valuess) {
            const resultFilms = valuess.results;
            resultFilms.forEach(film => printFilms(film));
        }
    )
}

btnStarships.addEventListener('click', starshipsShow);
let count = 0;
function starshipsShow() {
    if (count == 0) {
        getAllStarships().then(
            function (valuess) {
                const resultShips = valuess.results;
                resultShips.forEach(ship => printStarships(ship));
            }
        )
    }
    count = 1;
}

// print logic
function printFilms({ title, episode_id, release_date, opening_crawl, url }) {
    let divFilm = document.createElement('div');
    divFilm.classList.add('Film');
    divFilm.innerHTML = `<h4>${title}</h4>`;
    let spanFilm = document.createElement('span');
    spanFilm.innerHTML = 'Number of episode: ' + episode_id + '<br>';
    divFilm.append(spanFilm);
    let dateEp = document.createElement('span');
    let yearEp = release_date.split('-')[0];
    dateEp.innerHTML = "Year of realise episode: " + yearEp + '<br>';
    divFilm.append(dateEp);
    let crawlEp = document.createElement('p');
    crawlEp.innerHTML = 'Crawl: ' + opening_crawl;
    divFilm.append(crawlEp);


    let btnPerson = document.createElement('div');
    btnPerson.innerHTML = `<span onclick="showPers('${url}', this)">show person</span>`;
    divFilm.append(btnPerson);

    films.append(divFilm);
}


function showPers(url, btnShowPers) {
    const btnParrentDiv = btnShowPers.closest('.Film');

    if (btnParrentDiv.querySelector('.pers')) { return; }
        getFilm(url).then(function (valuess) {
            const resultCharacters = valuess.characters;
            resultCharacters.forEach(charactersUrl => getPersonName(charactersUrl)
                .then(function (person) {
                    const name = person.name;
                    let personDiv = document.createElement('div');
                    personDiv.classList.add('pers')
                    personDiv.innerHTML = name;
                    btnParrentDiv.append(personDiv);
                }
                )
            )
        }
        )
    }


function printStarships({ name }) {
    let ship = document.createElement('div');
    ship.innerHTML = `<h5>${name}</h5>`;
    starships.append(ship);
}
