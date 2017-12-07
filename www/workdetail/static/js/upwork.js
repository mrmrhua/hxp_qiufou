var uploader
function registerup(func) {
// 上传文件相关
  uploader = Qiniu.uploader({
    runtimes: 'html5,flash,html4',
    browse_button: 'tt',
    flash_swf_url: 'https://cdn.staticfile.org/plupload/2.1.1/Moxie.swf',  //引入flash，相对路径
    chunk_size: '4mb',

    uptoken_url: 'https://www.houxiaopang.com/api/v1.0/apply/uptoken',
    multi_selection: !(mOxie.Env.OS.toLowerCase() === "ios"),
    filters: {
      max_file_size: '10mb',
      prevent_duplicates: false,
      //Specify what files to browse for
      mime_types: [
        {title: "Image files", extensions: "jpg,gif,png,jpeg"}
      ]
    },
    domain: 'work.houxiaopang.com',
    get_new_uptoken: true,
    // downtoken_url: '/downtoken',
    unique_names: true,
    // save_key: true,
    auto_start: true,
    log_level: 5,
    init: {
      'FilesAdded': function (up, files) {
      },
      'BeforeUpload': function (up, file) {

      },
      'UploadProgress': function (up, file) {
      },
      'UploadComplete': function () {

      },
      'FileUploaded': function (up, file, info) {
        if (info['status'] == '200') {
          var tmp = JSON.parse(info['response']);
          //vu.$set(vu.img_url, vu.img_index++, 'http://work.houxiaopang.com/' + tmp.key);
          //alert('http://work.houxiaopang.com/' + tmp.key)
          func('http://work.houxiaopang.com/' + tmp.key);
        }
      },

      'Error': function (up, err, errTip) {
        alert('上传错误:' + errTip);
      }
    }
  });
}

