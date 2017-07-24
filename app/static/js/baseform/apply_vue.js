/**
 * Created by ding on 17/5/4.
 */
// Vue.config.devtools = true;

    /*
     * 剩余字数统计
     * 注意 最大字数只需要在放数字的节点哪里直接写好即可 如：<var class="word">200</var>
     */
    function statInputNum(textArea, numItem) {
        var max = numItem.text(),
            curLength;
        textArea.attr("maxlength", max);
        curLength = textArea.val().length;
        numItem.text(max - curLength);
        textArea.on('input propertychange', function () {
            var a = max - $(this).val().length;
            numItem.text(a);
            if (a == '0') {
                numItem.get(0).style.color = "#f00";
            } else {
                numItem.get(0).style.color = "";
            }
        });
    }



var imgthumb = {
    props: ['each_file', 'index'],
    template: `
            <section class="up-section loading fl">
                <span class="up-span"></span>
                <img class='close-upimg' src="http://image.houxiaopang.com/baseform/a7.png" @click="delconfirm">
                <img class='up-img up-opcity' v-bind:src="getfileurl">
           </section>
        `,
    computed: {
        getfileurl: function () {
            return window.URL.createObjectURL(this.each_file)
        }
    },
    mounted: function () {
        //todo 文件上传
        uploader.addFile(this.each_file);
    },
    methods: {
        delconfirm: function () {
            app.file_L.splice(this.index, 1); //remove the first
            app.img_url.splice(this.index, 1);
            var num = app.file_L.length;
            if (num < 9) {
                $("#z_file").show();
            }
        }
    }
}

var app;
app = new Vue({
    el: '#mainwin',
    data: {
        name: null,
        sex: null,
        born: null,
        province: null,
        city: "",
        tel: null,
        email: null,
        qq: null,
        wx: null,
        school: null,
        major: null,
        graduate: null,
        seen1: true,
        seen2: false,
        seen3: false,
        seen4: false,
        category: [],
        category1: [],
        category2: [],
        category3: [],
        worktime: [],
        identity: null,
        project_text: null,
        blog_url: null,
        file_L: [],
        img_url: [],
        loaderseen: false,
        applystatus: null,
        isapplyed: true
    },
    methods: {
        showform1: function () {
            this.seen1 = true;
            this.seen2 = false;
            this.seen3 = false;
            this.seen4 = false;
            window.scrollTo(0, 0);

        }, /*valid_form1:function () {
         this.seen1 = false;
         this.seen2 = true;

         },*/
        valid_form1: function () {
            var that = this;
            var validator = $("#form").validate({
                submitHandler: function (form) {
                    that.showform2();
                },
                errorPlacement: function (error, element) {
                    error.appendTo(element.parent());
                },
                rules: {
                    name: "required",
                    sex: "required",
                    born: {
                        required: true,
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    tel: {
                        required: true,
                        maxlength: 11,
                        minlength: 11
                    },
                    school: "required",
                    major: "required",
                    graduate: {
                        required: true,
                        number: true,
                        maxlength: 4,
                        minlength: 4
                    },
                },
                messages: {
                    name: "*必填",
                    sex: "*必填",
                    born: {
                        required: "*必填",
                    },
                    tel: {
                        required: "*必填",
                        maxlength: "*格式错误",
                        minlength: "*格式错误"
                    },
                    email: {
                        required: "*必填",
                        email: "*格式错误"
                    },
                    school: "*必填",
                    major: "*必填",
                    graduate: {
                        required: "*必填",
                        number: "*格式错误",
                        maxlength: "*格式错误",
                        minlength: "*格式错误"
                    },
                },
            });
        },
        showform2: function () {
            this.city = "";
            this.email = $("[name='email']").eq(0).val();
            var a = $("#city-picker-search").find("a");
            this.city += a.text();
            this.seen2 = true;
            this.seen1 = false;
            this.seen3 = false;
            this.seen4 = false;
            window.scrollTo(0, 0);
        },
        valid_form2: function () {
            var worktype = $("input[name='category']:checked");
            if (worktype.length == 0) {
                alert("请勾选擅长的类型");
                return;
            }
            var checkedTIme = $("input[name='worktime']:checked");
            if (checkedTIme.length == 0) {
                alert("请勾选'可工作时间'");
                return;
            }
            var checkedIden = $("input[name='identity']:checked");
            if (checkedIden.length == 0) {
                alert("请勾选'工作状态'");
                return;
            }
            this.showform3();
        },
        showform3: function () {
            this.seen3 = true;
            this.seen2 = false;
            this.seen1 = false;
            window.scrollTo(0, 0);
        },
        showform4: function () {
            this.seen4 = true;
            this.seen2 = false;
            this.seen1 = false;
            this.seen3 = false;
            window.scrollTo(0, 0);
        },
        appendfile: function (file) {
            this.file_L.push(file);
        },
        submitapply: function () {

            // agree checked
            var isAgree = $("input[name='agreement']:checked");
            if (isAgree.length == 0) {
                alert("请勾选'我已知晓并同意用户协议'");
                return;
            }
            if (this.file_L.length == 0) {
                alert("请上传文件");
                return;
            }


            //get checked
            var cat = $("input[name='category']:checked");
            for (var i = 0; i < cat.length; i++) {
                this.category.push(cat[i].value);
            }

            var wor = $("input[name='worktime']:checked");
            for (var i = 0; i < wor.length; i++) {
                this.worktime.push(wor[i].value);
            }

            var iden = $("input[name='identity']:checked");
            if (iden[0] != null) {
                this.identity = iden[0].value;
            }

            $.ajax({
                url: 'http://houxiaopang.com/api/v1.0/apply/form',
                type: 'POST',
                async: true,
                data: {
                    name: $.trim(app.name),
                    tel: $.trim(app.tel),
                    email: $.trim(app.email),
                    city: $.trim(app.city),
                    qq: $.trim(app.qq),
                    wx: $.trim(app.wx),
                    school: $.trim(app.school),
                    major: $.trim(app.major),
                    graduate: $.trim(app.graduate),
                    category: JSON.stringify(app.category),
                    worktime: JSON.stringify(app.worktime),
                    identity: app.identity,
                    project_text: $.trim(app.project_text),
                    blog_url: $.trim(app.blog_url),
                    img_url: JSON.stringify(app.img_url),
                },
                timeout: 5000,    //超时时间
                dataType: 'json',
                success: function (result) {
                    console.log(result);
                    console.log(app);
                    app.showform4();
                },
                error: function (data) {
                    alert('网络拥挤,请稍后再试');
                }
            });
        }

    },
    components: {
        'imgthumb': imgthumb,
    },
    mounted: function () {
        that = this;
        $.get("/api/v1.1/apply/status", function (data) {
        if (data.code == 0) {
            app.applystatus = data.data.applystatus;
            if (app.applystatus == "1" || app.applystatus == "-1") {
                app.showform4();
            }
        } else {
            location.href = "/";
        }
        });


        //初始化城市选择栏
         $('#city-picker-search').cityPicker({
        dataJson: cityData,
        renderMode: true,
        search: true,
        autoSelected: true,
        keyboard: true,
        storage: false,
        shorthand: true
    });


        //初始化字数统计框
        //先选出 textarea 和 统计字数 dom 节点
        var textArea = $("#textarea");
        var word = $("#wordwrap");
        //调用
        statInputNum(textArea, word);

        // 初始化勾选框
        $('input').iCheck({
            checkboxClass: 'icheckbox_square-red',
            radioClass: 'iradio_square-red',
            increaseArea: '20%' // optional
        });

        // 初始化文件上传组件
        registerup();
    }
});



