// ==UserScript==
// @name        EChartButtons6
// @namespace   Stanscripts
// @description Various navigation buttons for echart screen.  Set your own specific fid (form number) or Measurement groupName
// @include     */casemgmt/forward.jsp?action=view&demographic*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant       none
// ==/UserScript==


window.addEventListener("load", function(e) {
  addButton('buttonOpenXray', 'X-ray', 290);
}, false);
 
function addButton(id, value, fid){
	var targetDiv = document.getElementById('leftNavBar');
	var inputButton = document.createElement('input');
	inputButton.id = id;
	inputButton.type = 'button';
	inputButton.value = value;
	targetDiv.appendChild(inputButton);
	addButtonListener(id, fid);
}
 
function addButtonListener(id, fid){
  var button = document.getElementById(id);
  button.addEventListener('click',openLink(fid),true);
} 

function openLink(fid){
	var elements = (window.location.pathname.split('/', 2));
	firstElement = (elements.slice(1));
	vPath = ("https://" + location.host + "/"  + firstElement + "/");
  
	console.log('test');
	console.log(elements);
	console.log(firstElement);
		
	 // INSERT YOU OWN form ID (fid=??) here
	var formPath = vPath + "eform/efmformadd_data.jsp?fid=" + fid + "&demographic_no=" + findDemogNum();
	//alert(formPath)
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
