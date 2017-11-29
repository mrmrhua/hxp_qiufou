<!DOCTYPE html>
<html lang="zh_CN">
<head>
    <meta charset="UTF-8">
    <title>博客</title>
    <link rel="stylesheet" href="http://www.houxiaopang.com/static/css/blog.css">
</head>
<body>
<div class="box">
    <div class="navbar">
        <div class="logo-wrapper">
            <span class="logo"></span>
        </div>
        <div class="navbar-li-wrapper">
            <ul class="nav-li">
                <li><a href="http://www.houxiaopang.com">首页</a></li>
                <!--<li onclick="javascript:location.href='http://houxiaopang.com/demand';">发单广场</li>-->
                <li><a href="http://www.houxiaopang.com/workdetail">作品精选</a></li>
                <li class="nav-active"><a href="/blog">设计动态</a></li>
            </ul>
        </div>
    </div>
    <hr style="height: 1px;width:100%;background-color: #DEDEDE;border: none">
    <div class="box-content">
        <div class="content-text">
            <div class="text-header">
                <p>${article.title}</p>
            </div>
            <div class="text-user">
            <#--<p style="float: left;margin-right: 42px">设计师：yoki</p>-->
                <p style="float: left">日期：${article.date?string("yyyy-MM-dd HH:mm:ss")}</p>
            </div>
            <div class="text-content">
                <p>
                    编者按：${article.description}
                    <br><br>
                    ${article.content}
                </p>
            </div>
        </div>
    </div>
</div>
<div id="bar" class="content-right">
    <div onclick="gotop()" style="border: 1px solid #FE6549;height: 50px;width: 50px;cursor: pointer;">
        <i class="iconfont" style="font-size: 21px;line-height: 50px;color: #FE6549;">&#xe614;</i>
    </div>
<#--<div style="border: 1px solid #FE6549;height: 50px;width: 50px;border-top: none;cursor: pointer;">
    <i class="iconfont" style="font-size: 25px;line-height: 50px;color: #FE6549;">&#xe66e;</i>
</div>-->
</div>
<script>
    window.onresize = function () {
        resize();
    }
    resize();

    function resize() {
        var width = window.innerWidth >= 1100 ? (window.innerWidth - 1100) / 2 + 1050 : 1050;
        document.getElementById("bar").style.left = width + "px";
    }

    function gotop() {
        window.scrollTo(0, 0);
    }
</script>
</body>
</html>