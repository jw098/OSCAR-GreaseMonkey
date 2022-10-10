// ==UserScript==
// @name        EChart_eFormSearch
// @namespace   Stanscript
// @include    *efmformslistadd.jsp*
// @include     */casemgmt/forward.jsp?action=view&demographic*
// @description In the E-chart, a search box to search e-forms by title. Alt+Shift+A toggles focus between e-forms search box and the note text area.
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version     15.0
// @grant       none
// ==/UserScript==





var params = {}; //Get Params
if (location.search) {
    var parts = location.search.substring(1).split('&');
    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;``
        params[nv[0]] = nv[1] || true;
    }
}
//alert(params.demographicNo)

var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/')
var newURL = vPath + "/eform/efmformslistadd.jsp?group_view=&demographic_no=" + params.demographicNo + "&parentAjaxId=eforms"
//alert(newURL)	
//window.open(newURL)

$(document).ready(function() {
    //$('#enTemplate').width("250px"); //widens search field
    var searchbar = "<input id='referral_name' style ='background-color: white; color:green;' list='CP' name='referral_name' placeholder='eForm name (or partial name)' type='text'><datalist id='CP'></datalist>"
    $('#cppBoxes').append(searchbar) //append to top row
    //$('#toolbar').prepend(searchbar) //append to bottom row
    $('#referral_name').width("202px")

    $("#referral_name").change(function() {
//         alert(this.text)
    });

  	// https://stackoverflow.com/a/64392933
    document.getElementById("referral_name").addEventListener("input", function(event){
        if(event.inputType == "insertReplacementText" || event.inputType == null) {
          window.open(vPath + "eform/" + $(this).val())
          $(this).val("")
          this.focus()
        }
    })


//     $("#referral_name").select(function() {
//         $('#cppBoxes').focus()
//         //alert($(this).val())
//         window.open(vPath + "eform/" + $(this).val())
//         /*  
//         var parser = new DOMParser();
//         var htmlDoc = parser.parseFromString($(this).val(), 'text/html');  //get the text
//         //alert($(htmlDoc).text())  
//         $(this).val($(htmlDoc).text().trim())
//         */
//         $(this).val("")
//         this.focus()
//     });

    window.addEventListener("keydown", function(theEvent){
        const theKey = theEvent.key;
        const theAltKey = theEvent.altKey;
        const theCtrlKey = theEvent.ctrlKey;
        const theShiftKey= theEvent.shiftKey;
        switch(true){
            case theShiftKey && theAltKey && theKey == "A":
                if(document.activeElement == document.getElementById("caseNote_note0")){
                    document.getElementById("referral_name").focus();
                }
                else{
                    document.getElementById("caseNote_note0").focus();
                }
                break;
            }
    }, false);



    function getMeasures(measure) {
        xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                // gets all the text on the page specificed by newURL below (e.g. the eForm library page)
                var str = xmlhttp.responseText;   
                if (!str) { 
                    return;
                }

                // regular expression to get the elements that surround each eForm name in the eForm library.
                var myRe = /<td width="30%" style="padding-left: 7px">\n\s*<.*\n\s*.*\n\s*.*/g;

                // regular expression to extract the URL for each eForm in the library.
                var myRe2 = /efmformadd.*&appointment/g; //for onclickvalue
                var myArray;
                var myArray2
                var i = 0;

                //regex gets the next eForm name on the library page.
                while ((myArray = myRe.exec(str)) !== null) {                    
                    // regex gets the next eForm URL on the library page.
                    myArray2 = myRe2.exec(str);

                    /*
                    - myArray.toString() is HTML text that surrounds the form name.
                    - $() converts it into an HTML element. 
                    - .text() gets its inner text, which is the eForm name.
                    */
                    y = $(myArray.toString()).text();

                    // the eForm URL.
                    z = myArray2.toString()+ "=&parentAjaxId=eforms";

                    var cpvalue = y;
                    var cptext = z;

                    // adds the eForm name and URL to the CPP element in the HTML.
                    $('#CP').append($("<option>").attr('value', cptext).text(cpvalue));
                    i = i + 1;
                }
            }
        }
        xmlhttp.open("GET", newURL, false);  // newURL is the URL for the eForm library page.
        xmlhttp.send();
    }
    getMeasures();
});

/*
//*********Parse Table*************
var formFields = []
function myFunction() {
    var formTable = $('table .elements')
    formTable.attr('id', 'formTable');

    var tableRows = $('#formTable tr').length;
    var tableLength = document.getElementById("formTable").rows.length;
    var cellsLength = document.getElementById("formTable").rows[1].cells.length;
    //alert(tableLength)

    for (i = 1; i < tableLength; i++) {
        var firstcell = document.getElementById("formTable").rows[i].cells[0].innerHTML
        //alert(firstcell)
        if (firstcell) {
            formFields[i] = new Array(0)
            var firstcell = document.getElementById("formTable").rows[i].cells[0].innerHTML
            var y = document.getElementById("formTable").rows[i].cells[0].innerHTML
            var z = $(document.getElementById("formTable").rows[i].cells[0]).text()
            alert(y)
            alert(z)
            formFields[i] = y
        }
    }

    //alert(formFields.length)
    for (i = 1; i < formFields.length; i++) {
        //alert(formFields[i])
        var cpvalue = formFields[i]
        var cptext = $(formFields[i]).text()
        alert(cpvalue)
        alert(cptext)
        //$('#CP').append($("<option>").attr('value', cptext).text(cpvalue));
    }
    //alert(headers)
}
myFunction()
*/
