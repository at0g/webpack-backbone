function whichAnimationEvent () {
    var el = document.createElement('fakeelement');
    var animations = {
        'animation':'animationend',
        'OAnimation':'oAnimationEnd',
        'MozAnimation':'animationend',
        'WebkitAnimation':'webkitAnimationEnd'
    };

    for(let a in animations){
        if( el.style[a] !== undefined ){
            return animations[a];
        }
    }
};

export default whichAnimationEvent();
