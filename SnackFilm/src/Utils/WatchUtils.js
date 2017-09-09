import * as constant from '../Constants/Constants';

export async function getLink(query) {
    return new Promise((resolve, reject) => {
        var url = constant.URL_YQL + 'select%20*%20from%20htmlstring%20where%20url%3D%22'+ encodeURI(query) + '%22%20and%20xpath%3D%22%2F%2Fdiv%5B%40class%3D\'loadplayer\'%5D%22&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.onload = () => {
            if (request.status === 200) {
                var link;
                var stringData = request.responseText.toString();
                stringData = stringData.replace(/&lt;/g, "<");
                stringData = stringData.replace(/&gt;/g, ">");
                stringData = stringData.replace(/\r\n/g, "\n");
                var lines = stringData.split("\n");
                for (var i = 0; i < lines.length; i++) {
                    var str = lines[i];
                    if (str.indexOf('src="') !== -1) {
                        link = str.substring(str.indexOf('http'), str.indexOf('html') + 4);
                    }
                }
                resolve(link);
            } else {
                reject('Error');
            }
        };
        request.send();
    });
}

export async function getEp(query) {
    return new Promise((resolve, reject) => {
        var url = constant + 'select%20*%20from%20htmlstring%20where%20url%3D%22'+ encodeURI(query) + '%22%20and%20xpath%3D%22%2F%2Fdiv%5B%40class%3D\'loadplayer\'%5D%22&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
        console.log('>>>>>>>>>>>>>>>>>>> ' + query);
        console.log(url);
        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.onload = () => {
            if (request.status === 200) {

            } else {
                reject('Error');
            }
        };
        request.send();
    });
}