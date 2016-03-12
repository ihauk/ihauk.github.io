/*
 * 功能：实现表单输入的合法验证
 * 依赖：jquery-1.6.4.min.js
 * 示例：
 * $("#username").validate({
 *     rules: [{
 *     	 text:"用户名不能为空",
 *       rule:"empty"
 *     }, {
 *     	 text:"用户名必须为6-20个字符",
 *       rule:"length",
 *       min:6,
 *       max:20
 *     }
 *     ], 
 *     defaultText:"请输入用户名", 
 *     validText:"输入正确"
 * });
 * 参数：
 * rules：检验规则集合，有验证规则对象组成的数组：
 *    验证规则对象成员包括：
 *      text：错误提示文本
 *      rule：验证规则，可取值文本或自定义方法，取值文本可为以下值
 *        1、number：全数字检验。
 *        2、string：全字符检验（除数字以为的所有字符）。
 *        3、normal：常规字符检验（a-zA-Z0-9_）
 *        4、email：电子邮件检验。
 *        5、length: 长度检验。
 *        6、checked：表单选择状态检验。
 *        7、password：密码检验，6-25位的字母数字和下划线。
 *      min：最小长度
 *      max：最大长度
 *      url：ajax验证数据远程验证url
 *      ajaxOpts: ajax验证请求设置, 在设置url后有效
 *      atext：ajax开始请求提示, 在设置url后有效
 *      etext：ajax请求异常提示, 在设置url后有效
 *      stext：验证通过文本提示，将覆盖validText
 * defaultText: 提示文本。
 * validText: 输入正确文本
 * imgTagId: 提示图片元素ID
 * tagTagId: 提示文本元素ID
 */
;
(function($) {
  // 样式配置
  var sClass = [ "input-x-validate-default", "input-x-validate-error",
					"input-x-validate-valid" ];
  var imgClass = [ "img-x-validate-default", "img-x-validate-error",
					"img-x-validate-valid" ];
	var tipClass = [ "tip-x-validate-default", "tip-x-validate-error",
					"tip-x-validate-valid" ];
	// 规则定义
	var basicRules = {
		empty : function(s, r, u) {
			if ($.trim(s.val()) != "") {
				return true;
			} else {
				return false;
			}
		},
		number : function(s, r, u) {
			if (/^\d*$/.test(s.val())) {
				return true;
			} else {
				return false;
			}
		},
		string : function(s, r, u) {
			if (/^\D*$/.test(s.val())) {
				return true;
			} else {
				return false;
			}
		},
		normal : function(s, r, u) {
			if (/^[a-zA-Z0-9_]*$/.test(s.val())) {
				return true;
			} else {
				return false;
			}
		},
		email : function(s, r, u) {
			if (/^[a-z0-9][_a-z0-9\-]*([\.][_a-z0-9\-]+)*@([a-z0-9\-_]+[\.])+(?:cc|com|edu|gov|int|net|org|biz|info|pro|name|coop|al|dz|af|ar|ae|aw|om|az|eg|et|ie|ee|ad|ao|ai|ag|at|au|mo|bb|pg|bs|pk|py|ps|bh|pa|br|by|bm|bg|mp|bj|be|is|pr|ba|pl|bo|bz|bw|bt|bf|bi|bv|kp|gq|dk|de|tl|tp|tg|dm|do|ru|ec|er|fr|fo|pf|gf|tf|va|ph|fj|fi|cv|fk|gm|cg|cd|co|cr|gg|gd|gl|ge|cu|gp|gu|gy|kz|ht|kr|nl|an|hm|hn|ki|dj|kg|gn|gw|ca|gh|ga|kh|cz|zw|cm|qa|ky|km|ci|kw|cc|hr|ke|ck|lv|ls|la|lb|lt|lr|ly|li|re|lu|rw|ro|mg|im|mv|mt|mw|my|ml|mk|mh|mq|yt|mu|mr|us|um|as|vi|mn|ms|bd|pe|fm|mm|md|ma|mc|mz|mx|nr|np|ni|ne|ng|nu|no|nf|na|za|aq|gs|eu|pw|pn|pt|jp|se|ch|sv|ws|yu|sl|sn|cy|sc|sa|cx|st|sh|kn|lc|sm|pm|vc|lk|sk|si|sj|sz|sd|sr|sb|so|tj|tw|th|tz|to|tc|tt|tn|tv|tr|tm|tk|wf|vu|gt|ve|bn|ug|ua|uy|uz|es|eh|gr|hk|sg|nc|nz|hu|sy|jm|am|ac|ye|iq|ir|il|it|in|id|uk|vg|io|jo|vn|zm|je|td|gi|cl|cf|cn)$/
					.test(s.val().toLowerCase())) {
				return true;
			} else {
				return false;
			}
		},
		length : function(s, r, u) {
			start = r.min || 0;
			end = r.max || 1024;
			if (s.val().length >= start && s.val().length <= end) {
				return true;
			} else {
				return false;
			}
		},
		checked : function(s, r, u) {
			if (s[0].checked) {
				return true;
			} else {
				return false;
			}
		},
    password : function(s, r, u) {
			if (/^[a-zA-Z0-9_]{6,25}$/.test(s.val())) {
				return true;
			} else {
				return false;
			}
		},
		ajax : function(s, r, u) {
      var str = encodeURIComponent?encodeURIComponent(s.val()):escape(s.val());
      u(s, r.atext || "校验中。。。", 0);
      if (!s.ajax){
        s.ajax =  true;
        var ajaxOpts = {
          url: r.url + "=" + str + "&t=" + (+new Date()),
          success: function(res){
            s.ajax = false;
            if(r.rule(res)){
              u(s, r.etext || s.vtext, 2);
              s.flag = true;
              if(s.submit){
                var flag = true;
                for (var i=0; i < window["validate-input"].length; i++){
                  var o = window["validate-input"][i];
                  o.submit = true;
                  if(check(o, true)){
                    u(o, o.vtext, 2);
                    o.flag =  true;
                  } else {
                    o.flag =  false;
                  }
                  if (!o.flag){
                    flag = false;
                  }
                }
                if (flag){
                  s[0].form.submit();
                }
              }
            } else {
              u(s, r.text, 1);
              s.flag = false;
              s.submit = false;
            }
          },
          error: function(){
            u(s, r.etext || "校验失败，请重试！", 1);
            s.ajax = false;
            s.flag = false;
            s.submit = false;
          }
        };
        if (typeof r.ajaxOpts === "object"){
          $.extend(ajaxOpts, r.ajaxOpts);
        }
        $.ajax(ajaxOpts);
      }
      return false;
		}
	};

	// 表单验证
	$.extend({
		validate : function(formName, f1, f2){
			for (var s in window["validate-input-"+formName]){
				window["validate-input-"+formName][s].trigger("blur");
			}
			var flag = true;
			setTimeout(function(){
				for (var s in window["validate-input-"+formName]){
					flag = window["validate-input-"+formName][s].flag;
					if (!flag){
						break;
					}
				}
				if(flag){
					if (f1){					
						f1();
					}
				} else {
					if(f2){
						f2();
					}
				}
			}, 0);
			return false;
		}
	});
  
	// 表单验证
	$.fn.validate = function(opts) {

		return this.each(function(i) {

      var s = $(this);
      var formName = s[0].form.name;

      window["validate-input-"+formName] = window["validate-input-"+formName] || [];
      var existThis = false;
      for (var i=0; i < window["validate-input-"+formName].length; i++){
        if (window["validate-input-"+formName][i]  === s){
          existThis = true;
        }
      }
      if (!existThis){
        window["validate-input-"+formName].push(s);
      }

      if (opts == undefined){

        s.trigger("blur");

      } else {

        s.rules = opts.rules;
        s.dtext = opts.defaultText || (opts.tipTag && opts.tipTag.text()) || "";
        s.vtext = opts.validText || (opts.tipTag && opts.tipTag.text()) || "";
        if (typeof window["validate-no"] === "undefined") {
          window["validate-no"] = 1000;
        }
        s.no = window["validate-no"]++;
        s.imgTag = opts.imgTagId && $("#"+opts.imgTagId);
        s.tipTag = opts.tipTagId && $("#"+opts.tipTagId);
        s.flag = true;
        
        s.addClass(sClass[0]);

        if (!s.tipTag || !s.tipTag.length){
          s.tipTag = $("#tip-x-validate-" + s.no);
          if (!s.tipTag.length) {
            s.tipTag = $("<span id=\"tip-x-validate-" + s.no + "\" class=\""+tipClass[0]+"\"></span>");
          }
          s.after(s.tipTag);
        }

        if (!s.imgTag || !s.imgTag.length){
          s.imgTag = $("#img-x-validate-" + s.no);
          if (!s.imgTag.length) {
            s.imgTag = $("<span id=\"img-x-validate-" + s.no + "\" class=\""+imgClass[0]+"\"></span>");
          }
          s.after(s.imgTag);
        }

        if (opts.rules && opts.rules.length > 0) {
          s.bind("focus", function() {
            updateStatus(s, s.dtext, 0);
          });
          s.bind("blur", function() {
            if(check(s)){
              updateStatus(s, s.vtext, 2);
              s.flag =  true;
            } else {
              s.flag =  false;
            }
          });         
          $(s[0].form).unbind("submit").bind("submit", function(){
              var flag = true;
              for (var i=0; i < window["validate-input-"+formName].length; i++){
                var o = window["validate-input-"+formName][i];
                o.submit = true;
                if(check(o)){
                  updateStatus(o, o.vtext, 2);
                  o.flag =  true;
                } else {
                  o.flag =  false;
                }
                if (!o.flag){
                  flag = false;
                }
              }
              if (flag){
                $(this)[0].submit();
              }
              return flag;
          });
        }
      }
		});
	};
  // 规则检验
  function check(s, noajax) {
    var r =  s.rules;
    for ( var i = 0; i < r.length; i++) {

      if (typeof r[i].url === "string"){
        var ra = r[i];
        continue;
      }

      if (r[i].min || r[i].max) {
        if (!basicRules["length"](s, r[i], updateStatus)) {
          updateStatus(s, r[i].text, 1);
          return false;
        }
      }

      if (r[i].rule == "checked") {
        if (!basicRules["checked"](s, r[i], updateStatus)) {
          updateStatus(s, r[i].text, 1);
          return false;
        }
      } else if (basicRules[r[i].rule] instanceof Function){
        if (!basicRules[r[i].rule](s, r[i], updateStatus)) {
          updateStatus(s, r[i].text, 1);
          return false;
        }
      } else if (r[i].rule instanceof Function){
        if (!r[i].rule(s, r[i], updateStatus)) {
          updateStatus(s, r[i].text, 1);
          return false;
        } 
      }

    }
    if (typeof ra === "object" && !noajax){
      basicRules["ajax"](s, ra, updateStatus);
      return false;
    }

    return true;

  }
  // 状态更新
  function updateStatus(s, str, status) {
    for ( var i = 0; i < 3; i++) {
      s.removeClass(sClass[i]);
      s.imgTag.removeClass(imgClass[i]);
      s.tipTag.removeClass(tipClass[i]);
    }
    s.addClass(sClass[status]);
    s.imgTag.addClass(imgClass[status]);
    s.tipTag.addClass(tipClass[status]);
    if(typeof str === "string")s.tipTag.html(str);
  }
})(jQuery);