// ==UserScript==
// @name           Allergy_QuickAdd
// @namespace      oscar
// @include        */oscarRx/choosePatient.do*
// @include        */oscarRx/SearchDrug3.jsp*
// @include        */oscarRx/ShowAllergies2.jsp*
// @include        */oscarRx/showAllergy.do*
// @include        */oscarRx/deleteAllergy.do*
// @include        */oscarRx/addReaction2.do*
// @include        *uptodate.com*

// @description		Alert the user if Allergies haven't yet been set. On add Allergy page, inserted an Auto NKDA button, which automatically adds NKDA to the allergy list.

// @grant						GM.setValue
// @grant						GM.getValue
// @grant						GM.deleteValue
// ==/UserScript==


let addReactionPage = /oscarRx\/addReaction2\.do/;

let addAllergyPage1 = /oscarRx\/ShowAllergies2\.jsp/;
let addAllergyPage2 = /oscarRx\/deleteAllergy\.do/;
let addAllergyPage3 = /oscarRx\/showAllergy\.do/;

let medicationPage1 = /oscarRx\/choosePatient\.do/;
let medicationPage2 = /oscarRx\/SearchDrug3\.jsp/;

let currentURL = window.location.href;
// /*
// - alert user if allergies haven't yet been set.
// */
// if(medicationPage1.test(currentURL) || medicationPage2.test(currentURL)){
// 	console.log('hi');
// 	window.addEventListener('load', function(){
	
// 		let allergyEntry = document.evaluate("/html/body/table/tbody/tr[2]/td[1]/div/p[3]/a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
// 		let addAllergy = document.evaluate("/html/body/table/tbody/tr[2]/td[1]/div/p[1]/a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
		
// 		// check if any allergy entries exist.
// 		if (allergyEntry == null){
// 			if (confirm("Allergies haven't been set yet.\nPress Ok to Add Allergy. Cancel to continue.")){
// 				addAllergy.click();
// 			}

// 			// alert("WARNING: Allergies haven't been set yet.")
// 		}
// 	}, true);
// }


// chain of events: Med -> Add Allergy -> Add Reaction -> Add Allergy -> Med. 0 -> 1 -> 2 -> 3 -> 4

switch(true){
	case medicationPage1.test(currentURL) || medicationPage2.test(currentURL):  // medication page
		GM.setValue('nextPage', 'stop');
		addButtonNKDA_FromMedPage();
		break;
	case addAllergyPage1.test(currentURL) || addAllergyPage2.test(currentURL) || addAllergyPage3.test(currentURL):  // add allergy page
		(async () => {		
			let nextPage = await GM.getValue('nextPage', 'test');
			console.log('nextPage: ' + nextPage);
			switch (nextPage){
				case 'toAddReactionThenAddAllergyThenMedsThenStop':  // from Med. going to Add Reaction
					fromAddAllergyToAddReaction();
					GM.setValue('nextPage', 'toAddAllergyThenMedsThenStop');			
					break;
				case 'toMedsThenStop': // from Add Reaction. going to Med.
					fromAddAllergyToMedications();
					GM.setValue('nextPage', 'stop');
					break;
				default:
					addButtonNKDA_FromAddAllergy();			
			}

		})();
		break;
	case addReactionPage.test(currentURL):  // add reaction page
		(async () => {	
			let nextPage = await GM.getValue('nextPage', 'test');
			switch (nextPage){
				case 'toAddAllergyThenMedsThenStop':
					fromAddReactiontoAddAllergy();
					GM.setValue('nextPage', 'toMedsThenStop');
					break;
			}
			
		})();
		break;

}

/*
NOTE:
- assumes the current page is the Add Allergy Page.
*/
function  fromAddAllergyToAddReaction(){
	let defaultNKDAButton = document.evaluate("//form[@name='RxSearchAllergyForm']/table[1]/tbody/tr[3]/td/input[4]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	defaultNKDAButton.click();
}

/*
NOTE:
- assumes the current page is the Add Allergy Page.
*/
function  fromAddAllergyToMedications(){
	let backToMedications = document.evaluate("//input[@value='Back to Search Drug']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	backToMedications.click();
	
}


/*
NOTE:
- assumes the current page is the Add Reaction Page.
*/
function fromAddReactiontoAddAllergy(){
	let addReactionButton = document.evaluate("//input[@value='Add Allergy/Adverse Reaction']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	addReactionButton.click();
	
}

/* 
- add a NKDA button that automatically
*/ 
function addButtonNKDA_FromMedPage(){
	let activeAllergies = document.evaluate("//div[@class='PropSheetMenu']/p[1]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	
	console.log(activeAllergies);
	let targetDiv = activeAllergies;

	var inputButton = document.createElement('input');
	inputButton.id = 'autoNKDAButton';
	inputButton.type = 'button';
	inputButton.value = 'Auto NKDA';
	targetDiv.before(inputButton);	
	addButtonNKDAListener_FromMedPage(inputButton);
}

function addButtonNKDAListener_FromMedPage(inputButton){
	
	var theButton = document.getElementById('autoNKDAButton');
	theButton.addEventListener('click', function () { 
  		fromMedsToAddAllergy();
  		GM.setValue('nextPage', 'toAddReactionThenAddAllergyThenMedsThenStop');
  	},true);
}

/*
note:
- assumes current page is Medications
*/
function fromMedsToAddAllergy(){
	let addAllergyButton = document.evaluate("//div[@class='PropSheetMenu']/p[1]/a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	addAllergyButton.click();
}


/* 
- add a NKDA button that automatically
*/ 
function addButtonNKDA_FromAddAllergy(){
	let activeAllergies = document.evaluate("//div[@class='PropSheetMenu']/p[1]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	
	console.log(activeAllergies);
	let targetDiv = activeAllergies;

	var inputButton = document.createElement('input');
	inputButton.id = 'autoNKDAButton';
	inputButton.type = 'button';
	inputButton.value = 'Auto NKDA';
	targetDiv.before(inputButton);	
	addButtonNKDAListener_FromAddAllergy();
}

 
function addButtonNKDAListener_FromAddAllergy(){
	var theButton = document.getElementById('autoNKDAButton');
	theButton.addEventListener('click', function () { 
		fromAddAllergyToAddReaction();
  		GM.setValue('nextPage', 'toAddAllergyThenMedsThenStop');
  	},true);
}



//////////////////////////////////////////////////////////////////////////////////////
// Jquery UI

// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js


// @require 				http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @require 				http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js

// jQuery.noConflict( true );
// var jQuery_2_1_1 = $.noConflict(true);

// $("head").append (
//     '<link '
//   + 'href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/themes/le-frog/jquery-ui.min.css" '
//   + 'rel="stylesheet" type="text/css">'
// );

// console.log($( "#AutoNumber1" ));

// jQuery_2_1_1( "#appContainer" ).dialog({
//   resizable: false,
//   height: "auto",
//   width: 400,
//   modal: true,
//   buttons: {
//     "Delete all items": function() {
//       $( this ).dialog( "close" );
//     },
//     Cancel: function() {
//       $( this ).dialog( "close" );
//     }
//   }
// });

// $( function() {
// $( "#appContainer" ).dialog({
//   resizable: false,
//   height: "auto",
//   width: 400,
//   modal: true,
//   buttons: {
//     "Delete all items": function() {
//       $( this ).dialog( "close" );
//     },
//     Cancel: function() {
//       $( this ).dialog( "close" );
//     }
//   }
// });
// } );

// $( "#AutoNumber1" ).dialog({
//   resizable: false,
//   height: "auto",
//   width: 400,
//   modal: true,
//   buttons: {
//     "Delete all items": function() {
//       $( this ).dialog( "close" );
//     },
//     Cancel: function() {
//       $( this ).dialog( "close" );
//     }
//   }
// });

// jQuery_2_1_1( "#AutoNumber1" ).dialog({
//   resizable: false,
//   height: "auto",
//   width: 400,
//   modal: true,
//   buttons: {
//     "Delete all items": function() {
//       jQuery_2_1_1( this ).dialog( "close" );
//     },
//     Cancel: function() {
//       jQuery_2_1_1( this ).dialog( "close" );
//     }
//   }
// });


// jQuery_2_1_1( function() {
// jQuery_2_1_1( "#AutoNumber1" ).dialog({
//   resizable: false,
//   height: "auto",
//   width: 400,
//   modal: true,
//   buttons: {
//     "Delete all items": function() {
//       jQuery_2_1_1( this ).dialog( "close" );
//     },
//     Cancel: function() {
//       jQuery_2_1_1( this ).dialog( "close" );
//     }
//   }
// });
// } );