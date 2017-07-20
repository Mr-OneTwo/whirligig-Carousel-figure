window.onload=function(){
	var oAutomatic=document.getElementById('automatic');
	var oPrevDiv=getClass(oAutomatic,'prev')[0];
	var oPrevImg=getClass(oPrevDiv,'ico1')[0];
	var oPrev=getClass(oPrevDiv,'ico')[0];
	var oPrevTxt=getClass(oPrevDiv,'txt')[0];

	var oNextDiv=getClass(oAutomatic,'next')[0];
	var oNextImg=getClass(oNextDiv,'ico')[0];
	var oNext=getClass(oNextDiv,'ico1')[0];
	var oNextTxt=getClass(oNextDiv,'txt')[0];

	oPrevDiv.onmouseover=function(){
		doMove(this,{'left':20});
		doMove(oPrevTxt,{'opacity':100,'left':50})
	}
	oPrevDiv.onmouseout=function(){
		doMove(this,{'left':0});
		doMove(oPrevTxt,{'opacity':0,'left':80})
	}
	oNextDiv.onmouseover=function(){
		doMove(this,{'right':-20});
		doMove(oNextTxt,{'opacity':100,'right':60})
	}
	oNextDiv.onmouseout=function(){
		doMove(this,{'right':0});
		doMove(oNextTxt,{'opacity':0,'right':80})
	}
	oPrevDiv.onclick=function(){
		gotoImg(true);
	}
	oNextDiv.onclick=function(){
		gotoImg(false);
	}


	var aLi=document.getElementsByTagName('li');
	var arr=[];

	for(var i=0;i<aLi.length;i++){
		var oImg=aLi[i].getElementsByTagName('img')[0];
		arr.push([getStyle(aLi[i],'left'),getStyle(aLi[i],'top'),getStyle(aLi[i],'opacity'),getStyle(aLi[i],'zIndex'),oImg.width])
	}


	function gotoImg(bLeft){
		if(bLeft){
			arr.push(arr.shift());
		}else{
			arr.unshift(arr.pop());
		}
		
		for(i=0;i<aLi.length;i++)
		{
			var oImg = aLi[i].getElementsByTagName('img')[0];
			aLi[i].style.zIndex = arr[i][3];
			doMove(aLi[i],{'left':parseInt(arr[i][0]),'top':parseInt(arr[i][1]),'opacity':arr[i][2]*100});
			doMove(oImg,{'width':arr[i][4]})
		}
	}

}

function getStyle(obj,attr){
	if(obj.getCurrentStyle)
		return obj.CurrentStyle[attr];
	else
		return getComputedStyle(obj,false)[attr];
}

function getClass(oPar,aClass){
	var aTem=oPar.getElementsByTagName('*');
	var aResult=[];

	for(var i=0;i<aTem.length;i++){
		if(aTem[i].className==aClass){
			aResult.push(aTem[i]); 
		}
	}
	return aResult;
}

function doMove(obj,json,fn){
	clearInterval(obj.timer);

	obj.timer=setInterval(function(){
		var bStop=true;

		for(attr in json){
			var iCur=0;

			if(attr=='opacity'){
				iCu=parseInt(parseFloat(getStyle(obj,'opacity'))*100);
			}else{
				iCu=parseInt(getStyle(obj,attr));
			}

			var iSpeed=(json[attr]-iCu)/8;
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);

			if(iCu!=json[attr]){
				bStop=false;
			}
			if(attr=='opacity'){
				obj.style.opacity=(iCu+iSpeed)/100;
				obj.style.filter="alpha(opacity="+(iCu+iSpeed)+")"
			}else{
				obj.style[attr]=iCu+iSpeed+'px';
			}

			if(bStop){
				clearInterval(obj.timer);
				if(fn){
					fn();
				}
			}
		}
	},30)
}
