       //  var WorkDetail = Vue.extend({
       // // Vue.component('work_detail',{
       //   //  props:['url'],
       //      data:function () {
       //          return {
       //               url: 'http://oogj672bg.bkt.clouddn.com/o_1be7j5ikj16sl1kv4e1d6gee929.jpg',
       //              seen:true
       //          }
       //      },
       //     mounted:function () {
       //         var that = this;
       //        // var pa =  this.$parent;
       //        //  pa.$on('toggle',function (a) {
       //        //      that.seen = a;
       //        //  })
       //        //  bus.$on('toggle',function (a) {
       //        //      that.seen = a;
       //        //  })
       //     },
       //      template:`{
       //           <div v-if="seen" class="fs_gallery workdetail">
       //              <div class="fs_gallery_prev">
       //
       //              </div>
       //              <div class="fs_gallery_next">
       //
       //              </div>
       //              <div class="fs_gallery_close" v-on:click="closedetail">
       //              </div>
       //              <div class="fs_gallery_container">
       //                  <div class="fs_gallery_img">
       //                    <img v-bind:src='url'>
       //                  </div>
       //                  <div class="fs_gallery_feedback"></div>
       //              </div>
       //           </div>
       //      }`,
       //     methods:{
       //         closedetail:function () {
       //             return
       //         }
       //     }
       //  })
Vue.config.devtools = true


       var bus = new Vue();

           Vue.component('work_list',{
               props:['work','workindex','msindex'],
               data:function(){
                   return {
                    thumb_url: this.work.work_url+ '?imageView2/2/w/116/h/86'
                   }
               },
                template:`
                <router-link tag="li" v-bind:to="'/detail/'+work.id" class="imgli" @click.native="setprev">
                    <img class="thumbimg" v-bind:src="thumb_url"><tt></tt>
                       <!--<span v-text="prev"></span>-->
                </router-link>
                `,
                methods:{
                    //第几个milestone+第几个img
                    setprev:function () {
                        var para = {msindex:this.msindex, workindex:this.workindex};
                        bus.$emit('setpagebtn',para);
                    }
               }

           })


         //  Vue.component('milestone_list',
            var MiLi = {
               props:['milestone_info','index'],
               data:function() {
                   var t_front = new Date(this.milestone_info.due_time);
                   var t_now = new Date();
                   var is_before = false;
                   if (t_now > t_front) {
                       is_before = true;
                       now_order = parseInt(this.milestone_info.ordinpro);
                   }
                   mis = this.milestone_info.due_time.split(' ');

                   $.ajax({
                       url:'/api/v1.0/project/milestone/work',
                       dataType:'json',
                       	async: false,
                        timeout:5000,
                       type:"GET",
                       data:{
                           pro: pro_id,
                            ordinpro:parseInt(this.milestone_info.ordinpro)
                       },
                       success:function(result){
                           work_li = result.work;
                       }
                   });

                   return {
                       mis_day: mis[0],
                       mis_time: mis[1],
                       mis_before: is_before,
                       works: work_li,
                       imgindex:0,
                       imglength:work_li.length,
                       i:4
                   };
               },
               template: `
               <li>
                    <time class="cbp_tmtime" v-bind:datetime="milestone_info.due_time"><span v-bind:class='{activemile_time:mis_before}' v-text='mis_day'></span> <span v-bind:class='{activemile_time:mis_before}' v-text='mis_time'></span></time>
                    <div  class="cbp_tmicon cbp_tmicon-phone"  v-bind:class='{activemile_icon:mis_before}'></div>
                    <div class="cbp_tmlabel">
                        <div class="img-gallery">
                            <i class="picSildeLeft" v-on:click="slideFront(index)"><img src="../../static/images/project/ico/picSlideLeft.gif"/></i>
                            <i class="picSildeRight" v-on:click="slideNext(index)"><img src="../../static/images/project/ico/picSlideRight.gif"/></i>
                            <div class='cSlideUl'>
                                <ul v-bind:id="'sul'+index" class="list-unstyled">
                                    <work_list v-for='(work,workindex) in works' v-bind:work='work' :workindex="workindex" :msindex="index"></work_list>
                                </ul>

                            </div
                            >
                        </div>
                        <div class="cbp_tmstatus">
                            <p>客户查阅状态: <span v-if='milestone_info.cl_status == 0'>未查阅</span><span v-else>已查阅</span></p>
                        </div>
     
                    </div>
              
                </li>
                
                        `,
                   methods: {
                       slideNext: function (index) {
                           if (this.i >= this.imglength) {
                               return false;
                           }

                           this.i++;
                           $("#sul" + this.index).animate({"left": "-=142px"}, 200);
                       },
                       slideFront: function (index) {
                           if (this.i <= 4) {
                               return false;
                           }
                           this.i--;
                           $("#sul" + this.index).animate({"left": "+=142px"}, 200);
                       },
                       // prev_up_2:function (works,workindex) {
                       //
                       //     for(t in works){
                       //         t.id;
                       //     }
                       // }
                   },
                   mounted:function(){
                       var l = this.imglength;
                       $("#sul"+this.index+" tt").each(function(e) {
                              var str = (e + 1) + "/" + l;
                                 $(this).html(str)
                        });
                       // bus.$on('prev_up_1',function () {
                       //     $bus.$emit('pre')
                       // })
                       //add wlist
                       this.$root.wlist.push(this.works);
                   }
           }

            var WorkDetail={
                data:function(){
                    return{
                        url:""
                    }
                },
                template:`
                
                    <div class="fs_gallery_container">
                        <div class="fs_gallery_img">
                          
                          <img v-bind:src="url">
                        </div>
                        <div class="fs_gallery_feedback"></div>
                    </div>
                   
               <!-- </div>-->
                `,
                beforeRouteEnter(to,from,next){
                    vm.detailseen = true;
                     $.ajax({
                            url:'/api/v1.0/project/workdetail/'+to.params.id,
                            type:'GET',
                            async: false,

                           timeout:5000,    //超时时间
                            dataType:'json',
                            success:function(result) {
                                next(WorkDetail=> {
                                    WorkDetail.url = result.work_url;
                                })
                            }
                        })
                },
                beforeRouteUpdate(to,from,next){
                    wd = this;
                     $.ajax({
                            url:'/api/v1.0/project/workdetail/'+to.params.id,
                            type:'GET',
                            async: false,

                           timeout:5000,    //超时时间
                            dataType:'json',
                            success:function(result) {
                                    wd.url = result.work_url;
                                    next();
                            }
                        })
                },
                beforeRouteLeave(to,from,next){
                    vm.detailseen = false;
                    next();
                }
            }


            var FsGallery = {
                // props:['prev_id'],
                data: function () {
                    return {
                        workindex:null,
                        msindex:null
                    }
                },
                template: `    
                    <div class="fs_gallery workdetail" id="fs_gallery">
                        <router-link to="/" tag="div" class="fs_gallery_close" ></router-link>
                        <router-link tag='div' v-if='notfirst' v-bind:to="'/detail/'+getprevid" class="fs_gallery_prev" @click.native="prevone"></router-link>
                         <router-link tag='div' v-if="notlast" v-bind:to="'/detail/'+getnextid" class="fs_gallery_next" @click.native="nextone"></router-link>
                         <p v-text="'prev:'+getprevid"></p>
                         <p v-text="'next:'+getnextid"></p>
                         <p v-text="'index:'+workindex"></p>
             
                         <router-view></router-view>
                    </div>
                    `,
                mounted: function () {
                    var that = this;
                    bus.$once('setpagebtn', para=> {
                        this.workindex = para.workindex;
                        this.msindex = para.msindex;
                    });
                },

                methods: {
                    prevone: function () {
                        this.workindex--;
                    },
                    nextone:function () {
                       this.workindex++;
                    }
                },
                computed:{
                   notfirst:function () {
                       if(this.workindex == null){
                           return true;
                       }
                       else {
                           return this.workindex > 0;
                       }
                   },
                    notlast:function () {
                        if(this.msindex == null) {
                            return true;
                        }
                        else {
                            return this.workindex < (vm.wlist[this.msindex].length - 1);
                        }
                    },
                    getprevid:function () {
                        if(this.workindex == null){
                            return null
                        }
                        else if(this.workindex>0){
                            return vm.wlist[this.msindex][this.workindex - 1].id;
                        }
                    },
                    getnextid:function () {
                        if(this.workindex == null){
                            return null
                        }
                        else if(this.workindex < vm.wlist[this.msindex].length-1){
                            return vm.wlist[this.msindex][this.workindex + 1].id;
                        }
                    }
                }
            }



            const routes = [
                {
                    path:'/detail/:id',component:WorkDetail
                }

            ]
            const router = new VueRouter({
               // mode:'history',
               //  base:'/designer/pm',
                routes,
                scrollBehavior (to, from, savedPosition) {
                    if (savedPosition) {
                        return savedPosition
                    } else {
                        return { x: 0, y: 0 }
                    }
                }

            })


            // st example: 2017-02-21 12:24

           function CheckTime(st,et){
                 var startTime = new Date(st);
                 var endTime = new Date(et);
               //now
               var thisTime = new Date();
               if(thisTime >= startTime){
                   if(thisTime <= endTime){
                       return true;
                   }
               }
               return false;
           }


        var vm = new Vue({
                el:'#cbp_tmtimeline',
                router,
                data:{
                     description :null,
                    milestone_num:0,
                    milestones:null,
                    detailseen:false,
                    prev:5,
                    wlist:[]

                },
                components:{
                    'milestone_list': MiLi,
                    'fsgallery':FsGallery

                },
                created:function(){
                    var that = this;
                     $.ajax({
                            url:'/api/v1.0/project/milestone',
                            type:'GET',
                            async: false,
                            data:{
                                id:pro_id
                            },
                           timeout:5000,    //超时时间
                            dataType:'json',
                            success:function(result) {
                                that.description = result['description'];
                                 that.milestone_num = result['milestone_num'];
                                that.milestones =  result['milestone'];//array
                                            //渲染到界面上
                        }
                     });
                },
                mounted:function(){
                    var that = this;
                    // MiLi.$on('func',function (works) {
                    //     alert('func');
                    //     console.log(works);
                    // })
                    // var that= this;
                    // bus.$on('SetPrev',function(prev){
                    //     that.prev = prev;
                    // })
                    // bus.$on('setworks',function (works) {
                    //     that.wlist.push(works);
                    // })
                    // temp.$on('note',function () {
                    //     alert(this.prev);
                    // })
                    // bus.$on('func',works=>{
                    //     alert('func');
                    // })


                },
                methods:{

                }

            })
