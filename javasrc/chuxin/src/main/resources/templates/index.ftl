<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
	<meta name="sharecontent" data-msg-img="http://image.houxiaopang.com/chuxin/chuxinlogo.png" data-msg-title="初心资本-2018年会" data-msg-content="" data-msg-callBack=""/>
    <link rel="shortcut icon" href='http://image.houxiaopang.com/chuxin/chuxinlogo.png'>
    <title>初心资本-2018年会</title>
    <style type="text/css">
        * {
            margin: 0 0;
            padding: 0 0;
            box-sizing: border-box;
        }

        html, body {
            height: 100%;
            overflow: hidden;
            background: #0C0927;
        }

        .myfont {
            font-size: 16px;
        }

        .minfont {
            font-size: 14px;
        }

        .content {
            height: 600%;
            top: 0;
            transition: .5s;
            width: 100%;
            overflow: hidden;
            position: relative;
        }

        .warp {
            height: 16.666%;
            width: 100%;
            overflow: hidden;
            position: relative;
        }

        .desc {
            height: 30%;
            display: flex;

            justify-content: center;
            padding-left: 50px;
            flex-direction: column;
            color: #fff;
            line-height: 30px;
        }

        .donghua {
            margin: 0 auto;
            height: 100%;
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 2;
        }

        .ballwarp {
            z-index: 2;
            position: absolute;
            bottom: 0;
            height: 18%;
        }

        .ball {
            animation: runball 20s linear infinite;
        }

        @keyframes runball {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(-360deg);
            }
        }

        .bg_fi {
            background: url('images/bg5.jpg') no-repeat;
            background-size: cover;
        }

        .bg_tu {
            display: flex;
            align-items: flex-end;
            justify-content: center;
        }

        .bg_tr {
            background: url('images/bg3.png') no-repeat;
            background-size: cover;
        }

        .bg_fo {
            background: url('images/bg4.png') no-repeat;
            background-size: cover;
        }

        .bg_s {
            background: url('images/bg6.png') no-repeat;
            background-size: 100% 100%;
        }

        img {
            display: block;
        }

        .inv {
            position: absolute;
            display: flex;
            width: 100%;
            justify-content: center;
            align-items: center;
            top: 0;
            flex-direction: column;
            bottom: 0;
        }

        .wenan {
            line-height: 30px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            color: rgb(155, 155, 180);
            font-weight: 600;
        }

        .s_content {
            min-height: 400px;
            height: 65%;
            width: 82%;
            margin: 12% auto 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            color: rgb(146, 92, 62);
            line-height: 40px;
        }

        i {
            width: 30px;
            height: 30px;
            display: inline-block;
            background: url('images/box.png') no-repeat;
            background-size: 100%;
            margin-left: 5px;
        }

        .submit {
            font-size: 24px;
            display: inline-block;
            width: 95px;
            height: 43px;
            background: url('images/submit.png') no-repeat;
            background-size: 100%;
            display: flex;
            justify-content: center;
        }

        .submit:active {
            opacity: 0.6;
        }

        .choose {
            display: flex;
            position: absolute;
            width: 40px;
            height: 40px;
            background: url('images/choose.png') no-repeat;
            background-size: 100%;
            top: -12px;
            left: 21px;
        }

        .choose_active {
            display: none;
        }

        #zz, #yjz {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: 1024;
            background: #fff;
        }

        .line, .line_dian {
            margin-left: 5%;
            display: flex;
            align-items: center;
            color: #fff;
            margin-top: 3%;
            z-index: 5;
        }

        .line_dian > .left {
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }

        .left {
            flex-shrink: 0;
            width: 80px;
        }

        @keyframes left_an {
            form {
                margin-left: -140px;
                opacity: 0;
            }
            to {
                margin-left: 0px;
                opacity: 1;
            }
        }

        .left_active {
            margin-left: -140px;
            opacity: 0;
        }

        .right {
            flex-shrink: 0;
        }

        @keyframes right_an {
            form {
                margin-left: 287px;
                opacity: 0;
            }
            to {
                margin-left: 0px;
                opacity: 1;
            }
        }

        .right_active {
            margin-left: 287px;
            opacity: 0;
        }

        .rightmore {
            display: flex;
            justify-content: center;
            flex-direction: column;
            flex-shrink: 0;
            width: 140px;
        }

        .dian {
            width: 16px;
            background: #24A6C8;
            height: 16px;
            border-radius: 50%;
            display: inline-block;
            float: right;
            margin-right: 12px;
            z-index: 5;
        }

        .mindian {
            width: 12px;
            background: #DDD723;
            height: 12px;
            border-radius: 50%;
            display: inline-block;
            float: right;
            margin-right: 14px;
            z-index: 5;
        }

        .minline {
            position: absolute;
            top: 10px;
            bottom: -10px;
            left: 79px;
            width: 1px;
            background: #24A6C8;
        }

        .bigfont {
            font-size: 20px;
        }

        @media screen and (max-width: 370px) {
            .myfont {
                font-size: 14px;
            }

            .minfont {
                font-size: 12px;
            }

            .left {
                flex-shrink: 0;
                width: 60px;
            }

            .dian {
                width: 12px;
                background: #24A6C8;
                height: 12px;
                border-radius: 50%;
                display: inline-block;
                float: right;
                margin-right: 6px;
                z-index: 5;
            }

            .bigfont {
                font-size: 16px;
            }

            .mindian {
                width: 8px;
                background: #DDD723;
                height: 8px;
                border-radius: 50%;
                display: inline-block;
                float: right;
                margin-right: 8px;
                z-index: 5;
            }

            .minline {
                position: absolute;
                top: 10px;
                bottom: -10px;
                left: 63px;
                width: 1px;
                background: #24A6C8;
            }
        }

        .table {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            list-style: none;
            width: 85%;
            padding-bottom: 5%;
        }

        .table > li {
            width: 15%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 4%;
        }

        .table > li > img {
            max-width: 46%;
        }

        .desc_text, .bg_tr_text, .bg_fo_text {
            opacity: 0;
            margin-left: 50px;
            width: 100%;
            z-index: 4;
        }

        .audio {
            position: fixed;
            right: 20px;
            top: 20px;
            width: 30px;
            height: 30px;
            background: url('images/audio.png');
            background-size: cover;
            z-index: 1024;
        }

        .relative {
            position: relative;
            line-height: 2.2;
            width: 100%;
            height: 100%;
            color: #fff;
            display: flex;
            align-items: center;
            flex-direction: column;
        }

        .star {
            height: 100%;
        }

        #page2ab {
            display: flex;
            height: 40%;
            width: 100%;
            flex-direction: column;
            margin-top: 10%;
            position: relative;
        }

        #page2ab > p {
            width: 75%;
            display: flex;
            align-items: center;
            height: 44px;
        }

        #page2ab > p:nth-of-type(1) {
            align-self: flex-end;
        }

        #page2ab > p:nth-of-type(2) {
            align-self: flex-start;
            margin-left: 5%;
            margin-top: 10%;
        }

        #page2ab > p:nth-of-type(3) {
            align-self: flex-end;
            margin-top: 25%;
        }

        .faguang {
            text-shadow: 1px 1px 15px #f7edac;
        }

        #t1 {
            opacity: 0;
            transition: 1s;
        }

        #t2 {
            opacity: 0;
            transition: 1s;
        }

        #t3 {
            opacity: 0;
            transition: 1s;
        }

        #p1 {
            align-self: flex-start;
            opacity: 0;
            margin-left: 0%;
            width: 80%;
        }

        @keyframes p_an1 {
            form {
                margin-left: 0%;
                opacity: 0;
            }
            to {
                margin-left: 15%;
                opacity: 1;
            }
        }

        @keyframes p_an2 {
            form {
                margin-right: -30%;
                opacity: 0;
            }
            to {
                margin-right: -15%;
                opacity: 1;
            }
        }

        #p2 {
            align-self: flex-end;
            opacity: 0;
            margin-right: -30%;
            width: 80%;
        }

        .loader {
            background: #000;
            background: radial-gradient(#222, #000);
            bottom: 0;
            left: 0;
            overflow: hidden;
            position: fixed;
            right: 0;
            top: 0;
            z-index: 99999;
        }

        .loader-inner {
            bottom: 0;
            height: 60px;
            left: 0;
            margin: auto;
            position: absolute;
            right: 0;
            top: 0;
            width: 100px;
        }

        .loader-line-wrap {
            -webkit-animation: spin 2000ms cubic-bezier(.175, .885, .32, 1.275) infinite;
            animation: spin 2000ms cubic-bezier(.175, .885, .32, 1.275) infinite;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            height: 50px;
            left: 0;
            overflow: hidden;
            position: absolute;
            top: 0;
            -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
            width: 100px;
        }

        .loader-line {
            border: 4px solid transparent;
            border-radius: 100%;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            height: 100px;
            left: 0;
            margin: 0 auto;
            position: absolute;
            right: 0;
            top: 0;
            width: 100px;
        }

        .loader-line-wrap:nth-child(1) {
            -webkit-animation-delay: -50ms;
            animation-delay: -50ms;
        }

        .loader-line-wrap:nth-child(2) {
            -webkit-animation-delay: -100ms;
            animation-delay: -100ms;
        }

        .loader-line-wrap:nth-child(3) {
            -webkit-animation-delay: -150ms;
            animation-delay: -150ms;
        }

        .loader-line-wrap:nth-child(4) {
            -webkit-animation-delay: -200ms;
            animation-delay: -200ms;
        }

        .loader-line-wrap:nth-child(5) {
            -webkit-animation-delay: -250ms;
            animation-delay: -250ms;
        }

        .loader-line-wrap:nth-child(1) .loader-line {
            border-color: hsl(0, 80%, 60%);
            height: 90px;
            width: 90px;
            top: 7px;
        }

        .loader-line-wrap:nth-child(2) .loader-line {
            border-color: hsl(60, 80%, 60%);
            height: 76px;
            width: 76px;
            top: 14px;
        }

        .loader-line-wrap:nth-child(3) .loader-line {
            border-color: hsl(120, 80%, 60%);
            height: 62px;
            width: 62px;
            top: 21px;
        }

        .loader-line-wrap:nth-child(4) .loader-line {
            border-color: hsl(180, 80%, 60%);
            height: 48px;
            width: 48px;
            top: 28px;
        }

        .loader-line-wrap:nth-child(5) .loader-line {
            border-color: hsl(240, 80%, 60%);
            height: 34px;
            width: 34px;
            top: 35px;
        }

        @-webkit-keyframes spin {
            0%, 15% {
                -webkit-transform: rotate(0);
                transform: rotate(0);
            }
            100% {
                -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
            }
        }

        @keyframes spin {
            0%, 15% {
                -webkit-transform: rotate(0);
                transform: rotate(0);
            }
            100% {
                -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
            }
        }
    </style>
</head>
<body>
<div id="zz" class="loader">
    <div class="loader-inner">
        <div class="loader-line-wrap">
            <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
            <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
            <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
            <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
            <div class="loader-line"></div>
        </div>
    </div>
</div>
<audio id="audio" loop="loop" src="images/audio.mp3"></audio>
<div id="content" class="content">
    <div onclick="playmp3()" id="audioicon" class="audio">
    </div>
    <div class="warp">
        <div class="desc bigfont" style="line-height: 2.2;z-index: 4;">
            <p class="desc_text">向前跑</p>
            <p class="desc_text">未来迷人绚烂总在向我呼唤</p>
            <p class="desc_text">我想在那片最蓝的大海扬帆</p>
        </div>
        <div class="donghua">
            <div style="position: relative;width: 100%;height: 100%;">
                <img src="images/1.gif" style="position: absolute;width: 100%;
					height: 100%;left: 0;top: 0;">
            </div>
        </div>
        <div class="ballwarp">
            <img class="ball" style="width: 100%;z-index: 1" src="images/ball.png">
        </div>
    </div>
    <div class="warp bg_tu">
        <img style="width: 100%;height: 100%;" src="images/bg2.gif">
        <div style="position: absolute;width: 100%;height: 100%;z-index: 10;top: 0;left: 0;">
            <div class="myfont relative">
                <div class="bigfont" style="display: flex;flex-direction: column;width: 100%;margin-top: 5%;">
                    <p id="p1">带着赤子的骄傲，</p>
                    <p id="p2">我愿不停的探索</p>
                </div>
                <div id="page2ab">
                    <canvas id="canva" style="position: absolute;top:0;left: 0;"></canvas>
                    <p><span class="star"><img src="images/star.png" style="height: 100%;"></span><span id="t1">2016回归初心，探索未来</span>
                    </p>
                    <p><span id="t2">2017触手可及的未来</span><span class="star"><img src="images/star.png"
                                                                               style="height: 100%;"></span></p>
                    <p class="bigfont"><span class="star"><img src="images/star.png" style="height: 100%;"></span><span
                            id="t3" class="faguang">2018 追梦赤子心</span></p>
                </div>
            </div>
        </div>
    </div>
    <div class="warp bg_tr">
        <div class="bigfont" style="margin:100% 0 0 46px;line-height: 2.2;width: 100%;height: 100%;color: #fff;">
            <p class="bg_tr_text">2018</p>
            <p class="bg_tr_text">我们邀请您</p>
            <p class="bg_tr_text">一起追梦</p>
        </div>
    </div>
    <div class="warp bg_fo"
         style="display:flex;justify-content:space-around;flex-direction: column;align-items: center;">
        <img style="width: 100%;" src="images/yqh.png">
        <div class="bigfont" style="color: #fff;line-height: 2.2;text-align: center;">
            <p class="bg_fo_text">回首来时路，感谢各位的陪伴</p>
            <p class="bg_fo_text">如今我们已携手同行30余位小伙伴</p>
            <p class="bg_fo_text">诚邀您参加初心资本2018年会</p>
        </div>
        <ul class="table">
            <li><img src="images/logo/1.png"></li>
            <li><img src="images/logo/2.png"></li>
            <li><img src="images/logo/3.png"></li>
            <li><img src="images/logo/4.png"></li>
            <li><img src="images/logo/5.png"></li>
            <li><img src="images/logo/6.png"></li>

            <li><img src="images/logo/7.png"></li>
            <li><img src="images/logo/8.png"></li>
            <li><img src="images/logo/9.png"></li>
            <li><img src="images/logo/10.png"></li>
            <li><img src="images/logo/11.png"></li>
            <li><img src="images/logo/12.png"></li>

            <li><img src="images/logo/13.png"></li>
            <li><img src="images/logo/14.png"></li>
            <li><img src="images/logo/15.png"></li>
            <li><img src="images/logo/16.png"></li>
            <li><img src="images/logo/17.png"></li>
            <li><img src="images/logo/18.png"></li>

            <li><img src="images/logo/19.png"></li>
            <li><img src="images/logo/20.png"></li>
            <li><img src="images/logo/21.png"></li>
            <li><img src="images/logo/22.png"></li>
            <li><img src="images/logo/23.png"></li>
            <li><img src="images/logo/24.png"></li>

            <li><img src="images/logo/25.png"></li>
            <li><img src="images/logo/26.png"></li>
            <li><img src="images/logo/27.png"></li>
            <li><img src="images/logo/28.png"></li>
            <li><img src="images/logo/29.png"></li>
            <li><img src="images/logo/30.png"></li>
        </ul>
    </div>
    <div class="warp bg_fi" style="display: flex;flex-direction: column;justify-content: center;">
        <div style="height: 10%;display: flex;justify-content: center;">
            <img style="height: 100%;max-width: 100%;" src="images/text.png">
        </div>
        <div style="position: relative;">
            <div style="position: absolute;left: 0;top: 0;width: 100%;height: 100%;">
                <div style="position: relative;width: 100%;height: 100%;">
                    <div class="minline"></div>
                    <p class="line_dian">
							<span class="left myfont">&nbsp;
								<span class="dian"></span>
							</span>
                        <span class="right right_active myfont">　</span>
                    </p>
                    <p class="line_dian">
							<span class="left myfont">&nbsp;
								<span class="dian"></span>
							</span>
                        <span class="right right_active myfont">　</span>
                    </p>
                    <p class="line_dian">
							<span class="left myfont">&nbsp;
								<span class="dian"></span>
							</span>
                        <span class="right right_active myfont">　</span>
                    </p>
                    <p class="line_dian">
							<span class="left myfont">&nbsp;
								<span class="dian"></span>
							</span>
                        <span class="right right_active myfont">　</span>
                    </p>
                    <p class="line_dian">
							<span class="left minfont">&nbsp;
								<span class="mindian"></span>
							</span>
                        <span class="right right_active minfont">　</span>
                    </p>
                    <p class="line_dian">
							<span class="left myfont">&nbsp;
								<span class="mindian"></span>
							</span>
                        <span class="right right_active minfont">　</span>
                    </p>
                    <p class="line_dian">
							<span class="left myfont">&nbsp;
								<span class="dian"></span>
							</span>
                        <span class="right right_active myfont">　</span>
                    </p>
                    <p class="line_dian">
							<span class="left minfont">&nbsp;
								<span class="mindian"></span>
							</span>
                        <span class="right right_active minfont">　</span>
                    </p>
                    <p class="line_dian">
							<span class="left myfont">&nbsp;
								<span class="mindian"></span>
							</span>
                        <span class="right right_active minfont">　</span>
                    </p>
                    <p class="line_dian">
							<span class="left myfont">&nbsp;
								<span class="mindian"></span>
							</span>
                        <span class="right right_active minfont">　</span>
                    </p>
                    <p class="line_dian">
							<span class="left myfont">&nbsp;
								<span class="mindian"></span>
							</span>
                        <span class="right right_active minfont">　</span>
                    </p>
                    <p class="line_dian">
							<span class="left myfont">&nbsp;
								<span class="mindian"></span>
							</span>
                        <span class="right right_active minfont">　</span>
                    </p>
                    <p class="line_dian">
							<span class="left myfont">&nbsp;
								<span class="mindian"></span>
							</span>
                        <span class="right right_active minfont">　</span>
                    </p>
                    <p class="line_dian">
							<span class="left myfont">&nbsp;
								<span class="dian"></span>
							</span>
                        <span class="right right_active myfont">　</span>
                    </p>
                    <p class="line_dian">
							<span class="left myfont">&nbsp;
								<span class="dian"></span>
							</span>
                        <span class="right right_active myfont">　</span>
                    </p>
                </div>
            </div>
            <p class="line">
                <span class="left left_active myfont">10:00</span>
                <span class="right right_active myfont">投资人会议</span>
            </p>
            <p class="line">
                <span class="left left_active myfont">13:30</span>
                <span class="right right_active myfont">签到</span>
            </p>
            <p class="line">
                <span class="left left_active myfont">14:00</span>
                <span class="right right_active myfont">初心三周年主题演讲-追梦赤子心</span>
            </p>
            <p class="line">
                <span class="left left_active myfont">14:30</span>
                <span class="right right_active myfont">行业分享</span>
            </p>
            <p class="line">
                <span class="left left_active myfont"></span>
                <span class="right right_active minfont">[90后大叔大妈不懂的赤子心]-00后现象分享</span>
            </p>
            <p class="line">
                <span class="left left_active myfont">14:40</span>
                <span class="right right_active minfont">[与时代共振]-互联网时代中的小镇青年</span>
            </p>
            <p class="line">
                <span class="left left_active myfont">14:50</span>
                <span class="right right_active myfont">CEO论坛</span>
            </p>
            <p class="line">
                <span class="left left_active myfont"></span>
                <span class="right right_active minfont">不一样的社交体验-[厉害了word机器人男友]</span>
            </p>
            <p class="line">
                <span class="left left_active myfont">15:05</span>
                <span class="right right_active minfont">[看见未来的光]-初心科技力量</span>
            </p>
            <p class="line">
                <span class="left left_active myfont">15:35</span>
                <span class="right right_active minfont">初心X企名片-[科学捕捉独角兽]</span>
            </p>
            <p class="line">
                <span class="left left_active myfont">15:50</span>
                <span class="right right_active minfont">[梦想照进现实]-海归创业现状</span>
            </p>
            <p class="line">
                <span class="left left_active myfont">16:20</span>
                <span class="right right_active minfont">[让孩子聪明追梦]-智能时代教育行业的变革</span>
            </p>
            <p class="line">
                <span class="left left_active myfont">16:50</span>
                <span class="right right_active minfont">[风口之下]-新零售与线上娱乐化</span>
            </p>
            <p class="line">
                <span class="left left_active myfont">17:30</span>
                <span class="right right_active myfont">初心嘉年华</span>
            </p>
            <p class="line">
                <span class="left left_active myfont">19:00</span>
                <span class="right right_active myfont">初心晚宴</span>
            </p>
        </div>
    </div>
    <div id='last' class="warp bg_s">
        <div class="s_content bigfont">
            <div class="top">
                <div>时间：1月13日</div>
                <div>地点： <span class="myfont">诺金酒店（北京市将台路甲2号）</span></div>
            </div>
            <div class="center">
                <div>填写信息</div>
                <div style="display: flex;align-items: center;">
                    <div>姓名：</div>
                    <div style="border-bottom: 1px solid #925c3e;">
                        <input type="text" name="name"
                               style="border:none;outline: none;background: transparent;width: 120px;font-size: 16px;color: rgb(146, 92, 62);padding: 0 10px;">
                    </div>
                </div>
                <div style="display: flex;align-items: center;">
                    <div>所属机构：</div>
                    <div style="border-bottom: 1px solid #925c3e;">
                        <input type="text" name="address"
                               style="border:none;outline: none;background: transparent;width: 120px;font-size: 16px;color: rgb(146, 92, 62);padding: 0 10px;">
                    </div>
                </div>
                <div style="display: flex;align-items: center;">
                    <div>手机号：</div>
                    <div style="border-bottom: 1px solid #925c3e;">
                        <input type="number" name="tel"
                               style="border:none;outline: none;background: transparent;width: 120px;font-size: 16px;color: rgb(146, 92, 62);padding: 0 10px;">
                    </div>
                </div>
            </div>
            <div class="bottom" style="display: flex;flex-direction: column;align-items: center;">
                <div style="display: flex;align-items: center;flex-direction: row;">
                    参加晚宴：
                    <span onclick="choose(this,1)"
                          style="position: relative;display: flex;align-items: center;">是 <i></i>
							<span class="choose"></span>
						</span>
                    <span onclick="choose(this,0)"
                          style="position: relative;display: flex;align-items: center;margin-left: 20px;">否 <i></i>
						<span class="choose choose_active"></span>
						</span>
                </div>
                <div class="minfont">晚宴名额有限，报名后需获得主办方确认。</div>
                <div style="margin-top: 10%;">
                    <span onclick="submit()" class="submit">提交</span>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    document.getElementById("last").style.height = window.innerHeight + "px";
    var zhedata = {
        joined: 1
    };
    var submiting = false;
    var canvas = {
        data: {
            can: null,
            ctx: null,
            list: [],
            k: [],
            fp: null,
            sp: null,
            tp: null,
            leng: []
        },
        init: function () {
            this.data.can = document.getElementById("canva")
            this.data.can.height = this.data.can.parentElement.offsetHeight;
            this.data.can.width = this.data.can.parentElement.offsetWidth;
            this.data.ctx = this.data.can.getContext('2d')
            this.data.list = document.getElementsByClassName("star");
            this.data.fp = {
                y: this.data.list[0].offsetTop + 22,
                x: this.data.list[0].offsetLeft + 22
            }
            this.data.sp = {
                y: this.data.list[1].offsetTop + 22,
                x: this.data.list[1].offsetLeft + 22
            }
            this.data.tp = {
                y: this.data.list[2].offsetTop + 22,
                x: this.data.list[2].offsetLeft + 22
            }
            this.data.k[0] = (this.data.fp.y - this.data.sp.y) / (this.data.fp.x - this.data.sp.x)
            this.data.k[1] = (this.data.sp.y - this.data.tp.y) / (this.data.sp.x - this.data.tp.x)
            this.data.leng[0] = Math.sqrt((this.data.fp.y - this.data.sp.y) * (this.data.fp.y - this.data.sp.y) + (this.data.fp.x - this.data.sp.x) * (this.data.fp.x - this.data.sp.x))
            this.data.leng[1] = Math.sqrt((this.data.sp.y - this.data.tp.y) * (this.data.sp.y - this.data.tp.y) + (this.data.sp.x - this.data.tp.x) * (this.data.sp.x - this.data.tp.x))

        },
        start: function () {
            this.drawLine(this.data.fp, this.data.sp);
            this.drawLine(this.data.sp, this.data.tp);
            setTimeout(function () {
                var p1 = document.getElementById("p1");
                p1.style.cssText = "animation:p_an1 .5s linear;animation-fill-mode: forwards;";
                setTimeout(function () {
                    var p1 = document.getElementById("p2");
                    p1.style.cssText = "animation:p_an2 .5s linear;animation-fill-mode: forwards;";
                    setTimeout(function () {
                        var p1 = document.getElementById("t1");
                        p1.style.opacity = '1';
                        setTimeout(function () {
                            var p1 = document.getElementById("t2");
                            p1.style.opacity = '1';
                            setTimeout(function () {
                                var p1 = document.getElementById("t3");
                                p1.style.opacity = '1';
                            }, 500)
                        }, 500)
                    }, 500)
                }, 500)
            }, 500)

        },
        drawLine: function (start, end) {
            this.data.ctx.strokeStyle = "#fff";
            this.data.ctx.lineWidth = this.data.lineWidth;
            this.data.ctx.beginPath();
            this.data.ctx.moveTo(start.x, start.y);
            this.data.ctx.lineTo(end.x, end.y);
            this.data.ctx.closePath();
            this.data.ctx.stroke();
        }
    }
    canvas.init()
    var audio = {
        data: {
            audio: null,
            audioicon: null,
            run: false,
        },
        init: function () {
            this.data.audioicon = document.getElementById("audioicon");
            this.data.audio = document.getElementById("audio");
        },
        statr: function () {//开始
            if (this.data.audio.paused) {
                this.data.audio.play();
                // 开始动画
                this.data.run = true;
                this.data.audioicon.style.animation = 'runball 5s linear infinite';
            }
        },
        pase: function () {//暂停
            if (!this.data.audio.paused) {
                this.data.audio.pause();
                // 暂停动画
                this.data.run = false;
                this.data.audioicon.style.animation = 'none'
            }
        }
    }
    audio.init();

    function playmp3() {
        if (audio.data.run) {
            audio.pase()
        } else {
            audio.statr()
        }
    }


    function page1_dh() {
        document.getElementById("zz").style.display = 'none';
        var i = 0;
        var desc_text = document.getElementsByClassName("desc_text");
        var desc_text_tim = setInterval(function () {
            desc_text[i].style.cssText = "animation:right_an .5s linear;animation-fill-mode: forwards;";
            i++;
            if (i === desc_text.length) {
                clearInterval(desc_text_tim);
            }
        }, 500);
    }
    var next = {
        data: {
            content: null,
            y: 0,
            page: 0,
            isrun: false,
            page5end: false
        },
        init: function () {
            this.data.content = document.getElementById("content");
            this.funcs();
        },
        funcs: function () {
            var that = this;
            this.data.content.ontouchstart = function (e) {
                that.data.y = e.touches[0].pageY
            }
            this.data.content.ontouchmove = function (e) {
                e.preventDefault()
            }
            this.data.content.ontouchend = function (e) {
                var change = e.changedTouches[0].pageY - that.data.y;
                if (change > 30) {
                    if (!that.data.isrun) {
                        that.data.isrun = true;
                        that.up()
                        setTimeout(function () {
                            that.data.isrun = false;
                        }, 500)
                    }
                } else if (change < -30) {
                    if (!that.data.isrun) {
                        that.data.isrun = true;
                        that.down()
                        setTimeout(function () {
                            that.data.isrun = false;
                        }, 500)
                    }
                }
            }
        },
        down: function () {
            if (this.data.page < 6) {
                this.data.page++;
                nextpage(this.data.page)
            }
        },
        up: function () {
            if (this.data.page > 0) {
                this.data.page--;
                nextpage(this.data.page)
            }
        }
    }
    next.init();
    function nextpage(page) {
        var content = document.getElementById("content");
        if (page === 0) {
            content.style.top = '0';
        } else if (page === 1) {
            content.style.top = '-100%'
            canvas.start();
        } else if (page === 2) {
            content.style.top = '-200%'
            var i = 0;
            var desc_text = document.getElementsByClassName("bg_tr_text");
            var desc_text_tim = setInterval(function () {
                desc_text[i].style.cssText = "animation:right_an .5s linear;animation-fill-mode: forwards;";
                i++;
                if (i === desc_text.length) {
                    clearInterval(desc_text_tim);
                }
            }, 500);
        } else if (page === 3) {
            content.style.top = '-300%'
            var i = 0;
            var desc_text = document.getElementsByClassName("bg_fo_text");
            var desc_text_tim = setInterval(function () {
                desc_text[i].style.cssText = "animation:right_an .5s linear;animation-fill-mode: forwards;";
                i++;
                if (i === desc_text.length) {
                    clearInterval(desc_text_tim);
                }
            }, 500);
        } else if (page === 4) {
            content.style.top = '-400%'
            if (!next.data.page5end) {
                page5_dh();
            }
        } else if (page === 5) {
            content.style.top = '-500%'
        }
    }

    function choose(that, join) {
        var chooses = document.getElementsByClassName("choose");
        for (var i = 0, size = chooses.length; i < size; i++) {
            chooses[i].className = "choose choose_active"
        }
        that.children[1].className = "choose"
        zhedata.joined = join
    }

    function page5_dh() {
        var a = document.getElementsByClassName("line");
        var asize = a.length;
        var i = 0;
        var tim = setInterval(function () {
            a[i].children[0].style.cssText = "animation:left_an .5s linear;animation-fill-mode: forwards;";
            a[i].children[1].style.cssText = "animation:right_an .5s linear;animation-fill-mode: forwards;";
            i++;
            if (i === asize) {
                clearInterval(tim);
                next.data.page5end = true;
            }
        }, 100);
    }

    function submit() {
        if (submiting) return;
        zhedata.name = document.querySelector("input[name='name']").value;
        if (!zhedata.name || zhedata.name.trim() === "") {
            alert("请填写姓名！")
            return
        }
        zhedata.address = document.querySelector("input[name='address']").value;
        if (!zhedata.address || zhedata.address.trim() === "") {
            alert("请填写所属机构！")
            return
        }
        zhedata.tel = document.querySelector("input[name='tel']").value;
        if (!zhedata.tel || zhedata.tel.trim() === "") {
            alert("请填写手机号！")
            return
        }
        var data = []
        for (var i in zhedata) {
            data.push(i + "=" + zhedata[i])
        }
        data = data.join("&")
        submiting = true;
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                var response = ajax.responseText;
                if (response == 0) {
                    alert("提交成功！")
                } else {
                    alert("提交失败，请重试！");
                }
                submiting = false;
            } else if (ajax.readyState === 4 && ajax.status !== 200) {
                alert("网络拥挤，请稍后再试。");
                submiting = false;
            }
        };
        ajax.open('post', '/chuxin/api', true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8")
        ajax.send(data);
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.addEventListener("WeixinJSBridgeReady", function () {
            page1_dh();
            audio.statr();
        }, false);
    });
</script>
</body>
</html>