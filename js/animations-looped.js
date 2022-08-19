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
    repeatDelay: 1
})
    .fromTo(islands[2].detailedViewEls.cableCarCabin, {
        x: -12,
        y: -32
    }, {
        duration: 4,
        x: 25,
        y: 45,
        ease: 'power2.inOut'
    });

// LA
islands[5].detailedViewLoopedAnimations[5] = gsap.timeline({
    paused: true,
    repeat: -1,
})
    .set(islands[5].detailedViewEls.whale, {
        y: 20,
    }, 0)
    .set(islands[5].detailedViewEls.whaleContainer, {
        x: 600,
        y: -100,
    }, 0)
    .to(islands[5].detailedViewEls.whale, {
        duration: .4,
        y: 0
    }, 4)
    .to(islands[5].detailedViewEls.whaleContainer, {
        duration: 3,
        x: '-=100',
        ease: 'none'
    }, 4)
    .to(islands[5].detailedViewEls.whale, {
        duration: .3,
        y: 20
    }, '>-.3')

    .set(islands[5].detailedViewEls.whaleContainer, {
        x: 0,
        y: -200,
        scaleX: -1
    }, '>')
    .fromTo(islands[5].detailedViewEls.whale, {
        y: 20,
    }, {
        duration: .4,
        y: 0
    }, 8)
    .to(islands[5].detailedViewEls.whaleContainer, {
        duration: 6,
        x: '+=300',
        ease: 'none'
    }, 8)
    .to(islands[5].detailedViewEls.whale, {
        duration: .3,
        y: 20
    }, '>-.3')

    .set(islands[5].detailedViewEls.whaleContainer, {
        x: 700,
        y: 100,
        scaleX: 1
    }, '>')
    .fromTo(islands[5].detailedViewEls.whale, {
        y: 20,
    }, {
        duration: .4,
        y: 0
    }, 16)
    .to(islands[5].detailedViewEls.whaleContainer, {
        duration: 4,
        x: '-=250',
        ease: 'none'
    }, 16)
    .to(islands[5].detailedViewEls.whale, {
        duration: .3,
        y: 20
    }, '>-.3')

    .set(islands[5].detailedViewEls.whaleContainer, {
        scaleX: -1,
        x: -100,
        y: 0,
    }, 23)
    .to(islands[5].detailedViewEls.whale, {
        duration: .4,
        y: 0
    }, 23)
    .to(islands[5].detailedViewEls.whaleContainer, {
        duration: 4,
        x: 150,
        ease: 'none'
    }, 23)
    .to(islands[5].detailedViewEls.whale, {
        duration: .3,
        y: 20
    }, '>-.3')



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








let balloonsTravelTls = [], balloonsSwingTls = [];

islands[3].balloons.forEach((b, idx) => {
    let balloon = {
        travel: b,
        swing: b.querySelector('.balloon-swing'),
    };
    gsap.set(balloon.swing, {
        transformOrigin: '50% 25%',
    });

    // balloon traveling animation
    balloonsTravelTls[idx] =
        gsap.timeline({
            repeat: -1,
        })
            .to(balloon.travel, {
                duration: 20,
                motionPath: {
                    path: islands[3].balloonsTrajectories[idx],
                    align: islands[3].balloonsTrajectories[idx],
                    alignOrigin: [0.5, 0.5]
                },
                ease: 'none'
            });

    // balloon swing animation
    balloonsSwingTls[idx] =
        gsap.timeline({
            repeat: -1,
            yoyo: true,
        })
            .to(balloon.travel, {
                duration: 1,
                rotation: -5,
                ease: 'power1.inOut'
            })
            .to(balloon.travel, {
                duration: 1,
                rotation: 5,
                ease: 'power1.inOut'
            }, '>');
});
