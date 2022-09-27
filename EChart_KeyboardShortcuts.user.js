// ==UserScript==
// @name           EChart_KeyboardShortcuts
// @namespace      oscar
// @include        */casemgmt/forward.jsp?action=view&*
// @include        */oscarRx/choosePatient.do*
// @include        */eform/efmformslistadd.jsp*
// @include        */oscarConsultationRequest/ConsultationFormRequest.jsp*
// @description		Within the E-chart: Alt+1 to Sign/Save/Bill. Alt+2 to Save. Alt+3 to Sign/Save. Alt+4 to Exit. Alt+W, Alt+Q, Alt+A to open/close Consultation, eForms, Ticklers respectively. Within Ticklers, Alt+1 to 'Submit and EXIT', Alt+2 to 'Submit & Write to Encounter', Alt+A to set focus to text box. Within Consultation: Alt+1 to 'Submit Consultation Request'.
// @grant	   none
// ==/UserScript==

// created by Darius Opensource

const medicationHotkey = 'q';
const consultationHotkey = 'w';
const eFormsHotkey = 'a';
const ticklerHotkey = 'z';


(function(){
document.addEventListener('keydown', function(theEvent) {
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
		case eChartPage.test(currentURL):
			eChartPageHotkeys(theEvent);
			break;
		case medPage.test(currentURL) && theAltKey && theKey == medicationHotkey:	// If on Medications page, hotkey to close window.
			window.close();
			break;			
		case eFormsPage.test(currentURL) && theAltKey && theKey == eFormsHotkey:	// If on eForms page, hotkey to close window.
			window.close();
			break;
		case consultationPage.test(currentURL):
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
})();


function eChartPageHotkeys(theEvent){
	const theKey = theEvent.key;
	const theAltKey = theEvent.altKey;
	const theCtrlKey = theEvent.ctrlKey;
	const theShiftKey= theEvent.shiftKey;
	switch(true){
		case theAltKey && theKey == 1:  // Sign, Save, and Bill
			var theTarget = document.evaluate("id('save')/span/input[contains(@src,'dollar-sign-icon.png')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;
		case theAltKey && theKey == medicationHotkey:  // Medications
			var theTarget = document.evaluate("//div[@id='Rx']/div/div/h3/a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;
		case theAltKey && theKey == eFormsHotkey:  // eForms
			var theTarget = document.evaluate("//div[@id='menuTitleeforms ']/h3/a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;
		case theAltKey && theKey == consultationHotkey:  // Consultation			
			var theTarget = document.evaluate("//div[@id='menuTitleconsultation ']/h3/a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;  //"id('menuTitleconsultation ')/h3/a"  //"id('consultation')/div/div[2]/h3/a"  /html/body/div/div/div[4]/div[10]/div/div[2]/h3/a
		case theAltKey && theKey == ticklerHotkey:  // Tickler
			var theTarget = document.evaluate("//div[@id='menuTitletickler ']/h3/a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;
		case theAltKey && theKey == 2:  // Save
			var theTarget = document.evaluate("id('save')/span/input[contains(@src,'media-floppy.png')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;
		case theAltKey && theKey == 3:  // Sign and Save
			var theTarget = document.evaluate("id('save')/span/input[contains(@src,'note-save.png')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;
		case theAltKey && theKey == 4: // Exit
			var theTarget = document.evaluate("id('save')/span/input[contains(@src,'system-log-out.png')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;
	}
}