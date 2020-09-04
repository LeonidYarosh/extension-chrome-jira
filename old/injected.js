// ;(function(xhr) {
//     console.log('asdasdasdasdasd')
//     var XHR = XMLHttpRequest.prototype;
//
//     var open = XHR.open;
//     var send = XHR.send;
//     var setRequestHeader = XHR.setRequestHeader;
//
//     XHR.open = function(method, url) {
//         this._method = method;
//         this._url = url;
//         this._requestHeaders = {};
//         this._startTime = (new Date()).toISOString();
//
//         return open.apply(this, arguments);
//     };
//
//     XHR.setRequestHeader = function(header, value) {
//         this._requestHeaders[header] = value;
//         return setRequestHeader.apply(this, arguments);
//     };
//
//     XHR.send = function(postData) {
//         this.addEventListener('load', function(evt) {
//             console.log(evt)
//             var myUrl = this._url ? this._url.toLowerCase() : this._url;
//             if(myUrl) {
//                 if (postData) {
//                     if (typeof postData === 'string') {
//                         try {
//                             // here you get the REQUEST HEADERS, in JSON format, so you can also use JSON.parse
//                             this._requestHeaders = postData;
//                         } catch(err) {
//                             console.log('Request Header JSON decode failed, transfer_encoding field could be base64');
//                             console.log(err);
//                         }
//                     } else if (typeof postData === 'object' || typeof postData === 'array' || typeof postData === 'number' || typeof postData === 'boolean') {
//                         console.log('postData', postData)
//                     }
//                 }
//
//                 // here you get the RESPONSE HEADERS
//                 var responseHeaders = this.getAllResponseHeaders();
//
//                 if ( this.responseType !== 'blob' && this.responseText) {
//                     // responseText is string or null
//                     try {
//
//                         // here you get RESPONSE TEXT (BODY), in JSON format, so you can use JSON.parse
//                         var arr = this.responseText;
//
//                         // printing url, request headers, response headers, response body, to console
//
//                         console.log(this._url);
//                         console.log(JSON.parse(this._requestHeaders));
//                         console.log(responseHeaders);
//                         console.log(JSON.parse(arr));
//
//                     } catch(err) {
//                         console.log("Error in responseType try catch");
//                         console.log(err);
//                     }
//                 }
//
//             }
//         });
//
//         return send.apply(this, arguments);
//     };
//
//     XHR.onload = () => {
//         console.log(XHR)
//     }
// })(XMLHttpRequest);
//
// (function () {
//     window.testExtension = []
//
//     var original = {
//         open: XMLHttpRequest.prototype.open,
//         send: XMLHttpRequest.prototype.send
//     };
//
//     XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
//         return original.open.call(this, method, url, async, user, password);
//     };
//
//     XMLHttpRequest.prototype.send = function (data) {
//         this.onload = function (evt) {
//             window.testExtension.push(this.responseText)
//         }
//         return original.send.call(this, data);
//     };
//
// }());

// var port = chrome.runtime.connect('fkamkmghdbfhpkbfgaknhjgmnnhiohdj', {name: "knockknock"});
// port.postMessage({joke: "Knock knock"});
// port.onMessage.addListener(function(msg) {
//     console.log('asdasd')
//     if (msg.question == "Who's there?")
//         port.postMessage({answer: "Madame"});
//     else if (msg.question == "Madame who?")
//         port.postMessage({answer: "Madame... Bovary"});
// });

chrome.runtime.sendMessage('fkamkmghdbfhpkbfgaknhjgmnnhiohdj', {openUrlInEditor: 'url'},
    function(response) {
        console.log(response)
    });

