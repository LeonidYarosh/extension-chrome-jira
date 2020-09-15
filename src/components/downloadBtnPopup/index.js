

let DownloadBtnPopup = Vue.component('download-btn-popup', {
    template: `
     <div>
       <img :src="href" alt="">
       <a :download="fileName" :href="href">
        {{fileName}}
      </a>
    </div>
`,
    props: {
        fileName: String,
        href: String,
    }
})
