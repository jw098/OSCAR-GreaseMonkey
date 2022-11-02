// ==UserScript==
// @name						Consultations_KeyboardShortcuts
// @namespace				oscar
// @include					*/oscarConsultationRequest/ConsultationFormRequest.jsp*
// @include					*/casemgmt/forward.jsp?action=view&*
// @description			Within Consultations: Alt+1 to 'Submit Consultation Request'. Automatically pastes Past Medical history, Social history, and Family history to the Clinical information text area.
// @require 				http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant						GM.setValue
// @grant						GM.getValue
// @grant						GM.deleteValue
// ==/UserScript==

////////////////////////////////
// Event Listeners
////////////////////////////////

const consultationHotkey = 'w';

let currentURL = window.location.href;
const eChartPage = /casemgmt\/forward\.jsp\?action\=view\&/;
const consultationPage = /oscarConsultationRequest\/ConsultationFormRequest\.jsp/;

window.addEventListener('keydown', function(theEvent) {
	const theKey = theEvent.key;
	const theAltKey = theEvent.altKey;
	const theCtrlKey = theEvent.ctrlKey;
	const theShiftKey= theEvent.shiftKey;
    

	if(consultationPage.test(currentURL)) {
		switch(true){
			case theAltKey && theKey == consultationHotkey:	// If on Consultation page, hotkey to close window.
				window.close();
				break;
			case theAltKey && theKey == 1:
				var theTarget = document.evaluate("//input[@value='Submit Consultation Request']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
				theTarget.click();
				break;					
		}			
	}
 
}, true);

window.addEventListener('load', function(){
	postPatientAgeGender();
	getAllHistory();
}, true);


////////////////////////////////
// Patient Age and Gender
////////////////////////////////

function postPatientAgeGender(){
	const theTarget = document.evaluate("//textarea[@name='reasonForConsultation']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	
	const genderAndAge = document.querySelectorAll(".Header")[0].childNodes[2].nodeValue.trim().split("\t");
	
	const age2 = genderAndAge[1];

	const birthDate = document.querySelectorAll("td.tite4:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(7) > td:nth-child(2)")[0].innerText;
	const genderLetter = document.querySelectorAll("td.tite4:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(8) > td:nth-child(2)")[0].innerText;

	const age = calcPatientAge(birthDate);
	const gender = getGender(genderLetter);
	console.log(age2);


	theTarget.value = "Please see this " + age + gender + " for ";
}

function getGender(genderLetter){
	let gender = "";
	switch(genderLetter){
		case "M":
			gender = " male";
			break;
		case "F":
			gender = " female";
			break;
		case "O":
			gender = " (sex: Other)";
			break;
		case "U":
			gender = " (sex: Undefined)";
			break;
		case "T":
			gender = " transgender";
			break;
	}

	return gender;
}

function calcPatientAge(birthDate){
  const ageYears = yearsDiff(new Date(), new Date(birthDate));

  if (ageYears >= 2){
		return ageYears + "-year-old";
  }
  else {
  	const ageMonths = monthsDiff(new Date(), new Date(birthDate));
  	return ageMonths + "-month-old";
  }

  
}

function monthsDiff(d1, d2){
	const diffTime = Math.abs(d1 - d2); // time difference in milliseconds
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	return Math.floor(diffDays/30);
	// return (
	//     d1.getMonth() -
	//     d2.getMonth() +
	//     12 * (d1.getFullYear() - d2.getFullYear())
	//   );
}

function yearsDiff(d1, d2) {    
	const diffTime = Math.abs(d1 - d2); // time difference in milliseconds
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  var timeFromEpoch = new Date(diffTime);  // the date diffTime miliseconds from the epoch (1970)
  console.log(timeFromEpoch);
  const yearsDiff = Math.abs(timeFromEpoch.getUTCFullYear() - 1970);
	return yearsDiff;
}

/////////////////////////////////////////////////////////////////
// Past Medical History, Social History, Family History
/////////////////////////////////////////////////////////////////



async function getAllHistory() {

	const [medHistory, socHistory, famHistory] = await Promise.all([getHistory(urlMedHistory()), getHistory(urlSocHistory()), getHistory(urlFamHistory())]);

	const allHistory = "Past Medical History:\n" + medHistory + "\nSocial History:\n" + socHistory + "\nFamily History:\n"  + famHistory;
	console.log(allHistory);

	const clinInfoTextBox = document.getElementById('clinicalInformation');
	clinInfoTextBox.value = allHistory;
}

/*
- returns a promise that returns the xmlhttp response text
*/
function getXMLHTTP(URL){
	let myPromise = new Promise(function (resolve){
		let xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", URL, true);
		
		xmlhttp.onload = function(){
			if (xmlhttp.status == 200) {
				resolve(xmlhttp.responseText);
      } 
			else {
				reject("File not Found");
      }
		};
		xmlhttp.send();
	});

	return myPromise;
}

async function getXMLHTTP2(consultItemURL){
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", consultItemURL, true);
	
	xmlhttp.onload = async function(){
		if (xmlhttp.status == 200) {
			// console.log(xmlhttp.responseText);
      return xmlhttp.responseText;
    }
	};
	xmlhttp.send();
}

async function getHistory(URL) {
	const otherPageXMLText = await getXMLHTTP(URL);
	const otherPageHTML = new DOMParser().parseFromString(otherPageXMLText, "text/html");
  const historyDivList = otherPageHTML.querySelectorAll("body > div"); 

  if (historyDivList.length == 0){
  	return "<no data>\n"
  }
  else {
		const historyText = getHistoryAsText(historyDivList);
		// console.log(historyText);

		return historyText;
  }

}


function getHistoryAsText(historyDivList){
	let historyTextAllLines = "";
	for (i = 0; i < historyDivList.length; i++){
		const historyDiv = historyDivList[i];
		const historyTextOneLine = historyDiv.children[0].innerText;
		historyTextAllLines += historyTextOneLine + "\n";
	}
	return historyTextAllLines;
}

/////////////////////////////////////////////////////
// get URL, URL elements
/////////////////////////////////////////////////////


function urlSocHistory(){
	var newURL = getURLOrigin() + "CaseManagementEntry.do?method=issuehistory&demographicNo="+ getDemographicNum() + "&issueIds=65";

	return newURL;
}

function urlMedHistory(){
	var newURL = getURLOrigin() + "CaseManagementEntry.do?method=issuehistory&demographicNo="+ getDemographicNum() + "&issueIds=66";

	return newURL;
}

function urlFamHistory(){
	var newURL = getURLOrigin() + "CaseManagementEntry.do?method=issuehistory&demographicNo="+ getDemographicNum() + "&issueIds=69";

	return newURL;
}


function urlEChart(){
	var newURL = getURLOrigin() + "casemgmt/forward.jsp?action=view&demographicNo="+ getDemographicNum();

	return newURL;
}

function getURLOrigin(){
	var urlElements = (window.location.pathname.split('/', 2));
	firstUrlElement = (urlElements.slice(1));
	return window.location.origin + '/' + firstUrlElement + '/';
}

https://carefiniti.kai-oscar.com/oscar/oscarEncounter/oscarConsultationRequest/ConsultationFormRequest.jsp?de=8255&teamVar=&appNo=null
function getDemographicNum(){
	var params = {}; //Get Params
	if (location.search) {
	    var parts = location.search.substring(1).split('&');
	    for (var i = 0; i < parts.length; i++) {
	        var nv = parts[i].split('=');
	        if (!nv[0]) continue;``
	        params[nv[0]] = nv[1] || true;
	    }
	}

	return params.de;

}
