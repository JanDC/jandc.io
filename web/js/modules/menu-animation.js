(function (window) {
    const menuShape = document.querySelector(".js-animations .c-menu-bg");
    if(!menuShape) return;

    const menuAnimation = {
        transforms: getTransforms(menuShape),
        entrance: {
            translateX: {
                from: '-20%',
                to: '-10%'
            },
            translateY: {
                from: '17%',
                to: '-17%'
            }
        }
    };

    animate({
        el: menuShape,
        delay: 2000,
        duration: 1400,
        rotate: [15, -15],
        translateX: [menuAnimation.entrance.translateX.from, menuAnimation.entrance.translateX.to],
        translateY: [menuAnimation.entrance.translateY.from, menuAnimation.entrance.translateY.to],
        scale: [0, 1],
        opacity: [0, 1],
        easing: "easeInOutQuint",
        complete(){
            $('.js-parallax').simpleParallax();
        }
    });

    return menuAnimation;

}(window));