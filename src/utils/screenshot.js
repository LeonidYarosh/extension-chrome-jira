
function $(id) {
    return document.getElementById(id);
}
function show(id) {
    $(id).style.display = "block";
}

function dataUrlToBlob(dataURI) {
    // standard dataURI can be too big, let's blob instead
    // http://code.google.com/p/chromium/issues/detail?id=69227#c27
    var byteString = atob(dataURI.split(",")[1]);
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}

function openScreenshotPage(canvas, cfg) {
    // app.fileName = cfg.filename
    // app.href = URL.createObjectURL(dataUrlToBlob(canvas.toDataURL()))

    createFile(cfg, dataUrlToBlob(canvas.toDataURL()));

    function onWriteEnd() {
        chrome.downloads.download({
            url:
                "filesystem:chrome-extension://" +
                chrome.i18n.getMessage("@@extension_id") +
                "/temporary/" +
                cfg.filename,
            // filename: "test.png" // Optional
        });

        // open the file that now contains the blob
        // window.open('filesystem:chrome-extension://' + chrome.i18n.getMessage('@@extension_id') + '/temporary/' + cfg.filename);
        // chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, {width: cfg.originalWidth});
    }

    function errorHandler() {
        show("uh-oh");
    }

    function createFile(cfg, blob) {
        var size = blob.size + 1024 / 2;
        window.webkitRequestFileSystem(
            window.TEMPORARY,
            size,
            function (fs) {
                fs.root.getFile(
                    cfg.filename,
                    { create: true },
                    function (fileEntry) {
                        fileEntry.createWriter(function (fileWriter) {
                            fileWriter.onwriteend = onWriteEnd;
                            fileWriter.write(blob);
                        }, errorHandler);
                    },
                    errorHandler
                );
            },
            errorHandler
        );
    }
}

function capturePage(cfg) {
    function createHiDPICanvas(cfg) {
        var canvas = document.createElement("canvas");
        var w = cfg.totalWidth + cfg.margins.left + cfg.margins.right;
        var h =
            cfg.totalHeight +
            cfg.margins.top +
            cfg.margins.bottom +
            cfg.titleBar.height;
        canvas.width = w * cfg.pixelRatio;
        canvas.height = h * cfg.pixelRatio;
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";
        canvas
            .getContext("2d")
            .setTransform(cfg.pixelRatio, 0, 0, cfg.pixelRatio, 0, 0);
        return canvas;
    }

    var canvas = createHiDPICanvas(cfg);
    var ctx = canvas.getContext("2d");

    chrome.tabs.captureVisibleTab(
        null,
        { format: "png", quality: 100 },
        function (dataURI) {
            if (dataURI) {
                var image = new Image();
                image.onload = function () {
                    var coords = {
                        x: cfg.margins.left,
                        y: cfg.margins.top,
                        w: cfg.totalWidth,
                        h: cfg.totalHeight,
                    };
                    ctx.drawImage(image, coords.x, coords.y, coords.w, coords.h);
                    // openScreenshotPage(canvas, cfg); // скачка файла
                };
                image.src = dataURI;
            }
        }
    );

    return {
        fileName: cfg.filename,
        imageUrl: URL.createObjectURL(dataUrlToBlob(canvas.toDataURL()))
    }
}

function generateFilename(url) {
    var name = url.split("?")[0].split("#")[0];
    if (name) {
        name = name
            .replace(/^https?:\/\//, "")
            .replace(/[^A-z0-9]+/g, "-")
            .replace(/-+/g, "-")
            .replace(/^[_\-]+/, "")
            .replace(/[_\-]+$/, "")
            .slice(0, 64);
        name = "-" + name;
    } else {
        name = "";
    }
    name = "screenshot" + name + "-" + Date.now() + ".png";
    return name;
}

function getPixelRatio() {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
    return dpr / bsr;
}

const runPopup = function () {
    const promiseTab = new Promise((resolve) => {
        chrome.tabs.getSelected(null, function (tab) {
            // chrome.tabs.setZoom(tab.id, 1.0);
            debugger;
            var loaded = false;
            var PIXEL_RATIO = getPixelRatio();

            var cfg = {
                url: tab.url,
                filename: generateFilename(tab.url),
                totalWidth: tab.width,
                totalHeight: tab.height,
                pixelRatio: PIXEL_RATIO,
                originalWidth: tab.width,
                margins: {
                    top: 15,
                    bottom: 70,
                    left: 40,
                    right: 40,
                },
                titleBar: {
                    height: 36,
                    leftWidth: 120,
                    rightWidth: 18,
                    offset: 130,
                    data:
                        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKYAAABIBAMAAACO6JO2AAAAMFBMVEUAAADi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uK7u7u+vr7d3d3R0dHV1dXJycnGxsaIaBZ/AAAACHRSTlMAmVXeBuQD1x8rCiYAAAEKSURBVFjD7ZY9CsJAEIUH8QQWYqnYWFtZ2ngDL+BRFISFiP3GvzqCtfEGWlnrCfQIgoVGjCvMyDQPEZlXfjw+yGYzEyIq1loOlXWpTVnqDplmpuw5bMpEVAE7+0QFh06VOnBnlxpw5yAcJ/BAW3DnkBw+5jSnOc35685onyyvqYhkpjujs79nnkpIZrrz6B9ZSUhkunPkn9nKiDPdecjLMxFxpjujJC/HqYg4U51j/8pJRJypzk0oT0TEmerchfJURJypzksoL0TEmepMQjkWEWeq079FRJx91Yl/dvw7wt8l/J3Hf5v4GYKfdfiZjN8d+B2n7+L4moqIsz/7DzGnOc1pTnOa05yfcwPXnJ+jWkDKqgAAAABJRU5ErkJggg==",
                },
                shadow: {
                    color: "rgba(0, 0, 0, 0.5)",
                    blur: 50 * PIXEL_RATIO,
                    offsetX: 0,
                    offsetY: 20 * PIXEL_RATIO,
                    edgeOffset: 3, // shrinks the box generating the shadow so it doesn't show in the rounded the titleBar corners
                },
            };

            resolve(capturePage(cfg))
        })
    })

    return promiseTab.then(res => res)
};
