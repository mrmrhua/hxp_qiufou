function ajax(options) {
    if (!options.type) {
        options.type = "GET"
    }
    options.timeout = 5000;
    //todo options.url 临时去掉https 的 s
    options.url = options.url.replace("www.houxiaopang.com/api/v1.2", "192.168.0.101")
	
    if (options.type === "get" || options.type === "GET") {
        options.url += "?";
        for (var i in options.data) {
            options.url += i + "=" + options.data[i] + "&";
        }
        options.url = options.url.substring(0, options.url.length - 1);
    } else {
        var data = []
        for (var i in options.data) {
            data.push(i + "=" + options.data[i])
        }
        options.data = data.join("&")
    }
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState === 4 && ajax.status === 200) {
            options.success(eval("(" + ajax.responseText + ")"));
        } else if (ajax.readyState === 4 && ajax.status !== 200) {
            options.error(ajax);
        }
    };
    if (options.timeout && typeof(options.timeout) === "number") {
        setTimeout(function () {
            if (ajax.readyState !== 4) {
                ajax.abort();
            }
        }, options.timeout)
    }
    ajax.open(options.type, options.url, true);
    if (options.token) {
        ajax.setRequestHeader("Authorization", "Token " + token);
    }
    if (options.type === "get" || options.type === "GET") {
        ajax.setRequestHeader("Content-type", "application/json;charset=utf-8")
        ajax.send();
    } else {
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8")
        ajax.send(options.data);
    }
}

function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
}