<?php
/**
 * Created by XiaoYi
 * Date 2022/12/8 23:59
 */

include_once ("../db/DbManage.php");
class user_info_service
{
    public function getUserInfo($user_phone){
        $sqlTxt = "SELECT * FROM user_info WHERE user_phone = '" . $user_phone . "'";
        //echo $sqlTxt;
        $dbManage = new DbManage();
        $result = $dbManage->executeSqlTxt($sqlTxt);
        //转换
        $arrayList = array();//生成一个数组
        while ($row = mysqli_fetch_array($result)) {
            //通过循环，把数据集转换成数组。要考虑查询不到的时候，会不会出错
            $count=count($row);
            for($i=0;$i<$count;$i++){
                unset($row[$i]);//删除冗余数据
            }
            array_push($arrayList, $row);
        }
        $dbManage->closeConnection($result);
        return $arrayList;
    }

    public function getaUserInfo($user_id){
        $sqlTxt = "SELECT * FROM user_info WHERE user_id = '" . $user_id . "'";
        //echo $sqlTxt;
        $dbManage = new DbManage();
        $result = $dbManage->executeSqlTxt($sqlTxt);
        //转换
        $arrayList = array();//生成一个数组
        while ($row = mysqli_fetch_array($result)) {
            //通过循环，把数据集转换成数组。要考虑查询不到的时候，会不会出错
            $count=count($row);
            for($i=0;$i<$count;$i++){
                unset($row[$i]);//删除冗余数据
            }
            array_push($arrayList, $row);
        }
        $dbManage->closeConnection($result);
        return $arrayList;
    }

    public function ChangeUserPrice($user_id,$task_price){
        $sqlTxt = "UPDATE user_info SET user_price =  user_price + " . $task_price . " WHERE user_id =" . $user_id;
        //echo $sqlTxt;
        $dbManage = new DbManage();
        $result = $dbManage->executeUpdateTxt($sqlTxt);
        return $result == 1 ? true : false;
    }

    public function UpDateUserPrice($user_id,$end_price){
        $sqlTxt = "UPDATE user_info SET user_price = " . $end_price . " WHERE user_id =" . $user_id;
        //echo $sqlTxt;
        $dbManage = new DbManage();
        $result = $dbManage->executeUpdateTxt($sqlTxt);
        return $result == 1 ? true : false;
    }
}