document.addEventListener("DOMContentLoaded", init);

let matches;
let resultsDiv;

function init() {

    // Retrive DOM
    resultsDiv = document.querySelector("#results");

    // Load matches from API.
    fetch("http://api.football-data.org/v1/fixtures")
        .then(res => res.json())
        .then(populateList)
        .catch(console.log);
}

function populateList(data) {
    matches = data;
    console.log(matches);
    
    resultsDiv.innerHTML = "";
}

function filter(query, matches) {
    if (query === "") return matches;
    
}
function readFromDatabaseOnce(value) {
    let leadsRef = database.ref(value);
    leadsRef.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            let childData = childSnapshot.val();
            console.log(childData);
        });
    });
}
