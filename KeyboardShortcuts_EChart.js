// ==UserScript==
// @name           KeyboardShortcuts_EChart4
// @namespace      oscar
// @include        */casemgmt/forward.jsp?action=view&*
// @description		Within the E-chart: Alt+1 to Sign/Save/Bill. Alt+2 to Save. Alt+3 to Sign/Save. Alt+4 to Exit. Alt+W to open Consultation. Alt+Q to open eForms. Alt+A to open Ticklers.
// @grant	   none
// ==/UserScript==

// created by Darius Opensource

(function(){
document.addEventListener('keydown', function(theEvent) {
	//theEvent.stopPropagation();
	//theEvent.preventDefault();
	// var theKeyCode = theEvent.charCode;// || event.which;
	// var theKey = String.fromCharCode(theKeyCode);
	var theKey = theEvent.key;
	var theAltKey = theEvent.altKey;
	var theCtrlKey = theEvent.ctrlKey;
	var theShiftKey= theEvent.shiftKey;
  
	switch(true){
		case theAltKey && theKey == 1:  // Sign, Save, and Bill
			var theTarget = document.evaluate("id('save')/span/input[contains(@src,'dollar-sign-icon.png')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;		
		case theAltKey && theKey == 'w':  // Consultation	/html/body/div/div/div[4]/div[10]/div/div[2]/h3/a		
			var theTarget = document.evaluate("id('consultation')/div/div[2]/h3/a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;  //"id('menuTitleconsultation')/h3/a"
		case theAltKey && theKey == 'q':  // eForms
			var theTarget = document.evaluate("id('eforms')/div/div[2]/h3/a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;
		case theAltKey && theKey == 'a':  // Tickler
			var theTarget = document.evaluate("id('tickler')/div/div[2]/h3/a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
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


		/*
		//*[@id="saveImg"]
		case theAltKey && theCtrlKey && theShiftKey && theKey=='':
			//TO DO: The action to be performed for the above keyboard shortcut
			break;
		*/
	}
}, true);
})();
