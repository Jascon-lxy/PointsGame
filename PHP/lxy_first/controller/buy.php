<?php
/**
 * Created by XiaoYi
 * Date 2023/1/8 18:29
 */
include_once ("../service/user_info_service.php");
include_once ("../service/goods_info_service.php");

$user_id = $_POST["user_id"];
$goods_id = $_POST["goods_id"];

$user_info_service = new user_info_service();
$goods_info_service = new goods_info_service();

$user_info = $user_info_service->getaUserInfo($user_id);
$goods_info = $goods_info_service->GetDetailGoods($goods_id);

if(empty($user_info) || empty($goods_info)){
    $res = array("Status" => "0", "because" => "错误");
    echo json_encode($res);
    return false;
}
$user_price = $user_info[0]["user_price"];
$goods_price = $goods_info[0]["goods_price"];

$end_price = $user_price - $goods_price;

if($end_price < 0){
    $res = array("Status" => "0", "because" => "用户余额不足");
    echo json_encode($res);
    return false;
}

$IsSuccessPrice = $user_info_service->UpDateUserPrice($user_id,$end_price);
$goods_status = 1;
$IsSuccessStatus = $goods_info_service->ChangeGoodsStatus($goods_id,$goods_status);
$IsSuccessBuyer = $goods_info_service->ChangeGoodsBuyerId($goods_id,$user_id);

if ($IsSuccessPrice && $IsSuccessStatus && $IsSuccessBuyer){
    $res = array("Status" => "1", "because" => "兑换成功");
    echo json_encode($res);
    return false;
}else{
    $res = array("Status" => "1", "because" => "操作失败");
    echo json_encode($res);
    return false;
}
