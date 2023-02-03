<?php

/**
 * Created by XiaoYi
 * Date 2022/12/31 16:54
 */
include_once ("../db/DbManage.php");
class goods_info_service
{
    public function GetGoodsList($user_id){
        $sqlTxt = "SELECT goods_id,goods_title,goods_price,goods_image,goods_content,goods_status FROM goods_info WHERE goods_status = 0 AND user_id =" . $user_id
                    . " ORDER BY goods_status";
        $dbManage = new DbManage();
        $result = $dbManage->executeSqlTxt($sqlTxt);
        //转换
        $arrayList = array();//生成一个数组
        while ($row = mysqli_fetch_array($result)) {
            $count=count($row);
            for($i=0;$i<$count;$i++){
                unset($row[$i]);//删除冗余数据
            }
            array_push($arrayList, $row);
        }
        $dbManage->closeConnection($result);//关闭数据库连接
        return $arrayList;//返回数据集给控制器里面使用。
    }

    public function PutGoods($goods_title,$goods_content,$goods_price,$user_image,$user_id){
        $sqlTxt = "INSERT INTO goods_info (goods_title,goods_content,goods_price,goods_image,user_id)
                    VALUES ('" . $goods_title . "','" . $goods_content . "','" . $goods_price . "','" . $user_image . "','" . $user_id . "')";
        echo $sqlTxt;
        $dbManage = new DbManage();
        $result = $dbManage->executeSqlTxt($sqlTxt);
        return $result;
    }

    public function GetDetailGoods($goods_id){
        $sqlTxt = "SELECT goods_id,goods_title,goods_price,goods_image,goods_content FROM goods_info WHERE goods_id =" . $goods_id;
        $dbManage = new DbManage();
        $result = $dbManage->executeSqlTxt($sqlTxt);
        //转换
        $arrayList = array();//生成一个数组
        while ($row = mysqli_fetch_array($result)) {
            $count=count($row);
            for($i=0;$i<$count;$i++){
                unset($row[$i]);//删除冗余数据
            }
            array_push($arrayList, $row);
        }
        $dbManage->closeConnection($result);//关闭数据库连接
        return $arrayList;//返回数据集给控制器里面使用。
    }

    public function ChangeGoodsStatus($goods_id,$goods_status){
        $sqlTxt = "UPDATE goods_info SET goods_status = ".$goods_status." WHERE goods_id =" . $goods_id;
        //echo $sqlTxt;
        $dbManage = new DbManage();
        $result = $dbManage->executeUpdateTxt($sqlTxt);
        return $result == 1 ? true : false;
    }

    public function ChangeGoodsBuyerId($goods_id,$buyer_id){
        $sqlTxt = "UPDATE goods_info SET buyer_id = ".$buyer_id." WHERE goods_id =" . $goods_id;
        //echo $sqlTxt;
        $dbManage = new DbManage();
        $result = $dbManage->executeUpdateTxt($sqlTxt);
        return $result == 1 ? true : false;
    }

    public function GetBuyerList($buyer_id,$goods_status){
        $sqlTxt = "SELECT * FROM goods_info WHERE buyer_id = ".$buyer_id." AND goods_status = " . $goods_status;
        $dbManage = new DbManage();
        $result = $dbManage->executeSqlTxt($sqlTxt);
        //转换
        $arrayList = array();//生成一个数组
        while ($row = mysqli_fetch_array($result)) {
            $count=count($row);
            for($i=0;$i<$count;$i++){
                unset($row[$i]);//删除冗余数据
            }
            array_push($arrayList, $row);
        }
        $dbManage->closeConnection($result);//关闭数据库连接
        return $arrayList;
    }
}