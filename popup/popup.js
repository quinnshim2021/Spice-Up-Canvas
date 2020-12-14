const run = (s) => {
    let params = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(params, (tabs) => {
        let msg = {
            data: s
        };
        
        chrome.tabs.sendMessage(tabs[0].id, msg);
    });
}

/* when submit button is clicked, grab input text and send to content script */
const giphy = () => {
    let api_key = "GwDHB6rgzHT6tp60qyuxCKsKifIUptff";
    
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=5`)
        .then(response => {
            return response.json();
        })
        .then(response => {
            console.log('here');
            run(response["data"])
        })
        .catch(() => {
            console.log("error");
        });
}

document.getElementById("submit").addEventListener("click", giphy);