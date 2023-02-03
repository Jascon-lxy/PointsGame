<?php

/**
 * Created by XiaoYi
 * Date 2023/1/10 18:10
 */
include_once ("../db/DbManage.php");
class image_info_service
{
    public function GetImageList(){
        $sqlTxt = "SELECT * FROM image_info";
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
}