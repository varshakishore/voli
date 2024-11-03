// in gallery.md, img_names is the list of image names
function new_random_img(){
    return img_names[Math.floor(Math.random()*img_names.length)]
}

function img_names_big(imgidx) {
    let small_name = img_names[imgidx];
    return small_name.replaceAll('/assets/small/', '/assets/big/');
}

$(".hex").each(function(i,elt) {
    $(elt).attr("data-imgidx", i);
});

$('.hex').click(function(event) {
    // $(this).addClass('active');
    let rect = $(this)[0].getBoundingClientRect();

    // console.log($(this).attr('data-imgidx'), rect);
    $('#img-display').addClass('transition-bypass');
    $('#img-display img').attr('src','');
    let imgidx = $(this).attr('data-imgidx');
    $('#img-display img').attr('src', img_names[imgidx]);
    $('#img-display').css({
        'left': rect.left, 
        'top': rect.top,
        'width': rect.width,
        'height': rect.height
    });
    $('#img-display').attr('data-imgidx', imgidx);
    setTimeout(function(){
        $('#img-display').removeClass('transition-bypass');
        $('#img-display').addClass('active'); 
        $('#img-display').removeAttr('style');
        $('#img-display').focus();
    }, 250);
    setTimeout(function(){
        $('#img-display img').attr('src', img_names_big(imgidx));
    }, 50);
    // $('#img-display').css({
    //     'left': 0, 'top': 0
    // });
    $('.hex').addClass('blurry');
});

$('#img-display').click(function() {
    $('#img-display').removeClass('active');
    $('.hex').removeClass('active');
    $('.hex').removeClass('blurry');
});
$('#img-display, body').on('keyup', function(evt) {
    if(evt.which == 27) // escape;
        $('#img-display').click();

    let delta = 0;
    if(evt.which == 37) // left arrow key
        delta = -1;
    if(evt.which == 39) // right arrow key 
        delta = 1;

    if( delta != 0) {
        move_img_display(delta);
    }
});

function move_img_display(delta) {
    let imgidx = parseInt($('#img-display').attr("data-imgidx")) + delta;
    // console.log($(this).attr("data-imgidx"));
    if(imgidx >= 0 && imgidx < img_names.length){
        $('#img-display img').attr('src', img_names_big(imgidx));
        $('#img-display').attr('data-imgidx', imgidx);

        let $hex = $(`.hex[data-imgidx=${imgidx}]`);
        let offset = $hex.offset();
        if(offset && $hex.is(":visible")) {
            window.scrollTo(0, offset.top);
        }
    }
}

var touchdown = undefined;
$("#img-display").on('touchstart', function(evt){
    let t0 = evt.originalEvent.touches[0];
    touchdown = [t0.clientX, t0.clientY];
});
$("#img-display").on('touchend', function(evt){
    let t0 = evt.originalEvent.changedTouches[0];
    let dx = t0.clientX - touchdown[0];
    move_img_display( Math.sign(dx) * Math.floor(Math.sqrt(Math.abs(dx))/10));
});

/*
// old gallery (--visor) code
 window.scrollTo({
    top: $('.hex-row')[1].getBoundingClientRect().top+window.innerHeight/2,
    left: 0,
    behavior: "smooth",
});

$('.control').on('mousedown', function(){ 
    $(".hex").addClass('in-flux');
})

function shift(n) {
    console.log("shift", n);
    $(".hex").each(function(i,elt) {
        prev_idx = parseInt($(elt).attr("data-imgidx"));
        $(elt).attr("data-imgidx", prev_idx+1);
        $(elt).find("img").attr("src", img_names[prev_idx+n])
    }) 
    setTimeout(function(){
        $(".hex").removeClass('in-flux');
    },200);
    // $(".hex").css('filter', "none");
}
*/
  
/*
// flickering code
$('.hex img').each(function(i,heximg){
    setInterval(function(){
        // console.log(heximg);
        // $(heximg).css('border', '1px solid red');
        // $(heximg).css('border', '1px solid red');
        $(heximg).attr('src', new_random_img());
    }, 1000+2000*Math.random());
});
*/