/**
 * Created by HASEE on 2018/4/8.
 */



$(function() {
  // 当前页码
  var currentPage = 1;
  // 一页  多少条数
  var pageSize = 5;
  render();
  function render() {
    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success:function( info ) {
        console.log(info);
        $('.lt_user tbody').html( template('tpl',info) );
        // 配置分页
        $('#paginator').bootstrapPaginator({
          // 指定bootstrap版本
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: info.page,
          // 总页数
          totalPages: Math.ceil( info.total / info.size ),

          // 当页面被点击时触发
          onPageClicked: function( a, b, c, page ) {
            // page 当前点击的页码
            currentPage = page;
            // 调用 render 重新渲染页面
            render();
          }

        });

      }
    });
  }

  // 通过委托 注册禁用按钮
  $(".lt_user tbody").on("click",".btn",function() {

    //console.log(11111)
    // 点击按钮弹出模态框
    $("#userModal").modal("show");




  });

});
