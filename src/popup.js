// Future JavaScript will go here
const app = new Vue({
  el: "#app",
  data: {
    fileName: '',
    href: '',
  },
  components: {
    "download-btn-popup": DownloadBtnPopup,
  },
});


function ready() {
  function clickFunc() {
      chrome.storage.local.get('screenInfo', function ({ screenInfo }) {
          app.fileName = screenInfo.fileName
          const blob = screenInfo.imageUrl
          console.log(blob)
          // app.href = URL.createObjectURL(blob)
          app.href = blob
      });
      chrome.storage.local.get('reqInfo', function ({ reqInfo }) {
          console.log(reqInfo)
      });
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
