/**
 * Created by HASEE on 2018/4/9.
 */

$(function() {
  // ajax 获取一级菜单后台数据
  $.ajax({
    url:"/category/queryTopCategory",
    type:"get",
    success:function( info ) {
      console.log(info);
      $(".category_left ul").html( template("left_tpl", info));

      // 调用 回去一级菜单Id
      //var id = $( ".category_left ul li").data("id");
      renderId( info.rows[0].id );
    }
  })

  // 通过委托事件
  $(".category_left ul").on("click","a",function() {
    //console.log($(this).data("id"));
    renderId($(this).data("id"));
    $(this).parent().addClass("current").siblings().removeClass("current");
  });

  // ajax 回去一级菜单ID 渲染二级菜单

  function renderId( id ) {
    $.ajax({
      url:"/category/querySecondCategory",
      data:"get",
      data: {
        id:id
      },
      success:function( info ) {
        console.log( info )
        $(".category_right ul").html( template("right_tpl", info));
      }

    });
  }
});