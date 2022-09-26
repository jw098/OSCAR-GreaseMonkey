// ==UserScript==
// @name           KeyboardShortcuts_EChart6
// @namespace      oscar
// @include        */casemgmt/forward.jsp?action=view&*
// @include        */eform/efmformslistadd.jsp*
// @include        */oscarConsultationRequest/ConsultationFormRequest.jsp*
// @include        */tickler/ticklerAdd.jsp*
// @description		Within the E-chart: Alt+1 to Sign/Save/Bill. Alt+2 to Save. Alt+3 to Sign/Save. Alt+4 to Exit. Alt+W, Alt+Q, Alt+A to open/close Consultation, eForms, Ticklers respectively.
// @grant	   none
// ==/UserScript==

// created by Darius Opensource

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
		case eFormsPage.test(currentURL) && theAltKey && theKey == 'q':			// If on eForms page, Alt+Q to close eForms.
			window.close();
			break;
		case consultationPage.test(currentURL) && theAltKey && theKey == 'w':	// If on Consultation page, Alt+W to close Consultation.
			window.close();
			break;
		case ticklerPage.test(currentURL) && theAltKey && theKey == 'a':		// If on Ticklers page, Alt+A to close Ticklers.
			window.close();
			break;		
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
		case theAltKey && theKey == 'q':  // eForms
			var theTarget = document.evaluate("//div[@id='menuTitleeforms ']/h3/a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;
		case theAltKey && theKey == 'w':  // Consultation			
			var theTarget = document.evaluate("//div[@id='menuTitleconsultation ']/h3/a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;  //"id('menuTitleconsultation ')/h3/a"  //"id('consultation')/div/div[2]/h3/a"  /html/body/div/div/div[4]/div[10]/div/div[2]/h3/a
		case theAltKey && theKey == 'a':  // Tickler
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