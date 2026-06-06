// Luodaan funktio joka etsii käyttänimen ja hakee dataa chess.com API:sta
async function fetchData() {

// Tarkistetaan onko käyttäjätä syöttänyt mitään hakuun.
    if (document.getElementById('username').value === '') {
        alert('Please enter a username');
        return;
    }

// Etsitään käyttäjän nimi
    let username = document.getElementById('username').value;

// Haetaan pelaajan tiedot API:sta ja muutetaan se JSON muotoon.
    fetch(`https://api.chess.com/pub/player/${username}`)
    .then(response => response.json())


    .then(data => { 
        console.log(data);
    })

// Jos käyttäjä nimeä ei löydy
    .catch(error => {
        console.error('Error fetching data:', error);
    });

}