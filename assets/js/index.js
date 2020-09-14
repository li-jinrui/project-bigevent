(function () {
  getUserInfo();

  $("#btnLogout").on("click", function () {
    layer.confirm("确定退出登录?", { icon: 3, title: "提示" }, function (
      index
    ) {
      localStorage.removeItem("token");
      location.href = "/login.html";
      layer.close(index);
    });
  });
})();
//获取用户信息
function getUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    headers: {
      Authorization: localStorage.getItem("token") || "",
    },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg("获取用户信息失败！");
      }
      // 调用 renderAvatar 渲染用户的头像
      renderAvatar(res.data);
    },
  });
}
//渲染用户信息
function renderAvatar(user) {
  var name = user.nickname || user.username;
  $("#welcome").html("欢迎" + name);
  if (user.user_pic !== null) {
    $(".layui-nav-img").attr("src", user.user_pic);
    $(".text-avatar").hide();
  } else {
    $(".layui-nav-img").hide();
    var a = name[0].toUpperCase();
    $(".text-avatar").html(a).show();
  }
}
