// ==UserScript==
// @name        EChart_Buttons
// @namespace   Stanscripts
// @description Various navigation buttons for e-chart screen (e.g. Lab req, Ultrasound req, X-ray req).  Set your own specific fid (form number ID) or Measurement groupName.
// @include     */casemgmt/forward.jsp?action=view&demographic*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant       none
// ==/UserScript==


window.addEventListener("load", function(e) {
	let buttonBlock = 'buttonBlock1';
	addBlock(buttonBlock);
	addButtonEForm('buttonOpenXray', 'X-ray', 359, buttonBlock);
	addButtonEForm('buttonOpenLabReq', 'Lab Req', 275, buttonBlock);
	addButtonEForm('buttonOpenUS', 'U/S', 293, buttonBlock);
	
	buttonBlock = 'buttonBlock2';
	addBlock(buttonBlock);
	addButtonEForm('buttonOpenXray2', 'X-ray2', 71, buttonBlock);
	addButtonEForm('buttonOpenLabReq2', 'Lab Req2', 191, buttonBlock);
	addButtonEForm('buttonOpenUS2', 'U/S2', 211, buttonBlock);
}, false);
 
function addBlock(id){
	var targetDiv = document.getElementById('rightNavBar');
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
		targetDiv = document.getElementById('rightNavBar');
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


// below function doesn't work.
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
