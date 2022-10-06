// ==UserScript==
// @name           Consultations_KeyboardShortcuts
// @namespace      oscar
// @include        */oscarConsultationRequest/ConsultationFormRequest.jsp*
// @include        */casemgmt/forward.jsp?action=view&*
// @description		Within Consultation: Alt+1 to 'Submit Consultation Request'.
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant	   GM.setValue
// @grant	   GM.getValue
// @grant	   GM.deleteValue
// ==/UserScript==

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


if(eChartPage.test(currentURL)) {
	CPPMutationObserver();
	GM.deleteValue('socHx');
	GM.deleteValue('pMHx');
	GM.deleteValue('famHx');
}
/*
PURPOSE:
- use mutation observer to wait for the desired elements to load before trying to access them.

NOTE:
- unfortunately, a load event listener doesn't work, since the desired elements seem to load after the page 'loads'.
*/
function CPPMutationObserver(){
	let mutationObserver = new MutationObserver(function(mutations) {

		// mutations.forEach(function(mutation) {
		// 	console.log(mutation);
		// });

		// console.log(mutations);
		let socHxXPath = "//a[text()='Social History']";
		let pMHxXPath = "//a[text()='Medical History']";
		let famHxXPath = "//a[text()='Family History']";

		let socHxBlock = document.evaluate(socHxXPath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;		
		let pMHxBlock = document.evaluate(pMHxXPath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;		
		let famHxBlock = document.evaluate(famHxXPath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;		
		if (!!socHxBlock && !!pMHxBlock && !!famHxBlock){
			mutationObserver.disconnect();

			
			getHistoryText("Medical History");
			getHistoryText("Family History");
			getHistoryText("Social History");
		}
	});

	mutationObserver.observe(document.documentElement, {
	  attributes: true,
	  subtree: true,

	  // characterData: true,
	  // childList: true,
	  // attributeOldValue: true,
	  // characterDataOldValue: true
	});
}

// useless.
window.addEventListener('load', function (){
	console.log('hihi');
}, true)
/*
NOTE:
- the location of Social History, Medical History, etc. aren't necessarily always in the same quadrant. So, need to find its div block first.
- the text in each history block is extracted and saved to GreaseMonkey with GM.setValue. This allows the value to be accessed across tabs.
  - GM.setValue and GM.getValue are asynchronous. @grant also needs to be set appropriately.
*/
function getHistoryText(history){
	let historyXPath = "//a[text()='" + history+ "']";
	let historyDivBlock = document.evaluate(historyXPath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;		
	let historyDivBlockID = historyDivBlock.parentNode.parentNode.parentNode.id;

	let historyNodeList = document.querySelectorAll('#'+historyDivBlockID+'> div:nth-child(3) > ul > li > span > a');
	// console.log(historyNodeList);

	let historyTextList = "";
	historyNodeList.forEach(function(e){		
		// console.log(e.innerText);
		historyTextList += e.innerText + '\n';
	});

	(async () => {	
		switch (history){
			case "Social History":
				// console.log(historyTextList);
				GM.setValue('socHx', historyTextList);
				console.log("GM stored -> " + await GM.getValue("socHx", "test"));
				break;
			case "Medical History":
				// console.log(historyTextList);
				GM.setValue('pMHx', historyTextList);
				console.log("GM stored -> " + await GM.getValue("pMHx", "test"));
				break;
			case "Family History":
				// console.log(historyTextList);
				GM.setValue('famHx', historyTextList);
				console.log("GM stored -> " + await GM.getValue("famHx", "test"));
				break;			
		}
	})();
	
}


(async () => {	
	console.log(await GM.getValue("socHx", "test"));
	console.log(await GM.getValue("pMHx", "test"));
	console.log(await GM.getValue("famHx", "test"));
})();


function getHistoryDivBlock(history){

}





