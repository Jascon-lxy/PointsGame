<?php
/**
 * Created by XiaoYi
 * Date 2023/1/8 17:19
 */
include_once ("../service/goods_info_service.php");

$goods_id = $_POST["goods_id"];
$goods_info_service = new goods_info_service();
$res = $goods_info_service->GetDetailGoods($goods_id);
echo json_encode($res);