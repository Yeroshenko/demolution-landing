let resizeCheckVideo = {};



let videoBlock = document.querySelector('.intro__video--block'),
    videoPreview = document.querySelector('.intro__video--block-preview'),
    videoBlockSource = videoBlock.querySelector('source'),
    videoBlockSourceList = videoBlockSource.dataset,
    videoBlockSourceListArray = [];

let counterForVideo = 0;
for (let i in videoBlockSourceList) {
    videoBlockSourceListArray[counterForVideo] = i;
    counterForVideo++;
}



function resizeVideoCheckFunc(windowSize, resizeCheckVideo, size, minWidth, maxWidth) {
    if(windowSize >= size && (resizeCheckVideo[String(size)] == false || resizeCheckVideo[String(size)] == undefined)) {
        resizeCheckVideo[String(size)] = true;

        minWidth(); // > size

    } else if(windowSize <= size && (resizeCheckVideo[String(size)] == true || resizeCheckVideo[String(size)] == undefined)) {
        resizeCheckVideo[String(size)] = false;
        maxWidth(); // < size

    }
}

let loadVideoCheck = false;
export default function videoResizeCheck(windowSize) {



        for (let i = videoBlockSourceListArray.length - 1; i >= 0; i--) {

            if (videoBlockSourceListArray[i].slice(4) != 'start') {

                if (Number(videoBlockSourceListArray[i].slice(4)) > windowSize && resizeCheckVideo['video-init'] == undefined) {

                    for (let j = i; j >= 1; j--) {
                        resizeCheckVideo[videoBlockSourceListArray[j].slice(4)] = false;
                    }

                    loadVideo(videoBlock, videoBlockSource, videoBlockSourceList[videoBlockSourceListArray[i]]);
                    resizeCheckVideo['video-init'] = true;
                    resizeCheckVideo['start'] = false;

                    break;

                }
                else if (resizeCheckVideo['video-init'] != undefined) {

                    resizeVideoCheckFunc(windowSize, resizeCheckVideo, Number(videoBlockSourceListArray[i].slice(4)),

                        function () {

                            if(loadVideoCheck == false) {
                                loadVideoCheck = true;

                                loadVideo(videoBlock, videoBlockSource, videoBlockSourceList[videoBlockSourceListArray[i-1]]);

                            }

                        },
                        function () {
                            loadVideo(videoBlock, videoBlockSource, videoBlockSourceList[videoBlockSourceListArray[i]]);
                    });

                }

            } else if (videoBlockSourceListArray[i].slice(4) == 'start' && resizeCheckVideo['video-init'] == undefined) {
                resizeCheckVideo['video-init'] = true;
                resizeCheckVideo['start'] = true;
                loadVideo(videoBlock, videoBlockSource, videoBlockSourceList[videoBlockSourceListArray[i]]);


                for (let j = 1; j < videoBlockSourceListArray.length; j++) {

                    resizeCheckVideo[videoBlockSourceListArray[j].slice(4)] = true;
                }


            }

        }





    loadVideoCheck = false;
}

