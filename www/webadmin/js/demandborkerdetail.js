$(document).ready(function () {
    tableMove();
});
//全选 取消全选
function checkAll() {
    var inputs = $(".checkbox input");
    var quanxuan = inputs.get(0);
    if (quanxuan.checked) {
        for (var i = 1, size = inputs.length; i < size; i++) {
            inputs.get(i).checked = true;
        }
    } else {
        for (var i = 1, size = inputs.length; i < size; i++) {
            inputs.get(i).checked = false;
        }
    }
}

//检查复选框
function checkCheck() {
    var inputs = $(".checkbox input");
    var quanxuan = inputs.get(0);
    for (var i = 1, size = inputs.length; i < size; i++) {
        if (!inputs.get(i).checked) {
            quanxuan.checked = false;
            return;
        }
    }
    quanxuan.checked = true;

}

//表格拖拽和滚动条事件（以及初始化）
function tableMove() {
    var table = document.getElementsByTagName("thead")[0];
    var tbody = document.getElementsByTagName("tbody")[0];
    var tbodyDiv = document.getElementById("context");
    var content = document.getElementById("content");
    var titleDiv = document.getElementById('title');
    var tableScroll = document.getElementById("tableScroll");
    //初始化表格
    tbodyDiv.style.width = titleDiv.offsetWidth + "px";
    tableScroll.parentNode.style.width = titleDiv.offsetWidth + "px";
    tableScroll.style.width = table.offsetWidth + "px";
    //为表格添加滚动条事件
    content.onscroll = function () {
        titleDiv.scrollLeft = content.scrollLeft;
        tbodyDiv.scrollLeft = content.scrollLeft;
    }
    var p = {
        x: 0,
        b: false,
        div: null,
        oldx: 0,
        index: 0
    }

    //为表头的每一个列都添加拖拽功能
    for (var j = 0; j < table.rows[0].cells.length; j++) {
        var i = table.rows[0].cells[j].children[0].children[1];
        i.onmousedown = function () {
            p.x = event.clientX;
            p.b = true;
            p.div = this.parentNode;
            p.oldx = p.div.offsetWidth;
            p.index = p.div.parentNode.cellIndex;
            event.preventDefault();
        }
        document.onmousemove = function () {
            if (p.b) {
                var m = (parseInt(event.clientX) - parseInt(p.x) + parseInt(p.oldx));
                p.div.style.width = m + "px";
                tableScroll.style.width = table.offsetWidth + "px";
                for (var n = 0, ms = tbody.rows.length; n < ms; n++) {
                    tbody.rows[n].cells[p.index].childNodes[0].style.width = m
                        + "px";
                }
            }

        }
        document.onmouseup = function () {
            if (p.b) {
                p.b = false;
            }

        }
    }
}
//取消推荐点击事件
function removebroker(id) {
    $(".tip").fadeIn(200);
    removedesi_id = id;
}
//取消推荐设计师
function reomvebrokerdesi() {
    $.ajax({
        url: 'http://www.houxiaopang.com/api/v1.1/adminsystem/pricelist/remove',
        type: 'post',
        headers: {"Authorization": "Token " + window.localStorage.token},
        data: {
            'recom_id': removedesi_id,
        },
        success(data){
            if (data.code === 0) {
                alert("成功！");
                location.reload();
            } else {
                alert("失败！");
                location.reload();
            }
        },
        error(){
            alert("失败！");
            location.reload();
        }
    });
}


//获取已推荐设计师
function getbrokerdesigner(demand_id) {
    $.ajax({
        type: "get",
        url: "http://www.houxiaopang.com/api/v1.1/adminsystem/pricelist_tmp",
        data: {
            'demand_id': demand_id,
        },
        success(data){
            if (data.code === 0) {
                var applyer = data.data;
                if (applyer.length === 0) {
                    alert("无已推荐设计师！");
                    return;
                }
                var tbody = document.getElementsByTagName("tbody")[0];
                var operate = document.getElementById("operate");
                var checktfoot = document.getElementById("checktfoot");
                checktfoot.innerHTML = "";
                tbody.innerHTML = "";
                operate.innerHTML = "";
                operate.innerHTML = "";
                applyer.forEach(function (item, index) {
                    var strchecktfoot = `
        			 <tr><td><div class="checkbox"><input style="margin-top: 10px;" type="checkbox"
        			  onclick="checkCheck()"></div></td></tr>`;
                    checktfoot.innerHTML += strchecktfoot;
                    var stroperate = `
        			<tr><td><div><span onclick="removebroker(${item.recom_id})" class="colorSpan">取消推荐</span> <span class="colorSpan">绑定</span></div></td></tr>`;
                    operate.innerHTML += stroperate;
                    var strcontent = `
        					<tr>
        							<td><div>
                                            <span>${item.recom_id}</span>
                                        </div></td>
                                    <td><div>
                                            <span>${item.nickname}</span>
                                        </div></td>
                                    <td><div style="width: 380px;">
                                            <span>${item.ideas}</span>
                                        </div></td>
                                    <td><div>
                                            <span>${item.howmuch }</span>
                                        </div></td>
                                    <td><div>
                                            <span>${item.howlong }</span>
                                        </div></td>
                                    <td><div>
                                            <span>${item.tel }</span>
                                        </div></td>
                                    <td><div>
                                        <span onclick="jump(this)" url="${item.worklist}" style="cursor: pointer;">查看作品</span>
                                    </div></td>
                                </tr>
        	`;
                    tbody.innerHTML += strcontent;
                    $("[zhecon]").each(function () {
                        $(this).text($(this).attr("zhecon"));
                    });
                });
            } else {
                alert("获取数据失败！");
            }
        },
        error(){
            alert("获取数据失败！");
        }

    });
}
function jump(that) {
    var url = that.getAttribute("url");
    if (url === "") {
        alert("未上传作品");
        return;
    }
    open("/webadmin/showimg.html?imgs=" + url);
}