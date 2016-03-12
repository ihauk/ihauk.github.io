function fnResumeIcon(h){
	var s = this;
	s.html = h;
	s.rId = s.html.id.toString().split('_')[1]||null;
	s.vId = s.html.getAttribute('versionNum')||'';
	s.rNum = s.html.getAttribute('resume_number')||'';
	if(s.rId!=null){
		var data = 'resumeid='+s.rId+'&version_number='+s.vId+'&rnd='+new Date().valueOf().toString();
		submitCallback(data,'get_resume_icon.asp',handleIconResponse,'get',s);
		//test(data,'xxx.asp',handleIconResponse,'get',s);
	}
}
fnResumeIcon.prototype = {
	 showIcon : function(t){
		var s = this;
		if(t!='') eval('var iconArr=' + t);
		if(s.html.innerHTML!='') s.html.innerHTML = '';
		if(typeof(iconArr)!='undefined' && iconArr instanceof Array){
			var img,a,imgArrow;
			var flagIcon = iconArr[0];
			for(var i=1;i<iconArr.length;i++){
				img = document.createElement('img');
				img.src = 'http://images.zhaopin.com/myzhaopin/icons/ricon'+iconArr[i]+'.gif';
				img.setAttribute('align','absmiddle');
				img.setAttribute('hspace','1');
				if(window['ricon'+iconArr[i]]&&window['ricon'+iconArr[i]][0]&&typeof(window['ricon'+iconArr[i]][0])=='string') img.title = window['ricon'+iconArr[i]][0];
				s.html.appendChild(img);
			}
			if(flagIcon){
				a = document.createElement('a');
				a.href = '/myzhaopin/resume_icon.asp?selVal='+s.rId+'_'+s.rNum+'_'+s.vId;
				a.title = '设置简历图标';
				imgArrow = document.createElement('img');
				imgArrow.src = 'http://myimg.zhaopin.com/images/blank.gif';
				imgArrow.align = 'absmiddle';
				imgArrow.className='iconArrow';
				a.appendChild(imgArrow);
				s.html.appendChild(a);
			}
		}
	}
}
function handleIconResponse(success,responseText,objPar){
	if(success){
		objPar.showIcon(responseText);
	}
	else{// something went wrong with the AJAX callback
	}
}
function test(a,b,c,d,e){
	c(true,'[1,3,4]',e);
}

function fnCommit(h){
	var s = this;
	s.html = h;
	s.extId = s.html.getAttribute("ext")||"";
	s.verNum = s.html.getAttribute("ver")||"";
	s.resumeName = s.html.getAttribute("resumename")||"";
	s.resume_id = s.html.getAttribute("resume_id")||"";
	s.language_id = s.html.getAttribute("language_id")||"";
	s.P = function(e){s.fnPopupDiv(e);};
	myAttachEvent(s.html,'click',s.P);
}
fnCommit.prototype = {
	fnPopupDiv : function(e){
		var s = this;
		if(!window["resumeCommitDiv"]) window["resumeCommitDiv"] = fnCommit["fnBuildDiv"]();
		window["resumeCommitDiv"].genHTML(s);
		window["resumeCommitDiv"].showMe({w:318,h:300});
	},
	fnSubmitCancel : function(){
		var s = this;
		if(window["resumeCommitDiv"]) window["resumeCommitDiv"].closeMe();
		var td = s.html.parentNode.parentNode;
		td.removeChild(td.childNodes[0]);
		var img = document.createElement("img");
		img.src = "http://myimg.zhaopin.com/images/new_v3/ani_ajaxload.gif";
		img.style.width = "18px";
		img.style.height = "18px";
		td.appendChild(img);
		var data = 'resume_id='+s.resume_id+'&language_id='+s.language_id+'&ext_id='+s.extId+'&version_number='+s.verNum+'&rnd='+new Date().valueOf().toString();
		submitCallback(data,'/myzhaopin/ajax_resume_consign.asp',handleCancelCommitResponse,'get',s);
		//test3(data,'xxx.asp',handleCancelCommitResponse,'get',td);
	}
}
function handleCommitResponse(success,responseText,objPar){
	if(success){
		objPar.ajaxHTML = responseText;
		var s = objPar.ajaxHTML.indexOf('<a href=');
		var e = objPar.ajaxHTML.indexOf('</a>');
		objPar.previewHTML = s>0?responseText.substring(s,e):'';
		window["resumeCommitDiv"].genHTML(objPar);
	}
	else{// something went wrong with the AJAX callback
	}
}
function test2(a,b,c,d,e){
	c(true,'<tr><td class="tdAlignR">简历名称：</td><td>销售助理 8年 北京&nbsp;&nbsp;<a href="#">预览</a></td></tr><tr><td class="tdAlignR">委托投递时间：</td><td>委托一周<span class="greyFont">（还有3天到期）</span></td></tr><tr><td class="tdAlignR">公司屏蔽：</td><td>不投递我简历中的工作经验已包含公司所发布的职位</td></tr><tr><td class="tdAlignR">委托条件：</td><td>工作性质-全职</td></tr><tr><td></td><td>期望工作地点-北京、天津</td></tr><tr><td></td><td>期望从事职业-销售助理</td></tr><tr><td></td><td>期望从事行业-贸易/进出口</td></tr>',e);
}
function handleCancelCommitResponse(success,responseText,objPar){
	if(success){
		objPar.innerHTML = responseText;
	}
	else{// something went wrong with the AJAX callback
	}
}
function test3(a,b,c,d,e){
	c(true,'<a href="commit.htm">委托投递</a>',e);
}
fnCommit.fnBuildDiv = function(){
	var div = document.createElement("div");
	div.id = "popupDiv_commit";
	myAttachEvent(div,'click',cancelBubble);
	var subDiv = document.createElement("div");
	subDiv.className = "bgOrgTitle";
	subDiv.innerHTML = "<span><a href='javascript:void(0)' onclick='window[\"resumeCommitDiv\"].closeMe()'>关闭</a></span>&nbsp;<font id='"+div.id+"_title'>简历委托投递</font>";
	div.appendChild(subDiv);
	subDiv = document.createElement("div");
	subDiv.className = "bgWhiteCon";
	div.ajaxCon = subDiv;
	div.appendChild(subDiv);
	div.closeMe = function(){
		var s = this;
		s.style.visibility = "hidden";
		s.shim.style.visibility = "hidden";
		s.mask.style.visibility = "hidden";
	};
	div.showMe = function(para){
		var s = this;
		if(para&&para.h&&!isNaN(para.h)) this.ajaxCon.style.height = para.h+"px";
		if(para&&para.w&&!isNaN(para.w)) this.style.width = para.w+"px";
		if(this.titleCon){
			if(para&&para.t&&typeof para.t=="string") this.titleCon.innerHTML = para.t;
			else this.titleCon.innerHTML = "简历委托投递";
		}
		var winWH = $getWinWH();
		var docWH = $getDocWH();
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop,scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
		var x = parseFloat((winWH.w-s.offsetWidth)/2+scrollLeft) + "px";
		var y = parseFloat((winWH.h-s.offsetHeight)/2+scrollTop) + "px";
		s.style.top = y;
		s.style.left = x;
		s.shim.style.top = y;
		s.shim.style.left = x;
		s.shim.style.width = s.offsetWidth + "px";
		s.shim.style.height = s.offsetHeight + "px";
		s.mask.style.width = docWH.w+"px";
		s.mask.style.height = docWH.h+"px";
		s.style.visibility = "visible";
		s.shim.style.visibility = "visible";
		s.mask.style.visibility = "visible";
	};
	div.genHTML = function(ins){
		var s = this;
		var loadingHTML = "<div id='commitAjaxLoading'></div>";
		if(!ins.ajaxHTML){
			s.ajaxCon.innerHTML = loadingHTML;

			var data = 'resume_id='+ins.resume_id+'&language_id='+ins.language_id+'&ext_id='+ins.extId+'&version_number='+ins.verNum+'&rnd='+new Date().valueOf().toString();

			submitCallback(data,'/myzhaopin/ajax_resume_consign.asp',handleCommitResponse,'get',ins);
			//test2(data,'xxx.asp',handleCommitResponse,'get',ins);
		}
		else s.ajaxCon.innerHTML = '<table width="90%" cellpadding="0" cellspacing="0" border="0">'+ins.ajaxHTML+'<tr><td></td><td><a href="resume_auto_post.asp?ext_id='+ins.extId+'&resume_id='+ins.resume_id+'&Version_Number='+ins.verNum+'&language_id='+ins.language_id+'">修改委托设置&gt;&gt;</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" onclick="window[\'resumeCommitDiv\'].genHTML_cancel(\''+ins.html.id+'\')">取消委托&gt;&gt;</a></td></tr><tr><td></td><td height="40"><input type="button" class="btn3" value="关闭" onclick="window[\'resumeCommitDiv\'].closeMe()"></td></tr></table>';
	};
	div.genHTML_cancel = function(insId){
		var s = this;
		if(window['mzpModuleIns'][insId]){
			var ins = window['mzpModuleIns'][insId];
			s.ajaxCon.innerHTML = '<div class="confirmCancel">您确定要对简历：'+ins.previewHTML.replace('预览','')+ins.resumeName.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')+'</a><br/>取消委托投递功能么？</div><div style="text-align:center;margin-bottom:20px;margin-top:-10px;">（您的委托投递设置，将在24小时后生效）</div><div style="text-align:center;"><input type="button" class="btn3" value="确定" onclick="window.location=\'cancel_consign.asp?resume_id='+ins.resume_id+'&version_number='+ins.verNum+'&language_id='+ins.language_id+'&ext_id='+ins.extId+'\'">&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" class="btn3" value="取消" onclick="window[\'resumeCommitDiv\'].closeMe()"></div>';
		}
	};
	document.body.appendChild(div);
	div.titleCon = document.getElementById(div.id+"_title")||null;
	div.shim = document.createElement("iframe");
	div.shim.src = "javascript:''"
    div.shim.frameBorder = "0";
    div.shim.scrolling = "no";
    div.shim.className = "iframeShim";
	div.shim.style.position = "absolute";
	div.shim.style.visibility = "hidden";
    div.shim.style.zIndex = $getCurrentStyle(div,"zIndex")-1;
	div.shim.style.top = $getCurrentStyle(div,"top");
	div.shim.style.left = $getCurrentStyle(div,"left");
	div.shim.style.width = div.offsetWidth + "px";
	div.shim.style.height = div.offsetHeight + "px";
	document.body.appendChild(div.shim);
	div.mask = document.createElement("div");
	div.mask.className = "divMask";
	div.mask.style.position = "absolute";
	div.mask.style.visibility = "hidden";
	div.mask.style.zIndex = $getCurrentStyle(div,"zIndex")-2;
	div.mask.style.top = "0px";
	div.mask.style.left = "0px";
	var docWH = $getDocWH();
	div.mask.style.width = docWH.w+"px";
	div.mask.style.height = docWH.h+"px";
	if(typeof(div.mask.style.filter)!='undefined') div.mask.style.filter="progid:DXImageTransform.Microsoft.Alpha(Opacity=70)";
	else div.mask.style.MozOpacity=0.7;
	document.body.appendChild(div.mask);
	return div;
}

function fnNoAutoPost(n){
	var allInfo = ["您简历的设置为“保密”，如需要使用简历委托投递功能，请先将设置更改为“开放”。","您简历的设置为“委托给智联”，如需要使用简历委托投递功能，请先将设置更改为“开放”。"];
	var infoIndex = 0;
	switch(n){
		case 1 : infoIndex=0;break;
		case 3 : infoIndex=1;break;
	}
	var info = allInfo[infoIndex];
	if(!window["resumeCommitDiv"]) window["resumeCommitDiv"] = fnCommit["fnBuildDiv"]();
	window["resumeCommitDiv"].ajaxCon.innerHTML = '<div style="padding:25px 20px;"><div style="font-size:14px;font-weight:bold;">无法委托该简历！</div><br/><div style="line-height:20px;">'+info+'</div><br/><div style="text-align:center;"><input type="button" class="btn3" value="关闭" onclick="window[\'resumeCommitDiv\'].closeMe()"></div></div>';
	window["resumeCommitDiv"].showMe({w:318,h:180});
}

function fnNoOpen(eId,rId,vNum,url,lId){
	var info = '简历在已委托状态下无法修改公开设置。如果您希望修改公开设置，请先取消该简历的委托投递。<br />如果您不想自动投递某些企业，请设置 <a href="/myzhaopin/resume_openbut.asp?ext_id='+eId+'&Resume_ID='+rId+'&Version_number='+vNum+'&LocationUrl='+url+'&language_id='+lId+'">屏蔽企业</a><div class="grey" style="margin-top:5px;">智联提醒：简历只有处于开放状态下才可以委托投递。</div>';
	if(!window["resumeCommitDiv"]) window["resumeCommitDiv"] = fnCommit["fnBuildDiv"]();
	window["resumeCommitDiv"].ajaxCon.innerHTML = '<div style="padding:25px 20px;"><div style="font-size:14px;font-weight:bold;">无法修改公开设置！</div><br/><div style="line-height:20px;">'+info+'</div><br/><div style="text-align:center;"><input type="button" class="btn3" value="关闭" onclick="window[\'resumeCommitDiv\'].closeMe()"></div></div>';
	window["resumeCommitDiv"].showMe({w:335,h:210,t:"公开设置"});
}