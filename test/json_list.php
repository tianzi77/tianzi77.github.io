<?php
    
	$dir = './';
	$folders = scandir($dir);
	$axures = array();
	for ($i=0; $i<count($folders); $i++){
		if ($folders[$i]!='.'&&$folders[$i]!='..'&&$folders[$i]!='index.php'&&$folders[$i]!='main.php'&&$folders[$i]!='assets'&&$folders[$i]!='axures.php'&&$folders[$i]!='test.php'&&$folders[$i]!='ag') {
			$d0 = strtotime(date("Y-m-d",filectime($dir.$folders[$i])));
			$d1 = strtotime('2013-12-31');
			if($d0 > $d1) {
				$axures[] = array("title"=>urlencode ($folders[$i]),"date"=>date("Y-m-d",filectime($dir.$folders[$i])));
			}
			
		}
	}

	function cmp($a,$b){
		return strcmp($a["date"],$b["date"])*-1;
	}
    usort($axures,"cmp");
    
    header("Content-type: text/html; charset=gb2312");
    echo header ("Access-Control-Allow-Origin: *");
    echo urldecode (json_encode($axures));
	
?>