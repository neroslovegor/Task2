(function(t){"use strict"
var e={tagClass:function(t){return"badge badge-info"},focusClass:"focus",itemValue:function(t){return t?t.toString():t},itemText:function(t){return this.itemValue(t)},itemTitle:function(t){return null},freeInput:!0,addOnBlur:!0,maxTags:void 0,maxChars:void 0,confirmKeys:[13,44],delimiter:",",delimiterRegex:null,cancelConfirmKeysOnEmpty:!1,onTagExists:function(t,e){e.hide().fadeIn()},trimValue:!1,allowDuplicates:!1,triggerChange:!0,editOnBackspace:!1}
function i(e,i){this.isInit=!0,this.itemsArray=[],this.$element=t(e),this.$element.addClass("sr-only"),this.isSelect="SELECT"===e.tagName,this.multiple=this.isSelect&&e.hasAttribute("multiple"),this.objectItems=i&&i.itemValue,this.placeholderText=e.hasAttribute("placeholder")?this.$element.attr("placeholder"):"",this.name=e.hasAttribute("name")?this.$element.attr("name"):"",this.type=e.hasAttribute("type")?this.$element.attr("type"):"text",this.inputSize=Math.max(1,this.placeholderText.length),this.$container=t('<div class="bootstrap-tagsinput"></div>'),this.$input=t('<input type="'+this.type+'" name="'+this.name+'" placeholder="'+this.placeholderText+'"/>').appendTo(this.$container),this.$element.before(this.$container),this.build(i),this.isInit=!1}function n(t,e){if("function"!=typeof t[e]){var i=t[e]
t[e]=function(t){return t[i]}}}function a(t,e){if("function"!=typeof t[e]){var i=t[e]
t[e]=function(){return i}}}i.prototype={constructor:i,add:function(e,i,n){var a=this
if(!(a.options.maxTags&&a.itemsArray.length>=a.options.maxTags)&&(!1===e||e)){if("string"==typeof e&&a.options.trimValue&&(e=t.trim(e)),"object"==typeof e&&!a.objectItems)throw"Can't add objects when itemValue option is not set"
if(!e.toString().match(/^\s*$/)){if(a.isSelect&&!a.multiple&&a.itemsArray.length>0&&a.remove(a.itemsArray[0]),"string"==typeof e&&"INPUT"===this.$element[0].tagName){var o=a.options.delimiterRegex?a.options.delimiterRegex:a.options.delimiter,s=e.split(o)
if(s.length>1){for(var l=0;l<s.length;l++)this.add(s[l],!0)
return void(i||a.pushVal(a.options.triggerChange))}}var p=a.options.itemValue(e),u=a.options.itemText(e),c=a.options.tagClass(e),h=a.options.itemTitle(e),m=t.grep(a.itemsArray,function(t){return a.options.itemValue(t)===p})[0]
if(!m||a.options.allowDuplicates){if(!(a.items().toString().length+e.length+1>a.options.maxInputLength)){var d=t.Event("beforeItemAdd",{item:e,cancel:!1,options:n})
if(a.$element.trigger(d),!d.cancel){a.itemsArray.push(e)
var f=t('<span class="'+r(c)+(null!==h?'" title="'+h:"")+'">'+r(u)+'<span data-role="remove"></span></span>')
f.data("item",e),a.findInputWrapper().before(f)
var g=t('option[value="'+encodeURIComponent(p).replace(/"/g,'\\"')+'"]',a.$element).length||t('option[value="'+r(p).replace(/"/g,'\\"')+'"]',a.$element).length
if(a.isSelect&&!g){var v=t("<option selected>"+r(u)+"</option>")
v.data("item",e),v.attr("value",p),a.$element.append(v)}i||a.pushVal(a.options.triggerChange),a.options.maxTags!==a.itemsArray.length&&a.items().toString().length!==a.options.maxInputLength||a.$container.addClass("bootstrap-tagsinput-max"),t(".typeahead, .twitter-typeahead",a.$container).length&&a.$input.typeahead("val",""),this.isInit?a.$element.trigger(t.Event("itemAddedOnInit",{item:e,options:n})):a.$element.trigger(t.Event("itemAdded",{item:e,options:n}))}}}else if(a.options.onTagExists){var y=t(".badge",a.$container).filter(function(){return t(this).data("item")===m})
a.options.onTagExists(e,y)}}}},remove:function(e,i,n){var a=this
if(a.objectItems&&(e=(e="object"==typeof e?t.grep(a.itemsArray,function(t){return a.options.itemValue(t)==a.options.itemValue(e)}):t.grep(a.itemsArray,function(t){return a.options.itemValue(t)==e}))[e.length-1]),e){var o=t.Event("beforeItemRemove",{item:e,cancel:!1,options:n})
if(a.$element.trigger(o),o.cancel)return
t(".badge",a.$container).filter(function(){return t(this).data("item")===e}).remove(),t("option",a.$element).filter(function(){return t(this).data("item")===e}).remove(),-1!==t.inArray(e,a.itemsArray)&&a.itemsArray.splice(t.inArray(e,a.itemsArray),1)}i||a.pushVal(a.options.triggerChange),a.options.maxTags>a.itemsArray.length&&a.$container.removeClass("bootstrap-tagsinput-max"),a.$element.trigger(t.Event("itemRemoved",{item:e,options:n}))},removeAll:function(){for(t(".badge",this.$container).remove(),t("option",this.$element).remove();this.itemsArray.length>0;)this.itemsArray.pop()
this.pushVal(this.options.triggerChange)},refresh:function(){var e=this
t(".badge",e.$container).each(function(){var i=t(this),n=i.data("item"),a=e.options.itemValue(n),o=e.options.itemText(n),s=e.options.tagClass(n);(i.attr("class",null),i.addClass("badge "+r(s)),i.contents().filter(function(){return 3==this.nodeType})[0].nodeValue=r(o),e.isSelect)&&t("option",e.$element).filter(function(){return t(this).data("item")===n}).attr("value",a)})},items:function(){return this.itemsArray},pushVal:function(){var e=this,i=t.map(e.items(),function(t){return e.options.itemValue(t).toString()})
e.$element.val(i.join(e.options.delimiter)),e.options.triggerChange&&e.$element.trigger("change")},build:function(i){var o=this
if(o.options=t.extend({},e,i),o.objectItems&&(o.options.freeInput=!1),n(o.options,"itemValue"),n(o.options,"itemText"),a(o.options,"tagClass"),o.options.typeahead){var r=o.options.typeahead||{}
a(r,"source"),o.$input.typeahead(t.extend({},r,{source:function(e,i){function n(t){for(var e=[],n=0;n<t.length;n++){var r=o.options.itemText(t[n])
a[r]=t[n],e.push(r)}i(e)}this.map={}
var a=this.map,s=r.source(e)
t.isFunction(s.success)?s.success(n):t.isFunction(s.then)?s.then(n):t.when(s).then(n)},updater:function(t){return o.add(this.map[t]),this.map[t]},matcher:function(t){return-1!==t.toLowerCase().indexOf(this.query.trim().toLowerCase())},sorter:function(t){return t.sort()},highlighter:function(t){var e=new RegExp("("+this.query+")","gi")
return t.replace(e,"<strong>$1</strong>")}}))}if(o.options.typeaheadjs){var l=o.options.typeaheadjs
t.isArray(l)||(l=[null,l]),t.fn.typeahead.apply(o.$input,l).on("typeahead:selected",t.proxy(function(t,e,i){var n=0
l.some(function(t,e){return t.name===i&&(n=e,!0)}),l[n].valueKey?o.add(e[l[n].valueKey]):o.add(e),o.$input.typeahead("val","")},o))}o.$container.on("click",t.proxy(function(t){o.$element.attr("disabled")||o.$input.removeAttr("disabled"),o.$input.focus()},o)),o.options.addOnBlur&&o.options.freeInput&&o.$input.on("focusout",t.proxy(function(e){0===t(".typeahead, .twitter-typeahead",o.$container).length&&(o.add(o.$input.val()),o.$input.val(""))},o)),o.$container.on({focusin:function(){o.$container.addClass(o.options.focusClass)},focusout:function(){o.$container.removeClass(o.options.focusClass)}}),o.$container.on("keydown","input",t.proxy(function(e){var i=t(e.target),n=o.findInputWrapper()
if(o.$element.attr("disabled"))o.$input.attr("disabled","disabled")
else{switch(e.which){case 8:if(0===s(i[0])){var a=n.prev()
a.length&&(!0===o.options.editOnBackspace&&i.val(a.data("item")),o.remove(a.data("item")))}break
case 46:if(0===s(i[0])){var r=n.next()
r.length&&o.remove(r.data("item"))}break
case 37:var l=n.prev()
0===i.val().length&&l[0]&&(l.before(n),i.focus())
break
case 39:var p=n.next()
0===i.val().length&&p[0]&&(p.after(n),i.focus())}var u=i.val().length,c=u+Math.ceil(u/5)+1
i.attr("size",Math.max(this.inputSize,c))}},o)),o.$container.on("keypress","input",t.proxy(function(e){var i=t(e.target)
if(o.$element.attr("disabled"))o.$input.attr("disabled","disabled")
else{var n,a,r,s=i.val(),l=o.options.maxChars&&s.length>=o.options.maxChars
o.options.freeInput&&(n=e,a=o.options.confirmKeys,r=!1,t.each(a,function(t,e){if("number"==typeof e&&n.which===e)return r=!0,!1
if(n.which===e.which){var i=!e.hasOwnProperty("altKey")||n.altKey===e.altKey,a=!e.hasOwnProperty("shiftKey")||n.shiftKey===e.shiftKey,o=!e.hasOwnProperty("ctrlKey")||n.ctrlKey===e.ctrlKey
if(i&&a&&o)return r=!0,!1}}),r||l)&&(0!==s.length&&(o.add(l?s.substr(0,o.options.maxChars):s),i.val("")),!1===o.options.cancelConfirmKeysOnEmpty&&e.preventDefault())
var p=i.val().length,u=p+Math.ceil(p/5)+1
i.attr("size",Math.max(this.inputSize,u))}},o)),o.$container.on("click","[data-role=remove]",t.proxy(function(e){o.$element.attr("disabled")||o.remove(t(e.target).closest(".badge").data("item"))},o)),o.options.itemValue===e.itemValue&&("INPUT"===o.$element[0].tagName?o.add(o.$element.val()):t("option",o.$element).each(function(){o.add(t(this).attr("value"),!0)}))},destroy:function(){this.$container.off("keypress","input"),this.$container.off("click","[role=remove]"),this.$container.remove(),this.$element.removeData("tagsinput"),this.$element.show()},focus:function(){this.$input.focus()},input:function(){return this.$input},findInputWrapper:function(){for(var e=this.$input[0],i=this.$container[0];e&&e.parentNode!==i;)e=e.parentNode
return t(e)}},t.fn.tagsinput=function(e,n,a){var o=[]
return this.each(function(){var r=t(this).data("tagsinput")
if(r)if(e||n){if(void 0!==r[e]){if(3===r[e].length&&void 0!==a)var s=r[e](n,null,a)
else s=r[e](n)
void 0!==s&&o.push(s)}}else o.push(r)
else r=new i(this,e),t(this).data("tagsinput",r),o.push(r),"SELECT"===this.tagName&&t("option",t(this)).attr("selected","selected"),t(this).val(t(this).val())}),"string"==typeof e?o.length>1?o:o[0]:o},t.fn.tagsinput.Constructor=i
var o=t("<div />")
function r(t){return t?o.text(t).html():""}function s(t){var e=0
if(document.selection){t.focus()
var i=document.selection.createRange()
i.moveStart("character",-t.value.length),e=i.text.length}else(t.selectionStart||"0"==t.selectionStart)&&(e=t.selectionStart)
return e}t(function(){t("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput()})})(window.jQuery)