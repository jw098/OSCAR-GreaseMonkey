// ==UserScript==
// @name           eForms_KeyboardShortcuts
// @namespace      oscar
// @include        */eform/efmformslistadd.jsp*
// @description		Within e-forms repository, Alt+A to close. Within an individual e-form: Alt+1 to Submit. Alt+2 to Print & Submit.
// @grant	   none
// ==/UserScript==

const medicationHotkey = 'q';
const consultationHotkey = 'w';
const eFormsHotkey = 'a';
const ticklerHotkey = 'z';



window.addEventListener('keydown', function(theEvent) {
	//theEvent.stopPropagation();
	//theEvent.preventDefault();
	// var theKeyCode = theEvent.charCode;// || event.which;
	// var theKey = String.fromCharCode(theKeyCode);
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
	
	
	// console.log(currentURL);
	// console.log(eChartPage.test(currentURL));
	switch(true){
		case eFormsPage.test(currentURL) && theAltKey && theKey == eFormsHotkey:	// If on eForms page, hotkey to close window.
			window.close();
			break;
	}
}, true);

