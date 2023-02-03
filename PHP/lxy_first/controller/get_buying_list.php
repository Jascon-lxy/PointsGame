<?php
/**
 * Created by XiaoYi
 * Date 2023/1/9 13:14
 */
include_once ("../service/goods_info_service.php");

$buyer_id = $_POST["user_id"];
$goods_status = 1;

$goods_info_service = new goods_info_service();
$buying_list = $goods_info_service->GetBuyerList($buyer_id,$goods_status);
echo json_encode($buying_list);