// ==UserScript==
// @name        EChartButtons7
// @namespace   Stanscripts
// @description Various navigation buttons for echart screen.  Set your own specific fid (form number) or Measurement groupName
// @include     */casemgmt/forward.jsp?action=view&demographic*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant       none
// ==/UserScript==


window.addEventListener("load", function(e) {
	addBlock('buttonBlock1');
	addButtonEForm('buttonOpenXray', 'X-ray', 359, 'buttonBlock1');
	addButtonEForm('buttonOpenLabReq', 'Lab Req', 275, 'buttonBlock1');
	addButtonEForm('buttonOpenUS', 'U/S', 293, 'buttonBlock1');
}, false);
 
function addBlock(id){
	var targetDiv = document.getElementById('leftNavBar');
	var theBlock = document.createElement('div');
	theBlock.id = id;
	theBlock.class = 'leftBox';
	theBlock.style = 'display: block;';
	targetDiv.appendChild(theBlock);
}
 
 // wrap in block level element so button is next line.
function addButtonEForm(id, value, fid, divBlock){
	let targetDiv = document.getElementById(divBlock);
	if (targetDiv == null){
		targetDiv = document.getElementById('leftNavBar');
	}
	var inputButton = document.createElement('input');
	inputButton.id = id;
	inputButton.type = 'button';
	inputButton.value = value;
	targetDiv.appendChild(inputButton);	
	addButtonEFormListener(id, fid);
}
 
function addButtonEFormListener(id, fid){
  var theButton = document.getElementById(id);
  theButton.addEventListener('click',function () { openLink(fid); },true);
}
 

function openLink(fid){
	var elements = (window.location.pathname.split('/', 2));
	firstElement = (elements.slice(1));
	vPath = ("https://" + location.host + "/"  + firstElement + "/");
  	
	var formPath = vPath + "eform/efmformadd_data.jsp?fid=" + fid + "&demographic_no=" + findDemogNum();
	window.open(formPath)
}

function findDemogNum(){
	var myParam = location.search.split('demographicNo=')[1];
	//alert(myParam)
	var res = myParam.indexOf("&");
	var demo_no = myParam.substring(0,res);
	return demo_no;
}

window.addEventListener("load", function() {
	var theTarget = document.getElementById("leftNavBar");
	var theLink = document.createElement("a");
	/*Replace 101 with the Lab Req eForm's fid from your Oscar server*/
	var theLabReqForm ="../eform/efmformadd_data.jsp?fid=101";
	theLabReqForm+="&demographic_no="+demographicNo;
	theLink.href="javascript:void(open('"+theLabReqForm+"'));"
	theLink.innerHTML="LAB REQ";
	theTarget.appendChild(theLink);
}, false);
