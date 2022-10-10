# OSCAR-GreaseMonkey

A collection of my GreaseMonkey scripts for OSCAR EMR.

# How to install the GreaseMonkey scripts

Before installation, ensure the GreaseMonkey/Tampermonkey extension has been installed for Firefox/Chrome respectively.

**Installation:**

- Click the desired script on this GitHub page. 

- Click "Raw" 

- On the popup page, click Install

**Alternatively, to install manually:**

- Click the desired script on this GitHub page. 

- Manually highlight and copy the script's code.

- Click the GreaseMonkey icon in the Firefox toolbar (or Tampermonkey in Chrome)

- Click 'New user script'

- Paste the desired script's code and overwrite the pre-written code in the new script.

# Disclaimer

This collection of scripts has only been tested on one implementation of OSCAR EMR, in Classic view. Feel free to contact me here if you notice any bugs.

# What the scripts do

## BCBilling_KeyboardShortcuts

In the BC Billing page: Alt+1 to Continue, Alt+Q to input in person visit billing code, Alt+W to input telehealth visit billing code, Alt+A to set focus to Dx code. The above keyboard shortcuts will also scroll to the bottom of the page. 

In Diagnostic Code search: Alt+1 to Confirm, Escape to Cancel. 

In Billing confirmation page: Alt+1 to Save Bill. Alt+A to scroll to bottom of page.

## BCBilling_ScreenButtons

On the BC Billing page, buttons to automatically bill age-related codes and other common codes. 

## Consultations_KeyboardShortcuts

Within Consultations: Alt+1 to 'Submit Consultation Request'. Alt+W to close the window. Automatically pastes Past Medical history, Social history, and Family history to the Clinical information text area.

## EChart_Buttons

Various navigation buttons for e-chart screen (e.g. Lab req, Ultrasound req, X-ray req).  Set your own specific fid (form number ID) or Measurement groupName. Alt+Shift+Q,W,Z opens the eForms specified.

## EChart_eFormSearch

In the E-chart, a search box to search e-forms by title. Alt+Shift+A toggles focus between e-forms search box and the note text area.

## EChart_KeyboardShortcuts

Within the E-chart: Alt+1 to Sign/Save/Bill. Alt+2 to Save. Alt+3 to Sign/Save. Alt+4 to Exit. Alt+W, Alt+Q, Alt+A to open/close Consultation, eForms, Ticklers respectively. 

When the CPP pop-up windows are open (e.g. for Social History, Medical History, etc.), Alt+1 to Sign & Save, Escape to close the pop-up window.

## Inbox_KeyboardShortcuts

Within Inbox: Alt+1 to open first item. 

Within the Lab result: Alt+1 to Acknowledge and label labs with the actual names of each test (as opposed to cryptic labels like HAEM1, CHEM4, etc.). Alt+Q to open E-chart. Alt+W to open Tickler. Alt+Z to only label Labs without acknowleding.

Also, the label of the previous version of the lab result is shown.

## Medications_KeyboardShortcuts

Within Medications, Alt+1 to 'Save And Print', Alt+A to set focus to 'Drug Name' text area (to enter a new medication), Alt+Q to close the window. 

When the prescription print window pops up, Alt+1 to 'Print & Paste into EMR'. Alt+2 to 'Fax & Paste into EMR'. 

When closing the Medications page, a pop-up confirmation dialog will appear if there are medications pending submission.

## Schedule_KeyboardShortcuts

Within the Schedule page: Alt+1 opens the e-chart for the next patient. i.e. the first patient that is not Billed, not Signed, not No show, and not Cancelled.

## Tickler_KeyboardShortcuts

Within Ticklers, Alt+1 to 'Submit and EXIT', Alt+2 to 'Submit & Write to Encounter', Alt+A to set focus to text box. When the Tickler page loads, it also automatically sets focus to the text box. 

Note: if not already done, you should consider setting a 'Default Tickler Recipient' under OSCAR Preferences.