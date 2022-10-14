// ==UserScript==
// @name           AllergyAlert
// @namespace      oscar
// @include        */oscarRx/choosePatient.do*
// @include        */oscarRx/SearchDrug3.jsp*
// @include        */oscarRx/ShowAllergies2.jsp*
// @include        */oscarRx/showAllergy.do*
// @include        */oscarRx/deleteAllergy.do*
// @include        */oscarRx/addReaction2.do*
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
/*
- alert user if allergies haven't yet been set.
*/
if(medicationPage1.test(currentURL) || medicationPage2.test(currentURL)){
	console.log('hi');
	window.addEventListener('load', function(){
	
		let allergyEntry = document.evaluate("/html/body/table/tbody/tr[2]/td[1]/div/p[3]/a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
		let addAllergy = document.evaluate("/html/body/table/tbody/tr[2]/td[1]/div/p[1]/a",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
		
		// check if any allergy entries exist.
		if (allergyEntry == null){
			if (confirm("Allergies haven't been set yet.\nPress Ok to Add Allergy. Cancel to continue.")){
				addAllergy.click();
			}

			// alert("WARNING: Allergies haven't been set yet.")
		}
	}, true);
}



if(addAllergyPage1.test(currentURL) || addAllergyPage2.test(currentURL) || addAllergyPage3.test(currentURL)) {
	(async () => {		
		let haveClickedAutoNKDA = await GM.getValue('clickedAutoNKDA', 'test');
		console.log('haveClickedAutoNKDA: ' + haveClickedAutoNKDA);
		if (haveClickedAutoNKDA){
			let backToMedications = document.evaluate("//input[@value='Back to Search Drug']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			backToMedications.click();
		}

	})();
	GM.setValue('clickedAutoNKDA', false);
	addButtonNKDA();	
}
/* 
- add a NKDA button that automatically
*/ 
function addButtonNKDA(){
	let allergySearchBox = document.evaluate("//form[@name='RxSearchAllergyForm']/table",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	
	console.log(allergySearchBox);
	let targetDiv = allergySearchBox;

	var inputButton = document.createElement('input');
	inputButton.id = 'autoNKDAButton';
	inputButton.type = 'button';
	inputButton.value = 'Auto NKDA';
	targetDiv.appendChild(inputButton);	
	addButtonNKDAListener();
}
 
function addButtonNKDAListener(){
	let defaultNKDAButton = document.evaluate("//form[@name='RxSearchAllergyForm']/table[1]/tbody/tr[3]/td/input[4]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
  var theButton = document.getElementById('autoNKDAButton');
  theButton.addEventListener('click',function () { 
  	defaultNKDAButton.click();
  	GM.setValue('clickedAutoNKDA', true);
  },true);
}

(async () => {	
	if(addReactionPage.test(currentURL)) {
		let haveClickedNKDA = await GM.getValue('clickedAutoNKDA', 'test');
		if (haveClickedNKDA){
			let addReactionButton = document.evaluate("//input[@value='Add Allergy/Adverse Reaction']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			addReactionButton.click();
		}
	}
})();

