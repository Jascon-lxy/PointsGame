<?php
/**
 * Created by XiaoYi
 * Date 2022/12/9 03:16
 */
include_once("../service/task_info_service.php");
$task_info_service = new task_info_service();
$undone_task_list = $task_info_service->GetTaskList();
echo json_encode($undone_task_list);