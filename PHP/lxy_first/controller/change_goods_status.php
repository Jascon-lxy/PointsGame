<?php
/**
 * Created by XiaoYi
 * Date 2023/1/9 13:30
 */
include_once ("../service/goods_info_service.php");

$goods_id = $_POST["goods_id"];
$goods_status = 2;

$goods_info_service = new goods_info_service();
$IsSuccessStatus = $goods_info_service->ChangeGoodsStatus($goods_id,$goods_status);

if ($IsSuccessStatus){
    $res = array("Status"=>"1","because"=>"操作成功");
    echo json_encode($res);
    return false;
}else{
    $res = array("Status"=>"0","because"=>"操作失败！");
    echo json_encode($res);
    return false;
}