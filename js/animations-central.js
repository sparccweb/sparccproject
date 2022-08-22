function addCentralDetailsToTimeline(tl, idx) {
    const island = islands[idx];
    tl
        .fromTo(island.detailedViewEls.toFade, {
            opacity: 0
        }, {
            duration: .7,
            opacity: 1
        }, 0)
        .fromTo(island.detailedViewEls.toScale, {
            opacity: 0,
            scale: 0,
            transformOrigin: '50% 100%',
        }, {
            duration: .4,
            stagger: {
                from: "random",
                amount: .7
            },
            scale: 1,
            transformOrigin: '50% 100%',
            opacity: 1,
            ease: 'back.out(2)'
        }, .0)
        .fromTo(island.detailedViewEls.toScaleCentered, {
            opacity: 0,
            scale: 0,
            transformOrigin: '50% 50%',
        }, {
            duration: .7,
            stagger: {
                from: "random",
                amount: .8
            },
            scale: 1,
            transformOrigin: '50% 50%',
            opacity: 1,
            ease: 'back.out(5)'
        }, 0)
        
        .fromTo(island.detailedViewEls.cart, {
            opacity: 0,
        }, {
            duration: .5,
            opacity: 1,
        }, 1.5)
        .fromTo(island.detailedViewEls.cart, {
            x: 100,
        }, {
            duration: .8,
            x: 0,
        }, 1.5)
        .fromTo(island.detailedViewEls.tools, {
            opacity: 0,
        }, {
            duration: .4,
            stagger: .2,
            opacity: 1,
            ease: 'power4.out'
        }, 2.1)
        .fromTo(island.detailedViewEls.tools, {
            y: -50,
        }, {
            duration: .4,
            stagger: .2,
            y: 40,
        }, 2.1)
        
        .fromTo(island.detailedViewEls.corn.stem, {
            opacity: 0,
        }, {
            duration: 1,
            opacity: 1
        }, 0)
        .fromTo(island.detailedViewEls.corn.leaf, {
            opacity: 0,
        }, {
            duration: .2,
            opacity: 1
        }, .8)
        .fromTo(island.detailedViewEls.corn.curve, {
            opacity: 0,
        }, {
            duration: .4,
            opacity: 1
        }, .7)
        .set(island.detailedViewEls.corn.cob, {
            opacity: 1
        }, 0)
        .fromTo(island.detailedViewEls.corn.cob, {
            scale: 0,
            transformOrigin: '50% 100%',
        }, {
            duration: .3,
            scale: 1,
            transformOrigin: '50% 100%',
        }, 1.5);

    island.detailedViewEls.corn.beans.forEach((b, bIdx) => {
        tl
            .fromTo(b, {
                scale: 0,
                transformOrigin: '50% 0%',
            }, {
                duration: .15,
                scale: 1,
                transformOrigin: '50% 0%',
            }, .7 - bIdx * .02);
    });
}

function hideCentralDetailsToTimeline(tl, idx) {
    const island = islands[idx];
    tl
        .to(island.detailedViewEls.toFade, {
            duration: .5,
            opacity: 0
        }, 0)
        .to(island.detailedViewEls.toScale, {
            duration: .4,
            stagger: {
                from: "random",
                amount: .5
            },
            scale: 0,
            transformOrigin: '50% 100%',
            ease: 'back.in(2)'
        }, .2)
        .to(island.detailedViewEls.toScaleCentered, {
            duration: .3,
            stagger: {
                from: "random",
                amount: .7
            },
            scale: 0,
            transformOrigin: '50% 50%',
            ease: 'back.out(5)'
        }, 0)
        .to(island.detailedViewEls.cart, {
            duration: 1,
            opacity: 0,
            x: 100,
        }, 0)

        .to([ island.detailedViewEls.corn.leaf, island.detailedViewEls.tools, island.detailedViewEls.corn.stem, island.detailedViewEls.corn.curve, island.detailedViewEls.corn.cob ], {
            duration: .4,
            opacity: 0
        }, .8);

    island.detailedViewEls.corn.beans.forEach((b, bIdx) => {
        tl
            .to(b, {
                duration: .2,
                scale: 0,
                transformOrigin: '50% 0%',
            }, .7 + bIdx * .03);
    });
}