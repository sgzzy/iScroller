'use strict';

$(function () {
  var orderList = $('#order-list');
  var page = 0;
  var pages = 1;
  var size = 4;
  var iScroll = new Pull();
  var parameter = {
    options: {},
    id: 'wrapper',
    content: '.ui-list',
    pullHeight: 50,
    pullMaxHeight: 80,
    upBeginText: "上拉加载",
    upAfterText: "松开加载下一页",
    downBeginText: "下拉加载",
    downAfterText: "松开加载下一页",
    pullDownAction: function (pull) {
      load(null, pull);
    },
    pullUpAction: function (pull) {
      load(true, pull);
    }
  };

  iScroll.init(parameter);

  var load = function (next, pull) {
    $.ajax({
      url: orderList.attr('data-url'),
      data: {
        page: next ? (page < pages ? ++page : page) : (page > 1 ? --page : page),
        pageSize: size
      },
      success: function (result) {
        if (result.data.valid) {
          var _pages = pages;
          pages = Math.max(Math.ceil(result.data.total / size), 1);
          orderList.html(result.data.html);
        } else {
          alert(result.msg);
        }
      },
      complete: function () {
        if (pull) {
          iScroll.loaded(pull);
        }
      }
    });
  };

  load(true);
});