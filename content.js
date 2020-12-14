console.log("Spice Engaged");

const replaceHeaders = () => {
    let headerHeros = document.getElementsByClassName("ic-DashboardCard__header_hero");

    let src = [chrome.extension.getURL("../../images/td.gif"), 
               chrome.extension.getURL("../../images/wwy.gif"), 
               chrome.extension.getURL("../../images/tokyo.gif"), 
               chrome.extension.getURL("../../images/mista.gif"),
               chrome.extension.getURL("../../images/bakugo.gif"),
               chrome.extension.getURL("../../images/caesar.gif"),
               chrome.extension.getURL("../../images/vaporeon.gif"),
               chrome.extension.getURL("../../images/yourname.gif"),
               chrome.extension.getURL("../../images/jotaro.gif")];

    let count = 0;
    for (let box of headerHeros){
        if (src[count]){
            box.setAttribute('style', `background: url(${src[count]}) !important; background-size: cover !important; background-repeat: no-repeat !important;`);
            count ++;
        }
        else{
            count = 0;
            box.setAttribute('style', `background: url(${src[count]}) !important`);
            count ++;
        }
    }
}

const rH = (s) => {
    let headerHeros = document.getElementsByClassName("ic-DashboardCard__header_hero");

    let src = s;
    console.log(src);
    let count = 0;
    for (let box of headerHeros){
        if (src[count]){
            box.setAttribute('style', `background: url(${src[count]}) !important; background-size: cover !important; background-repeat: no-repeat !important;`);
            count ++;
        }
        else{
            count = 0;
            box.setAttribute('style', `background: url(${src[count]}) !important`);
            count ++;
        }
    }
}

const gotMessage = (message, sender, sendResponse) => {
    let src = [];
    for (let m of message.data){
        console.log(`${m["id"]}: ${m["images"]["downsized_medium"]["url"]}`);
        let id = m["images"]["downsized_small"]["mp4"].split("media/")[1].split("/giphy")[0];
        src.push(`https://i.giphy.com/${id}.gif`);
        rH(src);
    }
    // add message and conditional for turning off headers later
}

// when page loads, run style changes
window.addEventListener('load', replaceHeaders, false);

// listen for messages from other tabs
chrome.runtime.onMessage.addListener(gotMessage);