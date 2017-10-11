$(document).ready(function () {
    tableMove();
    getNotice();
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

//批量删除
function delChecked() {
    var tbody = document.getElementsByTagName("tbody")[0];
    var ids = new Array();
    var inputs = $(".checkbox input");
    var index = 0;
    for (var i = 1, size = inputs.length; i < size; i++) {
        if (inputs.get(i).checked) {
            ids[index] = tbody.rows[i - 1].cells[0].children[0].children[0].innerHTML;
            index++;
        }
    }
    if (ids.length == 0) {
        parent.showmodel("<div style='width:450px;' class='dialog'><div class='head colorStyle'><span>提示</span><i onclick='closemodel()'></i></div><div class='content' style='height:132px;'><div class='warning'></div><div class='text'><p style='font-size: 20px; color: black;'>请至少选中一条要删除的记录！</p></div><div class='btns' style='margin-top:20px;'><div class='colorStyle' onclick='closemodel()'>确定</div></div></div></div>");
    } else {
        parent.showmodel("<div class='dialog'><div class='head colorStyle'><span>提示</span><i onclick='closemodel()'></i></div><div class='content'><div class='warning'></div><div class='text'><p style='font-size: 20px; color: black;'>你确定要删除选中的记录？</p><p style='color: silver;'>如果是请点击'确定'，否则点击'取消'</p></div><div class='btns'><div class='colorStyle' onclick='javascript:phone.window.delPhone(" + ids + ");'>确定</div><div style='color: black; margin-left: 20px;' onclick='closemodel()'>取消</div></div></div></div>");
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
        var i = table.rows[0].cells[j].childNodes[0].childNodes[2];
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


//获取通知
function getNotice() {
    $.ajax({
        type: "get",
        url: "http://www.houxiaopang.com/api/v1.1/adminsystem/notice/allnotice",
        headers: {"Authorization": "Token " + window.localStorage.token},
        success(data){
            if (data.code === 0) {
                var applyer = data.data.notice;
                if (applyer.length === 0) {
                    alert("无通知");
                    return;
                }
                var tbody = document.getElementsByTagName("tbody")[0];
                var operate = document.getElementById("operate");
                var checktfoot = document.getElementById("checktfoot");
                tbody.innerHTML = "";
                operate.innerHTML = "";
                applyer.forEach(function (item, index) {
                    var strchecktfoot = `
        			 <tr><td><div class="checkbox"><input style="margin-top: 10px;" type="checkbox"
        			  onclick="checkCheck()"></div></td></tr>`;
                    checktfoot.innerHTML += strchecktfoot;
                    var stroperate = `
        			<tr><td><div><span class="colorSpan">操作1</span> <span class="colorSpan"
                    >操作2</span></div></td></tr>`;
                    operate.innerHTML += stroperate;
                    var strcontent = `
        					<tr>
        							<td><div>
                                            <span>${item.id}</span>
                                        </div></td>
                                    <td><div>
                                            <span>${item.title}</span>
                                        </div></td>
                                    <td><div style = "width:443px;">
                                            <span zhecon="${item.content}"></span>
                                        </div></td>
                                    <td><div style = "width:140px;">
                                            <span>${item.up_time }</span>
                                        </div></td>
                                    <td><div>
                                            <span>${item.isread }</span>
                                        </div></td>
                                    <td><div>
                                            <span>${item.receive_num }</span>
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

    })
}
