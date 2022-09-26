// ==UserScript==
// @name           Schedule_KeyboardShortcuts
// @namespace      oscar
// @include        */provider/providercontrol.jsp?* 
// @include        *provider/appointmentprovideradminday.jsp* 
// @description		Within the Schedule page: Alt + U gets the next patient.
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant       none
// ==/UserScript==

// filter out title: "No Show", "signed"

window.addEventListener('keydown', function(theEvent) {
	var theKey = theEvent.key;    
    var theAltKey = theEvent.altKey;
    var theCtrlKey = theEvent.ctrlKey;
    var theShiftKey= theEvent.shiftKey;
    switch(true){
        case theAltKey && theKey == '1':
		// gets filtered td element where the icon image doesn't contain "cancel" or "noshow". billed items are filtered out as well because the billing image is not located in the structure td/a/img. the XPATH then goes on to select the Encounter node.
			const xpath = 'id("providerSchedule")/tbody//td[a[img[not(contains(string(@src),"cancel")) and not(contains(string(@src),"noshow"))]]]/a[@title="Encounter"]';
			var theTarget = document.evaluate(xpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE ,null).singleNodeValue;            theTarget.click();
            break;
    }
}, true);

// function findFirstPendingAppt(allAppts){
		// // console.log(allAppts);
	// // let keylabresultlist = "";	
	// // let index = 0;
	// // console.log(allAppts);
	// allAppts.forEach(	
		// function(e){	
			// // console.log('hi2');
			// // 
			// // console.log(e.childNodes[4]);
			// console.log(e.children[2].children[0]);
			
		// }
	// )
	
	// return keylabresultlist;
// }