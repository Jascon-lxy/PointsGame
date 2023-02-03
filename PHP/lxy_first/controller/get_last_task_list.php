<?php
/**
 * Created by XiaoYi
 * Date 2022/12/9 04:08
 */
include_once("../service/task_info_service.php");
$task_info_service = new task_info_service();
$last_task_list = $task_info_service->GetLastTask();
echo json_encode($last_task_list);