
const listenUrlsDev = {
    workflow: 'UFS/workflow',
    list: 'UFS/list',
    getVersion: '/static/cards.credit/',
    init: '/init',
}

const listenUrlsIft = {
    workflow: '/operation-release-ccard-flow',
    list: '/select-ccard-product/getAvailableProducts',
    getVersion: '/sbtsbol-static/ift/cards.credit/',
    init: '/init',
}

const listenUrlsProd = {
    workflow: '/operation-release-ccard-flow',
    list: '/select-ccard-product/getAvailableProducts',
    getVersion: 'PL/cards.credit/',
    init: '/init',
}

const app = new Vue({
    el: '#app',
    data: {
        savedReq: [],
        isFetching: false,
        version: '',
        buildDate: '',
        configUrls: listenUrlsProd,
        standsList: [
            {name: 'dev', config: listenUrlsDev },
            {name: 'ift', config: listenUrlsIft },
            {name: 'prod', config: listenUrlsProd },
        ],
        activeStand: listenUrlsDev
    },
    components: {
        'download-btn': DownloadBtn,
        'download-all-btn': DownloadAllBtn,
        'select-stand': SelectStand,
    }
})


const addZero = num => {
    const strNum = String(num)
    return strNum.length > 1 ? strNum : `0${strNum}`
}

const getTimeRequest = (request) => {
    const timeReq = new Date(request.startedDateTime);
    const day = addZero(timeReq.getDate());
    const month = addZero(timeReq.getMonth() + 1);
    const year = String(timeReq.getFullYear());
    const hours = addZero(timeReq.getHours());
    const minutes = addZero(timeReq.getMinutes());
    const seconds = addZero(timeReq.getSeconds());

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
};

let isFoundVersion = false


chrome.devtools.network.onRequestFinished.addListener((request) => {

    // обнуление флага чтобы по несколько раз не устанавливать версию
    if (
        request.request &&
        request.request.url &&
        request.request.url.includes(app.activeStand.init)
    ) {
        isFoundVersion = false
    }
    // поиск версии и времени поставки
    if (
        !isFoundVersion &&
        request.request &&
        request.request.url &&
        request.request.url.includes(app.activeStand.getVersion)
    ) {
        isFoundVersion = true
        const url = request.request.url
        app.version = url.match(/credit\/(.*)\//g)[0].split('/')[1] || 'dev'
        const locationOrigin = request.request.url.split(app.activeStand.getVersion)[0]

        YAML.fromURL(`${locationOrigin}${app.activeStand.getVersion}${app.version}/release.yml`, (yaml) => {
            app.buildDate = yaml.buildDate
        })
    }

    request.getContent((body) => {
        if (
            request.request &&
            request.request.url &&
            (request.request.url.includes(app.activeStand.workflow) || request.request.url.includes(app.activeStand.list))
        ) {
            let pageType = request.request.url.includes(app.activeStand.workflow) ? 'workflow' : ''
            pageType = request.request.url.includes(app.activeStand.list) ? 'list' : pageType
            // chrome.storage.local.set({ reqInfo:
            app.savedReq.push({
                url: request.request.url,
                req: request.request.postData.text,
                res: body,
                timeReq: getTimeRequest(request),
                pageType: pageType,
            })
            // })
        }
    });
});
