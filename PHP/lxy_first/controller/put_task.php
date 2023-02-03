<?php
/**
 * Created by XiaoYi
 * Date 2022/12/9 02:05
 */
include_once("../service/task_info_service.php");

$task_title = $_POST["task_title"];
$task_content = $_POST["task_content"];
$task_price = $_POST["task_price"];
$task_begin_data = $_POST["task_begin_data"];
$task_end_data = $_POST["task_end_data"];
$user_id = $_POST["user_id"];

$task_info_service = new task_info_service();
$IsSuccess = $task_info_service->PutTask($task_title, $task_content, $task_price, $task_begin_data, $task_end_data, $user_id);
$res = array("Status" => "1", "because" => "发布成功！");
echo json_encode($res);
