<?php
/**
 * Created by XiaoYi
 * Date 2022/12/11 00:20
 */
include_once("../service/task_info_service.php");
$user_id = $_POST["user_id"];
$task_info_service = new task_info_service();
$examining_task_list = $task_info_service->GetExaminingList($user_id) ;
echo json_encode($examining_task_list);