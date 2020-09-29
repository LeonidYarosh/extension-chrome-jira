let DownloadAllBtn = Vue.component('download-all-btn', {
    template: '<button @click="handleClick">Скачать все в HAR</button>',
    props: ['config'],
    methods: {
        handleClick() {
            chrome.devtools.network.getHAR((har) => {
                console.log(har)
                 har.entries = har.entries.filter(el => {
                     return el._resourceType === 'xhr' && (el.request.url.includes(this.config.workflow) || el.request.url.includes(this.config.init))

                 })
                console.log(har)
            })
        }
    }
})
