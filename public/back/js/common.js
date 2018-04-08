/**
 * Created by HASEE on 2018/4/6.
 */

// 禁用时候的小圆环
NProgress.configure({ showSpinner: false });

// 进度条功能
// ajaxStart 所有的 ajax 开始调用
//$(document).ajaxStart(function() {
//  NProgress.start();
//});
// ajaxStop 所有的 ajax 结束调用
//$(document).ajaxStop(function() {
//  // 模拟网络延迟
//  setTimeout(function() {
//    NProgress.done();
//  }, 500)
//});


// 实现登陆拦截功能
if( location.href.indexOf("index.html") === -1 ) {
  $.ajax({
    type:"get",
    url:"/employee/checkRootLogin",
    //dataType:"json",
    success:function( info ) {
      //console.log(info);
      if( info.success ) {}
      if( info.error == 400) { location.href = "login.html"; }
    }
  })
}



// index.html 功能

$(function() {

// 功能1 二级菜单分类切换
  $(".category").click(function() {
    $(this).next().stop().slideToggle();
  });

// 功能2 点击右侧头部菜单 隐藏左侧部分
  $(".icon_menu").click(function() {
    $(".lt_main").toggleClass("hidemenu");
    $(".title").toggleClass("hidemenu");
    $(".lt_aside").toggleClass("hidemenu");
  });
// 功能3 点击退出图标 单出模态框
  $(".icon_logout").click(function() {
    $("#logoutModal").modal("show")
  });

// 不要再点击退出图标是提交 ajax  所以要在外面 提交ajax
  $("#logoutBtn").click(function() {
    // alert(111);

    // 提交ajax 让退出 功能 使后台知道
    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      dataType:"json",
      success:function( info ) {
        //console.log(info);
        if( info.success ) {
          location.href = "login.html"
        }
      }
    });
  });
});