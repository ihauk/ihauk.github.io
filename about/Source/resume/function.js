function CompanyList(){
     if(document.searchlist){
        document.searchlist.publishdate.disabled =true;
        //document.searchlist.citycode.disabled =true;
        document.searchlist.is_vac.checked = false;
        document.searchlist.keyword.value = '输入公司关键字';
	 }
}
function KeywordList(){
     if(document.searchlist){
        document.searchlist.publishdate.disabled =false;
        //document.searchlist.citycode.disabled =false;
        document.searchlist.is_company.checked = false;
        document.searchlist.keyword.value = '输入职位关键字';
	 }
}


function logonType(formObj){
	if(formObj != null){
    for(var i=0;i<formObj.logonradio.length;i++){
      if (formObj.logonradio[i].checked == true ) {
				return formObj.logonradio[i].value;
      }
    }
	}
}

function cityChannelSearchSubmit(formObj){
	if(parseInt(formObj.jobfamily.value) == 0 && parseInt(formObj.industry.value) == 0 && formObj.keyword1.value.length < 1){
	  alert("??ê?è?1??ü×??ò?????°??ààDí￡?");
		formObj.jobfamily.focus();
		return false;
	}
	return checkKeyword(formObj.keyword1, 0);
}

function firstpageLogon(formObj){
	if(formObj != null){
    for(var i=0;i<formObj.logonradio.length;i++){
      if (formObj.logonradio[i].checked == true ) {
				if(formObj.logonradio[i].value == "myzhaopin"){
				  if(loginform_onsubmit(formObj)){
					  formObj.action = "mz_logon.jsp";
					  return true;
				  }else
				    return false;
				}
      }
    }
	}
}

function aftertopuserlogin(){
	self.opener.document.loginimg.width='82';
	self.opener.document.loginimg.src='images/user-logout.gif';
	self.opener.loghref.href = 'index.jsp?logout=true';
	self.opener.loghref.onclick = '';	
//  history.go(0);
}

function sendVacancyToFriend(pageurl){
	email = window.prompt("请输入您朋友的Email地址", "");
  if (email == null || email == "" || email.indexOf(".") <= 1 || 
    email.length <7 || email.indexOf("@") <= 0 || calcStringLength(email)>80) {
		alert ("电子邮件地址输入有误！");
		return false;
  }
	window.location.href = pageurl+"&emailTo="+email;
}

function checkKeyword(keyWord, ifnull){
  if ((keyWord.value.length == 0 || keyWord.value.indexOf('??ê?è?1??ü×?') > -1)&& ifnull == 1){
	  alert("输入关键字不能为空！");
	  keyWord.focus();
	  return false;
	} else if (keyWord.value.length >60){
	  alert("输入关键字超长！");
	  keyWord.focus();
	  return false;
	} else if (keyWord.value.indexOf("%") > -1 || keyWord.value.indexOf("?") > -1){
	  alert("关键字包含非法字符！");
	  keyWord.focus();
	  return false;
	}
}


function psSearchAdvSubmit(formObj, ifpsa){
	if(ifpsa == 1){
		if(formObj.name.value.length < 1){
	  	alert("搜索器名称不能为空！");
  		formObj.name.focus();
  		return false;
		}
		if(formObj.name.value.length > 100){
	  	alert("搜索器名称超长！");
  		formObj.name.focus();
  		return false;
		}
	}
	
	if(formObj.seljobfamily.options.length < 1){
  	alert("职业类型不能为空！");
  	formObj.jobfamily.focus();
  	return false;
	}
	
	if(formObj.selindustry.options.length < 1){
  	alert("行业类型不能为空！");
  	formObj.industry.focus();
  	return false;
	}

	if(formObj.sellocation.options.length < 1){
  	alert("工作地区不能为空！");
  	formObj.location.focus();
  	return false;
	}

	jobfamlyall = false;
  jobfamly_length=formObj.seljobfamily.options.length;
  for (i = 0;i<jobfamly_length ; i++) {
    if (formObj.seljobfamily.options[i].value == "0") {
    	jobfamlyall = true;
    }
  }

	industryall = false;
  industry_length=formObj.selindustry.options.length;
  for (i = 0;i<industry_length ; i++) {
    if (formObj.selindustry.options[i].value == "0") {
      industryall = true;
    }
  }
  
  if(jobfamlyall && industryall && formObj.keyword.value.length < 1){
  	alert("如果不输入关键字，职业类型和行业类型不能都为所有！");
  	formObj.jobfamily.focus();
  	return false;
	}
	
  selectall(formObj);
  keywordObj = formObj.keyword;
  if(ifpsa == 1) keywordObj = formObj.keyword;
  return checkKeyword(keywordObj, 0);
}

function psSearchSubmit(formObj){
	if(parseInt(formObj.jobfamily.value) == 0 && parseInt(formObj.industry.value) == 0 && formObj.keyword1.value.length < 1){
	  alert("如果不输入关键字，职业类型和行业类型不能都为所有！");
		formObj.jobfamily.focus();
		return false;
	}
	return checkKeyword(formObj.keyword1, 0);
}

function psCompanySearchSubmit(formObj){
	if(parseInt(formObj.citycode.value) == 0 && parseInt(formObj.industry.value) == 0 && formObj.keyword.value.length < 1){
	  alert("如果不输入关键字，行业类型和工作地点不能都为所有！");
		formObj.keyword.focus();
		return false;
	}
	return checkKeyword(formObj.keyword, 0);
}

function popupAlert(url) {
		history.back();
    popup = window.open(url,"","menubar=no,scrollbars=no,resizable=yes,titlebar=no,toolbar=no,directories=no,width=335,height=80,top=200,left=250");
//    popup.focus();
    return true;
}

function popupPasswordAlert() {
    popup = window.open("http://www.zhaopin.com/jobseeker/mz_password_alert.jsp","","menubar=no,scrollbars=no,resizable=no,titlebar=no,toolbar=no,directories=no,width=565,height=121,top=150,left=130");
    popup.focus();
    return true;
}

function insertTargetCompany(formObj){
	hasSelected = false;
  companyid_length=formObj.companyid.length;
  if(companyid_length > 1){
	  for (i = 0;i<companyid_length ; i++) {
  	  if (formObj.companyid[i].checked) {
    	  hasSelected = true;
	    }
  	}
  }else{
 	  if (formObj.companyid.checked) {
   	  hasSelected = true;
    }
	}
	
	if(!hasSelected){
		alert("请您先选择公司！");
		formObj.actionTag.value = "";
		return false;
	}
	
	formObj.actionTag.value = 'InsertTarget';
	formObj.submit();
}

function insertForbidCompany(formObj){
	hasSelected = false;
  companyid_length=formObj.companyid.length;
  if(companyid_length > 1){
	  for (i = 0;i<companyid_length ; i++) {
  	  if (formObj.companyid[i].checked) {
    	  hasSelected = true;
	    }
  	}
  }else{
 	  if (formObj.companyid.checked) {
   	  hasSelected = true;
    }
	}
	
	if(!hasSelected){
		alert("请您先选择公司！");
		formObj.actionTag.value = "";
		return false;
	}
	
	formObj.actionTag.value = 'InsertForbidCompany';
	formObj.submit();
}

function checkTargetCondition(formObj){
	industryall = false;
  industry_length=formObj.industry.options.length;
  for (i = 0;i<industry_length ; i++) {
    if (formObj.industry.options[i].selected == true &&
      formObj.industry.options[i].value == "0") {
      industryall = true;
    }
  }
	
	if(industryall && formObj.keyword.value.length == 0){
		alert("行业类型为所有的时候关键字不能为空！");
		formObj.keyword.focus();
		return false;
	}
	
	return checkKeyword(formObj.keyword, 0);
}

function popupfullwindow(urltextpre,checkboxObj) {
    var urltext = urltextpre + '?';
    for(var i=0;i<checkboxObj.length;i++){
        if (checkboxObj[i].checked == true ) {
            urltext = urltext + 'vacancyid='+ checkboxObj[i].value + '&';
        }
    }
    popup = window.open(urltext,"","");
    popup.focus();
    return true;
}

function popup1(url) {
    popup = window.open(url,"","menubar=no,scrollbars=no,resizable=yes,width=422,height=347,top=100,left=160");
    popup.focus();
    return true;
}

function popup(url) {
    var gt = unescape('%3e');
    var popup = null;
    var over = "Launch Pop-up Navigator";
    popup = window.open('','popupnav','menubar=no,scrollbars=yes,resizable=no,width=511,height=400');

    if (popup != null) {
        if (popup.opener == null) {
            popup.opener = self;
        }
    }
    popup.location.href = url;
    popup.focus();
    return true;
}

// mz_admin.jsp
function deleteNotApplyCheck(formObj) {
    var actionTagObj = formObj.actionTag;
    actionTagObj.value="DeleteNotApply";
    var checkboxObj = formObj.vacancyid;
    if (isCheckboxChecked(checkboxObj)) formObj.submit();
}

// mz_admin.jsp
function ApplyVacancyCheck(formObj,type) {
    var actionTagObj = formObj.actionTag;
    var checkboxObj = formObj.vacancyid;
    actionTagObj.value="Apply";
    if (notapply_onsubmit(formObj,type) && isCheckboxChecked(checkboxObj)) formObj.submit();
}

// mz_admin.jsp
function notapply_onsubmit(formObj,type){
    if (type==0){
        alert("您还没有简历！");
	    return false;
    }
    if (type==1){
        if (formObj.engcv.value=="-1" ){
            alert("请选择简历！");
	      	return false;
	    }
    }
    if (type==2){
        if (formObj.chncv.value=="-1" ){
            alert("请选择简历！");
	      	return false;
	    }
    }
    if (type==3){
        if ((formObj.chncv.value=="-1" )&&(formObj.engcv.value=="-1" )){
            alert("请选择简历！");
	        return false;
	    }
    }
	return true;
}

function deleteApplyCheck(formObj) {
    var checkboxObj = formObj.vacancyid;
    var actionTagObj = formObj.actionTag;
    actionTagObj.value="DeleteHaveApply";
    if (isCheckboxChecked(checkboxObj)) formObj.submit();
}

function setLoginAndSubmit(formObj,type) {
    var actionTagObj = formObj.actionTag;
    if (type == '1') {
        var isLoginObj = formObj.isLogin;
        var checkboxObj = formObj.vacancyid;
        var bottonObj = formObj.LoginSubmit;

        isLoginObj.value = "Y";
        bottonObj.value = "提交到申请管理";
        actionTagObj.value="submitApply";
        if (isCheckboxChecked(checkboxObj)) formObj.submit();
        self.close();
    }
    else if (type == '2') {
        for (i=0;i<self.opener.document.forms.length;i++) {
            self.opener.document.forms[i].isLoginObj = "Y";
            self.opener.document.forms[i].botton1Obj = " 申请职位 ";
            self.opener.document.forms[i].botton2Obj = "职位信息收藏";
        }
        actionTagObj.value="apply1";
        formObj.submit();
        self.close();
    }
    else if (type == '3') {
        for (i=0;i<self.opener.document.forms.length;i++) {
            self.opener.document.forms[i].isLoginObj = "Y";
            self.opener.document.forms[i].botton1Obj = " 申请职位 ";
            self.opener.document.forms[i].botton2Obj = "职位信息收藏";
        }
        actionTagObj.value="apply2";
        formObj.submit();
        self.close();
    }
}

function popupOrSubmit(formObj,type) {
    if (type == '1') {
        var isLoginObj = formObj.isLogin;
        var checkboxObj = formObj.vacancyid;
        var actionTagObj = formObj.actionTag;

        if (isLoginObj.value == "Y") {
            actionTagObj.value="submitApply";
            if (isCheckboxChecked(checkboxObj)) formObj.submit();
        }
        else if (isLoginObj.value == "N") {
            popup1('x_window_userlogon.jsp?type='+type+'&formname='+formObj.name);
        }
    }
    else if (type == '2') {
        var isLoginObj = formObj.isLogin;
        var actionTagObj = formObj.actionTag;

        if (isLoginObj.value == "Y") {
            actionTagObj.value="apply1";
            formObj.submit();
        }
        else if (isLoginObj.value == "N") {
            popup1('x_window_userlogon.jsp?type='+type+'&formname='+formObj.name);
        }
    }
    else if (type == '3') {
        var isLoginObj = formObj.isLogin;
        var actionTagObj = formObj.actionTag;

        if (isLoginObj.value == "Y") {
            actionTagObj.value="apply2";
            formObj.submit();
        }
        else if (isLoginObj.value == "N") {
            popup1('x_window_userlogon.jsp?type='+type+'&formname='+formObj.name);
        }
    }
}

function isCheckboxChecked(checkboxObj) {
    flag=0;
    if(checkboxObj != null){
	    for(var i=0;i<checkboxObj.length;i++){
       if (checkboxObj[i].checked == true ) {
            flag = 1;
            break;
        }
  	  }
	    //if (checkboxObj.checked == 1) flag = 1;
  	}

    if(flag == 0){
	    alert("请选择职位！");
	    return false;
    }
    return true;
}

function gotoPageCompany(formObj,PageNo) {
    var PageNoObj = formObj.PageNo;

    PageNoObj.value = PageNo;
    formObj.submit();
}

function collapsedCompany(formObj, Companyid) {
    var CompanyObj = formObj.collapsedcompid;

		formObj.actionTag.value = "";
		formObj.action = formObj.action+"#"+Companyid;
    CompanyObj.value = Companyid;
    formObj.submit();
}

function foldedCompany(formObj, Companyid) {
    var CompanyObj = formObj.foldedcompid;

		formObj.actionTag.value = "";
		formObj.action = formObj.action+"#"+Companyid;
    CompanyObj.value = Companyid;
    formObj.submit();
}

function convertDispType(formObj, type) {
    var CompanyObj = formObj.displaytype;
    
		formObj.actionTag.value = "";
		formObj.PageNo.value = "1";
		if(type == 1){
    	CompanyObj.value = "vacancytype";
    }else{
    	CompanyObj.value = "companytype";
  	}
    formObj.submit();
}

function gotoPage(formObj,PageNo) {
	var checkboxObj = formObj.vacancyid;
	var tagObj = formObj.haveSelect;
	var PageNoObj = formObj.PageNo;
    var actionTagObj = formObj.actionTag;

	if(formObj.vacancyid != null){
		var j=0;
		for(var i=0;i<checkboxObj.length;i++){
        if(checkboxObj[i].checked) {
      	    j=1;
      	    break;
      	}
    }
		if (checkboxObj.checked == 1) j=1;

    if (j != 0) {
        tagObj.value='Y';
    }
  }

    actionTagObj.value = "gotoPage";
    PageNoObj.value = PageNo;
    formObj.submit();
}

function InsertItem(ObjID, Location)
{
  len=document.powersearch.elements[ObjID].length;
  for (counter=len; counter>Location; counter--)
  {
    Value = document.powersearch.elements[ObjID].options[counter-1].value;
    Text2Insert  = document.powersearch.elements[ObjID].options[counter-1].text;
    document.powersearch.elements[ObjID].options[counter] = new Option(Text2Insert, Value);
  }
}

function GetLocation(ObjID, Value)
{
  total=document.powersearch.elements[ObjID].length;
  for (pp=0; pp<total; pp++)
     if (document.powersearch.elements[ObjID].options[pp].text == "---"+Value+"---")
     { return (pp);
       break;
     }
  return (-1);
}

function GetObjID(ObjName)
{
  for (var ObjID=0; ObjID < window.powersearch.elements.length; ObjID++)
    if ( window.powersearch.elements[ObjID].name == ObjName )
    {  return(ObjID);
       break;
    }
  return(-1);
}
function ToSubmit()
{
//  if (CheckOK)
//  {
    SelectTotal('jobarea[]');
    SelectTotal('industrytype[]');
    SelectTotal('funtype[]');
//  }
}
function SelectTotal(ObjName)
{
  ObjID = GetObjID(ObjName);
  if (ObjID != -1)
  { for (i=0; i<document.powersearch.elements[ObjID].length; i++)
      document.powersearch.elements[ObjID].options[i].selected = true;
  }
}

function AddItem(ObjName, DesName, CatName, Num)
{
  //GET OBJECT ID AND DESTINATION OBJECT
  ObjID    = GetObjID(ObjName);
  DesObjID = GetObjID(DesName);
//  window.alert(document.powersearch.elements[DesObjID].length);
  k=0;
  i = document.powersearch.elements[ObjID].options.length;
  if (i==0)
    return;
  maxselected=0
  for (h=0; h<i; h++)
     if (document.powersearch.elements[ObjID].options[h].selected ) {
         k=k+1;
         maxselected=h+1;
         }
  if (maxselected>=i)
     maxselected=0;
  if ( document.powersearch.elements[DesObjID].length + k >Num ) {
    window.alert("最多可选择 "+Num+" 条");
    return;
    }

  if (CatName != "")
    CatObjID = GetObjID(CatName);
  else
    CatObjID = 0;
  if ( ObjID != -1 && DesObjID != -1 && CatObjID != -1 )
  { jj = document.powersearch.elements[CatObjID].selectedIndex;
    if ( CatName != "")
    { CatValue = document.powersearch.elements[CatObjID].options[jj].text;
      CatCode  = document.powersearch.elements[CatObjID].options[jj].value;
    }
    else
      CatValue = "";
    i = document.powersearch.elements[ObjID].options.length;
    j = document.powersearch.elements[DesObjID].options.length;
    for (h=0; h<i; h++)
    { if (document.powersearch.elements[ObjID].options[h].selected )
      {  Code = document.powersearch.elements[ObjID].options[h].value;
         Text = document.powersearch.elements[ObjID].options[h].text;
         if(Num==3)
            {
            if(Text.charAt(0)==Text.charAt(1))
            Text=Text.substring(2,Text.length+1);
            }
         j = document.powersearch.elements[DesObjID].options.length;
         if (Text.indexOf('--')!=-1) {
            for (k=j-1; k>=0; k-- ) {
              document.powersearch.elements[DesObjID].options[k]=null;
            }
            j=0;
         }
         if (Text.substring(0,1)=='-' && Text.substring(1,2)!='-') {
            for (k=j-1; k>=0; k-- ) {
              if (((document.powersearch.elements[DesObjID].options[k].value).substring(0,2))==(Code.substring(0,2)))
                 document.powersearch.elements[DesObjID].options[k]=null;
            }
            j= document.powersearch.elements[DesObjID].options.length;
         }
         HasSelected = false;
         for (k=0; k<j; k++ ) {
           if ((document.powersearch.elements[DesObjID].options[k].text).indexOf('--')!=-1){
              HasSelected = true;
              window.alert('已经包括本选项：'+Text);
              break;
           }else if ((document.powersearch.elements[DesObjID].options[k].text).indexOf('-')!=-1 && ((document.powersearch.elements[DesObjID].options[k].value).substring(0,2)==Code.substring(0,2))){
              HasSelected = true;
              window.alert('已经包括本选项：'+Text);
              break;
           }
           if (document.powersearch.elements[DesObjID].options[k].value == Code)
           {  HasSelected = true;
              break;
           }
         }
         if ( HasSelected == false)
         { if (CatValue !="")
           { Location = GetLocation(DesObjID, CatValue);
             if ( Location == -1 )
             { document.powersearch.elements[DesObjID].options[j] =  new Option("---"+CatValue+"---",CatCode);
               document.powersearch.elements[DesObjID].options[j+1] = new Option(Text, Code);
             }//if
             else
             {
                InsertItem(DesObjID, Location+1);
               document.powersearch.elements[DesObjID].options[Location+1] = new Option(Text, Code);
             }//else
           }
           else
             document.powersearch.elements[DesObjID].options[j] = new Option(Text, Code);
         }//if
         document.powersearch.elements[ObjID].options[h].selected =false;
       }//if
    }//for
    document.powersearch.elements[ObjID].options[maxselected].selected =true;
  }//if
}//end of function


function DeleteItem(ObjName)
{
  ObjID = GetObjID(ObjName);
  minselected=0;
  if ( ObjID != -1 )
  {
    for (i=window.powersearch.elements[ObjID].length-1; i>=0; i--)
    {  if (window.powersearch.elements[ObjID].options[i].selected)
       { // window.alert(i);
          if (minselected==0 || i<minselected)
            minselected=i;
          window.powersearch.elements[ObjID].options[i] = null;
       }
    }
    i=window.powersearch.elements[ObjID].length;

    if (i>0)  {
        if (minselected>=i)
           minselected=i-1;
        window.powersearch.elements[ObjID].options[minselected].selected=true;
        }
  }
}

//对日期的合法性进行判断

function checkDate(year,month,day){
       	if (!isDigital(year)){
        		return false;
        	}
		if(year>2000 || year<1930){
			return false;
		}
		if(month>12 || month<1){
			return false;
		}
		if(day>31 || day<1){
			return false;
		}
		if (month == 4 ||month == 6||month == 9||month == 11){
			if(day == 31)
			{
				return false;
			}
		}
		if(year%4 == 0){
			if (month == 2){
				if(day >= 30)
				{
					return false;
				}
			}
		}
		else{
			if (month == 2){
				if(day >=29)
				{
					return false;
				}
			}
		}
		return true;
}

function isDigital(instance){
		if (calcStringLength(instance) > instance.length)
			return  false;

		var NUM = "0123456789-";
		for(i=0; i < instance.length; i++)
		{
			if (NUM.indexOf(instance.substr(i,1)) <0) return false;
		}
		return true;
}

function powersearch_onsubmit(){
  if (document.powersearch.name.value.length <1){
	  alert("未输入搜索器名称！");
	  powersearch.name.focus();
	  return false;
  }

  jobfamly_length=document.powersearch.jobfamily.options.length;
  if (jobfamly_length<1) {
      alert("请选择职业类型！");
	  powersearch.jobfamilyA.focus();
	  return false;
  }

  industry_length=document.powersearch.industry.options.length;
  if (industry_length<1) {
      alert("请选择行业类型！");
	  powersearch.industryA.focus();
	  return false;
  }

  location_length=document.powersearch.location.options.length;
  if (location_length<1) {
      alert("请选择工作地点！");
	  powersearch.citycodeA.focus();
	  return false;
  }

  selectall();
  return true;
}

function selectall() {

  jobfamly_length=document.powersearch.jobfamily.options.length;
  for (i = 0;i<jobfamly_length ; i++) {
    if (document.powersearch.jobfamily.options[i].text != "") {
      document.powersearch.jobfamily.options[i].selected = true;
    }
  }

  industry_length=document.powersearch.industry.options.length;
  for (i = 0;i<industry_length ; i++) {
    if (document.powersearch.industry.options[i].text != "") {
      document.powersearch.industry.options[i].selected = true;
    }
  }

  location_length=document.powersearch.location.options.length;
  for (i = 0;i<location_length ; i++) {
    if (document.powersearch.location.options[i].text != "") {
      document.powersearch.location.options[i].selected = true;
    }
  }
}

function usrsimplereg_onsubmit(){
	if (document.usrform1.username.value.length < 1){
 		alert("未输入您的用户名！");
	 	usrform1.username.focus();
 		return false;
	}

	if (document.usrform1.password.value.length < 1){
 		alert("未输入您的密码！");
	 	usrform1.password.focus();
 		return false;
	}

	if (document.usrform1.password1.value.length < 1){
 		alert("未输入您的密码确认！");
	 	usrform1.password1.focus();
 		return false;
	}

	if (document.usrform1.promptquestion.value.length < 1){
 		alert("未输入您的密码提示问题！");
	 	usrform1.promptquestion.focus();
 		return false;
	}

	if (document.usrform1.promptanswer.value.length < 1){
 		alert("未输入您的密码提示答案！");
	 	usrform1.promptanswer.focus();
 		return false;
	}

	if (document.usrform1.username.value.length < 5 ||calcStringLength(usrform1.username.value)>20){
	        	alert("您输入的用户名太短或者超长！");
	        	usrform1.username.focus();
	        	return false;
	}

	if (document.usrform1.password.value.length < 5 ||calcStringLength(usrform1.password.value)>20){
	        	alert("您输入的密码太短或者超长！");
	        	usrform1.password.focus();
	        	return false;
	}

	if (usrform1.password.value != usrform1.password1.value){
			    alert("两次输入的密码不一致！");
			    usrform1.password1.focus();
			    return false;
	}

		if (document.usrform1.email.value.indexOf(".") <= 1 || document.usrform1.email.value.length <7 ||document.usrform1.email.value.indexOf("@") <= 0 ||calcStringLength(usrform1.email.value)>40){
			alert ("电子邮件地址输入有误！");
			usrform1.email.focus();
			return false;
		}

	document.usrform1.name.value = document.usrform1.username.value;
	document.usrform1.pass.value = document.usrform1.password.value;

  return true;
}

function usrform1_onsubmit(){
       if (document.usrform1.password.value.length < 5 ||calcStringLength(usrform1.password.value)>20){
	        	alert("未输入您的密码或不符合要求！");
	        	usrform1.password.focus();
	        	return false;
            }
	   if (document.usrform1.lname.value.length <1 ||calcStringLength(usrform1.lname.value)>20){
	        	alert("未输入姓或超长！");
	        	usrform1.lname.focus();
	        	return false;
	        }
		if (document.usrform1.fname.value.length <1  || calcStringLength(usrform1.fname.value)>20){
			alert ("未输入名或超长！");
			usrform1.fname.focus();
			return false;
		}
		if (!checkDate(usrform1.birthdate_y.value)){
			alert("出生日期有错！出生日期应为四位，例如：1980");
			usrform1.birthdate_y.focus();
			return false;
		}
		if (document.usrform1.address1.value.length <1 || calcStringLength(usrform1.address1.value)>80){
			alert ("未输入家庭地址或输入过长！");
			usrform1.address1.focus();
			return false;
		}

		if (document.usrform1.city.value == 000000){
			alert("请选择城市");
			usrform1.city.focus();
			return false;
		}
		
		if (document.usrform1.phone.value.length <1 &&
		  document.usrform1.mobile.value.length <1 &&
		  document.usrform1.pager.value.length <1){

			alert("联系电话、手机、呼机三者必填其一！");
			usrform1.phone.focus();
			return false;
		}
		
		if (document.usrform1.email.value.indexOf(".") <= 1 || document.usrform1.email.value.length <7 ||document.usrform1.email.value.indexOf("@") <= 0 ||calcStringLength(usrform1.email.value)>40){
			alert ("电子邮件地址输入有误！");
			usrform1.email.focus();
			return false;
		}

    return true;
	}

function checkEmail(emailObj) {
    if (emailObj.value.indexOf(".") <= 1 || emailObj.value.length <7 ||emailObj.value.indexOf("@") <= 0 || calcStringLength(emailObj.value)>40) {
		alert ("电子邮件地址输入有误！");
		emailObj.focus();
		return false;
    }
    return true;
}

//计算包括中文字符的长度

function calcStringLength(instance){
		var len = 0;
		for(i=0;i<instance.length;i++){
			if (instance.charCodeAt(i) > 127) len +=2;
			else len += 1;
		}
		return len;
	}

function loginform_onsubmit(formObj) {
    var actionTagObj = formObj.actionTag;
    actionTagObj.value="login";

    if (formObj.name.value.length < 0 ||calcStringLength(formObj.name.value)>20){
	    alert("未输入您的用户名或不符合要求！");
	    formObj.name.focus();
	    return false;
    }

    if (formObj.pass.value.length < 0 ||calcStringLength(formObj.pass.value)>20){
	    alert("未输入您的密码或不符合要求！");
	    formObj.pass.focus();
	    return false;
    }
	return true;
}

function usrformlogon_onsubmit(){
if (document.usrform1.username.value.length < 1){
 	alert("未输入您的用户名！");
 	usrform1.username.focus();
 	return false;
}

if (document.usrform1.password.value.length < 1){
 	alert("未输入您的密码！");
 	usrform1.password.focus();
 	return false;
}

if (document.usrform1.password1.value.length < 1){
 	alert("未输入您的密码确认！");
 	usrform1.password1.focus();
 	return false;
}

if (document.usrform1.promptquestion.value.length < 1){
 	alert("未输入您的密码提示问题！");
 	usrform1.promptquestion.focus();
 	return false;
}

if (document.usrform1.promptanswer.value.length < 1){
 	alert("未输入您的密码提示答案！");
 	usrform1.promptanswer.focus();
 	return false;
}

if (document.usrform1.username.value.length < 5 ||calcStringLength(usrform1.username.value)>20){
	        	alert("您输入的用户名太短或者超长！");
	        	usrform1.username.focus();
	        	return false;
}

if (document.usrform1.password.value.length < 5 ||calcStringLength(usrform1.password.value)>20){
	        	alert("您输入的密码太短或者超长！");
	        	usrform1.password.focus();
	        	return false;
}
if (usrform1.password.value != usrform1.password1.value){
			    alert("两次输入的密码不一致！");
			    usrform1.password1.focus();
			    return false;
}
	    return true;
}

// This function is used when user modify private info Add by baiyu 2002-06-10
function updateaccount_onsubmit()
{
    if (document.usrform1.password.value.length < 5 ||calcStringLength(usrform1.password.value)>20){
	   	alert("未输入您的密码或不符合要求！");
	  	usrform1.password.focus();
	   	return false;
    }

    if (usrform1.password.value != usrform1.password1.value){
	    alert("两次输入的密码不一致！");
	    usrform1.password1.focus();
	    return false;
    }

    if (usrform1.promptquestion.value == 0){
	    alert("请输入您的提示问题！");
	    usrform1.promptquestion.focus();
	    return false;
    }

    if (usrform1.promptanswer.value == 0){
	    alert("请输入您的提示问题答案！");
	    usrform1.promptanswer.focus();
	    return false;
    }
    
    if(usrform1_onsubmit())
    	return true;  
    else
      return false;	
}

//add by baiyu 2002-06-17
function message_onsubmit(){
if (document.usrform1.title.value.length < 1 || document.usrform1.title.value.length >100){
	        	alert("没有输入求职信的标题或过长！");
	        	usrform1.title.focus();
	        	return false;
}

if (document.usrform1.text.value.length < 1 || document.usrform1.text.value.length >2000 ){
	        	alert("没有输入求职信的内容或过长！");
	        	usrform1.text.focus();
	        	return false;
}
	    return true;
}



//add by baiyu 2002-06-17
function cv_onsubmit(){
  if (document.usrform1.cvname.value.length <1 ||calcStringLength(usrform1.cvname.value)>30){
   	alert("未输入简历名称或超长！");
   	usrform1.cvname.focus();
   	return false;
  }
	   
  if (document.usrform1.lname.value.length <1 ||calcStringLength(usrform1.lname.value)>20){
   	alert("未输入姓或超长！");
   	usrform1.lname.focus();
   	return false;
  }

		if (document.usrform1.fname.value.length <1  || calcStringLength(usrform1.fname.value)>20){
			alert ("未输入名或超长！");
			usrform1.fname.focus();
			return false;
		}
		if (!checkDate(usrform1.birthdate_y.value)){
			alert("出生日期有错！出生日期应为四位，例如：1980");
			usrform1.birthdate_y.focus();
			return false;
		}
		if (document.usrform1.address1.value.length <1 || calcStringLength(usrform1.address1.value)>80){
			alert ("未输入家庭地址或输入过长！");
			usrform1.address1.focus();
			return false;
		}

		if (document.usrform1.city.value == 000000){
			alert("请选择城市");
			usrform1.city.focus();
			return false;
		}

		if (document.usrform1.phone.value.length <1 &&
		  document.usrform1.mobile.value.length <1 &&
		  document.usrform1.pager.value.length <1){

			alert("联系电话、手机、呼机三者必填其一！");
			usrform1.phone.focus();
			return false;
		}

		if (document.usrform1.email.value.indexOf(".") <= 1 || document.usrform1.email.value.length <7 ||document.usrform1.email.value.indexOf("@") <= 0 ||calcStringLength(usrform1.email.value)>80){
			alert ("电子邮件地址输入有误！");
			usrform1.email.focus();
			return false;
		}

	    return true;
	}
	



function newPopupOrSubmit(formObj,type) 
{

  if (type == 'favorite') 
  {
    var isLoginObj = formObj.isLogin;
    var checkboxObj = formObj.vacancyid;
    var actionTagObj = formObj.actionTag;
    //alert(isLoginObj.value);
    if (isLoginObj.value == "Y") 
    {
      
      actionTagObj.value="submitApply";
      if (isCheckboxChecked(checkboxObj)) formObj.submit();
    }
    else if (isLoginObj.value == "N") 
    {
       if (isCheckboxChecked(checkboxObj))
       {
        formObj.action="userlogon.jsp?type="+type;
        formObj.submit();
       } 
      //document.location='userlogon.jsp?type='+type+'&formname=' + escape(uu);
    }
  }
  else if (type == 'apply') 
  {
    var isLoginObj = formObj.isLogin;
    var actionTagObj = formObj.actionTag;
    //var uu="ps_request.jsp?vacancyid=" + formObj.vacancyid.value +"&vlocation=" + formObj.vlocation.value+ "&vname="+ formObj.vname.value + "&vcname=" + formObj.vcname.value;
    if (isLoginObj.value == "Y") 
    {
      actionTagObj.value="apply1";
      formObj.submit();
    }
    else if (isLoginObj.value == "N") 
    {
      formObj.action="userlogon.jsp?type="+type;
      formObj.submit();
    }
  }
  else if (type == 'favorite1') 
  {
    var isLoginObj = formObj.isLogin;
    var actionTagObj = formObj.actionTag;
    //var uu="ps_request.jsp?vacancyid=" + formObj.vacancyid.value;
    if (isLoginObj.value == "Y") 
    {
      actionTagObj.value="apply2";
      formObj.submit();
    }
    else if (isLoginObj.value == "N") 
    {
      formObj.action="userlogon.jsp?type="+type;
      formObj.submit();
    }
  }
}
//popup feedback
function openFeedback(strTarget){ 
	window.open(strTarget, "_blank",'width=1,height=1,left=100,top=60, scrollbars=0, overflow=auto, status=0');
}

function openLogin(){
	location.href = "/loginmgr/login.asp";
}

function openLogout(){
	location.href = "/loginmgr/logout.asp";
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
