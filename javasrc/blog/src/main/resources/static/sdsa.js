function initPage(total) {
    var ul = document.getElementById("page");
    ul.innerHTML = "<li>上一页</li>";
    if (total <= 10) {
        for (var i = 0; i < total; i++) {
            ul.innerHTML += "<li onclick='getPhones(" + (i + 1) + ")'>" + (i + 1) + "</li>";
        }
    } else {

        if (pageNow > 5 && pageNow < total - 4) {
            for (var i = 1; i < 3; i++) {
                ul.innerHTML += "<li onclick='getPhones(" + i + ")'>" + i + "</li>";
            }
            ul.innerHTML += "<li style='cursor: not-allowed;'>···</li>";
            for (var i = pageNow - 1; i < pageNow + 2; i++) {
                ul.innerHTML += "<li onclick='getPhones(" + i + ")'>" + i + "</li>";
            }
            ul.innerHTML += "<li style='cursor: not-allowed;'>···</li>";
            for (var i = total - 2; i < total; i++) {
                ul.innerHTML += "<li onclick='getPhones(" + (i + 1) + ")'>" + (i + 1) + "</li>";
            }
        } else if (pageNow > total - 6) {
            for (var i = 1; i < 3; i++) {
                ul.innerHTML += "<li onclick='getPhones(" + i + ")'>" + i + "</li>";
            }
            ul.innerHTML += "<li style='cursor: not-allowed;'>···</li>";
            for (var i = total - 6; i < total; i++) {
                ul.innerHTML += "<li onclick='getPhones(" + (i + 1) + ")'>" + (i + 1) + "</li>";
            }
        } else {
            for (var i = 0; i < 6; i++) {
                ul.innerHTML += "<li onclick='getPhones(" + (i + 1) + ")'>" + (i + 1) + "</li>";
            }
            ul.innerHTML += "<li style='cursor: not-allowed;'>···</li>";
            for (var i = total - 2; i < total; i++) {
                ul.innerHTML += "<li onclick='getPhones(" + (i + 1) + ")'>" + (i + 1) + "</li>";
            }
        }





    }
    ul.innerHTML += "<li style='border: none;'>下一页</li>";
    var lis = ul.getElementsByTagName("li");
    var size = lis.length;
    for (var i = 0; i < size; i++) {
        if (lis[i].innerHTML == pageNow) {
            lis[i].className = "active";
        }
    }
    if (pageNow == 1) {
        lis[0].style.cssText = "cursor: not-allowed;";
    } else {
        lis[0].onclick = function () {
            getPhones(pageNow - 1);
        }
    }
    if (pageNow == total) {
        lis[size - 1].style.cssText = "cursor: not-allowed;border:none;";
    } else {
        lis[size - 1].onclick = function () {
            getPhones(pageNow + 1);
        }
    }
}