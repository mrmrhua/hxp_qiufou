import os

#  环境变量APP_CONFIG_FILE为环境的配置文件
# Global variables
SEX = {
    'MALE' : 1,
    'FEMALE' : 2,
    'UNKNOW' : 0
}

#apply status
APPLYSTATUS = {
    'APPLYING':0,
    'CHECKING': 1,
    'NOTPASS': -1,
    'PASS': 2
}

qiniu_access_key = os.environ.get('QINIU_access_key')
qiniu_secret_key = os.environ.get('QINIU_secret_key')