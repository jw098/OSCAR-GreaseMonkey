// ==UserScript==
// @name           KeyboardShortcuts_BCBilling1
// @namespace      oscar
// @include        *billing.do?bill*
// @description		Within the BC Billing page, Alt+A to Continue
// @grant	   none
// ==/UserScript==

// forked from original KeyboardShortcuts script created by Darius Opensource

(function(){
document.addEventListener('keydown', function(theEvent) {
	//theEvent.stopPropagation();
	//theEvent.preventDefault();
	// var theKeyCode = theEvent.charCode;// || event.which;
	// var theKey = String.fromCharCode(theKeyCode);  /html/body/div[2]/form/table/tbody/tr[4]/td/table/tbody/tr[2]/td/input[1]
	var theKey = theEvent.key;
	var theAltKey = theEvent.altKey;
	var theCtrlKey = theEvent.ctrlKey;
	var theShiftKey= theEvent.shiftKey;
  
	switch(true){
		case theAltKey && theKey == 'a':  // Continue
			var theTarget = document.evaluate("id('buttonRow')/td/input[contains(@value,'Continue')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;
			
			
		// case theAltKey && theKey== 2:  // Sign and Save
			// var theTarget = document.evaluate("id('save')/span/input[contains(@src,'note-save.png')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			// theTarget.click();
			// break;



		/*
		//*[@id="saveImg"]
		case theAltKey && theCtrlKey && theShiftKey && theKey=='':
			//TO DO: The action to be performed for the above keyboard shortcut
			break;
		*/
	}
}, true);
})();
