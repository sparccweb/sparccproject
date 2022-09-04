function addAtlantaDetailsToTimeline(tl, idx) {
    const island = islands[idx];
    tl

        // .set(birdAnimations, {
        //     progress: 0,
        //     timeScale: 1
        // }, 0)
        .to('.bird-symbol-wrapper .fst-color', {
            duration: .2,
            fill: '#af4141'
        }, 0)
        .to('.bird-symbol-wrapper .scd-color', {
            duration: .2,
            fill: '#e55555'
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
            stagger: .03,
            opacity: 1,
            y: 0
        }, 1)
        
        .fromTo(island.detailedViewEls.plane, {
            opacity: 0
        }, {
            duration: .3,
            opacity: 1
        }, 1)
        .fromTo(island.detailedViewEls.plane, {
            x: -1000,
            y: -200,
        }, {
            duration: 2,
            x: 0,
            y: 0,
            ease: 'power3.out'
        }, 1)

        .to(birdWrapper, {
            duration: .2,
            opacity: 1
        }, 2.8)
}

function hideAtlantaDetailsToTimeline(tl, idx) {
    const island = islands[idx];
    tl
        .fromTo(island.detailedViewEls.plane, {
            x: 0,
            y: 0,
        }, {
            duration: 3,
            x: 2000,
            y: -400,
            ease: 'power3.in'
        }, 0)
        .to(island.detailedViewEls.plane, {
            duration: .2,
            opacity: 0
        }, '>-.2')
        .to([ island.detailedViewEls.toFade, island.detailedViewEls.toDrop, island.detailedViewEls.people ], {
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

        .to(birdWrapper, {
            duration: .2,
            opacity: 0
        }, .5)
        // .set(birdAnimations, {
        //     timeScale: 0
        // }, 1.5)
        // .set(birdWrapper, {
        //     duration: .2,
        //     opacity: 0
        // }, '>-.2')
}