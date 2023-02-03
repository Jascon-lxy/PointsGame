<?php
/**
 * Created by XiaoYi
 * Date 2022/12/8 23:52
 */
class DbManage
{
    private $conn;
    public function executeSqlTxts($sqlTxts){
        $this->conn = mysqli_connect
        ("127.0.0.1",
            "root",
            "root",
            "points_game") or
        die("失败". mysqli_error());
        $this->conn->autocommit(false);//设置数据库隔离级别为默认
        for ($i = 0; $i < count($sqlTxts); $i++)//循环执行sql语句，其中$sqlTxts是sql的数组
            mysqli_query($this->conn, $sqlTxts[$i]);
        $result = $this->conn->commit();//对所有的查询进行提交
        if ($result == false)
            $this->conn->rollback();//如果失败就回滚，保证要么全部成功，要么一条sql语句都不通过
        return $result;
    }
    public function executeSqlTxt($sqlTxt){
        $this->conn =
            mysqli_connect
            ("127.0.0.1",
                "root",
                "root",
                "points_game")
        or die("失败". mysqli_error());
        $result=null;

        $result = mysqli_query($this->conn, $sqlTxt);

        return $result;
    }
    public function executeUpdateTxts($sqlTxts){
        $this->conn = mysqli_connect
        ("127.0.0.1",
            "root",
            "root",
            "points_game") or
        die("失败". mysqli_error());
        $this->conn->autocommit(false);//设置数据库隔离级别为默认
        for ($i = 0; $i < count($sqlTxts); $i++)//循环执行sql语句，其中$sqlTxts是sql的数组
            $query = mysqli_query($this->conn, $sqlTxts[$i]);
            if( $query && mysqli_affected_rows($this->conn) == 1 ){
                return 1;
            }else{
                return 0;
            }
    }
    public function executeUpdateTxt($sqlTxt){
        $this->conn =
            mysqli_connect
            ("127.0.0.1",
                "root",
                "root",
                "points_game")
        or die("失败". mysqli_error());
        $query=null;

        $query = mysqli_query($this->conn,$sqlTxt);
        if( $query && mysqli_affected_rows($this->conn) == 1 ){
            return 1;
        }else{
            return 0;
        }
    }
    public function closeConnection($result){
        mysqli_free_result($result);
        mysqli_close($this->conn);
    }
}