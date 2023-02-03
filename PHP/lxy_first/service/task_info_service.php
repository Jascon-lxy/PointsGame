<?php

/**
 * Created by XiaoYi
 * Date 2022/12/9 02:08
 */
include_once ("../db/DbManage.php");
class task_info_service
{
    public function PutTask($task_title,$task_content,$task_price,$task_begin_data,$task_end_data,$user_id){
        $sqlTxt = "INSERT INTO task_info (task_title,task_content,task_price,task_begin_data,task_end_data,user_id)"
                    . "VALUES ('" . $task_title . "','" . $task_content . "'," . $task_price . ",'" . $task_begin_data
                    . "','" .  $task_end_data . "'," . $user_id . ")";
        //echo $sqlTxt;
        $dbManage = new DbManage();
        $result = $dbManage->executeSqlTxt($sqlTxt);
        return $result;
    }

    //获未完成任务列表，并安日期升序排列
    public function GetTaskList(){
        $sqlTxt = "SELECT a.task_id,a.task_title,task_content,a.task_price,b.user_name,b.user_image,a.task_begin_data,a.task_end_data
                    FROM task_info a JOIN user_info b on a.user_id = b.user_id
                    WHERE a.task_status = 0
                    ORDER BY STR_TO_DATE(a.task_end_data,'%Y-%m-%d')";
        //echo $sqlTxt;
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

    //获取最近任务
    public function GetLastTask(){
        $sqlTxt = "(SELECT a.task_id,a.task_title,task_content,a.task_price,b.user_name,b.user_image,a.task_begin_data,a.task_end_data
                    FROM task_info a JOIN user_info b on a.user_id = b.user_id
                    WHERE a.task_status = 0 AND a.user_id = 1
                    ORDER BY STR_TO_DATE(a.task_end_data,'%Y-%m-%d')
                    LIMIT 1)
                    UNION
                    (SELECT a.task_id,a.task_title,task_content,a.task_price,b.user_name,b.user_image,a.task_begin_data,a.task_end_data
                    FROM task_info a JOIN user_info b on a.user_id = b.user_id
                    WHERE a.task_status = 0 AND a.user_id = 2
                    ORDER BY STR_TO_DATE(a.task_end_data,'%Y-%m-%d')
                    LIMIT 1)";
        //echo $sqlTxt;
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

    //获取详细任务
    public function GetDetailTask($task_id){
        $sqlTxt = "SELECT a.user_image,a.user_name,b.task_price,b.task_title,b.task_content,b.task_begin_data,b.task_end_data
                    FROM task_info b JOIN user_info a on b.user_id = a.user_id
                    WHERE b.task_id = " . $task_id;
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

    //获取待审批任务列表
    public function GetExaminingList($user_id){
        $sqlTxt = "SELECT a.task_id,a.task_title,a.task_content,a.task_end_data,a.task_price,b.user_image
                    FROM task_info a JOIN user_info b on a.user_id = b.user_id
                    WHERE a.task_status = 1 and a.user_id = " . $user_id ;
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

    //获取已审核列表
    public function GetExaminedList($user_id){
        $sqlTxt = "SELECT a.task_id,a.task_title,a.task_content,a.task_end_data,a.task_price,a.task_status,b.user_image
                    FROM task_info a JOIN user_info b on a.user_id = b.user_id
                    WHERE (a.task_status = 2 OR a.task_status =3)  and a.user_id = " . $user_id ;
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

    public function GetATask($task_id){
        $sqlTxt = "SELECT * FROM task_info WHERE task_id = " . $task_id;
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
    public function ChangeTaskStatus($task_id,$status){
        $sqlTxt = "UPDATE task_info SET task_status = ".$status." WHERE task_id =" . $task_id;
        //echo $sqlTxt;
        $dbManage = new DbManage();
        $result = $dbManage->executeUpdateTxt($sqlTxt);
        return $result == 1 ? true : false;
    }
}