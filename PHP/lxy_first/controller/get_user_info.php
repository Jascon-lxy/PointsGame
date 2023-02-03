<?php
/**
 * Created by XiaoYi
 * Date 2022/12/11 02:53
 */
include_once ("../service/user_info_service.php");
$user_id = $_POST["user_id"];
$user_info_service = new user_info_service();
$user_info = $user_info_service->getaUserInfo($user_id);

unset($user_info[0]["user_password"]);
echo json_encode($user_info);