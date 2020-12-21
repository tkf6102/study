(function (RongIM, dependencies, components) {
  'use strict';
  let http = RongIM.dataModel._Http; // 请求里面有4个方法
  var utils = RongIM.utils;
  // 挂载全部日程组件
  components.quickdialogfull = function (data, callback) {
      var common = RongIM.common;
      var options = {
          name: 'quickdialogfull',
          template: 'templates/schedule/quickdialogfull.html',
          data: function () {
              return {
                  scheduleType: data.type || '新建日程',
                  closeContainer: true,
                  title: data.title || '', // 标题  
                  id: data.id,
                  allDay: data.allDay, //
                  startDate: data.startDate || `${new Date().getFullYear()}-${utils.addZero(new Date().getMonth()+1)}-${utils.addZero(new Date().getDate())}`,
                  startTime: data.startTime ? data.startTime.slice(0, 5) : utils.requestTimeToString(null, 1, 2),
                  endDate: data.endDate || `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`, // 第二个日期选择器的日期
                  endTime: data.endTime ? data.endTime.slice(0, 5) : utils.requestTimeToString(null, 2, 2), // 第二个时间选择器的时间
                  remind: data.remind ? data.remind : 3, // 提醒
                  reminds: [{
                      value: 0,
                      label: '无提醒'
                  }, {
                      value: 1,
                      label: '日程发生时'
                  }, {
                      value: 2,
                      label: '5 分钟前'
                  }, {
                      value: 3,
                      label: '15 分钟前'
                  }, {
                      value: 4,
                      label: '1 小时前'
                  }, {
                      value: 5,
                      label: '1 天前'
                  }],
                  remindAllday: 6,
                  remindsAllday: [{
                      value: 0,
                      label: '无提醒'
                  }, {
                      value: 6,
                      label: '当天(9:00)'
                  }, {
                      value: 7,
                      label: '1 天前(9:00)'
                  }, {
                      value: 8,
                      label: '2 天前(9:00)'
                  }, {
                      value: 9,
                      label: '1 周前(9:00)'
                  }],
                  valuerepeat: data.valuerepeat ? data.valuerepeat : 0,
                  valuerepeats: [{
                      value: 0,
                      label: '不重复'
                  }, {
                      value: 1,
                      label: '每天'
                  }, {
                      value: 2,
                      label: '工作日'
                  }, {
                      value: 3,
                      label: '每周'
                  }, {
                      value: 4,
                      label: '每两周'
                  }, {
                      value: 5,
                      label: '每月'
                  }, {
                      value: 6,
                      label: '每年'
                  }],
                  location: data.location ? data.location : '', // 定位
                  remark: data.remark ? data.remark : '', // 备注部分
                  addressbookShow: false,
                  addressbook: [{
                          key: 1,
                          label: "备选项 1",
                          disabled: false
                      },
                      {
                          key: 2,
                          label: "备选项 2",
                          disabled: true
                      },
                      {
                          key: 3,
                          label: "备选项 3",
                          disabled: false
                      },
                  ],
                  addressbookValue: [],
                  participateList: data.participant ? data.participant : [],
                  participateCreate: ''
              };
          },
          methods: {
              fn() {
                  this.allDay = this.allDay ? 0 : 1
              },
              participate() {
                  let vue = this;
                  this.addressbookShow = true;
                  let userId1 = RongIM.instance.auth.id;
                  RongIM.instance.dataModel.User.getBatch([userId1], function (err, list) {
                      RongIM.dialog.createGroup(null, list, true, function (participateList) {
                          vue.participateList = participateList.filter((item, index) => {
                              if (item.id === userId1) {
                                  vue.participateCreate = item;
                              } else {
                                  return item
                              }
                          });


                      });
                  })
              },
              closePage() {
                  this.closeContainer = false;
                  if (data.opacChange) {
                      data.opacChange.vue.$emit('opacChange', false)
                  }
              },
              fullDialogSave() {
                  if (this.title.length <= 0) {
                      this.$message('日程标题不能为空');
                      return;
                  }
                  let params = {
                      title: this.title,
                      type: 0,
                      allDay: this.allDay, // 此处是0,就是全天的
                      beginTime: this.questStartTime,
                      endTime: this.questEndTime,
                      participant: this.participateList.length ? this.participateIdList : [],
                      createUser: this.participateCreate.id || '',
                      reminder: this.allDayChange ? this.remindAllday : this.remind,
                      repeatType: this.valuerepeat || 0,
                      location: this.location,
                      remark: this.remark,
                      active: 0
                  };
                  if (params.allDay === 0) {
                      let startTime = params.beginTime.split(' ')[1];
                      let endTime = params.endTime.split(' ')[1];
                      let beginDate = params.beginTime.split(' ')[0];
                      let endDate = params.endTime.split(' ')[0];
                      // startTime = '00:00:00';
                      // endTime = '23:59:00';
                      startTime = '00:00:05';
                      endTime = '23:59:00';
                      params.beginTime = beginDate + ' ' + startTime;
                      params.endTime = endDate + ' ' + endTime;

                  }
                  let startTimeStamp = new Date(params.beginTime).getTime();
                  let endTimeStamp = new Date(params.endTime).getTime();
                  if (!(startTimeStamp < endTimeStamp)) {
                      this.$message('结束时间不能小于开始时间');
                      return;
                  }
                  if (this.scheduleType === '修改日程') {
                      // 此处待修改
                      let sid = this.id || data.sid;
                      http.put(`/schedule/${sid}/update`, params, (err, result) => {
                          if (!err) {
                              this.closeContainer = false;
                              if (data.opacChange) {
                                  data.opacChange.vue.$emit('opacChange', false)
                              }
                              callback(true);
                          } else {
                              data.opacChange.vue.$emit('opacChange', false)
                              this.closeContainer = false;
                          }
                      })
                      return;
                  }
                  http.post('/schedule/create', params, (err, result) => {
                      if (result) {
                          data.opacChange.vue.$emit('opacChange', false)
                          this.closeContainer = false;
                          callback(true)
                      }else{
                          data.opacChange.vue.$emit('opacChange', false)
                          this.closeContainer = false;
                      }
                  })
              }
          },
          computed: {
              questStartTime() {
                  let startTime = `${this.startDate} ${this.startTime}`;
                  if (startTime.length >= 20) {
                      return startTime.slice(0, 19)
                  }
                  if (startTime.length <= 16) {
                      return startTime + ':00'
                  }
                  return startTime;
              },
              questEndTime() {

                  let endTime = `${this.endDate} ${this.endTime}`;
                  if (endTime.length >= 20) {
                      return endTime.slice(0, 19)
                  }
                  if (endTime.length <= 16) {
                      return endTime + ':00'
                  }
                  return endTime;
              },
              allDayChange() {
                  if (this.allDay == 1) {
                      return 0
                  } else {
                      return 1
                  }

              },
              participateIdList() {
                  let arr = []
                  this.participateList.forEach(item => {
                      arr.push(item.id)
                  })
                  return arr;
              }
          }
      };
      common.mountDialog(options);
  };
}(RongIM, {
  jQuery: jQuery,
  Vue: Vue
}, RongIM.components));