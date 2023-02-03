<?php
/**
 * Created by XiaoYi
 * Date 2022/12/11 00:34
 */
include_once("../service/task_info_service.php");
$user_id = $_POST["user_id"];
$task_info_service = new task_info_service();
$examined_task_list = $task_info_service->GetExaminedList($user_id) ;
echo json_encode($examined_task_list);