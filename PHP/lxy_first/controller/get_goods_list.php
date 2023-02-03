<?php
/**
 * Created by XiaoYi
 * Date 2022/12/31 17:09
 */
include_once ("../service/goods_info_service.php");

$user_id = $_POST["user_id"];
$goods_info_service = new goods_info_service();
$result = $goods_info_service->GetGoodsList($user_id);
echo json_encode($result);