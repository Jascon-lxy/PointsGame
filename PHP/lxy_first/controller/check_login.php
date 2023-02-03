<?php
/**
 * Created by XiaoYi
 * Date 2022/12/8 23:54
 */


include_once ("../service/user_info_service.php");
$user_phone = $_POST["user_phone"];
$pw = $_POST["user_pw"];
$user_info_service = new user_info_service();
$user_info = $user_info_service->getUserInfo($user_phone);
$res = null;
if (empty($user_info)) {
    $res = array("Status" => "0", "because" => "该用户不存在！");
    echo json_encode($res);
    return false;
} elseif ($pw != $user_info[0]["user_password"]) {
    $res = array("Status" => "0", "because" => "密码错误！");
    echo json_encode($res);
    return false;
}
//删除密码，防止敏感信息传递到前端
unset($user_info[0]["user_password"]);
echo json_encode($user_info);