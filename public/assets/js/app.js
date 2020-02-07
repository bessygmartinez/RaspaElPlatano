$(document).ready(function(){

    $(".sidenav").sidenav();

    $('.collapsible').collapsible();
    
    $('.parallax').parallax();

    $('.modal').modal();
  
    $('.add-comment-button').on('click', function(){   
      var articleId = $(this).data("id");
      var baseURL = window.location.origin;
      var frmName = "form-add-" + articleId;
      var frm = $('#' + frmName);
  
      $.ajax({
        url: baseURL + '/add/comment/' + articleId,
        type: 'POST',
        data: frm.serialize(),
      })
      .done(function() {
        M.toast({html: 'Comment submitted!'})
        setTimeout(function() {
          location.reload();
        }, 600);
      });
      return false;
    });
  
    $('.delete-comment-button').on('click', function(){
      var commentId = $(this).data("id");
      var baseURL = window.location.origin;
  
      $.ajax({
        url: baseURL + '/remove/comment/' + commentId,
        type: 'POST',
      })
      .done(function() {
        M.toast({html: 'Comment deleted!'})
        setTimeout(function() {
          location.reload();
        }, 600);
      });
      return false;
    });
  });