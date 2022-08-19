function addBayDetailsToTimeline(tl, idx) {
    const island = islands[idx];
    tl
        .to(island.mapViewEls.toFade, {
            duration: .3,
            opacity: 0
        }, 0)
        .to(island.mapViewEls.toScale, {
            duration: .3,
            stagger: .02,
            scale: .2,
            transformOrigin: '50% 100%',
            opacity: 0,
            ease: 'back.in(2)'
        }, 0)
        .to(island.balloons[1], {
            duration: .5,
            scale: .5,
            transformOrigin: '50% 50%',
            ease: 'power1.inOut'
        }, 0)
        .from(island.balloons[0], {
            duration: .5,
            scale: 0,
            transformOrigin: '50% 50%',
            ease: 'power1.inOut'
        }, 0)
        .to(island.bayTowers, {
            duration: 1,
            scale: .7,
            transformOrigin: '50% 100%',
            ease: 'back(5).in'
        }, 0)
        .fromTo(island.detailedViewEls.roads, {
            opacity: 0
        }, {
            duration: .5,
            opacity: 1
        }, .3)
        .fromTo(island.detailedViewEls.toFade, {
            opacity: 0
        }, {
            duration: .5,
            opacity: 1
        }, .5)
        .fromTo(island.detailedViewEls.toScale, {
            opacity: 0,
            scale: .5,
            transformOrigin: '50% 100%',
        }, {
            duration: .5,
            stagger: {
                from: "random",
                amount: .8
            },
            scale: 1,
            transformOrigin: '50% 100%',
            opacity: 1,
            ease: 'back.out(3)'
        }, .5)
        .fromTo(island.detailedViewEls.toDrop, {
            opacity: 0,
            y: -50
        }, {
            duration: .3,
            stagger: .1,
            opacity: 1,
            y: 0
        }, 1.5)
        .fromTo(island.detailedViewEls.people, {
            opacity: 0,
            y: -20
        }, {
            duration: .3,
            stagger: .02,
            opacity: 1,
            y: 0
        }, .9)
        
        .set(island.detailedViewEls.plane, {
            opacity: 1
        }, 0)
        .fromTo(island.detailedViewEls.plane, {
            x: -1000,
            y: -200,
        }, {
            duration: 3,
            x: 0,
            y: 0,
            ease: 'power3.out'
        }, 0)
        .fromTo(island.detailedViewEls.ship, {
            x: -300,
            y: 20
        }, {
            duration: 5,
            x: 0,
            y: 20
        }, 0)
        .fromTo(island.detailedViewEls.ship, {
            opacity: 0
        }, {
            duration: .5,
            opacity: 1
        }, 0);
}

function hideBayDetailsToTimeline(tl, idx) {
    const island = islands[idx];
    tl
        .to(island.detailedViewEls.plane, {
            duration: 1,
            x: 1000,
            y: -200,
            ease: 'power3.in'
        }, 0)
        .set(island.detailedViewEls.plane, {
            opacity: 1
        }, '>')
        .to(island.balloons[1], {
            duration: .5,
            scale: 1,
            transformOrigin: '50% 50%',
            ease: 'power1.inOut'
        }, 0)
        .to(island.balloons[0], {
            duration: .5,
            scale: 0,
            transformOrigin: '50% 50%',
            ease: 'power1.inOut'
        }, 0)
        .to(island.bayTowers, {
            duration: 1,
            scale: 1,
            transformOrigin: '50% 100%',
            ease: 'back(3).out'
        }, .2)
        .to([ island.detailedViewEls.ship, island.detailedViewEls.toFade, island.detailedViewEls.toDrop, island.detailedViewEls.people ], {
            duration: .5,
            opacity: 0
        }, .1)
        .to(island.detailedViewEls.roads, {
            duration: .4,
            opacity: 0
        }, .3)
        .to(island.detailedViewEls.toScale, {
            duration: .25,
            stagger: {
                from: "random",
                amount: .5
            },
            scale: .2,
            transformOrigin: '50% 100%',
            opacity: 0,
            ease: 'back.in(2)'
        }, 0)
        

        .set(island.mapViewEls.toFade, {
            opacity: 0
        }, 0)
        .to(island.mapViewEls.toFade, {
            duration: 1.5,
            opacity: 1
        }, .2)
        
        .set(island.mapViewEls.toScale, {
            scale: .2,
            transformOrigin: '50% 100%',
            opacity: 1
        }, 0)
        .to(island.mapViewEls.toScale, {
            duration: .9,
            stagger: .04,
            scale: 1,
            transformOrigin: '50% 100%',
            ease: 'back.out(2)'
        }, .1)

}
