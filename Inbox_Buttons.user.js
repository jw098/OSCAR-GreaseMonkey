// ==UserScript==
// @name           Inbox_Buttons
// @namespace      oscar
// @include        */lab/CA/ALL/labDisplay*
// @include        */dms/inboxManage*
// @description		Within Inbox: A button that opens all reports (including acknowledged and filed reports).
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant	   none
// ==/UserScript==



/////////////////////////////////
// Event Listener
/////////////////////////////////

window.addEventListener("load", function(e) {
	addButtonLoadAllReports();
	addButtonLoadNewReports();
}, false);

/////////////////////////////////
// Load New Reports Button
/////////////////////////////////

function addButtonLoadNewReports(){
	let targetDiv = document.querySelectorAll('#lab_form > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1)')[0];
	console.log(targetDiv);
	var inputButton = document.createElement('input');
	inputButton.id = 'loadNewReports';
	inputButton.type = 'button';
	inputButton.value = 'Load New Reports';
	targetDiv.appendChild(inputButton);	
	addButtonLoadNewReportsListener();
}

function addButtonLoadNewReportsListener(){
  var theButton = document.getElementById('loadNewReports');
  //https://carefiniti.kai-oscar.com/oscar/dms/inboxManage.do?method=prepareForIndexPage&providerNo=54

  const URL = getURLOrigin() + "dms/inboxManage.do?method=prepareForIndexPage&providerNo=" + getProviderNum();
  console.log(URL);
  theButton.addEventListener('click', function () { 
  	window.open(URL,"_self"); 
  },true);
}

/////////////////////////////////
// Load All Reports Button
/////////////////////////////////

function addButtonLoadAllReports(){
	let targetDiv = document.querySelectorAll('#lab_form > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1)')[0];
	console.log(targetDiv);
	var inputButton = document.createElement('input');
	inputButton.id = 'loadAllReports';
	inputButton.type = 'button';
	inputButton.value = 'Load All Reports';
	targetDiv.appendChild(inputButton);	
	addButtonLoadReportsListener();
}

function addButtonLoadReportsListener(){
  var theButton = document.getElementById('loadAllReports');
  //https://carefiniti.kai-oscar.com/oscar/dms/inboxManage.do?method=prepareForIndexPage&providerNo=54&searchProviderNo=54&status=&abnormalStatus=all

  const URL = getURLOrigin() + "dms/inboxManage.do?method=prepareForIndexPage&providerNo=" + getProviderNum() + "&searchProviderNo=" + getProviderNum() + "&status=&abnormalStatus=all";
  console.log(URL);
  theButton.addEventListener('click',function () { 
  	window.open(URL,"_self"); 
  },true);
}

/////////////////////////////////
// URL
/////////////////////////////////

function getURLOrigin(){
	var urlElements = (window.location.pathname.split('/', 2));
	firstUrlElement = (urlElements.slice(1));
	return window.location.origin + '/' + firstUrlElement + '/';
}

function getProviderNum(){
	var params = {}; //Get Params
	if (location.search) {
	    var parts = location.search.substring(1).split('&');
	    for (var i = 0; i < parts.length; i++) {
	        var nv = parts[i].split('=');
	        if (!nv[0]) continue;``
	        params[nv[0]] = nv[1] || true;
	    }
	}
	return params.providerNo;
}