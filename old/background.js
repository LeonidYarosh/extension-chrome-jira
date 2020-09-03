// Future JavaScript will go here
// function logURL(requestDetails) {
//     console.log("Loading: " + requestDetails.url);
// }
//
// chrome.webRequest.onBeforeRequest.addListener(
//     logURL,
//     {urls: ["<all_urls>"]}
// );
// chrome.webRequest.onBeforeRequest.addListener(
//     function(data)
//     {
//         if (data.type === 'xmlhttprequest' && data.url.indexOf('UFS/workflow') !== -1 && data.initiator.indexOf('localhost') !== -1) {
//             console.log('Body', data, data.requestBody);
//         }
//     },
//     {urls: ["<all_urls>"]},
//     ['requestBody']
// );
// chrome.webRequest.onCompleted.addListener(
//     function(data)
//     {
//         console.log(data)
//         // if (data.type === 'xmlhttprequest' && data.url.indexOf('UFS/workflow') !== -1 && data.initiator.indexOf('localhost') !== -1) {
//         //     console.log('Body', data, data.requestBody);
//         // }
//     },
//     {urls: ["http://localhost:4242/*"]},
//     ['requestBody']
// );

// var port = chrome.runtime.connect('fkamkmghdbfhpkbfgaknhjgmnnhiohdj', {name: "knockknock"});
// port.postMessage({joke: "Knock knock"});
// port.onMessage.addListener(function(msg) {
//     console.log('asdasd')
//     if (msg.question == "Who's there?")
//         port.postMessage({answer: "Madame"});
//     else if (msg.question == "Madame who?")
//         port.postMessage({answer: "Madame... Bovary"});
// });
(async () => {
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            debugger
            alert('asdasdasd')
            console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
        });
})()
