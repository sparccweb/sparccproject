gsap.registerPlugin(MotionPathPlugin);


// Main map plane animation

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

// Bird animations
gsap.timeline({ repeat: -1, yoyo: true })
    .to(birdWing, {
        duration: .15,
        rotation: -90,
        svgOrigin: '52.3 42.2',
        ease: 'power1.inOut',
    }, 0)

gsap.timeline({ repeat: -1 })
    .to(bird, {
        duration: .1,
        opacity: 1
    }, 0)
    .to(bird, {
        duration: 5,
        ease: 'none',
        motionPath: {
            path: birdTrajectories[0],
            align: birdTrajectories[0],
            alignOrigin: [0.5, 0.5]
        }
    }, 0)
    .to(birdWrapper, {
        duration: 5,
        rotation: -10,
        transformOrigin: 'center center',
        ease: 'none',
    }, 0)
    .to(bird, {
        duration: .1,
        opacity: 0
    }, '>-.1')
    
    .set(birdWrapper, {
        rotation: 0,
        scaleX: -1,
        transformOrigin: 'center center',
    }, 6)
    .to(bird, {
        duration: .1,
        opacity: 1
    }, 6)
    .to(bird, {
        duration: 5,
        ease: 'none',
        motionPath: {
            path: birdTrajectories[1],
            align: birdTrajectories[1],
            alignOrigin: [0.5, 0.5]
        }
    }, 6)
    .to(bird, {
        duration: .1,
        opacity: 0
    }, '>-.1')

    .to(bird, {
        duration: .1,
        opacity: 1
    }, 12)
    .to(bird, {
        duration: 4,
        ease: 'none',
        motionPath: {
            path: birdTrajectories[2],
            align: birdTrajectories[2],
            alignOrigin: [0.5, 0.5]
        }
    }, 12)
    .to(bird, {
        duration: .1,
        opacity: 0
    }, '>-.1')


// Yellow boat
mapViewAnimations.mainBoat
    .fromTo(mainMapBoat, {
        x: 0,
        y: 750
    }, {
        duration: 6,
        x: 600,
        y: 750,
        ease: 'power1.inOut',
    })
    .to(mainMapBoat, {
        duration: 6,
        x: 0,
        ease: 'power1.inOut',
    })


// Ferris Wheel (all symbols at once)

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



// Denver

islands[1].detailedViewLoopedAnimations[0] = gsap.timeline({ 
    repeat: -1,
})
    .to(islands[1].detailedViewEls.boat, {
        duration: .3,
        opacity: 1
    }, 0)
    .fromTo(islands[1].detailedViewEls.boat, {
        x: 1200,
        y: 1180
    }, {
        duration: 8,
        x: 700,
        y: 1180,
        ease: 'power1.inOut'
    }, 0)
    .to(islands[1].detailedViewEls.boat, {
        duration: 8,
        x: 1200,
        y: 1180,
        ease: 'power1.inOut'
    })
    .to(islands[1].detailedViewEls.boat, {
        duration: .3,
        opacity: 0
    }, 7.7)
    
    .to(islands[1].detailedViewEls.boat, {
        duration: .3,
        opacity: 1
    }, 10)
    .fromTo(islands[1].detailedViewEls.boat, {
        x: 0,
        y: 950
    }, {
        duration: 8,
        x: 560,
        y: 950,
        ease: 'power1.inOut'
    }, 10)
    .to(islands[1].detailedViewEls.boat, {
        duration: 8,
        x: 0,
        y: 950,
        ease: 'power1.inOut'
    })
    .to(islands[1].detailedViewEls.boat, {
        duration: .3,
        opacity: 0
    }, '>-.3');

islands[1].detailedViewLoopedAnimations[1] = gsap.timeline({
    repeat: -1,
    yoyo: true,
})
    .fromTo(islands[1].detailedViewEls.boat, {
        rotation: -1,
        transformOrigin: '50% 100%',
    }, {
        duration: .5,
        rotation: 1,
        transformOrigin: '50% 100%',
        ease: 'power1.inOut',
    }, 0)

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
