var globalAnimations = (function(){
    var all = document.querySelectorAll(".js-animations main > *");
    for (var i = 0, max = all.length; i < max; i++) {
        animate({
            el: all[i],
            delay: 2000 + (50 * i),
            duration: 2000,
            translateY: [20, 0],
            opacity: [0, 1],
            easing: "easeInOutQuint"
        });
    }
})();