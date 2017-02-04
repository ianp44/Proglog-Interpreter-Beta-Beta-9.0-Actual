<?php
//ai_demo interim prolog program file server php interface
// for ajax communication
// 15/1/16 vers 1.7?ok
// version 9.0 4/2/17
/*
This is a beta beta version of a javascript Prolog AI language interpreter.<br>
It is not fully functional,and is in development.


COPYRIGHT NOTICE.

This code is copyright  (C)  by Ian Pouncy 18/12/16, and (version 9.0) 4/2/17.

under the   GNU GENERAL PUBLIC LICENSE,  Version 3, 29 June 2007 , see Free Software Foundation, Inc. <http://fsf.org/> 

 

This means you can use it if you want under the terms of that licence.



This source code  has been registered on github (user name Ianp44) on 18/12/16, and (version 9.0) 4/2/17.




*/




$cmdstr='';
$filename='';
$dir_path='../prolog_user_data';


//ai demo php file server

function sys_err($s){
echo 'cmd=error&errstr='.$s."\n";
die(0);	
	
}


function chk_get_var($varname){
if (!isset($_GET[$varname])){
sys_err($varname.'_is_not_set_in_PHP_webquery');
}
return($_GET[$varname]);
	
}


function do_test_load_file(){
global $filename;

$filename=chk_get_var('fname');
$ltxt.='cmd=loadfile&fname='.$filename."\n";
$x=0;
while($x<15){
$ltxt.='Dummy Line:'.$x."\n";	
$x++;
	
}
echo $ltxt;
	
}

function do_loadfile(){
global $filename;
global $dir_path;

$filename=chk_get_var('fname');
if(
($filename=='')||
($filename=='.')||
($filename=='..')
)
sys_err("illegal_file_name_in_do_loadfile");	




			$file_rep=$dir_path.'/'.$filename;
$ltxt='';

$ltxt.='cmd=loadfile&fname='.$filename."\n";
			
if(! file_exists($file_rep)){
sys_err("required_file_does_not_exist_in_do_loadfile");	

	
	
}
	
$fileh=@fopen($file_rep,"r");
if($fileh==false)sys_err("required_file_could_not_be_opened_in_do_loadfile");	


while(true){
if(feof($fileh))break;
$ltxt.=rtrim(fgets($fileh));
$ltxt.="\n";
//echo  htmlspecialchars(rtrim(fgets($fileh))),"<br>\n";
}

fclose($fileh);

echo $ltxt;
	

	
}


function do_file_dir(){
global $dir_path;
$ltxt='';

$ltxt.='cmd=file_dir'."\n";
	
	
	
if ($dh = opendir($dir_path)){

    while (($file = readdir($dh)) !== false){
		
		if(!(($file==".")||($file==".."))){
			$file_rep=$dir_path.'/'.$file;
			
			if(!is_dir($file_rep)){
			$ltxt.= $file."\n";
				
				
			}
		}

		}
closedir($dh);	
echo $ltxt;
		
	}else {
sys_err("couldn_t_open_directory_to_do_file_dir");	

		
	}

}


//mainc code
$cmdstr=chk_get_var('cmd');

if($cmdstr=='loadfile'){
do_loadfile();
	
	
}
else if ($cmdstr=='tstloadfile'){
do_test_load_file();	
	
}
















else if ($cmdstr=='file_dir'){
do_file_dir();	
	
}
else if ($cmdstr=='error_test'){
	
sys_err("php_error_test_reply");	
}else {
	
sys_err("php_unknown_query_cmd");	
	
}

























?>
