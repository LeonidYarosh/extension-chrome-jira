// Future JavaScript will go here
const app = new Vue({
  el: "#app",
  data: {
    savedReq: [],
    version: '',
    buildDate: '',
    activeStand: null
  },
  components: {
    'download-btn': DownloadBtn,
    'download-all-btn': DownloadAllBtn,
  },
});


function ready() {
  function clickFunc() {
      chrome.storage.local.get(
        ["reqInfo", "activeStand", "version", "buildDate"],
        function ({ reqInfo, activeStand, version, buildDate }) {
          if (reqInfo && reqInfo.length) {
            app.savedReq = reqInfo;
          }
          if (activeStand) {
            app.activeStand = activeStand;
          }
          if (version) {
            app.version = version;
          }
          if (buildDate) {
            app.buildDate = buildDate;
          }
        }
      );
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
