var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;

  // Report to Google Analytics
  reportToGA();

  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("leadForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If there are radio options...
  if (x[currentTab].querySelectorAll('input[type="radio"]').length > 0) {
    // If none of them are selected...
    if (x[currentTab].querySelectorAll('input[type="radio"]:checked').length == 0) {
      // set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

function reportToGA() {
  x = document.getElementsByClassName("tab");
  switch(currentTab) {
    case 0:
      // facility type selection
      event_name = "facility-type-selected";
      selection_value = x[currentTab].querySelectorAll('input[type="radio"]:checked')[0].value;
      dataLayer.push({'event':event_name,'selectionValue':selection_value});
      break;
    case 1:
      event_name = "facility-type-selected";
      selection_value = x[currentTab].querySelectorAll('input[type="radio"]:checked')[0].value;
      dataLayer.push({'event':event_name,'selectionValue':selection_value});
      break;
    default:
      // This is the final one, so the form gets submitted anyhow, but lets record anyway just in case.
      event_name = "contact-info-given";
      name_value = x[currentTab].querySelectorAll('input[type="text"]')[0].value
      email_value = x[currentTab].querySelectorAll('input[type="email"]')[0].value
      dataLayer.push({'event':event_name,'nameValue':name_value, 'emailValue':email_value});
  }
}
