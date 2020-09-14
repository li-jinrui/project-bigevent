$(function () {
  var layer = layui.layer;
  var form = layui.form;

  //定义数据
  render();
  function render() {
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      //   data:
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        var aaa = template("ypl-table", res);
        $("tbody").html(aaa);
      },
    });
  }
  //点击添加
  var hhh = null;
  $("#btnAddCate").on("click", function () {
    hhh = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: $("#dialog-add").html(),
    });

    //点击提交
    $("body").on("submit", "#form-add", function (e) {
      e.preventDefault();
      $.ajax({
        method: "POST",
        url: "/my/article/addcates",
        data: {
          name: $("[name='name']").val(),
          alias: $("[name='alias']").val(),
        },
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg(res.message);
          }
          layer.msg(res.message);
          render();
          layer.close(hhh);
        },
      });
    });
    //
  });

  //删除功能(完成)(类似编辑)
  $("tbody").on("click", "#del", function () {
    var id = $(this).attr("data-id");
    layer.confirm("确认删除?", { icon: 3, title: "提示" }, function (index) {
      $.ajax({
        method: "GET",
        url: "/my/article/deletecate/" + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg(res.message);
          }
          layer.msg(res.message);
          layer.close(index);
          render();
        },
      });
    });
  });

  //编辑功能
  var mmm = null;
  $("tbody").on("click", "#exit", function (e) {
    mmm = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "编辑文章分类",
      content: $("#dialog-edit").html(),
    });
    var id = $(this).attr("data-id");
    console.log(id);
    // 发起请求获取对应分类的数据
    $.ajax({
      method: "GET",
      url: "/my/article/cates/" + id,
      success: function (res) {
        console.log(res);
        form.val("form-edit", res.data);
      },
    });
  });
  $("body").on("submit", "#form-edit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("更新分类数据失败！");
        }
        layer.msg("更新分类数据成功！");
        layer.close(mmm);
        render();
      },
    });
  });
});
