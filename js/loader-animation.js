const loaderAnimation = gsap.timeline({
    paused: true,
    onComplete: () => {
        map.classList.add('loaded');
    }
})
    .timeScale(10.5)
    .to(loaderSea, {
        opacity: 0
    }, 0)
    .to(loaderWhale, {
        duration: 1.5,
        y: 90,
    }, 0)
    .to(loaderClouds, {
        duration: 3.5,
        opacity: 0,
        scale: 2,
        transformOrigin: 'center center'
    }, 0)
    .to(loaderLandEls, {
        duration: .3,
        stagger: {
            from: "random",
            amount: 2
        },
        opacity: 0,
    }, 0)
    .to(loaderLand, {
        duration: 3,
        opacity: 0,
        ease: 'power1.inOut'
    }, 0)
    
    .to(loaderStates[0], {
        duration: 2.5,
        x: 500,
        y: 200,
        scale: 3,
        transformOrigin: 'center center',
        ease: 'power1.inOut'
    }, 0)
    .to(loaderStates[1], {
        duration: 2.5,
        x: -1000,
        y: -100,
        scale: 3.5,
        transformOrigin: 'center center',
        ease: 'power1.inOut'
    }, 0)
    .to(loaderStates[2], {
        duration: 2.5,
        x: 200,
        scale: 2.5,
        transformOrigin: 'center center',
        ease: 'power1.inOut'
    }, 0)
    .to(loaderStates[3], {
        duration: 2.5,
        x: 1050,
        y: -300,
        scale: 1.3,
        transformOrigin: 'center center',
        ease: 'power1.inOut'
    }, 0)
    .to(loaderStates[4], {
        duration: 2.5,
        x: -550,
        y: -500,
        scale: 3,
        transformOrigin: 'center center',
        ease: 'power1.inOut'
    }, 0)
    .to(loaderStates[5], {
        duration: 2.5,
        x: -150,
        y: 300,
        scale: 3,
        transformOrigin: 'center center',
        ease: 'power1.inOut'
    }, 0)
    
    .to(loaderStates, {
        duration: 1.5,
        opacity: 0,
    }, 2)
    
    .to(mainMapWrapper, {
        duration: 1.5,
        opacity: 1,
        ease: 'power1.inOut'
    }, 2)
    
    .set(loaderMap, {
        display: 'none'
    }, '>')