const app = new Vue({
    el: '#app',
    data: {
        savedReq: [],
    },
    components: {
        'download-btn': DownloadBtn
    }
})


const addZero = num => {
    const strNum = String(num)
    return strNum.length > 1 ? strNum : `0${strNum}`
}

const getTimeRequest = (request) => {
    const timeReq = new Date(request.startedDateTime)
    const day = addZero(timeReq.getDate())
    const month = addZero(timeReq.getMonth() + 1)
    const year = String(timeReq.getFullYear())
    const hours = addZero(timeReq.getHours())
    const minutes = addZero(timeReq.getMinutes())
    const seconds = addZero(timeReq.getSeconds())

   return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`
}

chrome.devtools.network.onRequestFinished.addListener((request) => {
  request.getContent((body) => {
    if (
      request.request &&
      request.request.url &&
      request.request.url.includes("UFS/workflow")
    ) {
        debugger
        app.savedReq.push({
            url: request.request.url,
            req: request.request.postData.text,
            res: body,
            timeReq: getTimeRequest(request)
        })
        console.log(app.savedReq)
    }
  });
});
