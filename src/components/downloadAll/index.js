let DownloadAllBtn = Vue.component('download-all-btn', {
    template: `<button @click="handleClick" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            Скачать все в HAR
        </button>`,
    props: ['config', 'version', 'buildDate'],
    methods: {
        handleClick() {
            chrome.devtools.network.getHAR((har) => {
                 har.entries = har.entries.filter(el =>
                     el._resourceType === 'xhr' && (el.request.url.includes(this.config.workflow) || el.request.url.includes(this.config.init))
                 )

                let harBLOB = new Blob([JSON.stringify({log: har})])
                let url = URL.createObjectURL(harBLOB)
                const fileName = `HAR-log-${this.version || ''}-${this.buildDate || ''}`

                chrome.downloads.download({
                    url: url,
                    filename: fileName,
                });
            })
        }
    }
})
