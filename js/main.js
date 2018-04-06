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

function itemClick(id) {
    console.log(id);
}

function populateList(data) {

    // Clear list
    while(resultsDiv.firstChild){
        resultsDiv.removeChild(resultsDiv.firstChild);
    }

    data.forEach(element => {
        const idSplit = element._links.self.href.split("/");
        const id = idSplit[idSplit.length - 1];
        const date = new Date(element.date);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const dateStr = date.toLocaleDateString("nb-no", options);

        let div = document.createElement("div");
        div.id = id;
        div.className = "result";

        let top = document.createElement("div");
        top.className = "top";

        let bottom = document.createElement("div");
        bottom.className = "bottom";
        bottom.innerHTML = dateStr;

        let left = document.createElement("div");
        left.className = "left";
        
        let home = document.createElement("div");
        home.classList = "home bold";
        home.innerHTML = element.homeTeamName;

        let vs = document.createElement("div");
        vs.className = "versus";
        vs.innerHTML = "vs.";

        let away = document.createElement("div");
        away.className = "away bold";
        away.innerHTML = element.awayTeamName;

        let thumbDown = document.createElement("img");
        thumbDown.className = "thumb";
        thumbDown.src = "img/down.png";
        thumbDown.addEventListener("click", () => {

        });

        let thumbCount = document.createElement("div");
        thumbCount.className = "thumbs";
        thumbCount.innerHTML = "0";

        let thumbUp = document.createElement("img");
        thumbUp.className = "thumb";
        thumbUp.src = "img/up.png";
        thumbUp.addEventListener("click", () => {

        });

        left.appendChild(home);
        left.appendChild(vs);
        left.appendChild(away);
        top.appendChild(left);
        top.appendChild(thumbDown);
        top.appendChild(thumbCount);
        top.appendChild(thumbUp);

        div.appendChild(top);
        div.appendChild(bottom);
        div.addEventListener("click", (e) => itemClick(id));
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