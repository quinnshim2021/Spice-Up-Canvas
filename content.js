console.log("Spice Engaged");

/* just for me lol */
const replaceHeaders = (src) => {
    let headerHeros = document.getElementsByClassName("ic-DashboardCard__header_hero");

    let alt = [chrome.extension.getURL("../../images/td.gif"), 
               chrome.extension.getURL("../../images/wwy.gif"), 
               chrome.extension.getURL("../../images/tokyo.gif"), 
               chrome.extension.getURL("../../images/mista.gif"),
               chrome.extension.getURL("../../images/bakugo.gif"),
               chrome.extension.getURL("../../images/caesar.gif"),
               chrome.extension.getURL("../../images/vaporeon.gif"),
               chrome.extension.getURL("../../images/yourname.gif"),
               chrome.extension.getURL("../../images/jotaro.gif")];
    
    src = alt; // alt stuff is for me, delete later

    if (src === undefined || src.length === 0){ return; }

    let count = 0;
    for (let box of headerHeros){
        if (count === src.length){ count = 0; }
            
        box.setAttribute('style', `background: url(${src[count]}) !important; background-size: cover !important; background-repeat: no-repeat !important;`);
        count ++;
    }
}

const saveImages = (s) => {
    if (s === undefined || s.length === 0){ return; }
    else{
        chrome.storage.sync.get(['src'], function(result){
            console.log(`Images retrieved`);
            console.log(result['src']);
    
            let src = [];
            for (let i of result['src']){
                src.push(i);
            }
            for (let i of s){
                if (!src.includes(i)){ // for no duplicates
                    src.push(i);
                }
            }
            console.log(src);

            chrome.storage.sync.set({'src': src}, function(){
                console.log(`Images saved:`);
                console.log(src);
                updateHeaders(src);
            });
        }); 
    }
}

const deleteImages = (s) => {
    if (s === undefined || s.length === 0){ return; }
    else{
        chrome.storage.sync.get(['src'], function(result){
            console.log(`Images retrieved`);
            console.log(result['src']);
    
            let src = [];
            for (let i of result['src']){
                if (!s.includes(i)){
                    src.push(i);
                }
            }
            console.log(src);

            chrome.storage.sync.set({'src': src}, function(){
                console.log(`Images saved:`);
                console.log(src);
                updateHeaders(src);
            });
        }); 
    }
}

const updateHeaders = (s) => {
    let headerHeros = document.getElementsByClassName("ic-DashboardCard__header_hero");
    let src = s;

    let count = 0;
    for (let box of headerHeros){
        if (src === undefined || src.length === 0){
            box.setAttribute('style', `background-color: blue !important;`);
        }
        else {
            if (count === src.length){ count = 0; }
            
            box.setAttribute('style', `background: url(${src[count]}) !important; background-size: cover !important; background-repeat: no-repeat !important;`);
            count ++;
        }
    }
}

const gotMessage = (message, sender, sendResponse) => {
    console.log(`Message recieved:`);
    console.log(message);
    if (message.command === "save"){
       saveImages(message.data);
    } else if (message.command === "delete") {
        deleteImages(message.data);
    } else{
        console.log("idk what to do with this");
    }
}

window.addEventListener('load', () => {
    chrome.storage.sync.get(['src'], function(result){
        console.log(`Images retrieved`);
        console.log(result['src']);

        let src = [];
        for (let i of result['src']){
            src.push(i);
        }
        replaceHeaders(src);
    }); 
}, false);

// listen for messages from other tabs
chrome.runtime.onMessage.addListener(gotMessage);