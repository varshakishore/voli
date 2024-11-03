console.log("MAIN.JS running");

$(function(){
    $('.nav-item').click(function(evt){
        // console.log("yo");
        // console.log(this);
        // console.log($(this).find("a").attr('href'));
        window.location = $(this).find("a").attr('href');

        // $(this).find("a").click();

        // evt.preventDefault();
        // evt.stopPropagation();
    });
});