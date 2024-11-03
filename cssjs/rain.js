console.log("rain.js starting!");

// Parameters:
let n_drops = 200;
let push_start = $('.hex-container').offset().top;
let push_end = $('.hex-container').height()*0.5 + push_start;
let base_fall_rate = 7;
let interact_hex = false;
// let interact_hex = true;

// let init_velo = 10; // pixels per 100ms
// let accel = 0.2;

//state
let drops = [];
let wind = 0;
let wind_momentum = 0;

let _$hexes = $('.hex');
/*function hex_idx(x_coord ){
    for( let i = 0; i < _hexes.length; i++) {
        rect = _$hexes[i].getBoundingClientRect();
        w = rect.width;
        if(x_coord < rect.x) return undefined;
        if(x_coord >= rect.x && x_coord <= rect.x+w)
            return i;
    }
}*/
// function update
function push_target(x_coord ){
    _$hexes = $('.hex');
    // console.log('**************')

    for( let i = 0; i < _$hexes.length; i++) {
        rect = _$hexes[i].getBoundingClientRect();
        // console.log(i, rect);
        w = rect.width;
        // if(x_coord < rect.x) return undefined;
        if(x_coord >= rect.x && x_coord <= rect.x + w/2) {
            // console.log(i,"LEFT");
            // return -1;
            return [rect.x, rect.y+rect.height/4];
        }
        
        if(x_coord > rect.x + w/2 && x_coord <= rect.x + w) {
            // return 1;
            return [rect.x + w, rect.y+rect.height/4];
        }
    }
}

function RainDrop() {
    // this.velo = init_velo;
    this.y = 0;
    this.x = Math.floor(Math.random()*98 + 1);
    this.x_init = this.x;
    this.vx = 0;
    this.vy = 0;
    this.mass = 0.8 + 0.4*Math.random();
    this.animated = true;
    this.depth = 6*Math.random();

    let delay = (1-Math.pow(Math.random(), 4))* 5 + Math.random();
    // let delay = Math.random()*.1;

    let e = $('<div>', {class : 'raindrop', style : `left: ${this.x}%;`});
    let stem = $('<div>', {class : 'stem'});
    let splat = $('<div>', {class : 'splat'});

    animation_props = {
        'animation-delay' : `${delay}s`,
        'animation-duration' : `${1 + Math.random()*this.depth/8}s`
    };
    // splat.css(animation_props);
    // stem.css(animation_props);
    e.css(animation_props);
    e.css({
        '--x-init' : this.x,
        '--depth' : this.depth,
        '--rainfall-floor' : Math.floor(89-this.depth)+'%'
    });
    // e.css('--rainfall-floor', Math.floor(83+this.depth)+'%')

    e.append(stem,splat);
    this.element = e;
}


function tick_rain() {
    let $rain_pane = $('.rain-pane');
    rain_width = $rain_pane.width();
    rain_height = $rain_pane.height();
    
    wind_momentum += 0.4*(Math.random()-0.5);
    wind += wind_momentum;
    wind *= 0.7;
    wind_momentum *= 0.97;
    
    for(const drop of drops) {
        // drop.pos -= drop.velo;
        // drop.velo += accel;
        // Math.floor(100*Math.random())+'%'
        // collide = document.elementFromPoint(window.innerHeight)
        
        y = parseInt(drop.element.css('top')); // somehow this is in pixels
        h = drop.element.innerHeight();

        if(interact_hex){
        if(drop.animated && y >= push_start && y <= push_end
            ) {
            // console.log(drop);
            /*drop.element.css('animation-play-state', 'paused');
            drop.animated = false;
            setTimeout(function(drop){
                // drop.element.css('animation-play-state', 'running');
                // drop.animated = true;
            }, .5, drop);*/

            tgt = push_target(drop.x*rain_width/100);
            // console.log(tgt);
            if(tgt) {
                xto = tgt[0]*100/rain_width;
                drop.vx += (xto - drop.x) / 10;
                drop.x = xto;
                // the below does nothing; not setting top.
                // drop.y = (tgt[1] + h)*100/rain_height;
            }
            // drop.element.css
        } 
        }
        
        drop.vx += (Math.random()*2 -1)*0.05;
        drop.vx *= 0.96;

        if (y+h < push_start)
            drop.vx += (wind/(drop.mass*(1 + drop.depth))  - drop.vx) / 8;
        // else

        drop.x += drop.vx;

        // drop.element.css('left', Math.floor(drop.x)+"%");
        drop.element.css({
            'left': drop.x+"%",
            rotate: -Math.atan(drop.vx / base_fall_rate)+"rad"});
        // drop.element.css('top', drop.y+"%");
        // drop.element.css('top', drop.y+"%");
        // drop.element.css('left', Math.floor(drop.x)+"px;");
    }
}

function drop_reset(evt) {
    let drop = evt.data.drop;
    drop.x = drop.x_init;
    // drop.element.css('transition', 'none');
    drop.element.css('left', drop.x_init+'%');
    // drop.element.css('transition', 'left .2s');

    evt.stopPropagation();
}

// Ok, go!
$(function(){
    $rain_pane = $('.rain-pane');
    for(let d = 0; d < n_drops; d += 1) {
        let drop = new RainDrop();
        $rain_pane.append(drop.element);
        drops.push(drop);
        if(interact_hex)
            drop.element.on("animationiteration", {drop : drop}, drop_reset);
    }
    if(interact_hex)
        window.setInterval(tick_rain, 50);
});

console.log("RAIN.js finished!");