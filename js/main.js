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
            populateList(matches.fixtures)
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

        let home = document.createElement("div");
        home.classList = "result";
        home.innerHTML = element.homeTeamName;

        let vs = document.createElement("div");
        vs.innerHTML = "vs.";

        let away = document.createElement("div");
        away.classList = "result";
        away.innerHTML = element.awayTeamName;

        let thumbDown = document.createElement("div");
        thumbDown.classList = "thumb-down";
        thumbDown.addEventListener("click", () => {

        });

        let thumbUp = document.createElement("div");
        thumbUp.classList = "thumb-up";
        thumbUp.addEventListener("click", () => {

        });

        div.appendChild(home);
        div.appendChild(vs);
        div.appendChild(away);
        div.appendChild(thumbDown);
        div.appendChild(thumbUp);
        console.log(div);
        
        resultsDiv.appendChild(div);
    });
}

function eq(a, b) {
    return a.toLowerCase().indexOf(b.toLowerCase()) > -1;
}

function filter(query, matches) {
    if (query === "") return matches;

    const arr = matches.fixtures;
    if (query === "") return arr;
    query = query.trim();
    return arr.filter(m => {
        return eq(m.awayTeamName, query) || eq(m.homeTeamName, query);
    });
}
