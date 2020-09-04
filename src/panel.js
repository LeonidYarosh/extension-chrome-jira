var app = new Vue({
    el: '#app',
    data: {
        URL: '',
        requestBody: '',
        responseBody: '',
    }
})


chrome.devtools.network.onRequestFinished.addListener((request) => {
  request.getContent((body) => {
    if (
      request.request &&
      request.request.url &&
      request.request.url.includes("UFS/workflow")
    ) {
        console.log(body, request)
        app.URL = request.request.url
        app.requestBody = request.request.postData.text
        app.responseBody = body
    }
  });
});
