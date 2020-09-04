// Future JavaScript will go here

function ready() {
  function clickFunc() {
      // chrome.runtime.sendMessage({testMessage: 'url'},
      //     function(response) {
      //         console.log(response)
      //     });
      var a = document.getElementById('tophf')
      console.log(a)
      debugger
  }

  var el = document.getElementById("button-click");
  console.log(el);
  el.addEventListener("click", clickFunc, false);
}
document.addEventListener("DOMContentLoaded", ready);


// const port = chrome.runtime.connect({ name: 'foo' });
// // push a message to the channel
// port.postMessage({ greeting: 'hello' });
// // react to the message (can't respond back!)
// port.onMessage.addListener(request => {
//     if (request.greeting === 'hello') {
//         console.log('received a hello message');
//     }
// });
// (async () => {
//     chrome.runtime.onMessage.addListener(
//         function (request, sender, sendResponse) {
//             debugger
//             alert('asdasdasd')
//             console.log(sender.tab ?
//                 "from a content script:" + sender.tab.url :
//                 "from the extension");
//         });
// })()

