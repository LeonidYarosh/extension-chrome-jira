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
                }
            }
        }
    },
    computed: {
        fileName: function () {
            let startName = ''
            startFileName.forEach(name => {
                if (this.req.url.includes(name)) {
                    startName = name
                }
            })
            return `${startName || 'unknown'}_${this.req.timeReq.replace(' ', '_')}.txt`
        },
        href: function () {
            const type = 'data:text/plain;content-disposition=attachment;filename=file,'
            const text = `URL: ${this.req.url} \n
            Time request: ${this.req.timeReq} \n
            Request body: ${this.req.req} \n
            Response body: ${this.req.res} \n`
            return type + text;
        }
    }
})
