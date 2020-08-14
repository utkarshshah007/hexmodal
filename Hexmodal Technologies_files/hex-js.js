$(function(){
  $('#case-study-link').click(function(e){
    e.preventDefault();
    var modal = $('#exampleModal');
    modal.find('#exampleModalLabel').text('Sign Up To Access The Case Study!');
    $('#popup-submit-button')[0].setAttribute( "onClick", "formSubmit('case-study');" );
    modal.modal('show');
  });
  $('#webinar-link').click(function(e){
    e.preventDefault();
    var modal = $('#exampleModal');
    modal.find('#exampleModalLabel').text('Sign Up For The Webinar!');
    modal.modal('show');
  });
})

function formSubmit(type) {
  // if it's a standard form... :
  if (type == '#') {
    //...the form gets submitted as usual:
    document.getElementById("leadForm").submit();
    //return false;
  } else if (type == 'case-study') {
    //...the form gets submitted by ajax:
    $.ajax({
      url: "https://formspree.io/sales@hexmodal.com",
      method: "POST",
      data: {full_name: $('#full_name').value, email: $('#email').value},
      dataType: "json"
    });
    // and the user gets redirected to the requested file
    document.location.href="https://portia.hexmodal.com/pilot-case-study.pdf"
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}
