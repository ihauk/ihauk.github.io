function goURL(url){
	window.location.href=url;
}

function fnCreateArray(intHeight,intWidth){
	var intX,intY,arrRet;
	arrRet=new Array(intHeight);
	for(intY=0;intY<intHeight;intY++){
		arrRet[intY] = new Array(intWidth);
	}
	return arrRet;
}

/******************************************表单数据验证******************************************/
function checkFormTxtItem(objT){//text不能为空
	if(AllTrim(objT.value) == "") return false;
    else return true;
}

function checkFormEmail(objT,required){//email格式
	var strEmail = AllTrim(objT.value);
	strEmail = strEmail.toLowerCase();
	var strSuffix = "cc|com|edu|gov|int|net|org|biz|info|pro|name|coop|al|dz|af|ar|ae|aw|om|az|eg|et|ie|ee|ad|ao|ai|ag|at|au|mo|bb|pg|bs|pk|py|ps|bh|pa|br|by|bm|bg|mp|bj|be|is|pr|ba|pl|bo|bz|bw|bt|bf|bi|bv|kp|gq|dk|de|tl|tp|tg|dm|do|ru|ec|er|fr|fo|pf|gf|tf|va|ph|fj|fi|cv|fk|gm|cg|cd|co|cr|gg|gd|gl|ge|cu|gp|gu|gy|kz|ht|kr|nl|an|hm|hn|ki|dj|kg|gn|gw|ca|gh|ga|kh|cz|zw|cm|qa|ky|km|ci|kw|cc|hr|ke|ck|lv|ls|la|lb|lt|lr|ly|li|re|lu|rw|ro|mg|im|mv|mt|mw|my|ml|mk|mh|mq|yt|mu|mr|us|um|as|vi|mn|ms|bd|pe|fm|mm|md|ma|mc|mz|mx|nr|np|ni|ne|ng|nu|no|nf|na|za|aq|gs|eu|pw|pn|pt|jp|se|ch|sv|ws|yu|sl|sn|cy|sc|sa|cx|st|sh|kn|lc|sm|pm|vc|lk|sk|si|sj|sz|sd|sr|sb|so|tj|tw|th|tz|to|tc|tt|tn|tv|tr|tm|tk|wf|vu|gt|ve|bn|ug|ua|uy|uz|es|eh|gr|hk|sg|nc|nz|hu|sy|jm|am|ac|ye|iq|ir|il|it|in|id|uk|vg|io|jo|vn|zm|je|td|gi|cl|cf|cn"
	var regu = "^[a-z0-9][_a-z0-9\-]*([\.][_a-z0-9\-]+)*@([a-z0-9\-\_]+[\.])+(" + strSuffix + ")$";
	var re = new RegExp(regu);

	if(strEmail==''&&required) {
		alert("请填写电子邮件地址！");
		setFocus(objT);
		return false;
	}
	if(strEmail==''&&!required) return true;
	//if(strEmail.indexOf("@") < 1 || strEmail.indexOf(".") < 1 || strEmail.indexOf("@") != strEmail.lastIndexOf("@") || strEmail.lastIndexOf(".") <= strEmail.indexOf("@")){
	//var patn = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	//if(!patn.test(strEmail)){
	if(strEmail.search(re) == -1){
		alert("请输入有效的Email地址！");
		setFocus(objT);
		return false;
	}
	return true;
}

var arrErrCha = [',','@','$','&','%','?','!','|',':','"','\'','\\','*','/','=','<','>',';','(',')','《','》','[',']','{','}','^','_','`','-'];
function checkKeyword(objT,required){//验证关键词


	var keyword = jtrim(objT.value);
	objT.value = keyword;
	if(required){
		if(keyword==""){
			alert('关键词输入不能为空, 请重新输入！');
			return false;
		}
	}
	if(keyword.length!=0 && keyword.length<2){
		alert('关键词输入不能少于2个英文字母或2个汉字, 请重新输入！');
		return false;
	}
	for(var i=0;i<arrErrCha.length;i++){
		if(keyword.indexOf(arrErrCha[i])>-1){
			alert('输入的内容含有不规范词语，会降低搜索结果的准确度，请重新输入！');
			return false;
		}
	}
	var valueStr = keyword;
	valueStr = valueStr.toLowerCase().replace(/c\+\+/g,'').replace(/j\+\+/g,'');
	if(valueStr.indexOf('+')>-1){
		alert('输入的内容含有不规范词语，会降低搜索结果的准确度，请重新输入！');
		return false;
	}
	return true;
}

function AllTrim(str){
	if(str.charAt(0) == " "){
  		str = str.slice(1);
  		str = AllTrim(str);
 	}
 	return str;
}

function jtrim(sstr){ //去掉头尾上的空格
	var astr=""; 
	var dstr=""; 
	var flag=0; 
	for(var i=0;i<sstr.length;i++){
	    if((sstr.charAt(i)!=' ')||(flag!=0)){
		   dstr+=sstr.charAt(i); 
		   flag=1; 
		} 
	} 
	flag=0; 
	for(i=dstr.length-1;i>=0;i--){
	    if((dstr.charAt(i)!=' ')||(flag!=0)){
		   astr+=dstr.charAt(i); 
		   flag=1; 
		} 
	} 
	dstr=""; 
	for(i=astr.length-1;i>=0;i--) dstr+=astr.charAt(i); 
	return dstr; 
}

function setFocus(item){
	item.focus();
}
/******************************************end 表单数据验证******************************************/

//text输入框默认提示文字的清空和重置


function trySetDefaultText(obj,txt){
	if(obj.value==""){
		obj.value = txt;
		obj.className = 'grey12';
	}
}
function tryClearDefaultText(obj,txt){
	if(obj.value==txt){
		obj.value = '';
		obj.className = 'black12';
	}
}

//checkbox的全选


function ChkSelectAll(chknameStr,chkallnameStr){
	var arrInput = document.getElementsByTagName('input');
	var arrCheckbox = [];
	var chkname = [];
	var chkallname = [];
	for(var j=0;j<arrInput.length;j++){
	    if(arrInput[j].type.toLowerCase()=='checkbox') arrCheckbox[arrCheckbox.length] = arrInput[j];
	}
	for(j=0;j<arrCheckbox.length;j++){
	    if(arrCheckbox[j].name==chknameStr) chkname[chkname.length] = arrCheckbox[j];
		else if(arrCheckbox[j].name==chkallnameStr) chkallname[chkallname.length] = arrCheckbox[j];
	}
	
	var length = chkname.length;   
    if(chkallname.length==1) chkallname[0].checked = chkallname[0].checked|0;
	else if(chkallname.length>1 && ChkSelectAll.arguments[2]) for(j=0;j<chkallname.length;j++) chkallname[j].checked =  ChkSelectAll.arguments[2].checked|0;

    for (var i = 0; i < length; i++) if(!chkname[i].disabled) chkname[i].checked=chkallname[0].checked;            
}
function unChkSelectAll(chkallnameStr){
	var arrInput = document.getElementsByTagName('input');
	var arrCheckbox = [];
	var chkallname = [];
	for(var j=0;j<arrInput.length;j++){
	    if(arrInput[j].type.toLowerCase()=='checkbox') arrCheckbox[arrCheckbox.length] = arrInput[j];
	}
	for(j=0;j<arrCheckbox.length;j++){
		if(arrCheckbox[j].name==chkallnameStr) chkallname[chkallname.length] = arrCheckbox[j];
	}
	
	for(j=0;j<chkallname.length;j++) if(chkallname[j].checked) chkallname[j].checked = chkallname[j].checked&0;
}

//从页面中央弹出窗口


function openPopup(url,windowname,w,h){
	var intTop = 0;
    var intLeft = 0;
    var winWidth = window.screen.availWidth-12;
    var winHeight = window.screen.availHeight-50;
    var scrollNorY='no';
    if(parseInt(h) == 8888){
	    //如果高度为8888,那么全屏显示
		w=window.screen.availWidth-12;
	    h=window.screen.availHeight-50;}
    else{ //从中间呈现


		intTop = (window.screen.availHeight-parseInt(h))/2;
		intLeft = (window.screen.availWidth-parseInt(w))/2;
		if (intTop < 30)	intTop = 0;
		if (intLeft < 30)	intLeft = 0;
	}
    if(w > winWidth){
		w=winWidth;
	    scrollNorY='yes';
    }
	if(h == 800) scrollNorY='yes';
	else if(h > winHeight){
        if(h==6666) scrollNorY='no';
	    else scrollNorY='yes';
	    h=winHeight;
	}
    var windowconfig = "status=no,scrollbars=" + scrollNorY + ",top="+ intTop +",left="+ intLeft  +",resizable=0,width=" + w + ",height=" + h;
    subwin=window.open(url, windowname, windowconfig);
    if(subwin){
	    subwin.focus();
	    return subwin;
	}
}

function getCookie(key){
  var name=key;
  var start = document.cookie.indexOf(name+"=");
  var len = start+name.length+1;
  if (start == -1) return null;
  var end = document.cookie.indexOf(";",len);
  if (end == -1) end = document.cookie.length;
  return unescape(document.cookie.substring(len,end)); 
}

function delInvisiChar(inputObj){
	if(inputObj&&inputObj.nodeType&&inputObj.nodeType==1&&inputObj.value) inputObj.value = inputObj.value.replace(/[\x00-\x08]|\x0b|\x0c|[\x0e-\x1f]/gi,'');
}