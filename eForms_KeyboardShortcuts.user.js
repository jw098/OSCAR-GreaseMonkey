// ==UserScript==
// @name           eForms_KeyboardShortcuts
// @namespace      oscar
// @include        */eform/efmformslistadd.jsp*
// @include        */eform/efmformadd_data.jsp*
// @description		Within e-forms repository, Alt+A to close. Within an individual e-form: Alt+1 to Submit. Alt+2 to Print & Submit.
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant	   none
// ==/UserScript==

const closeEFormList_hotkey = 'a';
const submitEForm_hotkey = 1;
const printNSubmitEForm_hotkey = 2;




let currentURL = window.location.href;
const eFormsPage = /eform\/efmformslistadd\.jsp/;
const individualEForm = /eform\/efmformadd\_data\.jsp/;


window.addEventListener('keydown', function(theEvent) {
	//theEvent.stopPropagation();
	//theEvent.preventDefault();
	// var theKeyCode = theEvent.charCode;// || event.which;
	// var theKey = String.fromCharCode(theKeyCode);
	const theKey = theEvent.key;
	const theAltKey = theEvent.altKey;
	const theCtrlKey = theEvent.ctrlKey;
	const theShiftKey= theEvent.shiftKey;
    

	
	// console.log(currentURL);
	// console.log(eChartPage.test(currentURL));
	switch(true){
		case eFormsPage.test(currentURL) && theAltKey && theKey == closeEFormList_hotkey:	// If on eForms page, hotkey to close window.
			window.close();
			break;
		case individualEForm.test(currentURL):
			// let theTarget;
			switch(true){
				case theAltKey && theKey == submitEForm_hotkey:
					$('#SubmitButton').click();
					break;
				case theAltKey && theKey == printNSubmitEForm_hotkey:
					$('#PrintSubmitButton').click();
					break;
			}
			break;
	}
}, true);

