(function (RongIM, dependencies, components) {
  'use strict';
  var utils = RongIM.utils;
  var common = RongIM.common;
  let http = RongIM.dataModel._Http; // 请求里面有4个方法
  let $ = dependencies.jQuery;
  let Message = RongIM.dataModel.Message;
  // 挂载日程组件
  components.schedule = function (resolve, reject) {
      var options = {
          name: 'schedule',
          template: 'templates/schedule/schedule.html',
          data: function () {
              return {
                  srcCalendar: null,
                  events: '',
                  quickshow: false,
                  title: '',
                  month: (new Date()).getMonth(), // 当前月份
                  day: (new Date()).getDate(), // 获取当前日期
                  week: (new Date()).getDay(), // 获取星期几,0代表周日
                  // min:this.period.min, // 计算属性,判定是30还是00
                  editshow: false,

                  editTitle: '', // 编辑标题
                  editStartMonth: '',
                  editStartDay: '',
                  editStartWeek: '',
                  editStartTime: '',
                  editEndMonth: '',
                  editEndDay: '',
                  editEndWeek: '',
                  editEndTime: '',
                  editRemind: '', // 提醒
                  editRemark: '', // 留言
                  editRepeatType: '',

                  repeatTypeCapital: ['不重复', '每天', '工作日', '每周', '每两周', '每月', '每年'],
                  remindCapital: ['无提醒', '日程发生时', '五分钟前', '15分钟前', '1小时前', '一天前', '当天(9:00)', '一天前(9:00)', '2天前(9:00)', '1周前(9:00)'],
                  weekCapital: ['日', '一', '二', '三', '四', '五', '六'],
                  eventClickParams: '',
                  // visible: false
              };
          },
          mounted() {
              this.createdInit();
              let vue = this;
              vue.srcCalendar.render(); // 初始化日历，当需要刷新时可以主动调用render
              vue.$emit('chagnedata', vue.srcCalendar.getDate())

              vue.refetchEvents = function (message) {
                  if (message.content.messageName === "ScheduleMessage") {
                      vue.srcCalendar.refetchEvents();
                      console.log("收到消息刷新日程")
                  }
              }
              Message.watch(vue.refetchEvents);
          },
          destroyed: function () {
              Message.unwatch(this.refetchEvents);
          },
          methods: getMethods(),
          computed: {
              // 计算当前时间和下个小时的时间
              period() {
                  let min = new Date().getMinutes();
                  let current = new Date().getHours();
                  let next;
                  let nextN;
                  if (min < 30) {
                      next = current;
                      nextN = current + 1;
                      min = '30'
                      if (current === 23) {
                          next = 0;
                          nextN = 1;
                          min = '30'
                      }
                  } else {
                      next = current + 1;
                      nextN = current + 2;
                      min = '00'
                      if (current === 23) {
                          next = 0;
                          nextN = 1;
                          min = '00'
                      }
                  }

                  return {
                      next,
                      nextN,
                      min
                  }
              },
              comWeek() {
                  let currentDay = ['日', '一', '二', '三', '四', '五', '六'];
                  return currentDay[(new Date()).getDay()]
              }
          }
      };
      utils.asyncComponent(options, resolve, reject);
  };

  function getMethods() {
      return {
          // 日历插件
          createdInit() {
              let srcCalendarEl = document.getElementById('source-calendar');
              // let Draggable = FullCalendarInteraction.Draggable;
              let Calendar = FullCalendar.Calendar
              let vue = this;
              let srcCalendar = new Calendar(srcCalendarEl, {
                  updateEvents: {}, // 
                  id: '2',
                  plugins: ['interaction', 'dayGrid', 'timeGrid'], // 需要用到的插件要加载完JS后在这里声明，拖动，月图，周图
                  timeZone: 'local',
                  header: { // 日历头部
                      left: 'dayGridMonth,timeGridWeek, today', //翻页
                      // left: 'dayGridMonth,timeGridWeek,timeGridDay, today', //翻页
                      center: 'prev,title,next', // 标题
                      // right: 'dayGridMonth,timeGridWeek,timeGridDay, today' // 月，周，日视图
                      right: 'addEventButton'
                  },
                  customButtons: {
                      addEventButton: {
                          text: '+ 新建日程',
                          click: function () {
                              // vue.quickshow = true;
                              vue.month = new Date().getMonth();
                              vue.day = new Date().getDate();
                              vue.week = new Date().getDay();
                              vue.$emit('opacChange', true)
                              let data = {
                                  vue,
                                  srcCal: vue.srcCalendar
                              }
                              RongIM.dialog.upDetail({}, '', data);

                          }
                      }
                  },
                  defaultView: 'timeGridWeek',
                  locale: 'zh-cn', // 配置中文
                  selectable: true, // 是否显示选中的状态图标
                  // editable: true, //是否可编辑
                  // droppable: true, // 是否允许外部的拖拽放到日历上
                  // defaultDate: '2020-02-12', //默认日期

                  events: function (info, success, fail) {
                      console.log('每次getList请求');
                      let startStr = vue.fullDataSplit(info.startStr);
                      let endStr = vue.fullDataSplit(info.endStr);
                      http.get(`/schedule/list?beginTime=${startStr}&endTime=${endStr}`, function (error, result) {
                          console.log(result);
                          if (error) return;
                          let events = [];
                          let data = utils.arrFormatById(result.data, 'sid', {
                              unKey: 'repeatType',
                              unValue: 0
                          })
                          // 由于跨天的日程会返回多份(按天数),所以这里需要根据sid做一个去重
                          for (let i = 0; i < data.length; i++) {
                              events.push({
                                  id: data[i].sid, // 所有sid用来判定页面每个数据的值,但是只能用来判定值
                                  title: data[i].title,
                                  allDay: vue.allDayChange(data[i].allDay),
                                  start: data[i].beginTime,
                                  end: data[i].endTime,
                                  uid: data[i].uid,
                                  reminder: data[i].reminder,
                                  repeatType: data[i].repeatType,
                                  showDate: data[i].showDate,
                                  state: data[i].state, // 参与者是否参加 0 待定 1拒绝 2同意
                                  type: data[i].type, // 0~日程, 1~会议, 2~活动

                              })
                          }
                          vue.$emit('scheduleTocalendarBlueStatus', events);

                          vue.events = events;
                          success(events)
                          // vue.leftAndRight(vue)
                      })
                  },

                  // 这里开始是各种日历的回调事件
                  eventLeave: function (info) {
                      console.log('event left!', info.event);
                  },
                  // drop: function (info) { // 拖拽放下的方法
                  //     console.log("拖拽放下方法")
                  //     // is the "remove after drop" checkbox checked?
                  //     if (checkbox.checked) {
                  //         // if so, remove the element from the "Draggable Events" list
                  //         info.draggedEl.parentNode.removeChild(info.draggedEl);
                  //     }
                  // },
                  // dateClick: (date, jsEvent, view) => {
                  //     //自行定义事件
                  //     this.quickshow = true;
                  //     this.month = date.date.getMonth();
                  //     this.day = date.date.getDate();
                  //     this.week = date.date.getDay();
                  // },
                  eventClick: (calEvent) => {
                      // 发这个请求是因为页面里面没搭载提醒等数据,所以发了个请求
                      http.get(`/schedule/detail/${calEvent.event.id}`, (err, result) => {
                          if (!err) {
                              let params = {
                                  type: '修改日程',
                                  id: calEvent.event.id,
                                  title: calEvent.event.title,
                                  remark: '' // 联调要调整到请求参数之后
                              }
                              this.editTitle = calEvent.event.title;
                              this.editStartMonth = result.beginTime.split(' ')[0].split('-')[1];
                              this.editStartDay = result.beginTime.split(' ')[0].split('-')[2];
                              this.editStartWeek = this.weekCapital[new Date(result.beginTime.split(' ')[0]).getDay()];
                              this.editStartTime = result.beginTime.split(' ')[1].slice(0, 5);

                              this.editEndMonth = result.endTime.split(' ')[0].split('-')[1];
                              this.editEndDay = result.endTime.split(' ')[0].split('-')[2];
                              this.editEndWeek = this.weekCapital[new Date(params.endDate).getDay()];
                              this.editEndTime = result.endTime.split(' ')[1].slice(0, 5);
                              this.editRemind = this.remindCapital[result.reminder]; // 提醒
                              this.editRemark = result.remark; // 备注
                              this.repeatType = this.repeatTypeCapital[result.repeatType] // 重复
                              this.location = result.location // 定位的值

                              // 页面部分

                              this.eventClickParams = params; // 继承过来

                              this.eventClickParams.sid = result.sid; //日程sid
                              this.eventClickParams.uid = result.uid; // 参与人userid
                              this.eventClickParams.title = result.title; // 标题
                              this.eventClickParams.allDay = result.allDay; // 是否全天
                              this.eventClickParams.beginTime = result.beginTime; // 开始时间 完整
                              this.eventClickParams.endTime = result.endTime; // 结束时间 完整
                              this.eventClickParams.secret = result.secret; //公开范围
                              this.eventClickParams.participant = result.participant; // 参与人
                              this.eventClickParams.remind = result.reminder; // 提醒
                              this.eventClickParams.repeatType = result.repeatType; // 重复类型
                              this.eventClickParams.location = result.location; // 定位
                              this.eventClickParams.remark = result.remark; //  留言

                              //新增参数 author：wangzhen  time：2020-04-26
                              this.eventClickParams.startMonth = result.beginTime.split(' ')[0].split('-')[1];
                              this.eventClickParams.startDay = result.beginTime.split(' ')[0].split('-')[2];
                              this.eventClickParams.startWeek = this.weekCapital[new Date(result.beginTime.split(' ')[0]).getDay()];
                              this.eventClickParams.startTime = result.beginTime.split(' ')[1].slice(0, 5);
                              this.eventClickParams.endMonth = result.endTime.split(' ')[0].split('-')[1];
                              this.eventClickParams.endDay = result.endTime.split(' ')[0].split('-')[2];
                              this.eventClickParams.endWeek = this.weekCapital[new Date(result.endTime.split(' ')[0]).getDay()];
                              this.eventClickParams.endTime = result.endTime.split(' ')[1].slice(0, 5);

                              this.eventClickParams.state = result.state; // 是否参与日程的状态
                              // this.eventClickParams.type = result.type; // 类型是0就是日程 不能传,用来判定是否是修改日程
                              this.eventClickParams.createUser = result.createUser; // 创建用户id 
                              this.eventClickParams.startDate = result.beginTime.split(' ')[0]
                              // this.eventClickParams.startTime = result.beginTime.split(' ')[1]
                              this.eventClickParams.endDate = result.endTime.split(' ')[0]
                              // this.eventClickParams.endTime = result.endTime.split(' ')[1]
                              this.eventClickParams.createTime = result.createTime; // 创建时间

                              //删除某天的日期转义
                              var d = new Date(calEvent.event.start);
                              var time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();

                              this.eventClickParams.deleteDate = time

                              let refurbish = this.srcCalendar;

                              let createUser = result.createUser;
                              var participantsCreateObj = {};
                              RongIM.dataModel.User.get(createUser, function (err, list) {
                                  if (!err) {
                                      participantsCreateObj.id = list.id;
                                      participantsCreateObj.name = list.name;

                                  }
                              })
                              this.eventClickParams.participantsCreate = participantsCreateObj;


                              var participantsArr = [];
                              let listId = result.participant;
                              RongIM.dataModel.User.get(listId, function (err, list) {
                                  if (list[0]) {
                                      list.forEach(item => {
                                          participantsArr.push({
                                              id: item.id,
                                              name: item.name
                                          })
                                      })
                                  }
                              })
                              this.eventClickParams.participants = participantsArr;
                              RongIM.dialog.upDetail(this.eventClickParams, refurbish)

                              // this.editshow = true;
                          }
                      })
                  },
                  eventLimit: true, // for all non-TimeGrid views
                  // views: {
                  //     timeGrid: {
                  //         eventLimit: 6 // adjust to 6 only for timeGridWeek/timeGridDay
                  //     }
                  // }
              })
              this.srcCalendar = srcCalendar;
          },
          allDayChange(data) {
              if (data === 1) {
                  return false
              } else {
                  return true
              }

          },
          // leftAndRight(vue) {
          //     // 右侧日历
          //     let prev = document.getElementsByClassName('fc-prev-button')[0];
          //     let next = document.getElementsByClassName('fc-next-button')[0];
          //     let today = document.getElementsByClassName('fc-today-button')[0];

          //     // 左侧日历
          //     let elePreAndnext = document.getElementsByClassName('el-button el-button--plain el-button--mini');
          //     let elePre = elePreAndnext[0];
          //     let eletoday = elePreAndnext[1]
          //     let eleNext = elePreAndnext[2];
          //     today.onclick = function (info) { // 右侧日历的上月点击触发把三月份日期给给过去
          //         // vue.$emit('chagnedata', {
          //         //     data: vue.srcCalendar.getDate(),
          //         //     direction: 1,
          //         // })
          //         eletoday.click()

          //     }
          //     prev.onclick = function (info) { // 右侧日历的上月点击触发把三月份日期给给过去
          //         if (info.x === 0) return;
          //         vue.$emit('chagnedata', {
          //             data: vue.srcCalendar.getDate(),
          //             direction: 1,
          //         })
          //         elePre.click(111, 222)

          //     }
          //     next.onclick = function (info) {
          //         if (info.x === 0) return;
          //         vue.$emit('chagnedata', {
          //             data: vue.srcCalendar.getDate(),
          //             direction: 2,
          //         })
          //         eleNext.click()
          //     }
          // },
          // dateChange(date, model, backup) { // 日期转成字符串以后传给组件
          //     let flag = '';
          //     if (!date) {
          //         date = backup;
          //         flag = 1;
          //     }
          //     let data = new Date(date).toLocaleDateString();
          //     let da;
          //     let time;
          //     if (model === 1) {
          //         da = data.split('/').map((item, index) => {
          //             return utils.addZero(item)
          //         }).join('-')
          //         return da;
          //     }
          //     if (model === 2) {
          //         let b = data.split('/')
          //         let c = b.map((item) => {
          //             return utils.addZero(item)
          //         });
          //         if (flag === 1) {
          //             let d1 = c.map((item, index) => {
          //                 if (index === 0) {
          //                     return '23'
          //                 }
          //                 return '59'
          //             })
          //             time = d1.join(':')
          //             return time;
          //         } else {
          //             let d2 = new Date(date).toLocaleTimeString().split('午')[1].split(':');
          //             let d3 = new Date(date).toLocaleTimeString().split('午')[0];
          //             let d4 = d2.map((item, index) => {
          //                 if (index === 0 && d3 === '下') {
          //                     return +item + 12
          //                 }
          //                 return utils.addZero(item)
          //             })
          //             if (new Date(date).toLocaleTimeString() == '上午12:00:00') {
          //                 return '00:00:00'
          //             }
          //             return d4.join(':')
          //         }
          //     }
          //     if (model === 3) {
          //         if (data) {
          //             return +data;
          //         }
          //     }
          // },
          close(e) {
              if (e.target.getAttribute('class') === 'quickdialogContainer') {
                  this.quickshow = false
              }
              if (e.target.getAttribute('class') === 'editDeleteContainer') {
                  this.editshow = false
              }
          },
          editDetailMountedFullCalendar() {
              this.editshow = false;
              let vue = this;
              let callback = function (data) {
                  if (data) {
                      vue.srcCalendar.refetchEvents()
                  }
              }
              components.quickdialogfull(this.eventClickParams, callback)
          },
          editDeleteSchedule() {
              let id = this.eventClickParams.id; // sid
              // 实际逻辑就是发送删除请求并且更新events.但是没数据的逻辑处理:把当前数据处理的数组筛选以后出发刷新事件

              // 联调以后需要处理完请求以后把当前页面的数据更改
              http.del(`/schedule/${id}/delete`, (err, result) => {
                  if (err) return;
                  if (result) {
                      this.srcCalendar.refetchEvents();
                      this.editshow = false;
                  }
              })
          },
          // handleClose(done) {
          //     this.$confirm('确认关闭？')
          //       .then(_ => {
          //         done();
          //       })
          //       .catch(_ => {});
          //   },
          quickdialogConfirm() {
              if (!this.title) {
                  this.$message('日程标题不能为空');
                  return;
              }
              let params = {
                  title: this.title || '无主题',
                  type: 0, // 请求类型=>0代表日程
                  allDay: 1, // 是否全天,1不是
                  beginTime: this.startTime(),
                  endTime: this.finishTime(),
                  secret: 0,
                  reminder: 3, // 固定提前15分钟提醒
                  repeatType: 0,
                  active: 0 // 自己的日程
              };
              http.post('/schedule/create', params, (error, result) => {
                  if (!error) {
                      this.srcCalendar.refetchEvents()
                      let events = [];
                      let data = this.srcCalendar.getEvents();
                      for (let i = 0; i < data.length; i++) {
                          let en = ''
                          if (data[i].end === null || data[i].end.length === 0) en = data[i].start;
                          if (!en) en = data[i].end;
                          events.push({
                              id: data[i].id,
                              title: data[i].title,
                              start: data[i].start || '暂定',
                              end: en,
                              allDay: data[i].allDay,
                          })
                      }

                      //   this.$emit('attributetransfer', events); // 因为新建以后也是refetchEvents了,那就不用派发了
                      // this.srcCalendar.render()
                      this.title = '';
                      this.quickshow = false;
                  } else {
                      this.quickshow = false;
                      this.title = '';
                  }
              })
          },
          startTime() {
              let time = new Date().toLocaleString();
              let current = utils.requestTimeToString(time, 1, 1);
              let newTimeMonth = utils.addZero(this.month + 1);
              let newTimeDay = utils.addZero(this.day);
              let currentTime = current.split('')
              if (current[5] + current[6] != newTimeMonth) {
                  currentTime[5] = newTimeMonth.toString()[0];
                  currentTime[6] = newTimeMonth.toString()[1]
              }
              if (current[8] + current[9] != newTimeDay) {
                  currentTime[8] = newTimeDay.toString()[0];
                  currentTime[9] = newTimeDay.toString()[1]
              }
              return currentTime.join('')
          },
          finishTime() {
              let time = new Date().toLocaleString();
              let current = utils.requestTimeToString(time, 2, 1);
              let newTimeMonth = utils.addZero(this.month + 1);
              let newTimeDay = utils.addZero(this.day);
              let currentTime = current.split('')
              if (current[5] + current[6] != newTimeMonth) {
                  currentTime[5] = newTimeMonth.toString()[0];
                  currentTime[6] = newTimeMonth.toString()[1]
              }
              if (current[8] + current[9] != newTimeDay) {
                  currentTime[8] = newTimeDay.toString()[0];
                  currentTime[9] = newTimeDay.toString()[1]
              }
              return currentTime.join('')
          },
          quickdialogEdit() {
              this.quickshow = false;
              let params = {
                  title: this.title,
                  allDay: 1, // 为了页面不选中
                  startTime: `${this.period.next}:${this.period.min}`,
                  endTime: `${this.period.nextN}:${this.period.min}`,
              }
              let vue = this;
              let callback = function (data) {
                  if (data) {
                      vue.srcCalendar.refetchEvents()
                  }
              }
              components.quickdialogfull(params, callback)
          },
          fullDataSplit(time) {
              if (!time) return;
              let ymd = time.split('T')[0];
              let hms = time.split('T')[1].split('+')[0];
              return `${ymd} ${hms}`
          },
          // 上一月,下一月联动
          updateSchedule(type) {
              if (this.srcCalendar.view.type === 'timeGridWeek') {
                  this.srcCalendar.changeView('dayGridMonth')
              }
              if (type === 'next') {
                  this.srcCalendar.next()
              } else {
                  this.srcCalendar.prev()
              }
          },
          scheduleClick(e) {
              if (e.target.className === "fc-icon fc-icon-chevron-left") {
                  this.$emit("scheduleClick", {
                      type: 'prev',
                      time: this.srcCalendar.getDate()
                  })
              } else if (e.target.className === "fc-icon fc-icon-chevron-right") {
                  this.$emit("scheduleClick", {
                      type: 'next',
                      time: this.srcCalendar.getDate()
                  })
              } else if (e.target.innerText === "今天") {
                  this.$emit("scheduleClick", {
                      type: 'today',
                      time: new Date()
                  })
              } else {
                  return
              }
          }
      }
  }
}(RongIM, {
  jQuery: jQuery,
  Vue: Vue
}, RongIM.components));