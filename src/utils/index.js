const formattingHAR = ({
   config,
   version,
   buildDate,
   har
}) => {
    har.entries = har.entries.filter(el =>
        el._resourceType === 'xhr' && (el.request.url.includes(config.workflow) || el.request.url.includes(config.init))
    )

    let harBLOB = new Blob([JSON.stringify({log: har})])
    const url = URL.createObjectURL(harBLOB)
    const fileName = `HAR-log-${version || ''}-${buildDate || ''}`

    return { url, fileName }
}

module.exports = {
    formattingHAR,
}
