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
  el.addEventListener("click", clickFunc, false);
}
document.addEventListener("DOMContentLoaded", ready);

