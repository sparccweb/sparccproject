function addLADetailsToTimeline(tl, idx) {
    const island = islands[idx];
    tl
        .set(island.detailedViewEls.whale, {
            opacity: 1
        }, 0)
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
        .to(island.mapViewEls.van, {
            duration: .5,
            x: 150,
            opacity: 0,
        }, 0)
        .to(island.mapViewEls.bench, {
            duration: .5,
            x: 20,
            y: -20,
            scale: .32,
            transformOrigin: '0% 0%',
            ease: 'power1.inOut'
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
            opacity: 1,
            y: 0
        }, 1)
        .fromTo(island.detailedViewEls.people, {
            opacity: 0,
            y: -20
        }, {
            duration: .3,
            stagger: .02,
            opacity: 1,
            y: 0
        }, .9)
        .fromTo(island.detailedViewEls.car, {
            opacity: 0,
            x: 100,
        }, {
            duration: .9,
            opacity: 1,
            x: 0
        }, .9)
        .fromTo(island.detailedViewEls.van, {
            opacity: 0,
            x: -60,
        }, {
            duration: .8,
            opacity: 1,
            x: 0
        }, 1.2)
        .fromTo(island.detailedViewEls.surf, {
            opacity: 0,
            y: -30,
            scaleY: 1.3,
            transformOrigin: 'center center'
        }, {
            duration: .4,
            scaleY: 1,
            transformOrigin: 'center center',
            opacity: 1,
            y: 0
        }, 1.5)
        .fromTo(island.detailedViewEls.hollywood, {
            opacity: 0,
            y: -50,
            scaleY: 2,
            transformOrigin: 'center center'
        }, {
            duration: .3,
            stagger: .03,
            scaleY: 1,
            transformOrigin: 'center center',
            opacity: 1,
            y: 0
        }, 1.5)
}

function hideLADetailsToTimeline(tl, idx) {
    const island = islands[idx];
    tl
        .to(island.detailedViewEls.whale, {
            duration: .2,
            opacity: 0
        }, 0)
        .to(island.mapViewEls.bench, {
            duration: .7,
            x: 0,
            y: 0,
            scale: 1,
            transformOrigin: '0% 0%',
            ease: 'power1.inOut'
        }, 0)
        .to([ island.detailedViewEls.car, island.detailedViewEls.surf, island.detailedViewEls.hollywood, island.detailedViewEls.toFade, island.detailedViewEls.toDrop, island.detailedViewEls.people ], {
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
        .to(island.detailedViewEls.van, {
            duration: .5,
            x: 150,
            opacity: 0,
        }, .2)
        

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

        .fromTo(island.mapViewEls.van, {
            x: 100,
            opacity: 0,
        }, {
            duration: .7,
            x: 0,
            opacity: 1,
            ease: 'power2.out'
        }, 1.1)
}
