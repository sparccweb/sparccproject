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
        duration: 15,
        x: planeOverMapDirectionFlag ? 5000 : -5000,
        ease: 'none',
        onComplete: planeOverMap
    })
}

// Bird animations
birdAnimations[0]
    .to(birdWing, {
        duration: .15,
        rotation: -90,
        svgOrigin: '52.3 42.2',
        ease: 'power1.inOut',
    }, 0)

birdAnimations[1]
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
mainBoatAnimation
    .fromTo(mainMapBoat, {
        x: 0,
        y: 750
    }, {
        duration: 9,
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

ferrisWheelAnimation
    .to(ferrisWheelRotatingPart, {
        duration: 7,
        rotation: 360,
        svgOrigin: '70.8 63.7',
        ease: 'none'
    });
ferrisWheelCabins.forEach(c => {
    ferrisWheelAnimation.to(c, {
        duration: 7,
        rotation: -360,
        transformOrigin: '50% 0%',
        ease: 'none'
    }, 0)
});

// Chicago train
chiTrainAnimation
    .fromTo(islands[6].train, {
        x: -100,
    }, {
        duration: 2,
        x: 100,
        ease: 'none'
    });

// All the cranes
craneAnimations[0]
    .to(cranes[0].craneHozLine, {
        duration: 1,
        scaleX: .3,
        svgOrigin: '36 12.5'
    })
    .to(cranes[0].craneHookWrapper, {
        duration: 1,
        x: -50
    }, 0)
    .to(cranes[0].craneBumper, {
        duration: 1,
        x: 25
    }, 0)
    .to(cranes[0].craneHookLine, {
        duration: 1,
        scaleY: 2,
        transformOrigin: '50% 0%'
    }, 1)
    .to(cranes[0].craneHook, {
        duration: 1,
        y: 35
    }, 1);

craneAnimations[1]
    .to(cranes[1].craneHozLine, {
        duration: 1,
        scaleX: .5,
        svgOrigin: '82 12.5'
    })
    .to(cranes[1].craneHookWrapper, {
        duration: 1,
        x: 35
    }, 0)
    .to(cranes[1].craneBumper, {
        duration: 1,
        x: -15
    }, 0)
    .to(cranes[1].craneHookLine, {
        duration: 1,
        scaleY: 1.5,
        transformOrigin: '50% 0%'
    }, 1)
    .to(cranes[1].craneHook, {
        duration: 1,
        y: 18
    }, 1);


// All traffic lights

trafficLightAnimation
    .to(trafficLightColors[2], {
        duration: .2,
        attr: { fill: '#a0a09f' }
    }, 2)
    .to(trafficLightColors[0], {
        duration: .2,
        attr: { fill: '#e55555' }
    }, 2)

    .to(trafficLightColors[0], {
        duration: .2,
        attr: { fill: '#a0a09f' }
    }, 4)
    .to(trafficLightColors[1], {
        duration: .2,
        attr: { fill: '#efa32b' }
    }, 4)

    .to(trafficLightColors[1], {
        duration: .2,
        attr: { fill: '#a0a09f' }
    }, 6)
    .to(trafficLightColors[2], {
        duration: .2,
        attr: { fill: '#94b241' }
    }, 6)


// Garden bees
beesAnimations[0]
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

beesAnimations[1]
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
    .timeScale(.4)
    .to(islands[1].detailedViewEls.boat, {
        duration: .3,
        opacity: 1
    }, 0)
    .fromTo(islands[1].detailedViewEls.boat, {
        x: 950,
        y: 1180
    }, {
        duration: 6,
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
        rotation: -2,
        transformOrigin: '50% 100%',
    }, {
        duration: .5,
        rotation: 2,
        transformOrigin: '50% 100%',
        ease: 'power1.inOut',
    }, 0);


islands[1].detailedViewLoopedAnimations[2] = gsap.timeline({
    paused: true,
    repeat: -1,
    delay: 3,
    repeatDelay: 4
})
    .fromTo(islands[1].detailedViewEls.cyclist, {
        opacity: 0
    }, {
        duration: .3,
        opacity: 1
    }, 0)
    .fromTo(islands[1].detailedViewEls.cyclist, {
        x: 35
    }, {
        duration: 2,
        x: -50,
        ease: 'none'
    }, 0)
    .to(islands[1].detailedViewEls.cyclist, {
        duration: .3,
        opacity: 0
    }, '>-.3')

    .set(islands[1].detailedViewEls.cyclist, {
        x: -210,
        y: 60,
    }, 2.5)
    .fromTo(islands[1].detailedViewEls.cyclist, {
        opacity: 0
    }, {
        duration: .3,
        opacity: 1
    }, 2.5)
    .to(islands[1].detailedViewEls.cyclist, {
        duration: 4,
        x: -380,
        ease: 'none'
    }, 2.5)
    .to(islands[1].detailedViewEls.cyclist, {
        duration: .3,
        opacity: 0
    }, '>-.3')

    .set(islands[1].detailedViewEls.cyclist, {
        scaleX: -1,
        transformOrigin: 'center center',
    }, 7)
    .to(islands[1].detailedViewEls.cyclist, {
        duration: .3,
        opacity: 1
    }, 7)
    .to(islands[1].detailedViewEls.cyclist, {
        duration: 4,
        x: -210,
        ease: 'none'
    }, 7)
    .to(islands[1].detailedViewEls.cyclist, {
        duration: .3,
        opacity: 0
    }, '>-.3')

    .set(islands[1].detailedViewEls.cyclist, {
        x: -50,
        y: 0,
    }, 11.5)
    .fromTo(islands[1].detailedViewEls.cyclist, {
        opacity: 0
    }, {
        duration: .3,
        opacity: 1
    }, 11.5)
    .to(islands[1].detailedViewEls.cyclist, {
        duration: 2,
        x: 40,
        ease: 'none'
    }, 11.5)
    .to(islands[1].detailedViewEls.cyclist, {
        duration: .3,
        opacity: 0
    }, '>-.3')


islands[1].detailedViewLoopedAnimations[3] = gsap.timeline({
    paused: true,
    repeat: -1,
    delay: 3,
    repeatDelay: 4
})
    .fromTo(islands[1].detailedViewEls.planes[1], {
        opacity: 0
    }, {
        duration: .3,
        opacity: 1
    }, 0)
    .fromTo(islands[1].detailedViewEls.planes[1], {
        x: -500,
        y: -100,
    }, {
        duration: 1.6,
        x: 0,
        y: 0,
        ease: 'power4.out'
    }, 0)
    .to(islands[1].detailedViewEls.planes[1], {
        duration: 1.2,
        x: 1000,
        y: -200,
        ease: 'power3.in'
    }, 3)
    .to(islands[1].detailedViewEls.planes[1], {
        duration: .2,
        opacity: 0
    }, '>-.2');


islands[1].detailedViewLoopedAnimations[4] = gsap.timeline({
    paused: true,
    repeat: -1,
    delay: 6,
    repeatDelay: 4
})
    .fromTo(islands[1].detailedViewEls.planes[0], {
        opacity: 0
    }, {
        duration: .3,
        opacity: 1
    }, 0)
    .fromTo(islands[1].detailedViewEls.planes[0], {
        x: -500,
        y: -100,
    }, {
        duration: 1.6,
        x: 0,
        y: 0,
        ease: 'power4.out'
    }, 0)
    .to(islands[1].detailedViewEls.planes[0], {
        duration: 1.2,
        x: 1000,
        y: -200,
        ease: 'power3.in'
    }, 3)
    .to(islands[1].detailedViewEls.planes[0], {
        duration: .2,
        opacity: 0
    }, '>-.2')



// Atlanta
islands[2].detailedViewLoopedAnimations[0] = gsap.timeline({
    repeat: -1,
    repeatDelay: 2
})
    .to(islands[2].detailedViewEls.ball, {
        duration: .35,
        y: -17,
        ease: 'power1.inOut'
    })
    .to(islands[2].detailedViewEls.ball, {
        duration: 1.4,
        y: 0,
        ease: 'bounce'
    });

islands[2].detailedViewLoopedAnimations[1] = gsap.timeline({
    paused: true,
    repeat: -1,
    delay: 6,
    repeatDelay: 4
})
    .fromTo(islands[2].detailedViewEls.cyclist, {
        opacity: 0
    }, {
        duration: .3,
        opacity: 1
    }, 0)
    .fromTo(islands[2].detailedViewEls.cyclist, {
        x: -40,
    }, {
        duration: 2,
        x: 80,
        ease: 'none'
    }, 0)
    .to(islands[2].detailedViewEls.cyclist, {
        duration: .3,
        opacity: 0
    }, '>-.3')
    .set(islands[2].detailedViewEls.cyclist, {
        scaleX: -1,
        transformOrigin: 'center center',
    }, 4)
    .to(islands[2].detailedViewEls.cyclist, {
        duration: .3,
        opacity: 1
    }, 4)
    .to(islands[2].detailedViewEls.cyclist, {
        duration: 2,
        x: -30,
        ease: 'none'
    }, 4)
    .to(islands[2].detailedViewEls.cyclist, {
        duration: .3,
        opacity: 0
    }, '>-.3');


// Bay area

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
                duration: 30,
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

// LA
islands[5].detailedViewLoopedAnimations[0] = gsap.timeline({
    paused: true,
    repeat: -1,
    delay: 2,
    repeatDelay: 3
})
    .to(islands[5].detailedViewEls.hollywood, {
        duration: .2,
        stagger: .1,
        scaleY: 1.5,
        transformOrigin: 'center center',
        y: -8
    }, 0)
    .to(islands[5].detailedViewEls.hollywood, {
        duration: .2,
        stagger: .1,
        scaleY: 1,
        y: 0
    }, .2);

islands[5].detailedViewLoopedAnimations[1] = gsap.timeline({
    paused: true,
    repeat: -1,
    delay: 4,
    repeatDelay: 5
})
    .fromTo(islands[5].detailedViewEls.cyclist, {
        opacity: 0
    }, {
        duration: .3,
        opacity: 1
    }, 0)
    .fromTo(islands[5].detailedViewEls.cyclist, {
        x: 20,
    }, {
        duration: 3.5,
        x: -130,
        ease: 'none'
    }, 0)
    .to(islands[5].detailedViewEls.cyclist, {
        duration: .3,
        opacity: 0
    }, '>-.3')
    .set(islands[5].detailedViewEls.cyclist, {
        scaleX: -1,
        transformOrigin: 'center center',
    }, 5)
    .to(islands[5].detailedViewEls.cyclist, {
        duration: .3,
        opacity: 1
    }, 5)
    .to(islands[5].detailedViewEls.cyclist, {
        duration: 3.5,
        x: 20,
        ease: 'none'
    }, 5)
    .to(islands[5].detailedViewEls.cyclist, {
        duration: .3,
        opacity: 0
    }, '>-.3');

islands[5].detailedViewLoopedAnimations[2] = gsap.timeline({
    paused: true,
    repeat: -1,
    delay: 3
    repeatDelay: 3
})
    .to(islands[5].detailedViewEls.ball, {
        duration: .35,
        y: -17,
        ease: 'power1.inOut'
    })
    .to(islands[5].detailedViewEls.ball, {
        duration: 1.4,
        y: 0,
        ease: 'bounce'
    });

islands[5].detailedViewLoopedAnimations[3] = gsap.timeline({
    paused: true,
    repeat: -1,
})
    .set(islands[5].detailedViewEls.whale, {
        y: 20,
    }, 0)
    .set(islands[5].detailedViewEls.whaleContainer, {
        x: 650,
        y: -110,
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

islands[6].detailedViewLoopedAnimations[0] = gsap.timeline({
    paused: true,
    repeat: -1,
    delay: 3,
    repeatDelay: 2
})
    .fromTo(islands[6].detailedViewEls.cyclist, {
        opacity: 0
    }, {
        duration: .3,
        opacity: 1
    }, 0)
    .fromTo(islands[6].detailedViewEls.cyclist, {
        x: 40,
    }, {
        duration: 2,
        x: -30,
        ease: 'none'
    }, 0)
    .to(islands[6].detailedViewEls.cyclist, {
        duration: .3,
        opacity: 0
    }, '>-.3')

    .set(islands[6].detailedViewEls.cyclist, {
        x: -10,
        y: -338,
    }, 3.5)
    .fromTo(islands[6].detailedViewEls.cyclist, {
        opacity: 0
    }, {
        duration: .3,
        opacity: 1
    }, 3.5)
    .to(islands[6].detailedViewEls.cyclist, {
        duration: 4,
        x: -220,
        ease: 'none'
    }, 3.5)
    .to(islands[6].detailedViewEls.cyclist, {
        duration: .3,
        opacity: 0
    }, '>-.3')

    .set(islands[6].detailedViewEls.cyclist, {
        scaleX: -1,
        transformOrigin: 'center center',
    }, 12)
    .to(islands[6].detailedViewEls.cyclist, {
        duration: .3,
        opacity: 1
    }, 12)
    .to(islands[6].detailedViewEls.cyclist, {
        duration: 4,
        x: -10,
        ease: 'none'
    }, 12)
    .to(islands[6].detailedViewEls.cyclist, {
        duration: .3,
        opacity: 0
    }, '>-.3')