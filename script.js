// ulkoinen kirjasto baffle
const b = baffle("#header");
b.start();
b.reveal(4000);


// Luodaan funktio joka etsii käyttänimen ja hakee dataa chess.com API:sta
async function fetchData() {

// Tarkistetaan onko käyttäjätä syöttänyt mitään hakuun.
    if (document.getElementById('usernameSearch').value === '') {
        alert('Please enter a username');
        return;
    }

// Etsitään käyttäjän nimi
    let username = document.getElementById('usernameSearch').value;

// Haetaan pelaajan perus tiedot API:sta ja muutetaan se JSON muotoon.
    fetch(`https://api.chess.com/pub/player/${username}`)
    .then(response => response.json())

// Näytetään data HTML:ssä
    .then(data => { 
        document.getElementById('username').textContent = data.username;
        document.getElementById('profileImage').src = data.avatar;
        document.getElementById('realName').textContent = `Name: ${data.name}`;
        document.getElementById('league').textContent = `League: ${data.league}`;
        document.getElementById('country').textContent = `Country: ${data.country}`;
        document.getElementById('lastOnline').textContent = `Last Online: ${new Date(data.last_online * 1000).toLocaleString()}`;
        document.getElementById('joinDate').textContent = `Joined: ${new Date(data.joined * 1000).toLocaleString()}`;   
        document.getElementById('profileURL').textContent = 'Chess.com profile';
        document.getElementById('profileURL').onclick = function() {
            window.open(data.url);
        };
        document.getElementById('profileURL').style.display = 'block';
    })
// Jos käyttäjä nimeä ei löydy
    .catch(error => {
        alert('There was an error fetching the data. Please check the username and try again.');
    });

// Haetaan pelaajan peli tiedot API:sta ja muutetaan se JSON muotoon.
    fetch(`https://api.chess.com/pub/player/${username}/stats`)
    .then(response => response.json())

// Näytetään data HTML:ssä
    .then(data => {
        document.getElementById('performance').innerHTML = `Performance`;
        document.getElementById('rapid').textContent = `Rapid: ${data.chess_rapid.last.rating}`;
        document.getElementById('rapidRecord').textContent = `Record: ${data.chess_rapid.record.win}W/${data.chess_rapid.record.loss}L/${data.chess_rapid.record.draw}D`;
        
        document.getElementById('blitz').textContent = `Blitz: ${data.chess_blitz.last.rating}`;
        document.getElementById('blitzRecord').textContent = `Record: ${data.chess_blitz.record.win}W/${data.chess_blitz.record.loss}L/${data.chess_blitz.record.draw}D`;
    })
    .catch(error => {
        alert('There was an error fetching the data. Please check the username and try again.');
    });


}

function clearData() {
    document.getElementById('username').textContent = '';
    document.getElementById('realName').textContent = '';
    document.getElementById('league').textContent = '';
    document.getElementById('country').textContent = '';
    document.getElementById('lastOnline').textContent = '';
    document.getElementById('joinDate').textContent = '';
    document.getElementById('profileURL').textContent = '';
    document.getElementById('performance').textContent = '';
    document.getElementById('rapid').textContent = '';
    document.getElementById('rapidRecord').textContent = '';
    document.getElementById('blitz').textContent = '';
    document.getElementById('blitzRecord').textContent = '';
    document.getElementById('profileImage').src = '';
    document.getElementById('profileURL').value = '';
    document.getElementById('profileURL').style.display = 'none';
}