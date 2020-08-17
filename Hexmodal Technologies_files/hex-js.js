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
    $('#popup-submit-button')[0].setAttribute( "onClick", "formSubmit('webinar');" );
    modal.modal('show');
  });
})

function formSubmit(type) {
  if (type == 'case-study') {
    // open the requested file
    window.open('https://portia.hexmodal.com/pilot-case-study.pdf')
  }
  // Hide the modal
  $('#exampleModal').modal('hide');
}
