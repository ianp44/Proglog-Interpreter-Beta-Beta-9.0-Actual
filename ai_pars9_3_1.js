//Ian's Ai Demo test Page parsing and lexing functions javascript include
//version 1.3 
//version 1.4 2/12/16  ? ok so far
//version 1.7 13/12/16  ? ok so far
//version 4.3.1 27/12/16  ? ok so far
//version 5.0 5/1/17  ? ok so far
// version 9.0 4/2/17

//saved string object functions
//suspect string routines should be rewritten


//Imported from expression compiler in version 1.4 2/12/16 
//in/from Version 4.0 28/6/16 comp_expcomp1.js
/*

This is a beta beta version of a javascript Prolog AI language interpreter.<br>
It is not fully functional,and is in development.

COPYRIGHT NOTICE.

This code is copyright  (C)  by Ian Pouncy 18/12/16, and (version 9.0) 4/2/17.

under the   GNU GENERAL PUBLIC LICENSE,  Version 3, 29 June 2007 , see Free Software Foundation, Inc. <http://fsf.org/> 

 

This means you can use it if you want under the terms of that licence.



This source code  has been registered on github (user name Ianp44) on 18/12/16, and (version 9.0) 4/2/17.




*/



//global variables for this file



//object string functions

//creates string object from intrinsic string
//in/from Version 4.0 28/6/16 comp_expcomp1.js
function cr_str_str(s){
var x;
var xlen;
xlen=s.length;
this.len=s.length;
this.chars=new Array();
x=0;
while(x<xlen){
this.chars[x]=s.charCodeAt(x);
x++;
}
return(this);

}

//appends str2 to str1
//#bug_alert ? not changing length of str1
//in/from Version 4.0 28/6/16 comp_expcomp1.js
//in/from Version 4.0 28/6/16 comp_expcomp1.js
function app_str_str_obj(str1,str2){
var x;
var xlen;
var str2_str;
str2_str=str1.length;

xlen=str2.len;
x=0;
while(x<xlen){
str1.chars[str2_str+x]=str2.chars[x];
x++;
}

}

//creates string object from another string object
//in/from Version 4.0 28/6/16 comp_expcomp1.js
function cr_str_str_obj(s){
var x;
var xlen;
xlen=s.len;
this.len=s.len;
this.chars=new Array();
x=0;
while(x<xlen){
this.chars[x]=s.chars[x];
x++;
}
return(this);

}

//creates intrinsic string  from string object
//in/from Version 4.0 28/6/16 comp_expcomp1.js
function cr_istr_str(s){
var res;
var x;
var xlen;
res="";
xlen=s.len;
x=0;
while(x<xlen){
res+=String.fromCharCode(s.chars[x]);
x++;
}
return(res);
}


//compare two my string objects
//in/from Version 4.0 28/6/16 comp_expcomp1.js
function cmp_str_obj(str1,str2){
//var res;
var x;
var xlen1;
var xlen2;
var c1;
var c2;

x=0;
xlen1=str1.len;
xlen2=str2.len;

while(1){
	if(x==xlen1){
		if(x==xlen2)return(0);
		else return(-1);
}else if(x==xlen2){
	return(1);
		
	}else{

c1=str1.chars[x];
c2=str2.chars[x];

/*
if(a1[x]<a2[x])return(-1);
if(a1[x]>a2[x])return(1);
*/
if(c1<c2)return(-1);
if(c1>c2)return(1);
	}
x++;

}


}
















//?#bug_alert, may not use proper sring objects
//in/from Version 4.0 28/6/16 comp_expcomp1.js
function getlexchar(z){
if(z<0)rerror("-ve z index in getlexchar");
if(z>=buftxtarray.length)return(-1);
//if(endofbuf())return(-1);
return(buftxtarray[z]);
}

//in/from Version 4.0 28/6/16 comp_expcomp1.js
function skipspaces(){
	var c;
while(1){
//if(endofbuf())return;
c=getlexchar(bufpos);
if((c!=is_sp)&&(c!=10))return;
bufpos++;

}
}

//in/from Version 4.0 28/6/16 comp_expcomp1.js
function pushback(){
pushbackflag=1;
}


var is_a;
var is_z;
var is_A;
var is_Z;
var is__;
var is_0;
var is_9;
var is_sp;
var is_sq;
var is_dq;
var is_dot;

function init_is_funcs(){
//fromCharCode
//charCodeAt

is_a='a'.charCodeAt(0);
is_z='z'.charCodeAt(0);
is_A='A'.charCodeAt(0);
is_Z='Z'.charCodeAt(0);
is__='_'.charCodeAt(0);
is_0='0'.charCodeAt(0);
is_9='9'.charCodeAt(0);
is_sp=' '.charCodeAt(0);
is_dq='"'.charCodeAt(0);
is_sq="'".charCodeAt(0);
is_dot='.'.charCodeAt(0);


}

var opcharcds;
var opcharcds_len;
var opcharstr="[]+=-()/<>*%;&|^!.,";

function init_iopchar_cds(){
var x;
var xlen;
opcharcds= new Array();
x=0;
xlen=opcharstr.length;
while(x<xlen){
opcharcds[x]=opcharstr.charCodeAt(x);
x++;
}
opcharcds_len=xlen;



}

//returns true if c is an operator character
function is_opchar(c){
x=0;
while(x<opcharcds_len){
if(c==opcharcds[x])return(true);
x++;
}
return(false);
}

//returns true if c (single character number) is an alpha or '_' char
function is_alpha(c){
if((is_a<=c)&&(c<=is_z))return(true);
if(c==is__)return(true);
return((is_A<=c)&&(c<=is_Z));

}



/*
function is_alpha(c){
if(('a'<=c)&&(c<='z'))return(true);
if(c=='_')return(true);
return(('A'<=c)&&(c<='Z'));

}


*/

//returns true if c (single character) is an numeric char
function is_num(c){
return((is_0<=c)&&(c<=is_9));

}

/*functon is_num(c){
return(('0'<=c)&&(c<='9'));

}
*/
//returns true if c  is an c symbol char number

function is_alnum(c){
if(is_alpha(c))return(true);
return(is_num(c));
}



function bufposchar(){
//return(zposchar(txtbuf,bufpos));
return(txtbuf.charAt(bufpos));

}


function break_csym(){
var x;
var c;
txt_token.len=0;
x=0;
while(1){
c=getlexchar(bufpos);

//c=buftxtarray[bufpos];
if(!is_alnum(c))break;
txt_token.chars[x]=c;

bufpos++;
x++;
}
txt_token.len=x;


}


function get_num(sw){
var resnum;
var c;
var zdivr;
zdivr=1;

resnum=0;
while(1){
c=getlexchar(bufpos);
//c=buftxtarray[bufpos];
if(!is_num(c))break;
resnum=resnum*10;
resnum+=c-is_0;
if(sw==1)zdivr*=10;

bufpos++;
}
if(sw==1){resnum=resnum/zdivr;} //calculate fractional part of
//decimal number
return(resnum);
}


function break_num(){
var resnum;
var c;
resnum=get_num(0); //get integer part
c=getlexchar(bufpos);
//c=buftxtarray[bufpos];
if(c!=is_dot)return(resnum);
bufpos++;
resnum+=get_num(1); //get fractional part
return(resnum);
}

function is_quotes(c){
if(c==is_dq){
return(true);	
}
if(c==is_sq){
return(true);	
}
return(false);
	
}


function break_istr(c){
var c2;
var listr;
listr="";
//c2=getlexchar(bufpos);
bufpos++;
while(1){
	if(endofbuf()){
		parserror("Unexpected  end of input text in a string literal");
	return("");
	}
c2=getlexchar(bufpos);
if(c2==c){
bufpos++;
break;// end of string	
}
listr+=String.fromCharCode(c2);
bufpos++;
		
}
	
return(listr);
	
	
}




//parsing routines
//in/from Version 4.0 28/6/16 comp_expcomp1.js
function parstoken(){
var tokstr;
var x;
var c;
var rnum;
var listr;
var bestop;
if(pushbackflag==1){
pushbackflag=0;
return(0);

}
skipspaces();
holdpos=bufpos;
if(endofbuf())return(-1);

c=getlexchar(bufpos);
//c=buftxtarray[bufpos];
//if c symbol
if (is_alpha(c)){
break_csym();
parshead.labent=labtab[findlab_obj(txt_token,1)];
parshead.opclass=parshead.labent.opclass;
//rerror("term in parstoken");
return(0);
}
else if (is_num(c)){
rnum=break_num();
parshead.opclass=zopc_is_lit|zopc_is_number;
parshead.labent=-1;
parshead.numvalue=rnum;
return(0);

}
//zopc_is_number
//zopc_is_string

else if (is_quotes(c)){
listr=break_istr(c);
parshead.opclass=zopc_is_lit|zopc_is_string;
parshead.labent=-1;
parshead.numvalue=0;
parshead.istrvalue=listr;
return(0);

}
else if (is_opchar(c)){

break_op();
bestop=findop_obj(txt_token,maxoplen);
if(bestop==-1){
	parserror("Illegal or unknown  character string '"+
	cr_istr_str(txt_token) +"' in text");
}else{
	parshead.labent=labtab[bestop];
	parshead.opclass=parshead.labent.opclass;
	bufpos+=parshead.labent.name.len;
	}
//	rerror("term in isopchar");
return(0);

}

else 
parserror("Illegal character "+c +'('+String.fromCharCode(c) +") in text");

return(0);
}


function endofbuf(){
if(bufpos>=buftxtarray.length)return(true);
return(false);

}











//test routines
//from //Version 4.0 28/6/16 Beta Version
////in/from Version 4.0 28/6/16 comp_expcomp1.js

function test_str_obj(){
var txt;
var dtxt;
var ftxt;
var str_obj;
var str_obj2;
try{
	clear_err_reps();
//txt="";
//cold_init();
//display_all_labtab();
dtxt=document.forms["prgform"]["textin"].value;
str_obj=new cr_str_str(dtxt);
str_obj.chars[4]=32+1;
str_obj2=new cr_str_str_obj(str_obj);
//str_obj.chars[4]=32+1;
ftxt=cr_istr_str(str_obj2);
document.getElementById("parserror_id").innerHTML = ftxt;


}
catch(err){
rep_error(err);

}
}











