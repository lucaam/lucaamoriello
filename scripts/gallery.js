
$(document).ready( function() {
  var defaultPath = './images/';
  var imgNumber = 31;
  var defaultName = "img";
  var defaultExt = ".jpg";
  var i = 1;

  $('#heregoesthepic').attr("style", 'background-image: url("' + defaultPath + defaultName + i++ + defaultExt + '");');

     $('#newImage').click(function nextImage() {
       console.log('next');
       $('#heregoesthepic').fadeOut('fast', function backIn() {
         $('#heregoesthepic').removeAttr( 'style' );
         $('#heregoesthepic').attr("style", 'background-image: url("' + defaultPath + defaultName + i++ + defaultExt + '");');
         $('#heregoesthepic').fadeIn("slow");

       });


       if(i>=imgNumber)
       {
         i = 1;
       }
       console.log('sono in next ed i = ' + i);


     });

 });
