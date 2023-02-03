<?php
/**
 * Created by XiaoYi
 * Date 2022/12/9 06:24
 */
include_once("../service/task_info_service.php");
$task_id = $_POST["task_id"];
$task_info_service = new task_info_service();
$detail_task_info = $task_info_service->GetDetailTask($task_id);
echo json_encode($detail_task_info);