// Future JavaScript will go here

function ready() {
  function clickFunc() {
    console.log(window.testExtension);
    chrome.storage.sync.get(["test"], function (result) {
      console.log("Value currently is " + result);
    });
  }

  var el = document.getElementById("button-click");
  console.log(el);
  el.addEventListener("click", clickFunc, false);
}



// const port = chrome.runtime.connect({ name: 'foo' });
// // push a message to the channel
// port.postMessage({ greeting: 'hello' });
// // react to the message (can't respond back!)
// port.onMessage.addListener(request => {
//     if (request.greeting === 'hello') {
//         console.log('received a hello message');
//     }
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
