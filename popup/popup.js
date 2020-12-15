let G_SRC = [];
let PAGE = 0; // ASSUME 4 PAGES, automate based on result list size later
let G_SAVED = [];
let STACK = "trending";

// toggle what is selected
const toggleSelection = (option, c) => {
    option.classList.toggle(c);
}

// sends array of gif objects to content
const run = (command) => {
    let params = {
        active: true,
        currentWindow: true
    };

    let src = [];
    if (command === "save" || command === "delete"){
        for (let selection of document.getElementsByClassName('selected')){
            src.push(selection.src);
        }
    }

    chrome.tabs.query(params, (tabs) => {
        let msg = {
            command: command,
            data: src
        };
        return new Promise(function(resolve, reject) {chrome.tabs.sendMessage(tabs[0].id, msg, (response) =>{
            if (response){
                G_SAVED = response.data;
            }
            console.log(response);
            resolve(G_SAVED);
        }) });
    });
}

const displayCards = (page) => {
    document.getElementById("page").innerText = page + 1;
    let src = STACK === "saved" ? G_SAVED : G_SRC;
    let grid = document.getElementById("grid-container");
    while (grid.firstChild){
        grid.removeChild(grid.firstChild);
    }
    let count = 0;
    for (let gif of src) {
        if ((count - (page*4) <= 3) && (count - (page*4) >= 0)){
            if ((page+1)*4 > count){
                let div = document.createElement("div");
                div.classList = "grid-item option";
                div.src = gif;
                div.setAttribute('style', `background: url(${gif}) !important; background-size: cover !important; background-repeat: no-repeat !important;`);
                grid.appendChild(div);
                count ++;
            }
        }
        else{
            count++;
            continue;
        }
    }

    for(let option of document.getElementsByClassName('option')) {
        option.addEventListener('click', (event) => {
            toggleSelection(option, "selected");
        });
    };
}

const newResults = (id) => {
    if (id === "-1"){
        if (PAGE - 1 >= 0){
            PAGE--;
            document.getElementById("page").innerText = PAGE + 1;
        }
        displayCards(PAGE);
        console.log(`Page: ${PAGE}`);
    } else if (id === "1") {
        if (PAGE + 1 < 4){
            PAGE++; 
            document.getElementById("page").innerText = PAGE + 1;
        }
        displayCards(PAGE);
        console.log(`Page: ${PAGE}`);
    }
    
};

// default with trending
// add them to popup
const giphy = () => {    
    let api_key = env["API_KEY"];
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=16`)
        .then(response => {
            return response.json();
        })
        .then(response => {
            let src = [];
            for (let m of response.data){
                console.log(`${m["id"]}: ${m["images"]["downsized_medium"]["url"]}`);
                let id = m["images"]["downsized_small"]["mp4"].split("media/")[1].split("/giphy")[0];
                src.push(`https://i.giphy.com/${id}.gif`);
            }

            /* add to popup.html here */
            G_SRC = src;
            PAGE = 0;
            STACK = "trending";
            displayCards(PAGE);
        })
        .catch(() => {
            console.log("error");
        });
}

const displaySearch = () => {
    let api_key = env["API_KEY"];
    let userinput = document.getElementById("userinput").value;
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${api_key}&limit=16&q=${userinput}`)
        .then(response => {
            return response.json();
        })
        .then(response => {
            let src = [];
            for (let m of response.data){
                console.log(`${m["id"]}: ${m["images"]["downsized_medium"]["url"]}`);
                let id = m["images"]["downsized_small"]["mp4"].split("media/")[1].split("/giphy")[0];
                src.push(`https://i.giphy.com/${id}.gif`);
            }

            /* add to popup.html here */
            G_SRC = src;
            PAGE = 0;
            STACK = "searched";
            displayCards(PAGE);
        })
        .catch(() => {
            console.log("error");
        });
};

const loadListeners = () => {
    for(let option of document.getElementsByClassName("pagination")[0].childNodes) {
        option.addEventListener('click', (event) => {
            event.preventDefault();
            newResults(option.id);
        });
    };

    document.getElementById("trending").addEventListener("click", (event) => {
        event.preventDefault();
        giphy();
    });

    document.getElementById("userinput").addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
         event.preventDefault();
         document.getElementById("search").click();
        }
    });

    run("init");
    giphy();
};

const displaySaved = () => {
    PAGE = 0;
    STACK = "saved";
    displayCards(PAGE);
};

document.getElementById("search").addEventListener("click", (e) => {e.preventDefault(); displaySearch()}, false);
document.getElementById("submit").addEventListener("click", (e) => {e.preventDefault(); run("save")}, false);
document.getElementById("saved").addEventListener("click", (e) => {e.preventDefault(); displaySaved()}, false);
document.getElementById("delete").addEventListener("click", (e) => {e.preventDefault(); run("delete")}, false);
window.addEventListener('load', loadListeners, false);