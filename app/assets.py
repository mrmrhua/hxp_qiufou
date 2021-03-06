from flask_assets import Bundle,Environment

bundle = {
    'base_css': Bundle('css/nav.css',
                       filters='cssmin',
                       output='gen/base.css'),
    'help_css': Bundle('css/help/help.css',
                       filters='cssmin',
                       output='gen/help.css'),

    'helpnav_css':Bundle('css/help/help_nav.css',
                       filters='cssmin',
                       output='gen/help.css'),
    'index_js': Bundle('js/index/index.js',
                       filters='jsmin',
                       output='gen/index.js'),
    'index_css': Bundle('css/index/index.css',
                        filters='cssmin',
                        output='gen/index.css'),
    'baseform_css':Bundle('css/baseform/baseform.css',
                         'css/baseform/common.css',
                         'css/baseform/index.css',
                         'css/baseform/red.css',
                          'css/baseform/city-picker.css',
                          filters='cssmin',
                          output='gen/baseform.css'
                         ),
    'baseform_js':Bundle('js/baseform/jquery.validate.js',
                         'js/baseform/upwork.js',
                         'js/baseform/appendimg.js',
                         'js/baseform/citydata.js',
                         'js/baseform/cityPicker-1.1.1.js',
                         'js/baseform/apply_vue.js',
                         'js/baseform/emailAutoComplete.js',
                         filters='jsmin',
                         output='gen/baseform.js'
                         ),
    'workgallery_js':Bundle('js/workgallery/bootstrap-waterfall_dev.js',
                             filters='jsmin',
                         output='gen/workgallery.js'),
    'workgallery_css': Bundle('css/workgallery/style.css',
                             filters='cssmin',
                             output='gen/workgallery.css'),
    'designerlogin_css': Bundle('css/designer_login/qrcommon.css',
                                'css/designer_login/qrlogin.css',
                              filters='cssmin',
                              output='gen/designer_login.css'),

}