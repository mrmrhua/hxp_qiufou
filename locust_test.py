from locust import HttpLocust, TaskSet, task

class UserBehavior(TaskSet):
    def on_start(self):
        """ on_start is called when a Locust start before any task is scheduled """
        pass
  #      self.login()

#    def login(self):
 #       self.client.post("/login", {"username":"ellen_key", "password":"education"})

    # @task(2)
    # def getuptoken(self):
    #     self.client.get('/api/v1.0/get/workgallery?cat=0&page=1')

    # @task(1)
    # def postapplyform(self):
    #     self.client.post('/api/v1.0/apply/form',{'name:ding'})
    @task(1)
    def index(self):
        self.client.get("index")


class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    min_wait = 1000
    max_wait = 5000
    host = 'houxiaopang.com'