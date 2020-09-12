(function () {
  getUserInfo();
})();

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
