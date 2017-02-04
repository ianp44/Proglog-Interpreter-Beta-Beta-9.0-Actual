//Ian's Ai Demo test Page javascript include
//version 1.3 
//version 1.4 28/11/16  ? ok so far
//version 2.1 3/12/16  ? ok so far (no changes)
//version 2.3 6/12/16  ? ok so far (no changes)
//version 2.5 7/12/16  ? ok so far 
//version 2.75 8/12/16  ? ok so far written functor match routines, not tested.
//version 2.78 10/12/16  ? ok so far written functor match routines, not tested.
//version 2.83 13/12/16  ? ok so far written functor match routines, creates and displays rule base. part tested
//version 2.87 13/12/16  ? ok so far written functor match routines, creates and displays rule base. part tested.
//also compiles and displays rule varindex list. ??#bugalert doesn't test/display functor varindexes if variables
//version 4.1 27/12/16   ok so far , set rules on compute stack and displays them
//version 4.5 27/12/16   ?ok so far , set rules on compute stack and displays them
//version 5.0 05/1/17   ?ok so far , set rules on compute stack and displays them
//version 5.1 07/1/17   ?ok so far , set rules on compute stack and displays them
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







//structures
var goal_functor_object; //target object for the prolog query

//compute stack
var compute_stack; //matching stack, array of stack match objects
var compute_stack_top; 
var compute_stack_alloctop; 
var compute_stack_max; 


//lable table
var prlg_labtab; 
var prlg_labtab_top; 
var prlg_labtab_max; 

//ruletable
var top_rule_table;
var top_rule_top;
var top_rule_max;

var rule_list_max;
var max_functor_nest; //not checkde for when creating functors
var rule_varind_max;


//create_stack_match_lvars_obj
//var glob_match_obj; //global stack_match_lvars_obj ptr
 
//type ids
var functor_object_type;
var rule_object_type;
var stack_entry_object_type;
var functor_var_object_type;
var rule_list_object_type;
var var_reference_obj_type;

var zchecks; //controls runtime object type checking

var gfunctor;


//routines
//lable table
function init_prlg_labtab(){
prlg_labtab=new Array();

prlg_labtab_top=0;
prlg_labtab_max=300;

}

/*
function test_error5(){
	

document.getElementById("disp2").innerHTML="error test 5 report<br>\n";
	
	
}
*/
















function create_lab_ent(lzname,ltyp){
this.zname=lzname;
this.typ=ltyp; //1 = identifier, 2 = variable
this.rule_index=-1; //points to index into rule array if 
// is  a rule head functor
return(this);

}

function zfindlab(lzname){
var x;
var xlen;
var  ltyp;
var lobj;
xlen=prlg_labtab_top;
x=0;
while(x<xlen){
if(prlg_labtab[x].zname==lzname){
return(x);
}
x++;
}
return(-1); //not found

}


function add_labent(labent){
var res;
if(prlg_labtab_top>=prlg_labtab_max-2){
sys_error("too many lable entries in add_labent");
}
res=prlg_labtab_top;
prlg_labtab[prlg_labtab_top]=labent;
prlg_labtab_top++;
return(res);

}

//lexing functions

function zis_upper(c){
if(('A'<=c)&&(c<='Z'))return(true);
return(false);


}

function zis_lower(c){
if(('a'<=c)&&(c<='z'))return(true);
return(false);

}

function zis_num(c){
if(('0'<=c)&&(c<='9'))return(true);
return(false);

}


/*

//if sw==0, must be id only  name
function zis_alpha2(c,sw){
if (zis_lower(c))return(true);
if(sw!=0){
if(zis_upper(c))return(true);
}
if(c=='_')return(true);
return(false);

}
*/

//if first letter is upper case, 

function idsym(zname){
var c;
var upperflag;
var x;
var xlen;
var res;
res=0;
xlen=zname.length;
//upperflag=0;
if(xlen>0){
c=zname.charAt(0);
if(zis_num(c))return(0);

if(zis_upper(c)){
res=2;
}else 
if(zis_lower(c)){
res=1;
}else 
if(c!='_')return(0);

}

x=1;
while(x<xlen){
c=zname.charAt(x);

if(res==0){

if(zis_upper(c)){
res=2;
}else if(zis_lower(c)){
res=1;
}else {
if(c!='_')return(0);

}


}else if(res==1){
if(!( (zis_lower(c)||zis_num(c)||(c=='_')) ))return(0);

}else if(res==2){
if(!((zis_upper(c)||zis_lower(c)||zis_num(c)||(c=='_'))))return(0);


}


x++;
}
return(res);

}

//ruletable
function init_rule_table(){
top_rule_table=new Array();

top_rule_top=0;
top_rule_max=300;


}

//lable/id types



//stack routines
function init_stack(){

compute_stack= new Array();
compute_stack_top=0;
compute_stack_alloctop=0;
compute_stack_max=300;

}


function create_stack_vars(){
;
}












function create_stack_entry(){

;
}

//rule creation routines


function find_create(lzname){
var resobj;
var resind;
var ltyp;
var lobj;

resind= zfindlab(lzname,1,0);
/*
if(resind==-2){
user_error("illegal name "+lzname +" in datom1");

}
*/
if(resind<-1){
sys_error("illegal value of resind in find_create");

}
if(resind==-1){ // not found, create new entry
ltyp=idsym(lzname);
if(ltyp==0){//illegal name
user_error("illegal identifier: "+lzname+' in find_create');

}
if(! ((ltyp==1)||(ltyp==2))){
sys_error("illegal ltyp in datom1");
}

lobj=new create_lab_ent(lzname,ltyp);
//##

resind=add_labent(lobj);
}


return(resind);


}

function datom1(lzname){
var resobj;
var resind;
resind=find_create(lzname);

resobj=new create_functor_object(resind,null);

return(resobj);


}

function chk_rtail(lrtail){
var x;
var xlen;

if(lrtail!=null){
xlen=lrtail.length;
x=0;
		while(x<xlen){
		chk_is_functor(lrtail[x],'drule1')
		x++;
		}
}


}

//creates functor subtree

function dfunc1(lzname,rtail){
var resobj;
var resind;


resind=find_create(lzname);

if(prlg_labtab[resind].typ==2){
user_error("cannot create a functor head with a variable name:"+lzname+" in dfunc1");
}
if(zchecks){
	chk_rtail(rtail);
}

resobj=new create_functor_object(resind,rtail);
return(resobj);

}

//##
//rhead is an  functors, rtail is an array of functors
function drule1(lrhead,lrtail){
var resobj;
if(zchecks){

 chk_is_functor(lrhead,'drule1');
	chk_rtail(lrtail);

}


resobj=new create_rule_object(lrhead,lrtail);
//addrule to rulelist



return(resobj);

}

function create_rule_list(){
this.num_rules=0;
this.ztype=rule_list_object_type;
this.zrules=new Array();
return(this);

}

function create_add_rule_list(){
var res;
var resind;

if(top_rule_top>=top_rule_max-2){
sys_error("too many rulelists in create_add_rule_list");

}
res= new create_rule_list();
resind=top_rule_top;
top_rule_table[top_rule_top]=res;
top_rule_top++;
return(resind);

}


function add_rule(lrule_obj){
var ruleind;
var ruleid;
var rlist_obj;
var z;
var head_functor;
var tname;

if(zchecks){
chk_is_rule_obj(lrule_obj,"add_rule");
}

head_functor=lrule_obj.rhead;
if(zchecks){
 chk_is_functor(head_functor,'add_rule');

}

ruleid=head_functor.f_id;
if(ruleid==-1){
sys_error('ruleid is -1/undef in add_rule');
	
}
ruleind=prlg_labtab[ruleid].rule_index;
if(ruleind==-1){//new rulelist
ruleind=create_add_rule_list();
prlg_labtab[ruleid].rule_index=ruleind; //set up lable entry for
// that rule head id
}
rlist_obj=top_rule_table[ruleind];
z=rlist_obj.num_rules;

if(z>=rule_list_max-2){
tname=prlg_labtab[ruleid].zname;
sys_error("too many rules in rule list for: "+tname+' in add_rule');
}
rlist_obj.zrules[z]=lrule_obj;
lrule_obj.rule_tab_index=z;
rlist_obj.num_rules++;



}



//processing/matching routines
function create_rule_object(lrhead,lrtail){
if(zchecks){
this.ztype=rule_object_type;
}

this.rhead=lrhead; //functor object
this.rtail=lrtail; //array of functor objects
if(lrtail==null){ //no rule tail at all
this.rtailsz=0;	
}else{
this.rtailsz=lrtail.length;
}
this.rule_tab_index=-1; //position in rule table
this.rvaridlist=new Array(); 
this.rvaridlisttop=0;
return(this);


}
function disp_fnode_exit(f1){
if(zchecks){
chk_is_functor(f1,'disp_fnode_exit');
}


}
function disp_fnode(f1){
var labobj;
var lf_id;
var txt;

if(zchecks){
chk_is_functor(f1,'disp_fnode');
}
txt="";
lf_id=f1.f_id;
labobj=getprlg_labtabent(lf_id);

txt+=labobj.zname;
return(txt);

}

function disp_labent(x){
var txt;
var lobj;
txt="";
lobj=prlg_labtab[x];
txt+='x:'+x+' zname:'+lobj.zname+', typ:'+lobj.typ;
txt+=', rule_index:'+lobj.rule_index;
txt+='<br>\n';

return(txt);


}

function disp_prlg_labtab(){
var x;
var xtop;
var txt;
txt="";

txt+='Dump of Label Table<br>\n';

x=0;
xtop=prlg_labtab_top;
while(x<xtop){
txt+=disp_labent(x);
x++;
}
return(txt);
}

function dump_labs(){
var txt;
try{
txt='';
txt+=disp_prlg_labtab();
document.getElementById("disp2").innerHTML=txt;


}

catch(err){
process_error(err);

}

}

/*
top_rule_table=new Array();

top_rule_top=0;

*/
function disp_all_rules(){
var txt;
var lobj;
//var lar;
var x;
var xlen;
	
	txt='';
txt+='Dump of top rule table:<br>\n';

x=0;
xlen=top_rule_top;
while(x<xlen){
txt+='Disp rule List:';
txt+=x;
txt+='<br>\n ';
lobj=top_rule_table[x];	
txt+=disp_rule_list(lobj);	
	
x++;
}

return(txt);
	
	
}

/*
this.num_rules=0;
this.ztype=rule_list_object_type;
this.zrules=new Array();

*/
function disp_rule_list(rule_list_obj){
var txt;
var lobj;
var lar;
var x;
var xlen;
if(zchecks){
	chk_is_rule_list_obj(rule_list_obj,"disp_rule_list");
	}
txt='';
//txt+='Disp rule List:<br>\n ';
xlen=rule_list_obj.num_rules;
x=0;
lar=rule_list_obj.zrules;
while(x<xlen){
lobj=lar[x];
if(zchecks){
	chk_is_rule_obj(lobj,"disp_rule_list");
	}

zcompile_rule(lobj);


txt+='Rule:'+x+' ';
txt+=disp_rule(	lobj);
txt+='<br>\n';
txt+='varlist: ';

txt+=disp_rule_varlist(lobj);
txt+='<br>\n';
x++;	
}

return(txt);
	


}
function disp_rule_varlist(lrule_obj){
var txt;
var lobj;
var lar;
var x;
var xlen;
var lf_id;
if(zchecks){
	chk_is_rule_obj(lrule_obj,"disp_rule_varlist");
	}
txt='';
//this.rvaridlist=new Array(); 
//this.rvaridlisttop=0;

x=0;
xlen=	lrule_obj.rvaridlisttop;
while(x<xlen){
lf_id=lrule_obj.rvaridlist[x];
txt+='x:'+x+' ';
labobj=getprlg_labtabent(lf_id);
txt+=labobj.zname;
if(x<=xlen-2){
txt+=', ';	
}
x++;	
}
return(txt);
	
	
}


function disp_rule(lrule_obj){
var txt;
var lobj;
var lar;
var x;
var xlen;

if(zchecks){
	chk_is_rule_obj(lrule_obj,"disp_rule");
	}
txt='';

txt+='Disp rule: ';
lobj=lrule_obj.rhead;
if(zchecks){
chk_is_functor(lobj,'disp_rule');
}

txt+=disp_functor(lobj);
txt+=':- ';
x=0;
xlen=lrule_obj.rtailsz;
if(xlen!=0){
x=0;
lar=lrule_obj.rtail;
while(x<xlen){
lobj=lar[x];
if(zchecks){
chk_is_functor(lobj,'disp_rule');
}
txt+=disp_functor(lobj);
if(x!=xlen-1){
txt+=', ';	
}
	
x++;	
}
}
//txt+=';<br>\n';
txt+=';';
return(txt);

}
/*
this.rhead=lrhead; //functor object
this.rtail=lrtail; //array of functor objects
if(lrtail==null){ //no rule tail at all
this.rtailsz=0;	

*/





// function add_rule(lrule_obj){
//function drule1(lrhead,lrtail)

function create_rule_base(){
var txt;
var l4;	
var l5;
var l6;
var l10;
try{
	txt="";




l4=drule1(dfunc1('q22',null,null));
add_rule(l4);
l4=drule1(dfunc1('q88',null,null));
add_rule(l4);


l4=drule1(dfunc1('equals1',[datom1('a'),datom1('n1')]),null);
add_rule(l4);
l4=drule1(dfunc1('equals1',[datom1('b'),datom1('n2')]),null);
add_rule(l4);
l4=drule1(dfunc1('equals1',[datom1('c'),datom1('n3')]),null);
add_rule(l4);

l4=dfunc1('rule_typ_2',null);
l5=dfunc1('equals1',[datom1('a'),datom1('n1')]);
l6=dfunc1('equals1',[datom1('b'),datom1('n2')]);
l10=drule1(l4,[l5,l6]);
add_rule(l10);

l4=dfunc1('rule_typ_2',null);
l5=dfunc1('equals1',[datom1('a'),datom1('n1')]);
l6=dfunc1('equals1',[datom1('b'),datom1('n2')]);
l10=drule1(l4,[l5,l6]);
add_rule(l10);

l4=dfunc1('rule_typ_2',null);
l5=dfunc1('q22',null,null);
l6=dfunc1('q88',null,null);
l10=drule1(l4,[l5,l6]);
add_rule(l10);

l5=dfunc1('equals1',[datom1('a'),datom1('n4')]);
l6=dfunc1('equals1',[datom1('b'),datom1('n4')]);
l10=drule1(l4,[l5,l6]);
add_rule(l10);


//l5=dfunc1('equals1',[datom1('a'),datom1('n2')]);




l4=dfunc1('add1',[datom1('X'),datom1('Y'),dfunc1('res_add',[datom1('X2'),datom1('Y2')])]);
l5=dfunc1('equals1',[datom1('X'),datom1('X2')]);
l6=dfunc1('equals1',[datom1('Y'),datom1('Y2')]);
l10=drule1(l4,[l5,l6]);
add_rule(l10);
l4=dfunc1('add1',[datom1('X'),datom1('Y'),dfunc1('res_add2',[datom1('X2'),datom1('Y2')])]);
l5=dfunc1('equals1',[datom1('X'),datom1('X2')]);
l6=dfunc1('equals1',[datom1('Y'),datom1('Y2')]);
l10=drule1(l4,[l5,l6]);
add_rule(l10);





txt+='create_rule_base here<br>\n';

txt+=disp_all_rules();

document.getElementById("disp1").innerHTML=txt;

}
catch(err){
process_error(err);

}
	
	
	
}


function test_functor(){
var txt;
var l4;
try{
	txt="";
gfunctor=dfunc1('one',
[datom1('two'),datom1('three'),datom1('four'),
dfunc1('a',
[datom1('b'),datom1('c'),datom1('d')]
)]
);
txt+=disp_functor(gfunctor);
l4=dfunc1('one',
[datom1('two'),datom1('three'),datom1('four'),
dfunc1('a',
[datom1('b'),datom1('c'),datom1('d')]
)]
);

txt+='<br>Test 2:<br>';
gfunctor=dfunc1('one',
[datom1('two'),datom1('_Xthree'),l4,datom1('four'),datom1('three'),datom1('four'),
dfunc1('a',
[datom1('X'),datom1('Y'),datom1('Z')]
)]
);
txt+=disp_functor(gfunctor);


document.getElementById("disp1").innerHTML=txt;
}
catch(err){
process_error(err);

}


}


//this.rvaridlist=new Array(); 
//this.rvaridlisttop=0;

function chk_add_functor(cv_obj,func_obj){
var x;
var lf_id;
var lcur_rule;
var lar;
var lxtop;
//var res;
if(zchecks){
chk_is_functor(func_obj,'chk_add_functor');
}


if(!(func_obj.is_variable))return;

lcur_rule=cv_obj.cur_rule; //#bug_fix ? streamline
if(zchecks){
	chk_is_rule_obj(lcur_rule,"chk_add_functor");
	}



lf_id=func_obj.f_id;
if(lf_id==-1){
sys_error("f_id is -1/unset in chk_add_functor"	);
}
x=0;
lxtop=lcur_rule.rvaridlisttop;
while(x<lxtop){
if(lcur_rule.rvaridlist[x]==lf_id){
func_obj.is_variable_ind=x;
return;
}

x++;
}
//not found, create entry

if(lxtop>=rule_varind_max-2){
user_error2("too many distinct variables rule to compile in  chk_add_functor"	);
}
lcur_rule.rvaridlist[lxtop]	=lf_id;
func_obj.is_variable_ind=lxtop;
res=lxtop;
lxtop++;

lcur_rule.rvaridlisttop=lxtop;

return;
//##	
}

function walk_functor_compile(f1,cv_obj,nest){
var x;
var xlen;
var lar;
//var txt;

if(zchecks){
chk_is_functor(f1,'walk_functor_compile');
}
if(nest>max_functor_nest){
sys_error("nested too deep  in walk_functor_compile");
	
}
//txt="";
chk_add_functor(cv_obj,f1);


//txt+=disp_fnode(f1);
lar=f1.f_params;
if(lar==null)return;
//txt+='(';
x=0;
xlen=lar.length;
while(x<xlen){

walk_functor_compile(lar[x],cv_obj,nest+1);

x++;
}
//txt+=')';
return;	
	
	
}

function create_compile_vars_obj(){
this.cur_rule=null;
this.xtop=0;
//##	
return(this);	
}

//sets to variable index array for the rule 
function zcompile_rule(rule_obj){
var var_obj;
var lobj;
var x;
var xlen;

if(zchecks){
	chk_is_rule_obj(rule_obj,"zcompile_rule");
	}
var_obj=new create_compile_vars_obj();
var_obj.cur_rule=rule_obj;
//reset/clear varidlist
rule_obj.rvaridlist=new Array();
rule_obj.rvaridlisttop=0;
lobj=rule_obj.rhead;
if(zchecks){
chk_is_functor(lobj,'zcompile_rule');
}

walk_functor_compile(lobj,var_obj,0);
//do functor  tail
if(rule_obj.rtailsz==0)return;

lobj=rule_obj.rtail;

lar=lobj.f_params;
if(lar==null)return;
//txt+='(';
x=0;
xlen=lar.length;
while(x<xlen){

walk_functor_compile(lar[x],cv_obj,nest+1);

x++;
}

}










function disp_functor(f1){
var txt;
if(zchecks){
chk_is_functor(f1,'disp_functor');
}
txt='';

//txt+='Disp functor:<br>\n';
txt+=walk_functor_txt(f1);
return(txt);



}

function walk_functor_txt(f1){
var x;
var xlen;
var lar;
var txt;

if(zchecks){
chk_is_functor(f1,'walk_functor_txt');
}
txt="";

txt+=disp_fnode(f1);
lar=f1.f_params;
if(lar==null)return(txt);
txt+='(';
x=0;
xlen=lar.length;
while(x<xlen){

txt+=walk_functor_txt(lar[x]);
if(x<xlen-1)txt+=',';

x++;
}
txt+=')';
return(txt);
}

/*
function _stack_entry(lrule_obj){
var x;
var xtop;
if(zchecks){
chk_is_rule_obj(lrule_obj,"_stack_entry");
}
this.ztype=stack_entry_object_type;

this.rule_counter=0;
this.rule_obj=lrule_obj;

this.stack_list=null;
xtop=lrule_obj.rvaridlisttop;
if(xtop>0){
x=0;
this.stack_list=new Array();
while(x<xtop){
this.stack_list[x]=-1; //unistantiated
x++;
}

}
return(this);

}

*/

/*
function push__stack(functor_obj,stack_link_up){
var lobj;
if(zchecks){
chk_is_functor(functor_obj,'push__stack');
}


lobj=new _stack_entry(f_id,stack_link_up);

	;
	
	
	
}
*/



//needs to be a down compute stack index and a functor obj
function create_var_reference_obj(){
this.ztype=var_reference_obj_type;
this.up_comp_stack_ind=-1;
this.up_func_obj=null;
this.down_comp_stack_ind=-1;
this.down_func_obj=null;
return(this);
}
//cur_rule_obj
//sets the compute stack to be this rule for processing
function zset_stack_rule(lrule_obj,zuplink_ind){
var x;
var xtop;
var stack_obj;
if((compute_stack_top<0)||(compute_stack_top>=compute_stack_max-2)){
sys_error("compute stack out of allowed range in zset_rule"	);
return(0);	
}
stack_obj=alloc_compute_stack_entry();
compute_stack_top++;

if(zchecks){
chk_is_stack_entry_object(	stack_obj,"zset_stack_rule");
chk_is_rule_obj(lrule_obj,"zset_stack_rule");
}


//lstack_obj.f_id=f_id; //?#bug_alert may be used ??

stack_obj.link_up_index=zuplink_ind; //stack posisition of calling compute stack entry
stack_obj.rule_counter=0;
stack_obj.tail_index=-1;
stack_obj.cur_rule_obj=lrule_obj;

stack_obj.stack_list=null;
xtop=lrule_obj.rvaridlisttop;
if(xtop>0){
x=0;
stack_obj.stack_list=new Array();
while(x<xtop){
stack_obj.stack_list[x]=new create_var_reference_obj(); //? #bug_alert, should be in ar array??
//unistantiated ## needs to be a down compute stack index and a functor obj
x++;
}

}

}



















//returns the var obj for the functor in the rule on that compute stack entry
function get_var_obj(stack_obj,functor_obj){

var list_ar;
var var_index;
var rule_obj;
var list_obj;
var list_sz;

if(zchecks){
//chk_is_stack_entry_object(cur_stack_obj,"do_functor_stack_match2");
//chk_is_stack_entry_object(new_compute_stack_obj,"do_functor_stack_match2");






	chk_is_rule_obj(rule_obj,"get_var_obj");
	chk_is_stack_entry_object(stack_obj,"get_var_obj");
	chk_is_functor(functor_obj,"get_var_obj");
}
if(!(functor_obj.is_variable)){
sys_error("functor is not a variable in get_var_obj");

}
















list_ar=stack_obj.stack_list;
if(list_ar==null){
sys_error("list_ar is null in get_var_obj "	);
}
var_index=ctail_functor.is_variable_ind;





if(zchecks){

if(var_index==-1){
sys_error("up_var_index ==-1 in do_functor_stack_match2");
	
}
}



if(zchecks){
rule_obj=stack_obj.cur_rule_obj;
	chk_is_rule_obj(rule_obj,"get_var_obj");
	
list_sz=rule_obj.rvaridlisttop;
if(var_index>=list_sz){
sys_error("var_index > rule variables list sz  in get_var_obj");
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
}

list_obj=list_ar[var_index];
if(zchecks){
chk_is_var_reference_obj(list_obj,"get_var_obj");
}
return(list_obj);

}







//function to set stack bottom element  variable list entry  to point down stack to point up to
// working compute stack
//NB if the  higher variabl is unset to an proper functor it has to go all the way up setting them

function set_var_match_up(l_match_obj,list_obj,ctail_functor){
	
if(zchecks){
	chk_is_var_reference_obj(list_obj,"set_var_match_up");
	
	chk_is_functor(ctail_functor,"set_var_match_up");	
}

//end of checks
	
	
	
	
	
	
list_obj.up_comp_stack_ind=l_match_obj.l_working_compute_stack_pos;
list_obj.up_func_obj=ctail_functor;
	
}


//function to set cur_stack_obj variable list to point down stack to new_compute_stack_obj rhead_functor

//function set_match_down(cur_stack_obj,ctail_functor,new_compute_stack_obj,rhead_functor){
function set_var_match_down(l_match_obj,list_obj,rhead_functor){
if(zchecks){
	chk_is_var_reference_obj(list_obj,"set_var_match_down");
	
	chk_is_functor(rhead_functor,"set_var_match_down");	
}

//end of checks
	
list_obj.down_comp_stack_ind=l_match_obj.l_compute_stack_down;
list_obj.down_func_obj=rhead_functor;

}




	
































































//creates object that contains total process variables for match routines

function create_stack_match_lvars_obj(lcur_stack_obj2,lworking_compute_stack_pos2,lnew_compute_stack_obj2,lcompute_stack_top2){

if(zchecks){
chk_is_stack_entry_object(lcur_stack_obj2,"create_stack_match_lvars_obj");
chk_is_stack_entry_object(lnew_compute_stack_obj2,"create_stack_match_lvars_obj");
}
this.cur_stack_obj=lcur_stack_obj2;
this.l_working_compute_stack_pos=lworking_compute_stack_pos2;

this.new_compute_stack_obj=lnew_compute_stack_obj2;
this.l_compute_stack_down=lcompute_stack_top2;

return(this);

	
}


//resolve var reference for ctail all the way back to an atom
//function resolved_ctail_var(l_match_obj,res_obj,ctail_func,nest){
function resolved_ctail_var(res_obj,nest){
//var res_obj;
var ctail_func;
var next_ctail;
var next_stack_obj;
var next_stack_ind;
var list_obj;

ctail_func=res_obj.functor_obj;
if(zchecks){
	chk_is_stack_entry_object(l_resolved_ctail_obj.stack_obj,"resolved_ctail_var");
	chk_is_functor(rhead_functor,"resolved_ctail_var");	
}
if(nest>20){
sys_error("functor nesting too deep in resolved_ctail_var "	);

}
if(!(ctail_func.is_variable)){
return;
}
//this.down_comp_stack_ind=-1;
//this.down_func_obj=null;

list_obj=get_var_obj(res_obj.stack_obj,res_obj.functor_obj);
next_stack_ind=list_obj.down_comp_stack_ind;
if(next_stack_ind==-1){
sys_error("next_stack_ind is -1 (unset) at nest="+nest+" in resolved_ctail_var");
}
if((next_stack_ind<0)||(next_stack_ind>=(compute_stack_max-2))){
sys_error("working_compute_stack_pos out of allowed range in resolved_ctail_var"	);
return(0);	
}

next_stack_obj=compute_stack[next_stack_ind];
next_ctail=list_obj.down_func_obj;
if(zchecks){
chk_is_stack_entry_object(	next_stack_obj,"resolved_ctail_var");
	chk_is_functor(next_ctail,"resolved_ctail_var");	
}
res_obj.stack_obj=next_stack_obj;
res_obj.functor_obj=next_ctail;
resolved_ctail_var(res_obj,nest+1);
	
}


function create_resolved_ctail(lstack_obj, lfunctor_obj){
//function create_resolved_ctail_obj(){
this.stack_obj=lstack_obj;
this.functor_obj=lfunctor_obj;
//this.stack_obj=null;
//this.functor_obj=null;
return(this);
	
	
	
}

function zget_stack_obj_p(comp_stack_ind){
	//##a
var res_obj;	
if((comp_stack_ind<0)||(comp_stack_ind>=compute_stack_top)){
sys_error("comp_stack_ind out of range in zget_stack_obj_p");
}
res_obj=compute_stack[	comp_stack_ind];
if(zchecks){

chk_is_stack_entry_object(	res_obj,"zget_stack_obj_p");
}
return (res_obj);	
}

//intitialisation routine for match variables for match test routines
function set_stack_match_lvars_obj(comp_stack_ind1,comp_stack_ind2){
var res;
var comp_stack_obj1;
var comp_stack_obj2;
comp_stack_obj1=zget_stack_obj_p(comp_stack_ind1);
comp_stack_obj2=zget_stack_obj_p(comp_stack_ind2);


res= new 	create_stack_match_lvars_obj(comp_stack_obj1,comp_stack_ind1,comp_stack_obj2,comp_stack_ind2);
return(res);
	
}


//proper functor matching routine for functors
//function do_functor_stack_match2(cur_stack_obj,ctail_functor,new_compute_stack_obj,rhead_functor){
function do_functor_stack_match2(l_match_obj,ctail_functor,rhead_functor){
var id1;
var id2;
var list_obj1;
var list_obj2;
var tail_resolved_functor;
var res_obj;	
var next_ctail;
var xlen1;
var xlen2;
var x;

if(zchecks){
//chk_is_stack_entry_object(cur_stack_obj,"do_functor_stack_match2");
//chk_is_stack_entry_object(new_compute_stack_obj,"do_functor_stack_match2");
	chk_is_functor(ctail_functor,"do_functor_stack_match2");
	chk_is_functor(rhead_functor,"do_functor_stack_match2");	
}


id1=ctail_functor.f_id;
id2=rhead_functor.f_id;


if((!ctail_functor.is_variable)&&(!rhead_functor.is_variable)){ //atom atom match







if(!id_match(id1,id2))return(false);
next_ctail=ctail_functor;















}else if((ctail_functor.is_variable)&&(!(rhead_functor.is_variable))){
			list_obj1=get_var_obj(l_match_obj.cur_stack_obj,ctail_functor);
			if(	list_obj1.down_comp_stack_ind==-1){
			set_var_match_down(l_match_obj1,list_obj1,rhead_functor);		
				
			}else { //check match with atom rhead
			//may have to resolve the set down reference all the way down.
			//reference is a compute stack entry and a functor
			res_obj=new create_resolved_ctail_obj(l_match_obj.cur_stack_obj,ctail_functor);
			resolved_ctail_var(res_obj,0);
			//res_obj now contains info about terminator functor
			next_ctail=res_obj.functor_obj;
			if(zchecks){
				chk_is_functor(next_ctail,"do_functor_stack_match2");
			}
			id1=next_ctail.f_id;
			if(!id_match(id1,id2))return(false);
					
			}
	
}	else if((!(ctail_functor.is_variable))&&((rhead_functor.is_variable))){
			list_obj2=get_var_obj(l_match_obj.new_compute_stack_obj,rhead_functor);
			if(	list_obj2.up_comp_stack_ind!=-1){
				sys_error("up_comp_stack_ind !=-1 (should be unset) in do_functor_stack_match2 "	);
			}
			set_var_match_up(l_match_obj,list_obj2,ctail_functor);
			
			return (true);
		
	
	
	
	
}else if((ctail_functor.is_variable)&&(rhead_functor.is_variable)){
	
			list_obj1=get_var_obj(l_match_obj.cur_stack_obj,ctail_functor);
			if(	list_obj1.down_comp_stack_ind==-1){
			set_var_match_down(l_match_obj1,list_obj1,rhead_functor);		
			} // else do nothing



			list_obj2=get_var_obj(l_match_obj.new_compute_stack_obj,rhead_functor);
			if(	list_obj2.up_comp_stack_ind!=-1){
				sys_error("up_comp_stack_ind !=-1 (should be unset) in do_functor_stack_match2 "	);
			}
			set_var_match_up(l_match_obj,list_obj2,ctail_functor);
			
			return(true);	
	
	
}else {
	
sys_error("logical impossibility on control booleans in do_functor_stack_match2");

}

	//end of has variables block	
	
//now compare functor parameters
//next_ctail and rhead_functor
if(next_ctail.f_params==null){
xlen1=0;	
}
else {
xlen1=	next_ctail.f_params.length;

}
if(rhead_functor.f_params==null){
xlen2=0;	
}else {
xlen2=	rhead_functor.f_params.length;

}
if(xlen1!=xlen2)return(false); //different numbers of parameters
x=0;
while(x<xlen1){
if(!do_functor_stack_match2(l_match_obj,next_ctail.f_params[x],rhead_functor.f_params[x])){
return(false);	
}
	
x++;	
}
return(true);

}
//proper functor matching routine
//function do_functor_stack_match(cur_stack_obj,lrule_obj,new_compute_stack_obj,lnext_rule_obj){
function do_functor_stack_match(l_match_obj,lrule_obj,lnext_rule_obj){
var ltail_ind;
var rhead_functor;
var ctail_functor;
var res;

if(zchecks){
//chk_is_stack_entry_object(cur_stack_obj,"do_functor_stack_match");
//chk_is_stack_entry_object(new_compute_stack_obj,"do_functor_stack_match");
chk_is_rule_obj(lrule_obj,"do_functor_stack_match");
chk_is_rule_obj(lnext_rule_obj,"do_functor_stack_match");
}


//	this.rhead=lrhead; //functor object
//this.rtail=lrtail; //array of functor objects

	ltail_ind=l_match_obj.cur_stack_obj.tail_index;
	if(ltail_ind<0){
	sys_error("ltail <0 in do_functor_stack_match "	);
	}
	ctail_functor=lrule_obj.rtail[ltail_ind];
	rhead_functor=lnext_rule_obj.rhead;
	if(zchecks){
	chk_is_functor(ctail_functor,"do_functor_stack_match");
	chk_is_functor(rhead_functor,"do_functor_stack_match");	
	}
	//res=do_functor_stack_match2(cur_stack_obj,ctail_functor,new_compute_stack_obj,rhead_functor);
	res=do_functor_stack_match2(l_match_obj,ctail_functor,rhead_functor);
	return(res);
	
	
}



/*
//new version of this function 3/12/16
//new alogorithm is to work along set rule on compute stack
// working along the tail functor list, and working down
// the rule list for each functor head.
// this can involce back tracking back and forward along the
//set rule tail.
//Nb I think that doing a tail match on a rule head has to involve
//setting a new compute stack entry.
//But it won't do much if it doesn't match

function zdo_total_process(){
var cur_stack_obj;
var current_rule_obj;
var cur_top_rule_index;
var cur_rule_list_obj;
var cur_rule_index;
var cur_tail_pos;
var cur_next_functor_targ;
var working_compute_stack_pos;
var new_compute_stack_obj;
var new_f_id;
var prlg_labtab_obj2;
var lrule_obj;	
var lnext_rule_obj;
var l_match_obj;
var new_working_stack_pos;


init_total_process();

//process loop
//assumes goal_functor_object is defined, and may contain uninstantiated variables
//==
//program position variables are:-
//compute_stack
// tail_position (in the current rule tail
// rule_index (in rule list)
 





while(1){


while(1){ //break while loop; doesn't loop at all

























zfailed=0;
if(zchecks){
if((working_compute_stack_pos<1)||(working_compute_stack_pos>=(compute_stack_max-2))){
sys_error("working_compute_stack_pos out of allowed range in zdo_total_process"	);
return(0);	
}
//===	
//if((compute_stack_top<=0)||(compute_stack_top>=compute_stack_max-2)){
//sys_error("compute stack out of allowed range in zdo_total_process"	);
//return(0);	
//}



}







cur_stack_obj=compute_stack[working_compute_stack_pos];
if(zchecks){
chk_is_stack_entry_object(	stack_obj,"zset_stack_rule");
}

cur_top_rule_index=cur_stack_obj.top_rule_index;
if(zchecks){
if((cur_top_rule_index<0)||(cur_top_rule_index>=top_rule_top)){
sys_error("cur_top_rule_index out of range in zdo_total_process");
return(0);	
}
	
}









cur_rule_list_obj=top_rule_table[cur_top_rule_index];
if(zchecks){
chk_is_rule_list_obj(cur_rule_list_obj,"zdo_total_process");
}
cur_rule_index=cur_stack_obj.rule_counter;

//checks
if(cur_rule_index==-1){
sys_error("rule_counter unset in current compute stack object in zdo_total_process");
return(0);	
	
}
if(cur_rule_index<0){
sys_error("rule_counter <-1 in current compute stack object in zdo_total_process");
	
}
if(cur_rule_index>=cur_rule_list_obj.num_rules){
sys_error("rule_counter >=num_rules in current compute stack object in zdo_total_process");

}


















//
lrule_obj=cur_rule_list_obj.zrules[cur_rule_index];

if(zchecks){
chk_is_rule_obj(	lrule_obj,"zdo_total_process");
}
cur_stack_obj.cur_rule_obj=lrule_obj;


















//check above?
//first work along current compute stack object rule tail
ltail_ind=cur_stack_obj.tail_index;
if(ltail_ind==-1){
sys_error("compute stack entry tail index is -1 in zdo_total_process "	);
}
if(ltail_ind>=lrule_obj.rtailsz){
//=============start of  rule has suceeded;  reply back up compute stack to calling rule
//keep the compute stack entry on the stack with the data, and change the working rule
// back up and carry on
//##7
new_working_stack_pos=cur_stack_obj.l_link_up_index;
if(zchecks){
if((new_working_stack_pos<1)||(new_working_stack_pos>=(compute_stack_max-2))){
sys_error("working_compute_stack_pos out of allowed range in zdo_total_process"	);
return(0);	
}

working_compute_stack_pos=new_working_stack_pos;

//call rule suceeded
break;



//=============end  of  rule has suceeded;  reply back up compute stack to calling rule
	
}else {
//=============start of  work down functor rule match list;  


































cur_rule_index=cur_stack_obj.rule_counter;
if(zchecks){
if(cur_rule_index==-1){
sys_error("rule_counter unset in current compute stack object in zdo_total_process");
return(0);	
	
}
if(cur_rule_index<0){
sys_error("rule_counter <-1 in current compute stack object in zdo_total_process");
	
}
}
if(cur_rule_index>=cur_rule_list_obj.num_rules){
//back track down rule tail; rule list has failed

}

//=============start of  match current rule attamept; 

//create new compute stack entry for current rule list entry
lnext_rule_obj=cur_rule_list_obj.zrules[cur_rule_index];
if(zchecks){
chk_is_rule_obj(current_rule_obj,"zdo_total_process");
}

//new_compute_stack_obj=new 
new_compute_stack_obj=new _stack_entry(lnext_rule_obj.f_id,working_compute_stack_pos);
push_compute_stack_obj(new_compute_stack_obj);
zset_stack_rule(lnext_rule_obj); 
//##5

l_match_obj=new function create_stack_match_lvars_obj(cur_stack_obj,working_compute_stack_pos,new_compute_stack_obj,compute_stack_top-1){

//attemp functor match
//if(do_functor_stack_match(cur_stack_obj,lrule_obj,new_compute_stack_obj,lnext_rule_obj)){
if(do_functor_stack_match(l_match_obj,lrule_obj,lnext_rule_obj)){

	//##3
	
	
}
//do match attempt


//##3

//=============end of  match current rule attamept; 
	
	
}







cur_rule_index=cur_stack_obj.rule_counter;
if(zchecks){
if(cur_rule_index==-1){
sys_error("rule_counter unset in current compute stack object in zdo_total_process");
return(0);	
	
}
if(cur_rule_index<0){
sys_error("rule_counter <-1 in current compute stack object in zdo_total_process");
	
}
}

//check above?
//first work along current compute stack object rule tail
//##

if(cur_rule_index>=cur_rule_list_obj.num_rules){
//functor match sequence has terminated for that rule list
//means rule match fail	
//
//clean up compute stack
//???
if(working_compute_stack_pos!=compute_stack_top-1){
sys_error("stuff on compute stack bottom at functor match completion fail");
return(0);
	
}
//unlink to higher up working compute stack entry

working_compute_stack_pos=cur_stack_obj.link_up_index;
pop_compute_stack();
zfailed=1;
break;
	
}else {
//carry on working through rule_list and current rule tail	

current_rule_obj=cur_rule_list_obj.zrules[cur_rule_index];
if(zchecks){
chk_is_rule_obj(current_rule_obj,"zdo_total_process");
}
//got current rule
//now looking for current functor in tail
cur_tail_pos=cur_stack_obj.tail_index;
if(cur_tail_pos==-1){
sys_error("tail_index unset in current compute stack object in zdo_total_process");
return(0);	
}
if(zchecks){
	if(cur_tail_pos<-1){
sys_error("tail_index <-1 in current compute stack object in zdo_total_process");
	}
}
if(cur_tail_pos>=current_rule_obj.rtailsz){
//terminated tail functor matching, have suceeded.
//now change 	working_compute_stack_pos back up and carry on
//NB we DO NOT pop the compute stack, as that is where the partial result currently is
working_compute_stack_pos=cur_stack_obj.link_up_index;
zfailed=0;
break;
//##4
}

//process next functor
//cur_tail_pos=cur_stack_obj.tail_index;
if(current_rule_obj.rtail==null){
sys_error("current rtail is null in zdo_total_process with non-null cur_tail_pos");	
	
}
cur_next_functor_targ=current_rule_obj.rtail[cur_tail_pos]; //got the next functor in the rule
if(zchecks){
 chk_is_functor(cur_next_functor_targ,'zdo_total_process');
}

//now launch a totally new match attempt; this means create a new compute stack entry
//that's process the next functor

new_f_id=cur_next_functor_targ.f_id;
prlg_labtab_obj2=getprlg_labtabent(f_id);
new_top_rule_index=prlg_labtab_obj2.rule_index;
if(new_top_rule_index==-1){//no rules with matching functor heads in top_rule index
//implies functor match failure
zfailed=1;
	
}else {
	//#bug_alert
//new_compute_stack_obj=new create_compute_stack_entry(new_f_id,working_compute_stack_pos,new_top_rule_index);
push_compute_stack_obj(new_compute_stack_obj);
//set 1st rule and all compute stack object variables
	
}
//process next functor
	
	
//end of break while loop
}


}

	
	
	
}


	
	
	
	
	
}
	
	
	
}
*/

//##
/*

function zdo_total_process_old(){
var cur_stack_obj;
var current_rule_obj;
var cur_top_rule_index;
var cur_rule_list_obj;
var cur_rule_index;
var cur_tail_pos;
var cur_next_functor_targ;
var working_compute_stack_pos;
var new_compute_stack_obj;
var new_f_id;
var prlg_labtab_obj2;
	
init_total_process();

//process loop
//assumes goal_functor_object is defined, and may contain uninstantiated variables
//====
//program position variables are:-
// compute_stack
// rule_index (in rule list)
// tail_position (in the current rule tail


while(1){


while(1){ //break while loop; doesn't loop at all

zfailed=0;
if(zchecks){
if((working_compute_stack_pos<0)||(working_compute_stack_pos>=compute_stack_top)){
sys_error("working_compute_stack_pos out of allowed range in zdo_total_process"	);
return(0);	
}

//====
//if((compute_stack_top<=0)||(compute_stack_top>=compute_stack_max-2)){
//sys_error("compute stack out of allowed range in zdo_total_process"	);
//return(0);	
//}


}

cur_stack_obj=compute_stack[working_compute_stack_pos];
if(zchecks){
chk_is_stack_entry_object(	stack_obj,"zset_stack_rule");
}

cur_top_rule_index=cur_stack_obj.top_rule_index;
if(zchecks){
if((cur_top_rule_index<0)||(cur_top_rule_index>=top_rule_top)){
sys_error("cur_top_rule_index out of range in zdo_total_process");
return(0);	
}
	
}
cur_rule_list_obj=top_rule_table[cur_top_rule_index];
if(zchecks){
chk_is_rule_list_obj(cur_rule_list_obj,"zdo_total_process");
}

cur_rule_index=cur_stack_obj.rule_counter;
if(zchecks){
if(cur_rule_index==-1){
sys_error("rule_counter unset in current compute stack object in zdo_total_process");
return(0);	
	
}
if(cur_rule_index<0){
sys_error("rule_counter <-1 in current compute stack object in zdo_total_process");
	
}
}

if(cur_rule_index>=cur_rule_list_obj.num_rules){
//functor match sequence has terminated for that rule list
//means rule match fail	
//
//clean up compute stack
//???
if(working_compute_stack_pos!=compute_stack_top-1){
sys_error("stuff on compute stack bottom at functor match completion fail");
return(0);
	
}
//unlink to higher up working compute stack entry

working_compute_stack_pos=cur_stack_obj.link_up_index;
pop_compute_stack();
zfailed=1;
break;
	
}else {
//carry on working through rule_list and current rule tail	

current_rule_obj=cur_rule_list_obj.zrules[cur_rule_index];
if(zchecks){
chk_is_rule_obj(current_rule_obj,"zdo_total_process");
}
//got current rule
//now looking for current functor in tail
cur_tail_pos=cur_stack_obj.tail_index;
if(cur_tail_pos==-1){
sys_error("tail_index unset in current compute stack object in zdo_total_process");
return(0);	
}
if(zchecks){
	if(cur_tail_pos<-1){
sys_error("tail_index <-1 in current compute stack object in zdo_total_process");
	}
}
if(cur_tail_pos>=current_rule_obj.rtailsz){
//terminated tail functor matching, have suceeded.
//now change 	working_compute_stack_pos back up and carry on
//NB we DO NOT pop the compute stack, as that is where the partial result currently is
working_compute_stack_pos=cur_stack_obj.link_up_index;
zfailed=0;
break;
//##4
}

//process next functor
//cur_tail_pos=cur_stack_obj.tail_index;
if(current_rule_obj.rtail==null){
sys_error("current rtail is null in zdo_total_process with non-null cur_tail_pos");	
	
}
cur_next_functor_targ=current_rule_obj.rtail[cur_tail_pos]; //got the next functor in the rule
if(zchecks){
 chk_is_functor(cur_next_functor_targ,'zdo_total_process');
}

//now launch a totally new match attempt; this means create a new compute stack entry
//that's process the next functor

new_f_id=cur_next_functor_targ.f_id;
prlg_labtab_obj2=getprlg_labtabent(f_id);
new_top_rule_index=prlg_labtab_obj2.rule_index;
if(new_top_rule_index==-1){//no rules with matching functor heads in top_rule index
//implies functor match failure
zfailed=1;
	
}else {
new_compute_stack_obj=new create_compute_stack_entry(new_f_id,working_compute_stack_pos,new_top_rule_index);
push_compute_stack_obj(new_compute_stack_obj);
//set 1st rule and all compute stack object variables
	
}
//process next functor
	
	
//end of break while loop
}


}

	
	
	
}


	
	
	
	
	
}
	
	
	
}

*/
function get_top_rule_ind(lrule_obj){
var 	head_functor;
var ruleid;
var ruleind;
if(zchecks){
chk_is_rule_obj(lrule_obj,"get_top_rule_ind");
}
	
head_functor=lrule_obj.rhead;
if(zchecks){
 chk_is_functor(head_functor,'get_top_rule_ind');

}









ruleid=head_functor.f_id;
if(ruleid==-1){
sys_error('ruleid is -1/undef in get_top_rule_ind');
	
}
///#bugaleert not enough checks on range of ruleid
ruleind=prlg_labtab[ruleid].rule_index;
return (ruleind);
}











function disp_functor2(func_obj){
var txt;
txt='';
if(func_obj==null)return ('null');
txt+=disp_functor(func_obj);
return(txt);
}

function disp_var_reference_obj(x,var_ref_obj){
var txt;
txt='';
if(zchecks){
	
chk_is_var_reference_obj(var_ref_obj);	
}
txt+='Var ref ind:'+x+'<br>\n';
txt+='up_comp_stack_ind:'+var_ref_obj.up_comp_stack_ind+', ';
txt+='up_func_obj:'+disp_functor2(var_ref_obj.up_func_obj);
txt+='<br>\n';

txt+='down_comp_stack_ind:'+var_ref_obj.down_comp_stack_ind+', ';
txt+='down_func_obj:'+disp_functor2(var_ref_obj.down_func_obj);
txt+='<br>\n';

return(txt);

}

function disp_cmp_stack_list(cmp_stck_obj){
var lstack_list;	
var txt;
var x;

var xlen;
txt='';
if(zchecks){
chk_is_stack_entry_object(cmp_stck_obj,"disp_cmp_stack_list");
}
lstack_list=cmp_stck_obj.stack_list;
if(lstack_list==null){
txt+='stack_list:null<br>\n';	
}else {
x=0;
xlen=lstack_list.length;
txt+='stack_list:<br>\n';	
while(x<xlen){
txt+=disp_var_reference_obj(x,lstack_list[x]);
x++;
}
}
return(txt);	
}
	
	


function display_stack_obj(cmp_stck_obj){
var txt;
var txt2;
var ruleind;
var rule_obj;
txt='';
txt2='';
	
if(zchecks){
chk_is_stack_entry_object(cmp_stck_obj,"display_stack_obj");
}
txt+='top_rule_index:'+cmp_stck_obj.top_rule_index+', ';
txt+='link_up_index:'+cmp_stck_obj.link_up_index+', ';
txt+='tail_index:'+cmp_stck_obj.tail_index+', ';
txt+='rule_counter:'+cmp_stck_obj.rule_counter;
txt+='<br>\n';

/*
this.tail_index=-1; //set by set rule
this.rule_counter=0; //index into rule sequence array for each tail functor match attempt
*/


txt2+='cur_rule_obj:';
if(cmp_stck_obj.cur_rule_obj==null){
txt2+='null<br>\n'	;
}else {
rule_obj=cmp_stck_obj.cur_rule_obj;




if(zchecks){
chk_is_rule_obj(rule_obj,"display_stack_obj");
}
	
txt2+='<br>\n'	;
ruleind=get_top_rule_ind(rule_obj);
if(ruleind==-1){
sys_error('ruleind is -1/undef in display_stack_obj');
}
txt2+=disp_rule(rule_obj);
txt2+='<br>\n';
txt2+='varlist: ';

txt2+=disp_rule_varlist(rule_obj);
txt2+='<br>\n';
txt2+=disp_cmp_stack_list(cmp_stck_obj);

txt+='top_rule_ind(computed):'+ruleind+', ';
txt+='rule_tab_index:'+rule_obj.rule_tab_index;
txt+='<br>\n';


}
txt+=txt2;

return(txt);


}
//display compute stack test routines
function display_stack_entry(cmp_stck_ind){
var stack_obj;
var txt;
txt='';
if(	(cmp_stck_ind<0)||(cmp_stck_ind>=compute_stack_top)){
sys_error(" cmp_stck_ind out of range in display_stack_entry");
}
stack_obj=compute_stack[cmp_stck_ind];
txt+='compute stack entry index:'+cmp_stck_ind+'<br>\n';










}









































































//function chk_fval(z){
//if(isNaN(z))return(-1);	
//if(z<0)return(-2);	
//return(0);
//}

function chk_fval2(z,nm){
if(isNaN(z)){
user_error('data field '+ nm+' is not a valid number');	
	;	
}
if(z<0){
user_error('data field '+ nm+' is <0');	

}

return(0);
}

function button_do_match(){
	
var txt;
var bottom_comp_stack_ind;
var top_rule_tail_index;
var zuplink_comp_stack_ind;







var bottom_stack_obj;
var lrule_list_obj;
var top_rule_obj;
var bottom_rule_obj;
//var rhead; //functor to match
//var lhead; //functor to match from tail







var res;











var lmatch_obj;

try{
txt='';
document.getElementById("errep").innerHTML='button_do_match in progress<br>\n';
//uplink_ind
res=1.0*document.forms["data_form2"]["ind1"].value;
chk_fval2(res,'Bottom Compute Stack Entry Index');
bottom_comp_stack_ind=res;

res=1.0*document.forms["data_form2"]["ind2"].value;
chk_fval2(res,'Top Rule Tail Index');
top_rule_tail_index=res;

if(bottom_comp_stack_ind>=compute_stack_top){
user_error('data field '+ 'bottom_comp_stack_ind'+' is > compute_stack_top in button_do_match');	

}

 bottom_stack_obj=zget_stack_obj_p(bottom_comp_stack_ind);
 zuplink_comp_stack_ind=bottom_stack_obj.link_up_index;
 if( zuplink_comp_stack_ind==-1){
user_error('bottom_comp_stack_obj selected has unset link_up_index (==-1) in button_do_match');	
 
 }
 //##a
 lmatch_obj=set_stack_match_lvars_obj(zuplink_comp_stack_ind,bottom_comp_stack_ind);
 
 

top_stack_obj=lmatch_obj.cur_stack_obj;
bottom_stack_obj2=lmatch_obj.new_compute_stack_obj;



chk_is_stack_entry_object(top_stack_obj,'button_do_match');
chk_is_stack_entry_object(bottom_stack_obj2,'button_do_match');


top_rule_obj=top_stack_obj.cur_rule_obj;

if(zchecks){
	chk_is_rule_obj(top_rule_obj,"button_do_match");
	}
	
bottom_rule_obj=bottom_stack_obj2.cur_rule_obj;
if(zchecks){
	chk_is_rule_obj(bottom_rule_obj,"button_do_match");
	}


top_stack_obj.tail_index=top_rule_tail_index; //set top stack obj tail_index to test value

res=do_functor_stack_match(lmatch_obj,top_rule_obj,bottom_rule_obj);
txt+='Result of do_match =';
if(res==true){
txt+='true';	

}else if (res==false){
txt+='false';	
	
}else {
sys_error("illegal return value from do_functor_stack_match in button_do_match .");
}
txt+='<br>\n';
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
//document.getElementById("errep").innerHTML='OK<br>\n';
document.getElementById("errep").innerHTML=txt;


}

catch(err){
process_error(err);

}


}

function button_set_rule(){
	
var txt;
var zind1;
var zind2;
var zuplink_ind2;
var lrule_list_obj;
var lrule_obj;
var res;
try{
txt='';
//uplink_ind
res=1.0*document.forms["data_form1"]["ind1"].value;
//document.getElementById("errep").innerHTML=
//user_error('res:'+res+' OK<br>\n');

//res=6;
chk_fval2(res,'Top rule table index');
zind1=res;
res=1.0*document.forms["data_form1"]["ind2"].value;
//res=6;
chk_fval2(res,'Rule table index');
zind2=res;

res=1.0*document.forms["data_form1"]["uplink_ind"].value;
//res=6;
chk_fval2(res,'Up link index');
zuplink_ind2=res;

if(zind1>=top_rule_top){
user_error('data field '+ 'Top Rule table index'+' is > top_rule_top in button_set_rule');	

}
lrule_list_obj=top_rule_table[zind1];
chk_is_rule_list_obj(lrule_list_obj);


if(zind2>=lrule_list_obj.num_rules){
user_error('data field '+ 'Rule table index'+' is > num_rules for rule_list_obj in button_set_rule');	












































































































}
//##a

if(compute_stack_top==0){
	


zuplink_ind2=-1;
}else {






if(zuplink_ind2>=compute_stack_top){
user_error('data field '+ 'Up link index'+' is > compute_stack_top in button_set_rule');	

}
}

lrule_obj=lrule_list_obj.zrules[zind2];
chk_is_rule_obj(lrule_obj,'button_set_rule');
zset_stack_rule(lrule_obj,zuplink_ind2);


document.getElementById("errep").innerHTML='OK<br>\n';


}

catch(err){
process_error(err);

}
	
	
}

function button_display_compute_stack(){
var txt;
try{
txt='';
txt+=display_compute_stack();
document.getElementById("disp2").innerHTML=txt;


}

catch(err){
process_error(err);

}
	
	
}

function display_compute_stack(){
var txt;
var x;
var stack_obj;
txt='';
x=0;
txt+='Compute Stack:<br>\n';
//var compute_stack; //matching stack, array of stack match objects
//var compute_stack_top; 











while(x<compute_stack_top){
txt+='Entry '+x+':<br>\n';
	
stack_obj=compute_stack[x];	
txt+=display_stack_obj(stack_obj);
x++;	
}
//##9	
return(txt);	
}

function alloc_compute_stack_entry(){
var lstack_obj;
if(zchecks){
if(compute_stack_top>=compute_stack_max-2)sys_error("compute stack overflow in alloc_compute_stack_entry");
}
if(compute_stack_top>=compute_stack_alloctop){
compute_stack[compute_stack_alloctop]=new 	create_compute_stack_entry();
compute_stack_alloctop++;
}
lstack_obj=compute_stack[compute_stack_top];

lstack_obj.link_up_index=-1; //stack posisition of calling compute stack entry
//lstack_obj.f_id=f_id; //?#bug_alert may be used ??

lstack_obj.cur_rule_obj=null;
lstack_obj.top_rule_index=-1;

lstack_obj.tail_index=-1; //set by set rule
lstack_obj.rule_counter=0; //index into rule sequence array for each tail functor match attempt
lstack_obj.stack_list=null;


return(lstack_obj);
	
	
}

//f_id is functor head id
function create_compute_stack_entry(){
var x;
var xtop;
var lab_obj;
var top_rule_list_index;
this.ztype=stack_entry_object_type;

this.link_up_index=-1; //stack posisition of calling compute stack entry
//this.f_id=f_id; //?#bug_alert may be used ??

this.cur_rule_obj=null;
this.top_rule_index=-1;

this.tail_index=-1; //set by set rule
this.rule_counter=0; //index into rule sequence array for each tail functor match attempt
this.stack_list=null;





/* should go with set rule

xtop=lrule_obj.rvaridlisttop;
if(xtop>0){
x=0;
this.stack_list=new Array();
while(x<xtop){
this.stack_list[x]=-1; //unistantiated
x++;
}

}
*/
return(this);

}


function getprlg_labtabent(f_id){
if((f_id<0)||(f_id>=prlg_labtab_top)){
sys_error("illegal value for f_id in getprlg_labtabent.");
}
return(prlg_labtab[f_id]);

}

//returns index into rule_list index, may be improved
function find_rule_list_index(f_id){
var lobj;
var res;
lobj=getprlg_labtabent(f_id);
res=lobj.rule_index;
return(res);


}

/*
function compile_rule(rule_obj){
var x;
//##

}
*/

//may have to tidy up

function pop_compute_stack(){

if(compute_stack_top<=0){
	sys_error("compute stack undernested in pop_compute_stack ");
return(0);
}
compute_stack[compute_stack_top]=null; //clearing allocated objects
compute_stack_top--;	
	
}








function push_compute_stack_obj(compute_stack_obj){
var lobj;
if(zchecks){
chk_is_stack_entry_object(compute_stack_obj,"push_compute_stack_obj");
}

if(compute_stack_top>=compute_stack_max-2){
	sys_error("too many compute stack entries in push_compute_stack_obj");
	return(0);
}

//lobj=new _stack_entry(lrule_obj);
compute_stack[compute_stack_top]=compute_stack_obj;
compute_stack_top++;
	
}
/*
function try_rule(f1){

// create compute stack entry for rule
if(zchecks){
chk_is_functor(f1,'try_rule');
}


//create new compute stack entry with that f1 functor rule head match
##




}
*/

//f1 is a functor obj
function do_rule_search(f1){
var rule_pos;
var top_rule_list_ind;
var f_id;
var rule_list_obj;
var rule_list_end;
var cur_try_rule;
if(zchecks){
chk_is_functor(f1,'do_rule_search');
}
rule_pos=0;
f_id=f1.f_id;
top_rule_list_ind=find_rule_list_index(f_id);
if(top_rule_list_ind==-1)return(false); //no possible match, //no rules with that functor as head.
if((top_rule_list_ind<-1)||(top_rule_list_ind>=top_rule_max)){
sys_error("illegal value for top_rule_list_ind invdo_rule_search");
}

rule_list_obj=top_rule_table[top_rule_list_ind];
rule_list_end=rule_list_obj.num_rules;

while(rule_pos<rule_list_end){
cur_try_rule=rule_list_obj.zrules[rule_pos];
try_rule(f1,cur_try_rule);


rule_pos++;
}
}

/*
function create_functor_var_obj(lf_id){
if(zchecks){
this.ztype=functor_var_object_type;
}
this.


}
*/


function create_functor_object(lf_id, lf_params){
var prlg_labtab_obj;	
if(zchecks){
this.ztype=functor_object_type;
}
this.f_id=lf_id; //functor name. atom_id
prlg_labtab_obj=getprlg_labtabent(lf_id);
if(prlg_labtab_obj.typ==1){
this.is_variable=false;
}else if(prlg_labtab_obj.typ==2){
this.is_variable=true;
}else {
sys_error("illegal value for typ in create_functor_object "	);
}














this.is_variable_ind=-1; //only for variables, index into variables list when rule is compiled
this.f_params=lf_params; //array of parameters. if null means none.
return(this);

}


//#bug_alert (needs object type report???
function flag_null_error(nm){
sys_error("object reference was null in "+nm);
}


function chk_is_var_reference_obj(l_obj,nm){
if(l_obj==null)flag_null_error(nm);	
if(l_obj.ztype!=var_reference_obj_type){
sys_error("object not a var_reference_obj_type in "+nm);
}
}


function chk_is_stack_entry_object(l_obj,nm){
if(l_obj==null)flag_null_error(nm);	
if(l_obj.ztype!=stack_entry_object_type){
sys_error("object not a stack_entry_object in "+nm);
}
}

//rule_list_object_type
function chk_is_rule_list_obj(f1,nm){
if(f1==null)flag_null_error(nm);	
if(f1.ztype!=rule_list_object_type){
sys_error("object not a top_rule_list_obj in "+nm);
}
}


function chk_is_rule_obj(f1,nm){
if(f1==null)flag_null_error(nm);	
if(f1.ztype!=rule_object_type){
sys_error("object not a rule_obj in "+nm);
}
}


















































function chk_is_functor(f1,nm){
if(f1==null)flag_null_error(nm);	
if(f1.ztype!=functor_object_type){
sys_error("object not a functor in "+nm);
}
}





















function test_error5(){
	

document.getElementById("disp2").innerHTML="error test 5 report<br>\n";
	
	
}

















//currently ids are lable table index entries
function id_match(id1,id2){
if(id1==id2)return(true);
return(false);


}

//currently ids are lable table index entries

function ret_id_typ(f1){
if(zchecks){
if((f1<0)||(f1>=prlg_labtab_top)){
sys_error("f1 out of range of prlg_labtab in ret_id_typ");

}
}
return(prlg_labtab[f1].typ);
}


function match_functors(f1,f2){
var id1;
var id2;
if(zchecks){
chk_is_functor(f1,'match_functors');
chk_is_functor(f2,'match_functors');
}
id1=f1.f_id;
id2=f2.f_id;
if(!id_match(id1,id2))return(false);


}


















//general routines
function zinit3(){
try{
document.getElementById("errep").innerHTML='None<br>\n';

//type id initialisation
functor_object_type=1;
rule_object_type=2;
stack_entry_object_type=3;
functor_var_object_type=4;
var_reference_obj_type=5;
rule_list_object_type=6;


rule_varind_max=30;
max_functor_nest=30;

//
zchecks=true;


init_prlg_labtab();
init_stack();
init_rule_table();
}
catch(err){
process_error(err);

}



}

function process_error(s){
document.getElementById("errep").innerHTML=s+'<br>\n';

//  

}

function rerror(s){

throw(s);

}


function sys_error(s){
rerror("System Error:"+s);

}

//will be compile/pars time error

function user_error2(s){
rerror("User Error:"+s);

}
function user_error(s){
rerror("User Error:"+s);

}
