$(document).ready(function () {

    document.onclick = function(){
        $("#qrcode").css("display","none");
    }
    tableMove();
    getDemand();
});
var left = window.parent.document.getElementById("leftFrame");
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

//移除left选中
function removeActive(left) {
    var tt = left.contentDocument.body.querySelectorAll(".menuson li a");
    for (var i = 0, size = tt.length; i < size; i++) {
        tt[i].parentElement.className = "";
    }
}

function closed(id) {//关闭
    $.ajax({
        type: "post",
        headers: {"Authorization": "Token " + window.localStorage.token},
        url: "http://www.houxiaopang.com/api/v1.1/adminsystem/changeprojectstatus",
        data: {
            project_id: id,
            status: 1
        },
        success(res){
            if (res.code === 0) {
                alert("操作成功。");
                location.reload();
            } else {
                alert("操作失败")
            }
        },
        error(e){
            alert("错误:" + JSON.stringify(e));
        }
    })
}

function looksc(e,id){
    e.stopPropagation()
    $('#qrcode').html("")
    $('#qrcode').qrcode({width: 100,height: 100,text:"https://m.houxiaopang.com/demand/#/workproject/share/"+id});
    //open();
    $('#qrcode').css("display","block")
}
function stop(id) {//终止项目
    $.ajax({
        type: "post",
        headers: {"Authorization": "Token " + window.localStorage.token},
        url: "http://www.houxiaopang.com/api/v1.1/adminsystem/changeprojectstatus",
        data: {
            project_id: id,
            status: 2
        },
        success(res){
            if (res.code === 0) {
                alert("操作成功。");
                location.reload();
            } else {
                alert("操作失败")
            }
        },
        error(e){
            alert("错误:" + JSON.stringify(e));
        }
    })
}
//获取需求
function getDemand() {
    $.ajax({
        type: "get",
        headers: {"Authorization": "Token " + window.localStorage.token},
        url: "http://www.houxiaopang.com/api/v1.1/adminsystem/seeallprojects",
        success(data){
            if (data.code === 0) {
                var applyer = data.data.project;
                if (applyer.length === 0) {
                    alert("无项目");
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
        			<tr><td><div><!--<span onclick="javascript:window.top.open('http://houxiaopang.com/demand/#/detail/${item.demand_id}');" class="colorSpan">详情</span>-->
        			<span onclick="closed(${item.id})" class="colorSpan">关闭</span> <span onclick="stop(${item.id})" class="colorSpan">终止</span> <span onclick="looksc(event,${item.id})" class="colorSpan">查看进度</span>
                    　</div></td></tr>`;
                    operate.innerHTML += stroperate;
                    var strcontent = `
        					<tr>
        							<td><div>
                                            <span>${item.id}</span>
                                        </div></td>
                                    <td><div>
                                            <span>${item.title}</span>
                                        </div></td>
                                    <td><div>
                                            <span>${item.client}/${item.client_id}</span>
                                        </div></td>
                                    <td><div>
                                            <span>${item.designer}/${item.designer_id}</span>
                                        </div></td>
                                    <td><div>
                                            <span>${item.cat }</span>
                                        </div></td>
                                    <td><div>
                                            <span>${item.isNew }</span>
                                        </div></td>
                                    <td><div>
                                            <span>${item.status }</span>
                                        </div></td>  
                                    <td><div>
                                            <span>${item.starttime }</span>
                                        </div></td>
                                     <td><div>
                                            <span>${item.up_time}</span>
                                        </div></td>   
                                </tr>
        	`;
                    tbody.innerHTML += strcontent;
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
