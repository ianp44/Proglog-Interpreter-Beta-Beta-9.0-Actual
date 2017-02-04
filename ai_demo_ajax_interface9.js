//Ian's Ai Demo test Page ajax interface javascript include
// version 6.01 16/1/17
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


//===============================
//AJAX globals

var ajax_reply_str;
var ajax_waiting;
var ajax_url="../ai_demo_ajax9_7.php";
//var link_url_stem="photodir_demo2.php";

var ajax_rep_qry_str;
var ajax_rep_qry_str_ar;

var ajax_test_flag;


var file_dir_array;
var file_text_array;

//====================

function zdo_ajax_error_test_button(){
var cmd_str;


try {
	cmd_str='cmd=error_test';
	
	snd_ajax_cmd(cmd_str);
	
}

catch(err){
process_error(err);

	
}
	
}


function zdo_directory_button(){


try {
	
	get_ajax_file_dir();
	
	
}

catch(err){
process_error(err);

	
}
	
}


function zload_test_button(){
var fname;
var xlen;


try {
	
	get_ajax_test_txtfile();
	
}

catch(err){
process_error(err);

	
}
	
}























function zload_fname_button(zfname){
//var fname;
//var xlen;


try {
	
get_ajax_txtfile(zfname);

}

catch(err){
process_error(err);

	
}
	
}




function zload_button(x){
var fname;
var xlen;


try {
	xlen=file_dir_array.length;
if((x<1)||(x>=	xlen)){
sys_error("x out of range of file_dir_array bounds in zload_button"	);

}
fname=	file_dir_array[x];
get_ajax_txtfile(fname);

}

catch(err){
process_error(err);

	
}
	
}


function  generate_load_button_txt(x){
var txt;
txt='';
	
	
//txt+='<button class="buttonhelpclass_z2" onclick="zload_button('+x+')" >S</button> ';

txt+='<button class="buttonhelpclass_z2"';
if(x!=-1){
txt+=' onclick="zload_button('+x+')" ';
}
txt+='>S</button> ';


return(txt);

}

function set_ajax_status(z){
var txt;
txt="";
txt+="<b>Ajax Awaiting Reply:"+z+'</b><br>\n'	
document.getElementById("ajax_status").innerHTML =txt;
	
}

function init_ajax(){
	ajax_test_flag=true;
	
set_ajax_status(0);

}

function get_ajax_file_dir() {
var 	cmd_str;
cmd_str='cmd=file_dir';
snd_ajax_cmd(cmd_str);
	

}


function get_ajax_test_txtfile() {
var 	cmd_str;
cmd_str='cmd=tstloadfile&fname=test_load_file_name';
snd_ajax_cmd(cmd_str);
	


}
















function get_ajax_txtfile(fnm) {
var 	cmd_str;
cmd_str='cmd=loadfile&fname='+fnm;
snd_ajax_cmd(cmd_str);
	

}








function snd_ajax_cmd(cmd_str) {
  if(ajax_waiting==1){
	user_error('already waiting for ajax in snd_ajax_cmd'  );
	
  }
  var xmlhttp=new XMLHttpRequest();
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      //document.getElementById("txtHint").innerHTML=xmlhttp.responseText;
	  ajax_reply_str=xmlhttp.responseText;
	  process_reply();
    }
  }
  //xmlhttp.open("GET","gethint.php?q="+str,true);
  //xmlhttp.open("GET","../ajax1.php?q="+str,true);
xmlhttp.open("GET",ajax_url+'?'+cmd_str,true);
  ajax_waiting=1;
  set_ajax_status(1);
  xmlhttp.send();
//  document.getElementById("txtHint").innerHTML="#"+str;
  
}


function create_dummy_array(){
var res;
var x;
x=0;
res = new Array();
while(x<23){
res[x]='zdummy line:'+x;
	
x++;
}
return(res);
	
	
}












function get_ajax_array(){
var res;
res = new Array();



res= ajax_reply_str.split('\n');
//res=create_dummy_array();

return(res);
	
}































//returns key test data
function zkey_check(qry_ar,ktxt){
var txt="";
txt+='key:'+ktxt+' res:';
//txt+="qqq";
txt+=zdo_key_str(qry_ar,ktxt);
txt+='<br>\n';
return(txt);

}



//returns key query keys
function zdo_keys(qry_ar){
var txt2="";
txt2+="zdo_keys test<br>\n";

txt2+=zkey_check(qry_ar,'cmd');
txt2+=zkey_check(qry_ar,'fname');

txt2+=zkey_check(qry_ar,'errstr');
/*
txt2+=zkey_check('no_panel');
txt2+=zkey_check('filename');
txt2+=zkey_check('do_txt_edit');
*/
return(txt2);

}





function zfind_key(qry_ar,ktxt){
var txt2;
//txt="";
var x;
//var res;
var xlen;
//res=-1;
x=0;
xlen=qry_ar.length;
while(1){
if(x+1>=xlen)break;
if(qry_ar[x]==ktxt){
return(x+1);
}
x+=2;
}
return(-1);
}



//returns the data from the global query array
//for  a key for not found
function zdo_key_str(qry_ar,ktxt){
var res;
var ltxt;
//res=2;

res=zfind_key(qry_ar,ktxt);
if(res==-1){
ltxt="Not Found";
}else{
ltxt=qry_ar[res];

}
return(ltxt);
}
















function process_ajax_line1(str1){
var res;
var line1;
res=str1.search('\n');
			if(res==-1){
				user_error("ajax error ajax reply line 1 doesn't terminate with a newline");
			}
line1=	str1.slice(0,res);
return(line1);
	
}

/*
res=ttxt.search('75,');
			if(res!=0){
			csf_array2[x]=new Array("75, missing","illegal");		
			}else {
		ttxt=ttxt.slice(3);
		lar2=ttxt.split(',');
		if(lar2.length!=2){
			rerror("ajax data error at line " +x);
*/




function process_query_str(zqer){
var res=new Array();
var iarray;
var larray;
var x;

iarray=zqer.split('&');
x=0;
while(x<iarray.length){
larray=iarray[x].split('=');
if(larray.length<2){
larray[1]="znull";
}
res[2*x]=larray[0];
res[(2*x)+1]=larray[1];


x++;
}










return(res);

}


function dump_ajax_query(){
var txt;
txt='';
txt+='Ajax Query Dump<br>\n';
txt+=zdo_keys(ajax_rep_qry_str_ar);
return(txt);

}

function dump_ajax_reply(){
var txt;
txt='';
txt+=dump_ajax_query();
txt+='<br>\n';
txt+='Main Ajax Data:<br>\n';
txt+=ajax_reply_str;
txt+='<br>\n';
txt+='<br>\n';



	
document.getElementById("ajax_query_status").innerHTML =txt;

}

function display_file_data_entry(x,zstr){
var txt;
txt='';
txt+=zstr+'<br>\n';
return(txt);	
	
}

function display_file_list_entry(x,str){
var txt;
var str2;
//##a
txt='';
str2=str.trim();
if(str2!=''){

txt+=generate_load_button_txt(x);
txt+=' ';
txt+=str+'<br>\n';
}









return(txt);	
	
}

function display_file_data(){
var txt;
var x;
var xlen;
var lfname;
lfname=zdo_key_str(ajax_rep_qry_str_ar,'fname')	;
	
txt='';
xlen=	file_text_array.length;
x=1;
txt+='File Text Array ;';
txt+='called_file was:'+lfname+'; ';

txt+=' xlen='+xlen;
txt+='<br>\n';


while(x<xlen){
txt+=display_file_data_entry(x,file_text_array[x]);
	
x++;	
}
	
document.getElementById("disp1").innerHTML =txt;
	
}


function display_file_list(){
var txt;
var x;
var xlen;

txt='';
xlen=	file_dir_array.length;
x=1;
txt+='File Dir Array List;';
txt+=' xlen='+xlen;
txt+='<br>\n';
txt+='<b> Click on Green ';
txt+=generate_load_button_txt(-1);
txt+=' to open the file next to it.<br>\n';



txt+='<br>\n';



while(x<xlen){
txt+=display_file_list_entry(x,file_dir_array[x]);
	
x++;	
}
	
document.getElementById("disp1").innerHTML =txt;
	
}


function command_process(cmd_str){
var lerrtxt;

	//command process
	
if(cmd_str=='file_dir'){	
	file_dir_array=get_ajax_array();
	display_file_list();
	
}
else if(cmd_str=='loadfile'){	
	file_text_array=get_ajax_array();
	display_file_data();
	

}
else if(cmd_str=='error'){	
lerrtxt=zdo_key_str(ajax_rep_qry_str_ar,'errstr')	;
user_error("ajax error reply:"+	lerrtxt);

}else {
user_error("illegal ajax reply command:"+cmd_str);
	
}
	
}

function process_reply(){
	var lcmd;

try {
	
	
	


	ajax_waiting=0;
	set_ajax_status(0);
	ajax_query_rep=process_ajax_line1(ajax_reply_str);
	ajax_rep_qry_str_ar=process_query_str(ajax_query_rep);
	if(ajax_test_flag){
	//dump_ajax_query();	
	dump_ajax_reply();		
	}
	lcmd=zdo_key_str(ajax_rep_qry_str_ar,'cmd')	;
	command_process(lcmd);
}

catch(err){
process_error(err);

	
}
	
	
}
