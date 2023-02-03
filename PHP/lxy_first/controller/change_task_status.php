<?php
/**
 * Created by XiaoYi
 * Date 2022/12/11 01:03
 */
include_once("../service/task_info_service.php");
include_once ("../service/user_info_service.php");
$task_id = $_POST["task_id"];
$task_info_service = new task_info_service();
$task_info = $task_info_service->GetATask($task_id);
$task_status = $task_info[0]["task_status"];
if ($task_status!=1){
    $res = array("Status"=>"0","because"=>"操作失败！");
    echo json_encode($res);
    return false;
}
$status = 2;
$task_info_service->ChangeTaskStatus($task_id,$status);

$task_price = $task_info[0]["task_price"];
$user_id = $task_info[0]["user_id"];

$user_info_service = new user_info_service();
$is_success = $user_info_service->ChangeUserPrice($user_id,$task_price);

if ($is_success){
    $res = array("Status"=>"1","because"=>"操作成功");
    echo json_encode($res);
    return false;
}else{
    $res = array("Status"=>"0","because"=>"操作失败！");
    echo json_encode($res);
    return false;
}
