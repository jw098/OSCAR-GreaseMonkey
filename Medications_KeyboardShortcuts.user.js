// ==UserScript==
// @name           Medications_KeyboardShortcuts
// @namespace      oscar
// @include        */oscarRx/choosePatient.do*
// @description		Within Ticklers, Alt+1 to 'Submit and EXIT', Alt+2 to 'Submit & Write to Encounter', Alt+A to set focus to text box. When the Tickler page loads, it also automatically sets focus to the text box. Note: if not already done, you should consider setting a 'Default Tickler Recipient' under OSCAR Preferences.
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant	   none
// ==/UserScript==


const medPage = /oscarRx\/choosePatient\.do/
let currentURL = window.location.href;
// let rxPageLoaded = false;

/*
PURPOSE: keydown event listener. Alt+1 clicks the 'Save and Print' button, as long as the lightwindow isn't currently loaded.
*/
window.addEventListener('keydown', function(theEvent) {
	//theEvent.stopPropagation();
	//theEvent.preventDefault();
	// var theKeyCode = theEvent.charCode;// || event.which;
	// var theKey = String.fromCharCode(theKeyCode);
	const theKey = theEvent.key;
	const theAltKey = theEvent.altKey;
	const theCtrlKey = theEvent.ctrlKey;
	const theShiftKey= theEvent.shiftKey;


	if(!document.getElementById("lightwindow_iframe")){  // check if lightwindow not loaded
		switch(true){
			case theAltKey && theKey == 1:
				var theTarget = document.evaluate("//*[@id='saveButton']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
				theTarget.click();
				window.scrollTo(0, 30);
				// window.addEventListener('load', function(theEvent) {
				// 	console.log("window done loading");
				// });

				lightwindowIFrameMutationObserver();
				// setTimeout(prescriptionWindowListener, 3000);  // wait for the lightwindow to load, before the iframe can be 

				break;
		}
	}

}, true);

/*
PURPOSE: adds keydown event listeners for the prescription lightwindow. Separate listeners for the iFrames and the top-level window.
*/
function prescriptionWindowListener(){
	iFrameListener();

	window.addEventListener('keydown', function(theEvent) {
		iFrameKeyDownAction(theEvent);
	}, true);
}

/*
PURPOSE: attaches keydown event listeners to the two iframes on the prescription popup.
NOTES:
- we need these listeners because the usual window listener doesn't cover the pop-up lightwindow.
- we need two listeners for the lightwindow since there are two additional documents (and therefore 2 additional windows). 
- the second iframe is nested within the first iframe. The second iframe can't be directly referred to by the top level document, only via the first iframe.
- these listeners need to be reloaded everytime the lightwindow iframe is closed and reopened.
*/
function iFrameListener(){
	let iframe = document.getElementById("lightwindow_iframe");
	console.log(iframe);
	let iframeDoc = iframe.contentWindow.document || iframe.contentWindow;
	console.log(iframeDoc);
	iframeDoc.addEventListener('keydown', function(theEvent) {
		iFrameKeyDownAction(theEvent);
	}, true);	
	
	let iframe2 = iframeDoc.getElementById("preview");
	let iframeDoc2 = iframe2.contentWindow.document || iframe2.contentWindow;
	console.log(iframe2);
	console.log(iframeDoc2);	
	iframeDoc2.addEventListener('keydown', function(theEvent) {
		iFrameKeyDownAction(theEvent);
	}, true);

	console.log('iFrameListener added');
}

/*
PURPOSE:
- add click event listener to the Save and Print button. Activates the lightwindow mutationObserver.
*/
const inputButton = document.getElementById("saveButton");
inputButton.addEventListener('click', function(theEvent){
	console.log('clicked Save and Print button');
	lightwindowIFrameMutationObserver();
});


/*
PURPOSE: Use MutationObserver to wait for the prescription lightwindow to be fully loaded. Once loaded, activate the prescription light window listener and disconnect the MutationObserver.

NOTES:
- had difficulty directly checking when the inner iframes were fully loaded. I tried waiting for the iframe to load, then attach a mutationObserver to that, but it didn't work. As a proxy, checked when lightwindow_loading changes its style attribute to 'display:none', as this coincides with the iframes being fully loaded.

*/
function lightwindowIFrameMutationObserver(){
	var mutationObserver = new MutationObserver(function(mutations) {

		// mutations.forEach(function(mutation) {
		// 	console.log(mutation);
		// });

		// console.log(mutations);
		if (!!document.getElementById("lightwindow_iframe")){
			let iframe = document.getElementById("lightwindow_iframe");
			let iframeDoc = iframe.contentWindow.document || iframe.contentWindow;	
			if (!!iframeDoc.getElementById("preview")){
				// let iframe2 = iframeDoc.getElementById("preview");
				// let iframeDoc2 = iframe2.contentWindow.document || iframe2.contentWindow;	
				// mutationObserver.disconnect();	
				if (document.getElementById("lightwindow_loading").getAttribute('style') == 'display: none;'){
					console.log('no more mutations');
					mutationObserver.disconnect();		
					prescriptionWindowListener();
				}
			}
		}
	});

	mutationObserver.observe(document.documentElement, {
	  attributes: true,
	  subtree: true,

	  // characterData: true,
	  // childList: true,
	  // attributeOldValue: true,
	  // characterDataOldValue: true
	});
}



function iFrameKeyDownAction(theEvent){
	console.log('hi10');
	let iframe3 = document.getElementById("lightwindow_iframe");
	console.log(iframe3);
	const theKey = theEvent.key;
	const theAltKey = theEvent.altKey;
	const theCtrlKey = theEvent.ctrlKey;
	const theShiftKey= theEvent.shiftKey;
	let iframe = document.getElementById("lightwindow_iframe");
	let iframeDoc = iframe.contentWindow.document || iframe.contentWindow;

	switch(true){
		case theAltKey && theKey == 1:
			console.log(iframeDoc);
			var theTarget = iframeDoc.evaluate("//input[@value='Print & Paste into EMR']",iframeDoc,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			console.log(theTarget);
			theTarget.click();
			rxPageLoaded = false;
			break;
		case theAltKey && theKey == 2:
			console.log(iframeDoc);
			var theTarget = iframeDoc.evaluate("//input[@value='Fax & Paste into EMR']",iframeDoc,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			theTarget.click();
			rxPageLoaded = false;
			break;	
	}

}


// function prescriptionWindowListener(){
// 	let iframe = document.getElementById("lightwindow_iframe");
// 	let iframeDoc = iframe.contentWindow.document || iframe.contentWindow;
// 	console.log('hihihi');
// 	console.log(iframeDoc);
// 	iframeDoc.addEventListener('keydown', function(theEvent) {
		
// 		console.log('hihi');
// 		var theTarget = iframeDoc.evaluate("//input[@value='Print & Paste into EMR']",iframeDoc,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
// 		console.log(theTarget);
// 		var theTarget2 = iframeDoc.evaluate("/html/body/div/table/tbody/tr[2]/td/table/tbody",iframeDoc,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
// 		// html/body/div/table/tbody/tr[2]/td/table/tbody/tr[1]/td[2]/table/tbody/tr[5]/td/span/input

// 		switch(true){
// 			case theAltKey && theKey == 3:
// 				var theTarget = document.evaluate("//input[@value='Print & Paste into EMR']",iframeDoc,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
// 				var theTarget2 = document.evaluate("/html/body/div/table/tbody/tr[2]/td/table/tbody",iframeDoc,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
// 				// html/body/div/table/tbody/tr[2]/td/table/tbody/tr[1]/td[2]/table/tbody/tr[5]/td/span/input
// 				console.log(theTarget2);
// 				theTarget.click();
// 				rxPageLoaded = false;
// 				break;
// 			case theAltKey && theKey == 2:
// 				var theTarget = document.evaluate("//input[@value='Fax & Paste into EMR']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
// 				theTarget.focus();
// 				rxPageLoaded = false;
// 				break;	
// 		}
// 	}, true);
// }




// window.addEventListener('load', function(theEvent) {
// 	window.scrollTo(0, 0);
// 	switch (true){
// 		case (ticklerPage1.test(currentURL) || ticklerPage2.test(currentURL)): //  Check if in in Billing confirmation page. 
// 			var theTarget = document.evaluate("//textarea",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
// 			theTarget.focus();
// 			break;
// 	}

// }, true);