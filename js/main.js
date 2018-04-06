document.addEventListener("DOMContentLoaded", init);

let matches;
let resultsDiv, inputField;

function init() {

    // Retrive DOM
    resultsDiv = document.querySelector("#results");
    inputField = document.querySelector("#search");
    inputField.addEventListener("input", e => populateList(filter(e.target.value, matches)));

    // Load matches from API.
    fetch("http://api.football-data.org/v1/fixtures")
        .then(res => res.json())
        .then(json => {
            matches = json;
            populateList(matches)
        })
        .catch(console.log);
}

function populateList(data) {

    // Clear list
    while(resultsDiv.firstChild){
        resultsDiv.removeChild(resultsDiv.firstChild);
    }

    data.forEach(element => {
        let div = document.createElement("div");
        div.className = "result";
        div.innerHTML = element.homeTeamName;
        resultsDiv.appendChild(div);
    });
}

function eq(a, b) {
    return a.toLowerCase().indexOf(b.toLowerCase()) > -1;
}

function filter(query, matches) {
    const arr = matches.fixtures;
    if (query === "") return arr;
    query = query.trim();
    return arr.filter(m => {
        return eq(m.awayTeamName, query) || eq(m.homeTeamName, query);
    });
}