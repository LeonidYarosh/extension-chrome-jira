chrome.devtools.network.onRequestFinished.addListener((request) => {
  request.getContent((body) => {
    if (
      request.request &&
      request.request.url &&
      request.request.url.includes("UFS/workflow")
    ) {
        console.log(body, request)
        var div = document.getElementById('app')
        div.textContent = body
    }
  });
});
