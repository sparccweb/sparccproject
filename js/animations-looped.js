let planeOverMapDirectionFlag = false;
planeOverMap();
function planeOverMap() {
    planeOverMapDirectionFlag = !planeOverMapDirectionFlag;
    const delay = 2 + Math.random() * 3;
    gsap.set(mainMapPlane, {
        delay: delay,
        scale: .7 + .5 * Math.random(),
        transformOrigin: 'center center'
    })
    const yPreposition = [700, 900, 1200];
    gsap.set(mainMapPlaneContainer, {
        delay: delay,
        y: yPreposition[Math.floor(Math.random() * 3)],
        x: planeOverMapDirectionFlag ? -1500 : 4000,
        scaleX: planeOverMapDirectionFlag ? 1 : -1
    })
    gsap.to(mainMapPlaneContainer, {
        delay: delay,
        duration: 6,
        x: planeOverMapDirectionFlag ? 5000 : -5000,
        ease: 'none',
        onComplete: planeOverMap
    })
}




// Chicago

// islands[6].detailedViewLoopedAnimations[0] = gsap.timeline({ 
//     paused: true,
//     repeat: -1
// })
//     .to(islands[6].detailedViewEls.ship, {
//         duration: 1.5,
//         y: 10,
//         ease: 'none'
//     })
//     .to(islands[6].detailedViewEls.ship, {
//         duration: 2.5,
//         y: 0,
//         ease: 'power2.out'
//     });