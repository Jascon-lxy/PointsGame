<?php
/**
 * Created by XiaoYi
 * Date 2023/1/3 14:02
 */
include_once ("../service/goods_info_service.php");

$goods_title = $_POST["goods_title"];
$goods_content = $_POST["goods_content"];
$goods_price = $_POST["goods_price"];
$user_image = $_POST["user_image"];
$user_id = $_POST["user_id"];

if($goods_title == null && $goods_content == null && $goods_price == null && $user_image == null && $user_id == null){
    $res = array("Status" => "0", "because" => "有信息未填写！");
    echo json_encode($res);
    return false;
}
$goods_info_service = new goods_info_service();
$Issucce = $goods_info_service->PutGoods($goods_title,$goods_content,$goods_price,$user_image,$user_id);
$res = array("Status" => "1", "because" => "发布成功！");
echo json_encode($res);