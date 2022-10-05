// ==UserScript==
// @name           Consultations_KeyboardShortcuts
// @namespace      oscar
// @include        */oscarConsultationRequest/ConsultationFormRequest.jsp*
// @description		Within Consultation: Alt+1 to 'Submit Consultation Request'. Automatically paste Past Medical History, Social History, Family History.
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant	   none
// ==/UserScript==


const consultationHotkey = 'w';

window.addEventListener('keydown', function(theEvent) {
	const theKey = theEvent.key;
	const theAltKey = theEvent.altKey;
	const theCtrlKey = theEvent.ctrlKey;
	const theShiftKey= theEvent.shiftKey;
    
	let currentURL = window.location.href;
	const medPage = /oscarRx\/choosePatient\.do/
	const eChartPage = /casemgmt\/forward\.jsp\?action\=view\&/;
	const eFormsPage = /eform\/efmformslistadd\.jsp/;
	const consultationPage = /oscarConsultationRequest\/ConsultationFormRequest\.jsp/;
	const ticklerPage = /tickler\/ticklerAdd\.jsp/;

	switch(true){
		case theAltKey && theKey == consultationHotkey:	// If on Consultation page, hotkey to close window.
			window.close();
			break;
		case theAltKey && theKey == 1:
			var theTarget = document.evaluate("//input[@value='Submit Consultation Request']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;					
	} 
}, true);
