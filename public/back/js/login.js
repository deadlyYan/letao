/**
 * Created by HASEE on 2018/4/6.
 */


 // 防止全局变量污染，等到DOM渲染后再执行
$(function() {

  // 1.使用插件进行表单校验
  //    用户名不能为空
  //    密码不能为空 ， 且 必须是6 到 12位
  $("#form").bootstrapValidator({

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 对表单字段进行校验
    fields: {
      username: {
        // 验证规则
        validators: {
          // 非空校验
          notEmpty: {
            message: "用户名不能为空"
          },
          stringLenght: {
            min: 2,
            max: 6,
            message: "用户名必须是 2到6 位"
          },
          callback: {
            message: "用户名不存在"
          }
        }
      },

      password:{
        // 验证规则
        validators: {
          // 非空校验
          notEmpty: {
            message: "密码不能为空"
          },
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度6到12位"
          },
          callback: {
            message: "密码错误"
          }
        }
      }
    }
  });

  // 2. 使用ajax进行登陆请求
      // 表单校验插件有一个特点, 在表单提交的时候进行校验
      // 如果校验成功, 继续提交, 需要阻止这次默认的提交, 通过 ajax 进行请求提交
      // 如果校验失败, 阻止默认的提交

  $("#form").on("success.form.bv",function(e) {
    // 阻止表单默认的提交
    e.preventDefault();

    // 通过ajax 进行登陆请求
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      dataType: "json",
      data: $("#form").serialize(),
      success:function( info ) {
        console.log(info);

        if( info.success ) {
          //alert("登陆成功")
          location.href = "index.html";
        }
        if( info.error === 1000 ) {
          //alert("用户名不出在")
          // updateStatus 检验方法
          // 参数1: 字段名称
          // 参数2: 校验状态
          // 参数3: 校验规则, 可以设置提示文本
          $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback");
        }
        if( info.error === 1001 ) {
          //alert("密码错误")
          $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback")

        }
      }
    })
  })

  // 3. 重置功能 实现
  $('[type="reset"]').click(function() {
    //console.log(666);
    $("#form").data("bootstrapValidator").resetForm();
  });
});