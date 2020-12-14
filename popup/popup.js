// toggle what is selected
const toggleSelection = (option) => {
    option.classList.toggle("selected");
}

// sends array of gif objects to content
const run = (command) => {
    let params = {
        active: true,
        currentWindow: true
    };

    let src = [];
    for (let selection of document.getElementsByClassName('selected')){
        src.push(selection.src);
    }

    chrome.tabs.query(params, (tabs) => {
        let msg = {
            command: command,
            data: src
        };
        
        chrome.tabs.sendMessage(tabs[0].id, msg);
    });
}

// gets 5 trending gives data to run
// add them to popup
const giphy = () => {
    let api_key = "XbE48ebukSuhtyicojTjKNpwLcnQ8wb3";
    
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=4`)
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
            let grid = document.getElementById("grid-container");
            for (let gif of src) {
                let div = document.createElement("div");
                div.classList = "grid-item option";
                div.src = gif;
                div.setAttribute('style', `background: url(${gif}) !important; background-size: cover !important; background-repeat: no-repeat !important;`);
                grid.appendChild(div);
            }

            for(let option of document.getElementsByClassName('option')) {
                option.addEventListener('click', (event) => {
                    toggleSelection(option);
                });
            };
        })
        .catch(() => {
            console.log("error");
        });
}

document.getElementById("submit").addEventListener("click", (e) => {e.preventDefault(); run("save")}, false);
document.getElementById("delete").addEventListener("click", (e) => {e.preventDefault(); run("delete")}, false);
window.addEventListener('load', giphy, false);