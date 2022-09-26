// ==UserScript==
// @name           KeyboardShortcuts_Inbox1
// @namespace      oscar
// @include        */lab/CA/ALL/labDisplay*
// @include        */dms/inboxManage*
// @include        */dms/showDocument*
// @description		Within Inbox: Alt+1 to open first item. Within the Lab result: Alt+1 to Acknowledge. Alt+2 to open E-chart.
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
		case (!!document.getElementById("docViews") &&	// If in the inbox, whose XML contains id = "docViews"
				theAltKey && theKey == 1):  			// open first item in inbox						
			getNextTarget().click();
			console.log("test")
			break;
		case (!!document.querySelectorAll('[id^=acknowledgeForm]') &&	// If in the Lab result, whose XML contains id = "acknowledgeForm"
				theAltKey && theKey == 1):								// Acknowledge the result
			var theTarget = document.evaluate("//input[@value='Acknowledge']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;		
		case (!!document.querySelectorAll('[id^=acknowledgeForm]') &&	// If in the Lab result, whose XML contains id = "acknowledgeForm"
				theAltKey && theKey == 'q'):  							// open E-chart
			var theTarget = document.evaluate("//input[contains(@value, 'E-Chart')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;
		case (!!document.querySelectorAll('[id^=acknowledgeForm]') &&	// If in the Lab result, whose XML contains id = "acknowledgeForm"
				theAltKey && theKey == 'w'):  							// open Tickler
			var theTarget = document.evaluate("//input[@value='Tickler']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			break;      
      
		case (theAltKey && theKey == 'z'):
			// alert("hello");
			const allInTBody = document.querySelectorAll('tbody[id="summaryBody"] > tr');
// 			console.log(allInTBody);
//       console.log('hello');
			getNextTarget();			
			break;

      //'id('save')/span/input[contains(@src,'dollar-sign-icon.png')]'
	}
}, true);
})();

function getNextTarget() {
	
	const allInTBody = document.querySelectorAll('tbody[id="summaryBody"] > tr');
	console.log(allInTBody);
	let index = 1;
	for (const element of allInTBody) {
		// console.log(index);
		const styleAttribute = element.getAttribute('style');
		if (styleAttribute != 'display: none;'){  // Lab result not hidden. i.e not recently acknowledged.
			break;
		}
    index++;
	}
	console.log(index);
	
	return document.evaluate("//tbody[@id='summaryBody']/tr[" + index + "]/td[2]/a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
}