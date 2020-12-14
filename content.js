console.log("Spice Engaged");

const replaceHeaders = () => {
    console.log('here')
    let headerHeros = document.getElementsByClassName("ic-DashboardCard__header_hero");

    let src = [chrome.extension.getURL("./images/td.gif"), 
               chrome.extension.getURL("./images/bakugo.gif"), 
               chrome.extension.getURL("./images/jotaro.gif"), 
               chrome.extension.getURL("./images/mista.gif")];

    let count = 0;
    for (let box of headerHeros){
        if (src[count]){
            box.setAttribute('style', `background: url(${src[count]}) !important`);
            count ++;
        }
        else{
            count = 0;
            box.setAttribute('style', `background: url(${src[count]}) !important`);
            count ++;
        }
    }
}

window.addEventListener('load', replaceHeaders, false);