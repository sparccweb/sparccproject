gsap.registerPlugin(MotionPathPlugin);

let planeOverMapDirectionFlag = false;
planeOverMap();
function planeOverMap() {
    planeOverMapDirectionFlag = !planeOverMapDirectionFlag;
    const delay = 3 + Math.random() * 3;
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
        duration: 11,
        x: planeOverMapDirectionFlag ? 5000 : -5000,
        ease: 'none',
        onComplete: planeOverMap
    })
}


const ferrisWheelAnimation = gsap.timeline({ 
    defaults: {
        duration: 7,
    },
    repeat: -1
})
    .to(ferrisWheelRotatingPart, {
        rotation: 360,
        svgOrigin: '70.8 63.7',
        ease: 'none'
    });
ferrisWheelCabins.forEach(c => {
    ferrisWheelAnimation.to(c, {
        rotation: -360,
        transformOrigin: '50% 0%',
        ease: 'none'
    }, 0)
});


mapViewAnimations[0] = gsap.timeline({ repeat: -1 })
    .to(beesWrappers[0], {
        duration: 5,
        ease: 'none',
        motionPath: {
            path: beesTrajectories[0],
            align: beesTrajectories[0],
            autoRotate: true,
            alignOrigin: [0.5, 0.5]
        }
    }, 0)
    .set(bees[0], {
        scaleY: -1,
        transformOrigin: 'center center'
    }, 0)
    .set(bees[0], {
        scaleY: 1,
        transformOrigin: 'center center'
    }, 2.4)
    .progress(.8)

mapViewAnimations[1] = gsap.timeline({ repeat: -1 })
    .to(beesWrappers[1], {
        duration: 6,
        ease: 'none',
        motionPath: {
            path: beesTrajectories[1],
            align: beesTrajectories[1],
            autoRotate: true,
            alignOrigin: [0.5, 0.5]
        }
    }, 0)
    .set(bees[1], {
        scaleY: -1,
        transformOrigin: 'center center'
    }, 3.3)
    .set(bees[1], {
        scaleY: 1,
        transformOrigin: 'center center'
    }, 5.9)



// Atlanta

islands[2].detailedViewLoopedAnimations[0] = gsap.timeline({ 
    // paused: true,
    repeat: -1,
    yoyo: true,
    repeatDelay: 3
})
    .fromTo(islands[2].detailedViewEls.cableCarCabin, {
        x: -12,
        y: -32
    }, {
        duration: 4,
        x: 25,
        y: 45,
        ease: 'power2.inOut'
    })

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