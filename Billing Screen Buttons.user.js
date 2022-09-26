// ==UserScript==
// @name Billing Screen Buttons
// @namespace   PMscripts
// @description  Buttons to automatically bill age-related codes and other common codes. 
// @include     *billing.do?billRegion=BC&billForm=*
// @include     *billing.do?billRegion=BC&changeBillForm=*
// @include     *billing.do?billRegion=BC&billForm=CFP&hotclick=*
// @include     *billing/CA/BC/CreateBilling*
// @include     *SaveBilling.do*
// @include     *billing/CA/BC/billingBC.jsp*
// @include     *CaseManagementEntry.do
// @exclude    *CaseManagementEntry.do?method=issuehistory&demographicNo*
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant       none
// @version 2.0 For contract FP - all docs + LTCI line
// ==/UserScript==

/*
tr = $('.serviceCodesTable').children();
tr.prepend("<tr><td colspan=3 id='extravvrow'></td></tr>");
*/

/* 3rd row */
tr = $('input[name=billing_1_fee]').parent().parent().parent().parent().parent().parent();
tr.prepend("<tr><td colspan=3 id='extravvrow1'></td></tr>");

/* 2nd row */
tr = $('input[name=billing_1_fee]').parent().parent().parent().parent().parent().parent();
tr.prepend("<tr><td colspan=3 id='extravvrow2'></td></tr>");

/* 1st row */
tr = $('input[name=billing_1_fee]').parent().parent().parent().parent().parent().parent();
tr.prepend("<tr><td colspan=3 id='extravvrow3'></td></tr>");


var input = document.createElement('input');
input.type = 'button';
input.value = 'Office';
input.onclick = inPersonVisit;
input.setAttribute('style', 'font-size:12px; font-weight: bold; background: #9999FF;');
input.setAttribute('title', 'ICBC or WSBC');

$("#extravvrow3").append(input);

var input = document.createElement('input');
input.type = 'button';
input.value = 'TH Visit';
input.onclick = virtualVisit;
input.setAttribute('style', 'font-size:12px; font-weight: bold; background: #9999FF;');
input.setAttribute('title', 'ICBC or WSBC');

$("#extravvrow3").append(input);

var input = document.createElement('input');
input.type = 'button';
input.value = 'TH Counsel';
input.onclick = virtualVisitCounselling;
input.setAttribute('style', 'font-size:12px; font-weight: bold; background: #9999FF;');
input.setAttribute('title', 'ICBC or WSBC');

$("#extravvrow3").append(input);

var input = document.createElement('input');
input.type = 'button';
input.value = '13005';
input.onclick = AlliedPhone;
input.setAttribute('style', 'font-size:12px; font-weight: bold; background: #9999FF;');
input.setAttribute('title', 'Phone, Fax');

$("#extravvrow3").append(input);

var input = document.createElement('input');
input.type = 'button';
input.value = '14077';
input.onclick = AlliedConf;
input.setAttribute('style', 'font-size:12px; font-weight: bold; background: #9999FF;');
input.setAttribute('title', 'Conf - need time');

$("#extravvrow3").append(input);
// var input = document.createElement('input');
// input.type = 'button';
// input.value = 'Flu';
// input.onclick = fluAlone;
// input.setAttribute('style', 'font-size:12px; font-weight:bold; background:#8FF;');
// input.setAttribute('title', 'Flu shot (child/adult) only');
// 
// $("#extravvrow2").append(input);

var input = document.createElement('input');
input.type = 'button';
input.value = 'INR';
input.onclick = INR;
input.setAttribute('style', 'font-size:12px; font-weight:bold; background:#8FF;');
input.setAttribute('title', 'INR');

$("#extravvrow2").append(input);

var input = document.createElement('input');
input.type = 'button';
input.value = 'IM inj';
input.onclick = Injection;
input.setAttribute('style', 'font-size:12px; font-weight:bold; background:#8FF;');
input.setAttribute('title', 'B12, etc; not allergy shot');

$("#extravvrow2").append(input);

var input = document.createElement('input');
input.type = 'button';
input.value = 'Allergy';
input.onclick = Allergy;
input.setAttribute('style', 'font-size:12px; font-weight:bold; background:#8FF;');
input.setAttribute('title', 'Allergy shot');

$("#extravvrow2").append(input);

var input = document.createElement('input');
input.type = 'button';
input.value = 'Pap';
input.onclick = Pap;
input.setAttribute('style', 'font-size:12px; font-weight:bold; background:#8FF;');
input.setAttribute('title', 'Pap');

$("#extravvrow2").append(input);

var input = document.createElement('input');
input.type = 'button';
input.value = 'UA';
input.onclick = Urinalysis;
input.setAttribute('style', 'font-size:12px; font-weight:bold; background:#8FF;');
input.setAttribute('title', 'Labs - UA, Preg test, UDS, etc');

$("#extravvrow2").append(input);

var input = document.createElement('input');
input.type = 'button';
input.value = 'Preg dip';
input.onclick = UrinePreg;
input.setAttribute('style', 'font-size:12px; font-weight:bold; background:#8FF;');
input.setAttribute('title', 'Labs - UA, Preg test, UDS, etc');


$("#extravvrow2").append(input);

var input = document.createElement('input');
input.type = 'button';
input.value = 'Cryo';
input.onclick = Cryo;
input.setAttribute('style', 'font-size:12px; font-weight:bold; background:#8FF;');
input.setAttribute('title', 'Cryo');

$("#extravvrow2").append(input);

var input = document.createElement('input');
input.type = 'button';
input.value = 'NH visit';
input.onclick = LTCI_visit;
input.setAttribute('style', 'font-size:12px; font-weight:bold; background:#8FF;');
input.setAttribute('title', 'Nursing Home visit');

$("#extravvrow1").append(input);

var input = document.createElement('input');
input.type = 'button';
input.value = 'NH bonus';
input.onclick = LTCI_visit1;
input.setAttribute('style', 'font-size:12px; font-weight:bold; background:#8FF;');
input.setAttribute('title', 'Nursing Home first visit bonus');

$("#extravvrow1").append(input);

var input = document.createElement('input');
input.type = 'button';
input.value = 'Pneumonia';
input.onclick = pneumoniaAlone;
input.setAttribute('style', 'font-size:12px; font-weight:bold; background:#8FF;');
input.setAttribute('title', 'PPV or Prevnar adult only');
var br = document.createElement('br');

$("#extravvrow1").append(input);

var input = document.createElement('input');
input.type = 'button';
input.value = 'CV19';
input.onclick = CV19_visit;
input.setAttribute('style', 'font-size:12px; font-weight:bold; background:#8FF;');
input.setAttribute('title', 'COVID 19 counselling');

$("#extravvrow1").append(input);
$("#extravvrow1").append(br);

//alert($('.serviceCodesTable').children().html());

function inPersonVisit(){
  age = $("#patientIdRow").children().children().next().next().next().html();
  if(age < 2)
    code="12100";
  else if(age >= 2 && age < 50)
    code="00100";
  else if(age >= 50 && age < 60)
    code="15300";
  else if(age >= 60 && age < 70)
    code="16100";
  else if(age >= 70 && age < 80)
    code="17100";
  else 
    code="18100";
  // $("input[name=billing_1_fee]").val(code);
  addServiceCodeRigid(code, "", "", "", "", "");
}

function virtualVisit(){
  age = $("#patientIdRow").children().children().next().next().next().html();
  if(age < 2)
    code="13237";
  else if(age >= 2 && age < 50)
    code="13437";
  else if(age >= 50 && age < 60)
    code="13537";
  else if(age >= 60 && age < 70)
    code="13637";
  else if(age >= 70 && age < 80)
    code="13737";
  else 
    code="13837";
  // $("input[name=billing_1_fee]").val(code);
  addServiceCodeRigid(code, "", "", "", "", "");
}

function virtualVisitCounselling(){
  age = $("#patientIdRow").children().children().next().next().next().html();
  if(age < 2)
    code="13238";
  else if(age >= 2 && age < 50)
    code="13438";
  else if(age >= 50 && age < 60)
    code="13538";
  else if(age >= 60 && age < 70)
    code="13638";
  else if(age >= 70 && age < 80)
    code="13738";
  else 
    code="13838";
  // $("input[name=billing_1_fee]").val(code);
  addServiceCodeRigid(code, "", "", "", "", "");
}

function AlliedPhone() {
	// code="13005";
	// $("input[name=billing_1_fee]").val(code);
	// $("input[name=billing_1_fee_dx1]").val("");
	addServiceCodeRigid("13005", "", "", "", "", "");
}

function fluAlone(){
  age = $("#patientIdRow").children().children().next().next().next().html();
  if(age < 19){
    code="10015";
 		$("input[name=billing_1_fee]").val(code);
    if(age < 2){
	    code="12100";
    }
    else{
      code="00100";
    }
 		$("input[name=billing_2_fee]").val(code);
  }
  else{
  code="00010";
  $("input[name=billing_1_fee]").val(code);
  }
  $("input[name=billing_1_fee_dx1]").val("v048");
}

function INR() {
	// code="00043";
	// $("input[name=billing_1_fee]").val(code);
	// $("input[name=billing_1_fee_dx1]").val("286");
	addServiceCodeRigid("00043", "286", "", "", "", "");
}

function Injection() {
	// code="00010";
	// $("input[name=billing_1_fee]").val(code);
	// $("input[name=billing_1_fee_dx1]").val("");
	addServiceCodeRigid("00010", "", "", "", "", "");
}

function Allergy() {
	// code="00034";
	// $("input[name=billing_1_fee]").val(code);
	// $("input[name=billing_1_fee_dx1]").val("32A");
	addServiceCodeRigid("00034", "32A", "", "", "", "");
}

function Pap() {
	addServiceCodeRigid("14560", "V723", "00044", "", "", "");
	// $("input[name=billing_1_fee]").val("14560");
	// $("input[name=billing_1_fee_dx1]").val("V723");
	// $("input[name=billing_2_fee]").val("00044");
	// $("input[name=billing_3_fee]").val("");
}

function Urinalysis() {
	svcCode="15130";
	// $("input[name=billing_1_fee]").val(code);
	// $("input[name=billing_1_fee_dx1]").val("");
	addServiceCode(svcCode,"")
}

function UrinePreg() {
	svcCode="15120";
	// $("input[name=billing_1_fee]").val(code);
	// $("input[name=billing_1_fee_dx1]").val("V22");
	addServiceCode(svcCode,"")
}

function Cryo() {
	addServiceCodeRigid("00190", "", "00044", "", "", "");
	// code="00190";
	// $("input[name=billing_1_fee]").val(code);
	// $("input[name=billing_1_fee_dx1]").val("");
	// $("input[name=billing_2_fee]").val("00044");
	// $("input[name=billing_3_fee]").val("");
}

function LTCI_visit(){
	// code="00114";
	// $("input[name=billing_1_fee]").val(code);
	addServiceCodeRigid("00114", "", "", "", "", "");
}

function LTCI_visit1(){
	// code="13334";
	// $("input[name=billing_2_fee]").val(code);
	addServiceCodeRigid("13334", "", "", "", "", "");
}

function pneumoniaAlone(){
	// code="10041";
	// $("input[name=billing_1_fee]").val(code);
	// $("input[name=billing_1_fee_dx1]").val("v038");
	addServiceCodeRigid("10041", "v038", "", "", "", "");
}

function CV19_visit(){
	// code="10045";
	// $("input[name=billing_1_fee]").val(code);
	// $("input[name=billing_1_fee_dx1]").val("C19");
	addServiceCodeRigid("10045", "C19", "", "", "", "");
}

function AlliedConf(){
	// code="14077";
	// $("input[name=billing_1_fee]").val(code);
	// $("input[name=billing_1_fee_dx1]").val("");
	addServiceCodeRigid("14077", "", "", "", "", "");
}

var billingRowCount = 3;
function addServiceCode(svcCode, dxCode) {
    
	for (var i = 1; i <= billingRowCount; i++) {
		inputtedBillingCode = jQuery("#billing_" + i + "_fee").val();
		if (inputtedBillingCode === "") {
		  jQuery("#billing_" + i + "_fee").val(svcCode);
		  jQuery("#billing_" + i + "_fee_dx1").val(dxCode);
		  // var trayCode =  getAssocCode(svcCode,trayAssocCodes);
		  // if(trayCode!=''){
			// addSvcCode(field, trayCode, true);
		  // }
		  
		  break;
		}
		else if (inputtedBillingCode == svcCode){ // if same service code already entered, clear current field.
			jQuery("#billing_" + i + "_fee").val("");
			break;  
		}
	}
}

function addServiceCodeRigid(svcCode1, dxCode1, svcCode2, dxCode2, svcCode3, dxCode3) {
	inputtedBillingCode1 = jQuery("#billing_1_fee").val();
	if(inputtedBillingCode1 == svcCode1){			// if same service code already entered, clear all fields.
		$("input[name=billing_1_fee]").val("");
		$("input[name=billing_1_fee_dx1]").val("");
		$("input[name=billing_2_fee]").val("");
		$("input[name=billing_2_fee_dx1]").val("");
		$("input[name=billing_3_fee]").val("");
		$("input[name=billing_3_fee_dx1]").val("");
	}
	else{
		$("input[name=billing_1_fee]").val(svcCode1);
		$("input[name=billing_1_fee_dx1]").val(dxCode1);
		$("input[name=billing_2_fee]").val(svcCode2);
		$("input[name=billing_2_fee_dx1]").val(dxCode2);
		$("input[name=billing_3_fee]").val(svcCode3);
		$("input[name=billing_3_fee_dx1]").val(dxCode3);
	}
}

  