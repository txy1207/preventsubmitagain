function ajax(parmas) {
    if (parmas && typeof parmas == "object") {
        return new Promise((resolve, reject) => {
            //1.创建一个Ajax对象
            let xmlHttp = new XMLHttpRequest();
            //2.准备要发送的数据
            //3.设置请求方式和目标地址
            xmlHttp.open(parmas.type, parmas.url);
            if (parmas.data && parmas.type == "get") {
                xmlHttp.open(parmas.type, parmas.url + "?" + parmas.data);
            } else {
                xmlHttp.open(parmas.type, parmas.url);
            }
            //4.设置数据编码
            // if (parmas.contentType == "urlencoded") {
            //     xmlHttp.setRequestHeader("content-Type", "application/x-www-form-urlencoded");
            // } else if (parmas.contentType == "json") {
            //     xmlHttp.setRequestHeader("content-Type", "application/json");
            // }
            switch (parmas.contentType) {
                case 'urlencoded':
                    xmlHttp.setRequestHeader("content-Type", "application/x-www-form-urlencoded");
                    break;
                case 'json':
                    xmlHttp.setRequestHeader("content-Type", "application/json");
                    break;
            }
            //5.绑定onreadystatechange事件，监控Ajax对象请求过程
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    let data = xmlHttp.responseText;
                    switch (parmas.dataType) {
                        case 'json':
                            data = JSON.parse(xmlHttp.responseText);
                            resolve(data);
                            break;
                        case 'xml':
                            data = xmlHttp.responseXML;
                            resolve(data);
                            break;
                        default:
                            resolve(data);
                    }
                }
            }
            if (parmas.data && parmas.type == "post") {
                xmlHttp.send(parmas.data);
            } else {
                xmlHttp.send();
            }
        })
    }
}