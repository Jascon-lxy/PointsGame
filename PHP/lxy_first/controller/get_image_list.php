<?php
/**
 * Created by XiaoYi
 * Date 2023/1/10 18:09
 */
include_once("../service/image_info_service.php");
$image_info_service = new image_info_service();
$res = $image_info_service->GetImageList();
echo json_encode($res);