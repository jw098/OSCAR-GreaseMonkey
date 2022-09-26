// ==UserScript==
// @name           Schedule_KeyboardShortcuts
// @namespace      oscar
// @include        */provider/providercontrol.jsp?* 
// @include        *provider/appointmentprovideradminday.jsp* 
// @description		Within the Schedule page: Alt + U gets the next patient.
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant       none
// ==/UserScript==

// var thetarget = document.evaluate('id("providerschedule")/tbody//td[a[img[not(contains(string(@src),"cancel")) and not(contains(string(@src),"noshow"))]]]',document,null,xpathresult.first_ordered_node_type,null).singlenodevalue;

// thelinks=thetarget.getelementsbytagname('a');

window.addEventListener('keydown', function(theEvent) {
	var theKey = theEvent.key;    
    var theAltKey = theEvent.altKey;
    var theCtrlKey = theEvent.ctrlKey;
    var theShiftKey= theEvent.shiftKey;
    switch(true){
        case theAltKey && theKey == 'z':
			// console.log('hi')
			// const allAppts = document.querySelectorAll('#providerSchedule > tbody:nth-child(1) > tr > td:nth-child(3) > ');
			// // console.log(allAppts);
			// let firstPendingAppt = findFirstPendingAppt(allAppts);
			
			
			
			console.log('hi');
			// var theTarget = document.evaluate('id("providerSchedule")/tbody//td[a[img[not(contains(string(@src),"cancel")) and not(contains(string(@src),"noshow"))]]]',document,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE ,null);
			var theTarget = document.evaluate('id("providerSchedule")/tbody//td[a[img[not(contains(string(@src),"cancel")) and not(contains(string(@src),"noshow"))]]]/a[@title="Encounter"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE ,null).singleNodeValue;
					
			console.log(theTarget);
			// console.log(theTarget.iterateNext());
			// console.log(theTarget.iterateNext());
			// console.log(theTarget.iterateNext());
            // var theTargetLink = document.evaluate('.//a[contains(.,"|") and contains(.,"E")]',theTarget,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			
			// // console.log(theTargetLink);
            // theTargetLink.click();
            break;
        /*
        case theAltKey && theCtrlKey && theShiftKey && theKey=='':
            //TO DO: The action to be performed for the above keyboard shortcut
            break;#providerSchedule > tbody:nth-child(1) > tr:nth-child(50)
        */
		
		//'id("providerSchedule")/tbody//td[a[img[not(contains(string(@src),"cancel")) and not(contains(string(@src),"noshow"))]]]'
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