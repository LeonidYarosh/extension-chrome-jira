const startFileName = [
    'list',
    'workflow'
]

let DownloadBtn = Vue.component('download-btn', {
    template: `
      <a :download="fileName" :href="href">
        {{fileName}}
      </a>
`,
    props: {
        req: {
            type: Object,
            default: function () {
                return {
                    url: '',
                    req: '',
                    res: '',
                    timeReq: '',
                    pageType: ''
                }
            }
        }
    },
    computed: {
        fileName: function () {
            return `${this.req.pageType || 'unknown'}_${this.req.timeReq.replace(' ', '_')}.txt`
        },
        href: function () {
            const type = 'data:text/plain;content-disposition=attachment;filename=file,'
            const text = `URL: \n${this.req.url} \n
            Time request: \n${this.req.timeReq} \n
            Request body: \n${this.req.req} \n
            Response body: \n${this.req.res} \n`
            return type + text;
        }
    }
})
