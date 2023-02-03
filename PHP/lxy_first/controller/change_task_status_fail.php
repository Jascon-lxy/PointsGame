<?php
/**
 * Created by XiaoYi
 * Date 2022/12/11 02:16
 */
include_once("../service/task_info_service.php");
$task_id = $_POST["task_id"];
$task_info_service = new task_info_service();
$task_info = $task_info_service->GetATask($task_id);
$task_status = $task_info[0]["task_status"];
if ($task_status!=1){
    $res = array("Status"=>"0","because"=>"操作失败！");
    echo json_encode($res);
    return false;
}
$status = 3;
$is_success =$task_info_service->ChangeTaskStatus($task_id,$status);

if ($is_success){
    $res = array("Status"=>"1","because"=>"操作成功");
    echo json_encode($res);
    return false;
}else{
    $res = array("Status"=>"0","because"=>"操作失败！");
    echo json_encode($res);
    return false;
}