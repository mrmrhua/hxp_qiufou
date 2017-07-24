from  flask import  request,jsonify,current_app
from flask_restful import Resource
from flask_login import current_user
from app.common import  support_jsonp

class GetRecent(Resource):
    @support_jsonp
    def get(self):
        return jsonify(
            {
                "work": [
                    {
                        "work_url": "http://work.houxiaopang.com/qile/1.jpg",
                        "category": 0
                    },
                    {
                        "work_url": "http://work.houxiaopang.com/qile/2.jpg",
                        "category": 0
                    },
                    {
                        "work_url": "http://work.houxiaopang.com/qile/3.jpg",
                        "category": 0
                    },
                    {
                        "work_url": "http://work.houxiaopang.com/qile/1.jpg",
                        "category": 0
                    },
                    {
                        "work_url": "http://work.houxiaopang.com/qile/1.jpg",
                        "category": 0
                    },
                    {
                        "work_url": "http://work.houxiaopang.com/qile/2.jpg",
                        "category": 0
                    },
                    {
                        "work_url": "http://work.houxiaopang.com/qile/3.jpg",
                        "category": 0
                    },
                    {
                        "work_url": "http://work.houxiaopang.com/zhaochaoyue/1.jpg",
                        "category": 0
                    },
                    {
                        "work_url": "http://work.houxiaopang.com/zhaochaoyue/2.jpg",
                        "category": 0
                    },
                    {
                        "work_url": "http://work.houxiaopang.com/zhaochaoyue/3.jpg",
                        "category": 0
                    },
                    {
                        "work_url": "http://work.houxiaopang.com/qile/1.jpg",
                        "category": 0
                    }
                ]
            }
        )


