function addDenverDetailsToTimeline(tl, idx) {
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
            stagger: -.03,
            opacity: 1,
            y: 0
        }, 1)
        

        .fromTo(island.detailedViewEls.bear, {
            opacity: 0
        }, {
            duration: .5,
            opacity: 1
        }, .2)
        .fromTo(island.detailedViewEls.bear, {
            x: 100,
        }, {
            duration: 1,
            x: 0,
        }, .2)
        
        .fromTo(island.detailedViewEls.ball, {
            opacity: 0
        }, {
            duration: .7,
            opacity: 1
        }, .7)
        .fromTo(island.detailedViewEls.ball, {
            y: -120,
        }, {
            duration: 1.5,
            y: 0,
            ease: 'bounce'
        }, .7)
}

function hideDenverDetailsToTimeline(tl, idx) {
    const island = islands[idx];
    tl
        .to([ island.detailedViewEls.toFade, island.detailedViewEls.ball, island.detailedViewEls.toDrop, island.detailedViewEls.people ], {
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
        
        .to(island.mapViewEls.toScale, {
            duration: .9,
            stagger: .04,
            transformOrigin: '50% 100%',
            opacity: 1,
            ease: 'power4.out'
        }, .1)
        .to(island.mapViewEls.toScale, {
            duration: .9,
            stagger: .04,
            scale: 1,
            transformOrigin: '50% 100%',
            ease: 'back.out(2)'
        }, .1)

        .to(island.detailedViewEls.bear, {
            duration: 1,
            x: -100,
            opacity: 0
        }, 0)
}