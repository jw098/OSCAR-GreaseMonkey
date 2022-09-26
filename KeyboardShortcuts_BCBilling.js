// ==UserScript==
// @name           KeyboardShortcuts_BCBilling3
// @namespace      oscar
// @include        *billing.do?bill*
// @include        *oscar/CaseManagementEntry*
// @include        *billing/CA/BC/billingDigNewSearch.jsp?*
// @include        *billing/CA/BC/CreateBilling*
// @description		Within the BC Billing page, Alt+A to Continue. In Diagnostic Code search: Alt+A to Confirm, Escape to Cancel. In Billing confirmation page: Alt+A to Save Bill.
// @grant	   none
// ==/UserScript==

// forked from original KeyboardShortcuts script created by Darius Opensource

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
	
	let currentURL = window.location.href;
	const billingPage = /billing.do\?bill/;
	const billingPage2 = /oscar\/CaseManagementEntry/;
	const dxCodeSearch = /billing\/CA\/BC\/billingDigNewSearch.jsp/;
	const billingConf = /billing\/CA\/BC\/CreateBilling/;
  	
	switch(true){
		case  (billingPage.test(currentURL) || billingPage2.test(currentURL)) && theAltKey && theKey == 'a':  // Within the BC Billing page, Alt+A to Continue.
			var theTarget = document.evaluate("id('buttonRow')/td/input[contains(@value,'Continue')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;
		case dxCodeSearch.test(currentURL) && theAltKey && theKey == 'a':  // In Diagnostic Code search: Alt+A to Confirm.
			var theTarget = document.evaluate("id('servicecode')/input[contains(@value,'Confirm')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;	
		case dxCodeSearch.test(currentURL) && theKey == "Escape":  // In Diagnostic Code search: Escape to Cancel. 
			// alert("dxCodeSearch");
			var theTarget = document.evaluate("id('servicecode')/input[contains(@value,'Cancel')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;	
		case billingConf.test(currentURL) && theAltKey && theKey == 'a':  // In Billing confirmation page: Alt+A to Save Bill. 
			// alert("billingConf");
			var theTarget = document.evaluate(
			"/html/body/form/table[2]/tbody/tr/td/table[3]/tbody/tr/td/table[3]/tbody/tr[2]/td/input[contains(@value,'Save Bill')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;
			
		// case  theAltKey && theKey == 'z':  // Alt Z for testing.
			// alert(currentURL);
			// alert(dxCodeSearch.test(currentURL));
			// break;

		/*
		/html/body/form/table[2]/tbody/tr/td/table[3]/tbody/tr/td/table[3]/tbody/tr[2]/td/input[3]
		/html/body/form/table[2]/tbody/tr/td/table[3]/tbody/tr/td/table[3]/tbody/tr[2]/td/input[contains(@value, 'Save Bill')]
				
		//*[@id="saveImg"]
		case theAltKey && theCtrlKey && theShiftKey && theKey=='':
			//TO DO: The action to be performed for the above keyboard shortcut
			break;
		*/
	}
}, true);
})();
