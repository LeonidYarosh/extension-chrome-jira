let DownloadAllBtn = Vue.component('download-all-btn', {
    template: `<button @click="handleClick" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            Скачать все в HAR
        </button>`,
    props: ['config', 'version', 'buildDate'],
    methods: {
        handleClick() {
            if (!chrome.devtools) {
                const port = chrome.runtime.connect({name: "downloadHAR"})
                port.postMessage({ isGetHAR: true })
                port.onMessage.addListener((response) => {
                    if (response.url && response.fileName) {
                        chrome.downloads.download({
                            url: response.url,
                            filename: response.fileName,
                        });
                    }
                });
            }
            else {
                chrome.devtools.network.getHAR((har) => {
                    const {
                        url,
                        fileName
                    } = formattingHAR({
                        config: this.config,
                        version: this.version,
                        buildDate: this.buildDate,
                        har
                    })

                    chrome.downloads.download({
                        url: url,
                        filename: fileName,
                    });
                })
            }
        }
    }
})
