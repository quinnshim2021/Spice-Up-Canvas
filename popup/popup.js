let GLOBALSRC = [];

// sends array of gif objects to content
const run = () => {
    let params = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(params, (tabs) => {
        let msg = {
            data: GLOBALSRC
        };
        
        chrome.tabs.sendMessage(tabs[0].id, msg);
    });
}

// gets 5 trending gives data to run
// add them to popup
const giphy = () => {
    let api_key = "GwDHB6rgzHT6tp60qyuxCKsKifIUptff";
    
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=5`)
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
            let table = document.getElementById("table");
            for (let gif of src) {
                let ul = document.createElement("ul");
                let img = document.createElement("img");
                img.src = gif;
                ul.appendChild(img);
                table.appendChild(ul);
            }
            GLOBALSRC = src;
        })
        .catch(() => {
            console.log("error");
        });
}

document.getElementById("submit").addEventListener("click", run);
window.addEventListener('load', giphy, false);