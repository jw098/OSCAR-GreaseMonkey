// ==UserScript==
// @name           LabLabler
// @namespace      oscar
// @include        */lab/CA/ALL/labDisplay*
// @include        */dms/inboxManage*
// @include        */dms/showDocument*
// @description		In the Lab result, Alt+Z to automatically label the lab result without acknowledging the result. It is labeled with the actual names of each test (as opposed to cryptic labels like HAEM1, CHEM4, etc.)
// @grant	   none
// ==/UserScript==

// created by Darius Opensource

// don't set label if REFER1

document.addEventListener('keydown', function(theEvent) {
	var theKey = theEvent.key;
	var theAltKey = theEvent.altKey;
	var theCtrlKey = theEvent.ctrlKey;
	var theShiftKey= theEvent.shiftKey;
	switch(true){	
		case (theAltKey && theKey == 'z'):  // for testing
// 			console.log('hi');
			labelLabs();	
			break;      
	}
}, true);




function labelLabs(){

	// Gets all lab results from the XML, which are either in table/tbody/tr/td[1]/a[1] or table/tbody/tr/td[1]/span
	const allLabResults = document.querySelectorAll('table[name="tblDiscs"]>tbody>tr>td:first-child>:is(a:first-child, span)');
	let keyLabResults = extractKeyLabResults(allLabResults);
	$("input[id*=acklabel]").val(keyLabResults);
	$("button[id*=createLabel]").click()
	console.log(keyLabResults);
	
	showKeyLabResultsTextBox(keyLabResults);

}

// Show the key lab results in a button in the bottom right screen
function showKeyLabResultsTextBox(keyLabResults){
	let labResultsTextBox = document.createElement("input");
	labResultsTextBox.type="button";
	labResultsTextBox.value=keyLabResults;

	labResultsTextBox.setAttribute("style", "font-size:10px; position:fixed; bottom:10px; right:10px; cursor:pointer; background-color: #F2EFFB; ");
	document.body.appendChild(labResultsTextBox); 
}

function extractKeyLabResults(allLabResults){
	// console.log(allLabResults);
	let keyLabResultList = "";	
	let index = 0;
	allLabResults.forEach(	
		function(e){			
			if (!isSubResult(e)){  // add all non sub-results. i.e. add all key results.
				let labTitle = renameLabResult(e.textContent);  // join to convert array to string.
				if(keyLabResultList != "" && labTitle != ""){
					labTitle = "/" + labTitle;
				}				
				keyLabResultList += labTitle;
				// console.log(e);
// 				console.log(e.parentNode.childNodes);
	// 			console.log(e.parentNode.outerHTML);
			}
			index++
		}
	)
	
	return keyLabResultList;
}

// Purpose: checks if the Lab result is a sub-result. e.g. WBC, RBC are sub results to Hematology Panel (CBC).
// Implementation: Sub-results in OSCAR are indented with three non-breaking spaces.
// The whitespace is located just prior to the element of interest. So, we get the parentNode, and the first childNode contains the whitespace.
function isSubResult(e){
	const threeNonBreakingSpaces = "\xA0" + " " + "\xA0"+ " " + "\xA0";
	return e.parentNode.childNodes[0].nodeValue == threeNonBreakingSpaces;	
}


function renameLabResult(strOldName){
	let strNewName = strOldName;
	// console.log(strOldName);
	switch(strOldName)
	{
		case 'Hematology Panel':
			strNewName='CBC';
			break;
		case 'Vitamin B12':
			strNewName='B12';
			break;
		case 'Ferritin':
			strNewName='Fe';
			break;			
		case 'Hemoglobin A1c':
			strNewName='A1c';
			break;	
		case 'Creatinine/eGFR':
			strNewName='Cr';
			break;	
		case 'Alanine Aminotransferase':
			strNewName='ALT';
			break;	
		case 'Lipids':
			strNewName='Lipids';
			break;	
		case 'Urine Creatinine Random':
			strNewName='';
			break;	
		case 'Urine Albumin Random':
			strNewName='ACR';
			break;	
		case 'TSH':
			strNewName='TSH';
			break;	
		case 'Iron / TIBC':
			strNewName='Iron';
			break;	
		case 'Total Protein':
			strNewName='Protein';
			break;	
		case 'Total Bilirubin':
			strNewName='Bili';
			break;	
		case 'Alkaline Phosphatase':
			strNewName='ALP';
			break;
		case 'Gamma GT':
			strNewName='GGT';
			break;
		case 'Estradiol':
			strNewName='Estr';
			break;
		case 'C Reactive Protein':
			strNewName='CRP';
			break;
		case '25-Hydroxyvitamin D':
			strNewName='VitD';
			break;
		case 'Electrolytes':
			strNewName='lytes';
			break;
		case 'Albumin':
			strNewName='Alb';
			break;
		case 'T4 Free':
			strNewName='fT4';
			break;
		case 'T3 Free':
			strNewName='fT3';
			break;
		case 'Urine Culture':
			strNewName='UrineCultr';
			break;
		case 'Genital Culture':
			strNewName='GenitalCultr';
			break;
		case 'Throat Culture':
			strNewName='ThroatCultr';
			break;
		case 'Stool Culture':
			strNewName='StoolCultr';
			break;	
		case 'Hepatitis A':
			strNewName='HepA';
			break;			
		case 'Hepatitis B':
			strNewName='HepB';
			break;
		case 'Hepatitis C':
			strNewName='HepC';
			break;
		case 'Urine Chemistry/Micro':
			strNewName='UA';
			break;
		case 'Calcium':
			strNewName='Ca';
			break;
		case 'Phosphate':
			strNewName='Phos';
			break;			
		case 'Magnesium':
			strNewName='Mg';
			break;
		case 'Nuclear Ab Titre':
			strNewName='ANA';
			break;	
		case 'Rheumatoid Factor':
			strNewName='RF';
			break;
		case 'HCG Serum':
			strNewName='bHCG';
			break;	
		case 'Interpretation Hematology':
			strNewName='HemePath Comment';
			break;
		case 'Occult Blood Fecal':
			strNewName='FIT';
			break;	
		case 'B Natriuretic Peptide':
			strNewName='BNP';
			break;
		case 'Troponin':
			strNewName='Trop';
			break;	
		case '':
			strNewName='';
			break;
		case '':
			strNewName='';
			break;				
		default:
			return renameLabResultInexactMatch(strOldName);
			break;
	}
	return strNewName;
}

function renameLabResultInexactMatch(strOldName){
	let strNewName = strOldName;
	// let strOldName = strOldName.toLowerCase();
	// console.log(strOldName);
	switch(true)
	{
		case strOldName.includes('Helicobacter'):
			strNewName='H.Pylori';
			break;
		case strOldName.includes('Follicle Stimulating Hormone'):
			strNewName='FSH';
			break;
		case strOldName.includes('Luteinizing Hormone'):
			strNewName='LH';
			break;
		case strOldName.includes('Vagina'):
			strNewName='VagSwab';
			break;
		case strOldName.includes('difficile') || strOldName.includes('Difficile'):
			strNewName='C.Diff';
			break;		
		case strOldName.includes('Ova and Parasite'):
			strNewName='O&P';
			break;	
		case strOldName.includes('Chlamydia'):
			strNewName='CT&GC';
			break;				
		case strOldName.includes('HIV'):
			strNewName='HIV';
			break;					
		case strOldName.includes('Syphilis'):
			strNewName='Syphilis';
			break;	
		case strOldName.includes('Hepatitis C'):
			strNewName='HepC';
			break;		
		case strOldName.includes('Rubella'):
			strNewName='Rubella';
			break;	
		case strOldName.includes('Glucose'):
			strNewName='Gluc';
			break;		
		case strOldName.includes('Trichomonas'):
			strNewName='Trich';
			break;	
		case strOldName.includes('Transglutaminase'):
			strNewName='anti-TTG';
			break;	
		case strOldName.includes('Herpes'):
			strNewName='HSV';
			break;	
		case strOldName.includes('genitalium'):
			strNewName='M.Genitalium';
			break;	
		case strOldName.includes('Parathyroid'):
			strNewName='PTH';
			break;
		case strOldName.includes('Trichomonas'):
			strNewName='Trich';
			break;
		case strOldName.includes('Trichomonas'):
			strNewName='Trich';
			break;
		case strOldName.includes('Trichomonas'):
			strNewName='Trich';
			break;
		case strOldName.includes('Trichomonas'):
			strNewName='Trich';
			break;
		case strOldName.includes('Trichomonas'):
			strNewName='Trich';
			break;
		case strOldName.includes('Trichomonas'):
			strNewName='Trich';
			break;			
		default:
			break;
	}
	return strNewName;
}

/*
CBC 			/html/body/div/form[3]/table/tbody/tr/td/table[6]/tbody/tr[2]/td[1]/span
b12				/html/body/div/form[3]/table/tbody/tr/td/table[8]/tbody/tr[2]/td[1]/a[1]
				/html/body/div/form[3]/table/tbody/tr/td/table[8]/tbody/tr[4]/td[1]/a[1]
				/html/body/div/form[3]/table/tbody/tr/td/table[10]/tbody/tr[4]/td[1]/span
				/html/body/div/form[3]/table/tbody/tr/td/table[10]/tbody/tr[8]/td[1]/a[1]
				/html/body/div/form[3]/table/tbody/tr/td/table[10]/tbody/tr[9]/td[1]/a[1]
				/html/body/div/form[3]/table/tbody/tr/td/table[12]/tbody/tr[2]/td[1]/span
				/html/body/div/form[3]/table/tbody/tr/td/table[14]/tbody/tr[2]/td[1]/span
				/html/body/div/form[3]/table/tbody/tr/td/table[16]/tbody/tr[2]/td[1]/a[1]
				/html/body/div/form[3]/table/tbody/tr/td/table[18]/tbody/tr[2]/td[1]/span
				/html/body/div/form[3]/table/tbody/tr/td/table[20]/tbody/tr[2]/td[1]/a[1]
				/html/body/div/form[3]/table/tbody/tr/td/table[4]/tbody/tr[2]/td[1]/a
				/html/body/div/form[3]/table/tbody/tr/td/table[4]/tbody/tr[2]/td[1]/span
				/html/body/div/form[3]/table/tbody/tr/td/table[4]/tbody/tr[2]/td[1]/span
				/html/body/div/form[3]/table/tbody/tr/td/table[6]/tbody/tr[2]/td[1]/span
				/html/body/div/form[3]/table/tbody/tr/td/table[6]/tbody/tr[2]/td[1]/a
				/html/body/div/form[3]/table/tbody/tr/td/table[8]/tbody/tr[2]/td[1]/span
				/html/body/div/form[3]/table/tbody/tr/td/table[4]/tbody/tr[2]/td[1]/span
				/html/body/div/form[3]/table/tbody/tr/td/table[4]/tbody/tr[2]/td[1]/a[1]
				/html/body/div/form[3]/table/tbody/tr/td/table[4]/tbody/tr[3]/td[1]/a
				/html/body/div/form[3]/table/tbody/tr/td/table[6]/tbody/tr[2]/td[1]/span
				/html/body/div/form[3]/table/tbody/tr/td/table[18]/tbody/tr[2]/td[1]/a
hiv pending		/html/body/div/form[3]/table/tbody/tr/td/table[8]/tbody/tr[2]/td[1]
tet pending		/html/body/div/form[3]/table/tbody/tr/td/table[6]/tbody/tr[2]/td[1]
a1c:			/html/body/div/form[3]/table/tbody/tr/td/table[8]/tbody/tr[2]/td[1]/a[1]
cr: 			/html/body/div/form[3]/table/tbody/tr/td/table[8]/tbody/tr[4]/td[1]/span
lipid:			/html/body/div/form[3]/table/tbody/tr/td/table[10]/tbody/tr[2]/td[1]/span
ACR:			/html/body/div/form[3]/table/tbody/tr/td/table[12]/tbody/tr[5]/td[1]/span
*/