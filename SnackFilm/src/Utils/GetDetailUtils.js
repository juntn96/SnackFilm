export async function getDetail(query) {
    return new Promise((resolve, reject) => {
        query = encodeURIComponent(query + '"');
        const queryAnd = encodeURIComponent(' and xpath="//img[@class=\'big_img\'] | //a[@class=\'btn play-now\'] | //li[@class=\'has-color\']')
        var request = new XMLHttpRequest();
        var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20htmlstring%20where%20url%3D%22' + query + queryAnd +'%22&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
        request.open('GET', url);
        request.onload = () => {
            if (request.status === 200) {
                var stringData = request.responseText.toString();
                var img, link;
                var film;
                stringData = stringData.replace(/&lt;/g, "<");
                stringData = stringData.replace(/&gt;/g, ">");
                stringData = stringData.replace(/\r\n/g, "");
                var lines = stringData.split("\n");
                for (var i = 0; i < lines.length; i++) {
                    var str = lines[i];
                    //console.log(str);
                    if (str.indexOf('class="big_img"') !== -1) {
                        img =  str.substring(str.indexOf('src') + 5, str.indexOf('"\/>'))
                    }
                    if (str.indexOf('class="btn play-now"') !== -1) {
                        link = str.substring(str.indexOf('http'), str.indexOf('html') + 4);
                    }
                }
                film = {
                    img: img,
                    link: link,
                }
                resolve(film);
            } else {
                reject('Error');
            }
        };
        request.send();
    });
}