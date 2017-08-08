import os
from flask import current_app
import unittest
from app import create_app,db
# setUp() 和 tearDown() 方法分别在各测试前后运行,并且名字以 test_ 开头的函数都作为测试执行。

class FlaskTestCase(unittest.TestCase):
    def setUp(self):
        #测试
       # self.app = create_app('testing')
        self.app = create_app()
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_app_exists(self):
        self.assertFalse(current_app is None)
