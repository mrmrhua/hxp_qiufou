
    /* var console = window.console || { log: function () {} },
     $alert = $('.docs-alert'),
     $message = $alert.find('.message'),
     showMessage = function (message, type) {
     $message.text(message);

     if (type) {
     $message.addClass(type);
     }

     $alert.fadeIn();

     setTimeout(function () {
     $alert.fadeOut();
     }, 3000);
     };*/

    // Demo
    // -------------------------------------------------------------------------

    function cropper(vu) {
      var vu =vu;
        var $image = $('#img-container > img'),
            $dataX = $('#dataX'),
            $dataY = $('#dataY'),
            $dataHeight = $('#dataHeight'),
            $dataWidth = $('#dataWidth'),
            $dataRotate = $('#dataRotate'),
            options = {
                // strict: false,
                // responsive: false,
                // checkImageOrigin: false

                // modal: false,
                // guides: false,
                // highlight: false,
                //background: false,

                // autoCrop: false,
                // autoCropArea: 0.5,
                //dragCrop: false,
                //movable: false,
                //resizable: false,
                // rotatable: false,
                // zoomable: false,
                // touchDragZoom: false,
                // mouseWheelZoom: false,

                 /*minCanvasWidth: 320,
                 minCanvasHeight: 180,
                 minCropBoxWidth: 160,
                 minCropBoxHeight: 90,
                 minContainerWidth: 320,
                 minContainerHeight: 180,
*/
                // build: null,
                // built: null,
                // dragstart: null,
                // dragmove: null,
                // dragend: null,
                // zoomin: null,
                // zoomout: null,

                aspectRatio: 4 / 3,
                preview: '#img-preview',
                crop: function (data) {
                    $dataX.val(Math.round(data.x));
                    $dataY.val(Math.round(data.y));
                    $dataHeight.val(Math.round(data.height));
                    $dataWidth.val(Math.round(data.width));
                    $dataRotate.val(Math.round(data.rotate));
                }
            };

        $image.on({
            'build.cropper': function (e) {
            },
            'built.cropper': function (e) {
            },
            'dragstart.cropper': function (e) {
            },
            'dragmove.cropper': function (e) {
            },
            'dragend.cropper': function (e) {
            },
            'zoomin.cropper': function (e) {
            },
            'zoomout.cropper': function (e) {
            }
        }).cropper(options);
        // Methods
        $(document.body).on('click', '[data-method]', function () {
            var data = $(this).data(),
                $target,
                result;

            if (data.method) {
                data = $.extend({}, data); // Clone a new one

                if (typeof data.target !== 'undefined') {
                    $target = $(data.target);

                    if (typeof data.option === 'undefined') {
                        try {
                            data.option = JSON.parse($target.val());
                        } catch (e) {
                            console.log(e.message);
                        }
                    }
                }
                result = $image.cropper(data.method, data.option);
                if (data.method === 'getCroppedCanvas') {
                    var cropedimg = document.getElementById("cropedimg");
                    cropedimg.nextElementSibling.style.display = "block";
                    vu.modelshow= false;
                    //todo 上传图片
                    var pic = result.toDataURL();
                    var uploadpic = pic.split(",")[1];
                    $.ajax({
                        type: 'GET',
                        url: 'http://www.houxiaopang.com/api/v1.0/apply/uptoken',
                        success(data){
                          //赋值给alllist数组,
                          var url = "http://upload.qiniu.com/putb64/-1";
                          var xhr = new XMLHttpRequest();
                          //var xhrget = new XMLHttpRequest();
                          // var obj;
                          xhr.onreadystatechange=function(){
                            if (xhr.readyState==4){
                              var data = eval("("+xhr.responseText+")");
                              vu.ablumfile = "http://work.houxiaopang.com/"+data.key;
                              cropedimg.src = pic;
                              cropedimg.nextElementSibling.style.display = "none";
                            }
                          }
                          xhr.open("POST", url, true);
                          xhr.setRequestHeader("Content-Type", "application/octet-stream");
                          xhr.setRequestHeader("Authorization", "UpToken "+data.uptoken);
                          xhr.send(uploadpic);
                        },
                    });
                }
                if ($.isPlainObject(result) && $target) {
                    try {
                        $target.val(JSON.stringify(result));
                    } catch (e) {
                        console.log(e.message);
                    }
                }

            }
        }).on('keydown', function (e) {

            switch (e.which) {
                case 37:
                    e.preventDefault();
                    $image.cropper('move', -1, 0);
                    break;

                case 38:
                    e.preventDefault();
                    $image.cropper('move', 0, -1);
                    break;

                case 39:
                    e.preventDefault();
                    $image.cropper('move', 1, 0);
                    break;

                case 40:
                    e.preventDefault();
                    $image.cropper('move', 0, 1);
                    break;
            }

        });


        // Import image
        var $inputImage = $('#inputImage'),
            URL = window.URL || window.webkitURL,
            blobURL;

        if (URL) {
            $inputImage.change(function () {
                var files = this.files,
                    file;

                if (files && files.length) {
                    file = files[0];

                    if (/^image\/\w+$/.test(file.type)) {
                        blobURL = URL.createObjectURL(file);
                        $image.one('built.cropper', function () {
                            URL.revokeObjectURL(blobURL); // Revoke when load complete
                        }).cropper('reset', true).cropper('replace', blobURL);
                        $inputImage.val('');
                    } else {
                        //showMessage('Please choose an image file.');
                        alert('请选择图片文件')
                    }
                }
            });
        } else {
            $inputImage.parent().remove();
        }
        // Options
        /*$('.docs-options :checkbox').on('change', function () {
         var $this = $(this);

         options[$this.val()] = $this.prop('checked');
         $image.cropper('destroy').cropper(options);
         });


         // Tooltips
         $('[data-toggle="tooltip"]').tooltip();*/

    }

