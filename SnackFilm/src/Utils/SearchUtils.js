import * as constants from '../Constants/Constants';

export async function getXmlDoc(query) {
    return new Promise( (resolve, reject) => {
        var listFilms = [];
        query = encodeURIComponent(encodeURIComponent(query)) + '.html';
        var url = constants.URL_YQL + constants.YQL_QUERY_SELECT + query + constants.YQL_QUERY_AND + constants.YQL_RULES;
        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.onload = () => {
            if (request.status === 200) {
                var stringData = request.responseText.toString();
                var id = 0
                stringData = stringData.replace(/&lt;/g, "<");
                stringData = stringData.replace(/&gt;/g, ">");
                stringData = stringData.replace(/\r\n/g, "\n");
                var lines = stringData.split("\n");
                for (var i = 0; i < lines.length; i++) {
                    var link = '', title, number, img;
                    var str = lines[i];
                    if (str.indexOf('href') !== -1 && str.indexOf('class=""') === -1) {
                        link = str.substring(str.indexOf('http'), str.indexOf('html') + 4)
                        title = str.substring(str.indexOf('title') + 7, str.indexOf('">'))

                    }
                    if (str.indexOf('class="time"') !== -1) {
                        number = str.substring(str.indexOf('time') + 6, str.indexOf('</'))
                    }
                    if (str.indexOf('class="thumb lazyload img-responsive"') !== -1) {
                        img = str.substring(str.indexOf('src') + 5, str.indexOf('"\/>'))
                    }
                    if (link.length > 0) {
                        listFilms.push({
                            link: link,
                            title: title,
                            number: number,
                            img: img,
                            id: id
                        });
                        id++;
                    }

                }
                resolve(listFilms);
            } else {
                reject("Error 2");
            }
        }
        request.send();
    });
}