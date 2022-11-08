// ==UserScript==
// @name           Inbox_KeyboardShortcuts
// @namespace      oscar
// @include        */lab/CA/ALL/labDisplay*
// @include        */dms/inboxManage*
// @include        */dms/showDocument*
// @include        */dms/MultiPageDocDisplay.jsp*
// @description		Within Inbox: Alt+1 to open first item. Within the Lab result: Alt+1 to Acknowledge. Alt+Q to open E-chart. Alt+W to open Tickler. 
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant	   none
// ==/UserScript==



window.addEventListener('keydown', function(theEvent) {
	//theEvent.stopPropagation();
	//theEvent.preventDefault();
	// var theKeyCode = theEvent.charCode;// || event.which;
	// var theKey = String.fromCharCode(theKeyCode);
	var theKey = theEvent.key;
	var theAltKey = theEvent.altKey;
	var theCtrlKey = theEvent.ctrlKey;
	var theShiftKey= theEvent.shiftKey;
  
	let currentURL = window.location.href;
	const labResultPage = /lab\/CA\/ALL\/labDisplay/
	const ticklerPage = /tickler\/ForwardDemographicTickler/
	const documentPage = /dms\/showDocument/
	

	switch(true){
		case (!!document.getElementById("docViews") &&	// If in the inbox, whose XML contains id = "docViews"
				theAltKey && theKey == 1):  			// Alt+1: Open first item in inbox						
			getNextTarget().click();
			console.log("test")
			break;
		case (labResultPage.test(currentURL) || documentPage.test(currentURL)): // If in the Lab/Document result page
			switch(true){
				case (theAltKey && theKey == 1):			// Alt+1: Acknowledge the result.
					var theTarget = document.evaluate("//input[@value='Acknowledge']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
					theTarget.click();					
					break;		
				case (theAltKey && theKey == 'q'):  							// Alt+Q: open E-chart
					var theTarget = document.evaluate("//input[contains(@value, 'E-Chart')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
					theTarget.click();
					break;
				case (theAltKey && theKey == 'w'):  							// Alt+W: open Tickler
					var theTarget = document.evaluate("//input[@value='Tickler']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
					theTarget.click();
					break;
			}
			break;
	}
}, true);


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

