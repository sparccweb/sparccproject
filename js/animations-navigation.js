let baseToIslandAnimation = (idx) => gsap.timeline({ paused: true })
    .to(map, {
        duration: .7,
        attr: { 'viewBox': islands[idx].viewBox },
    }, 0)
    .to(mainMapPlane, {
        duration: .7,
        opacity: 0
    }, 0)
    .to(mapBack, {
        duration: .3,
        opacity: 0
    }, 0)
    .fromTo(container, {
        background: '#8cceea'
    }, {
        duration: .4,
        background: '#bbe9f9'
    }, 0)
    .to([ mainRoad, crosswalks ], {
        duration: .3,
        opacity: 0
    }, 0)
    .to(islands[idx].sea, {
        duration: .3,
        attr: { opacity: 1 }
    }, .3)
    .to(islands.filter((v, i) => (i !== idx)).map(v => v.land), {
        duration: .3,
        attr: { fill: '#a4def7' }
    }, .3)
    .to(islands.filter((v, i) => (i !== idx)).map(v => v.landShadow), {
        duration: .3,
        attr: { fill: '#8cceea' }
    }, .3)
    .to(islands.filter((v, i) => (i !== idx)).map(v => v.content), {
        duration: .3,
        opacity: 0
    }, .3)

let baseToMapAnimation = (idx) => {
    const tl = gsap.timeline({ paused: true })
        .to(map, {
            duration: 1,
            attr: { 'viewBox': initViewBox },
            ease: 'power1.inOut'
        }, .2)
        .to(mapBack, {
            duration: .3,
            opacity: 1
        }, .4)
        .to(container, {
            duration: .4,
            background: '#8cceea'
        }, .4)
        .to(islands[idx].sea, {
            duration: .3,
            attr: { opacity: 0 }
        }, .4)
        .to([ mainRoad, crosswalks ], {
            duration: .5,
            opacity: 1,
            ease: 'power1.in'
        }, .4)
        .to(mainMapPlane, {
            duration: .5,
            opacity: 1
        }, .5)
        .to(islands.filter((v, i) => (i !== idx)).map(v => v.content), {
            duration: .3,
            opacity: 1
        }, .3);

    islands.forEach(island => {
        island.land.forEach(land => {
            tl
                .to(land, {
                    duration: .3,
                    attr: {
                        fill: land.getAttribute('fill')
                    }
                }, .3)
        })
        island.landShadow.forEach(landShadow => {
            tl
                .to(landShadow, {
                    duration: .3,
                    attr: {
                        fill: landShadow.getAttribute('fill')
                    }
                }, .3)
        });
    });
    
    return tl;
}





islands.forEach((island, islandIdx) => {
    island.toIslandAnimation = baseToIslandAnimation(islandIdx);
    island.toMapAnimation = baseToMapAnimation(islandIdx);
    
    if (island.name === 'chicago') {
        island.toIslandAnimation
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

            .from(island.detailedViewEls.roads, {
                duration: .5,
                opacity: 0
            }, .3)
            .from(island.detailedViewEls.toFade, {
                duration: .5,
                opacity: 0
            }, .5)
            .from(island.detailedViewEls.toScale, {
                duration: .5,
                stagger: {
                    from: "random",
                    amount: .8
                },
                scale: .5,
                transformOrigin: '50% 100%',
                opacity: 0,
                ease: 'back.out(3)'
            }, .5)
            .from(island.detailedViewEls.toDrop, {
                duration: .3,
                opacity: 0,
                y: -50
            }, 1)
            .from(island.detailedViewEls.people, {
                duration: .3,
                stagger: .02,
                opacity: 0,
                y: -20
            }, .9)
            .set(island.detailedViewEls.plane, {
                opacity: 1
            }, 0)
            .from(island.detailedViewEls.plane, {
                duration: 2,
                x: -1000,
                y: -200,
                ease: 'power3.out'
            }, 0)
            .from(island.detailedViewEls.ship, {
                duration: 2,
                x: 300,
            }, 1)
            .from(island.detailedViewEls.ship, {
                duration: .1,
                opacity: 0
            }, 1);


        island.toMapAnimation
            .to([ island.detailedViewEls.toFade, island.detailedViewEls.toDrop, island.detailedViewEls.people ], {
                duration: .5,
                opacity: 0
            }, .1)
            .to(island.detailedViewEls.roads, {
                duration: .4,
                opacity: 0
            }, .3)
            .to([ island.detailedViewEls.plane, island.detailedViewEls.ship ], {
                duration: .5,
                opacity: 0
            }, .5)
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
            }, .5)
            .set(island.mapViewEls.toScale, {
                scale: .2,
                transformOrigin: '50% 100%',
                opacity: 0,
            }, 0)
            .to(island.mapViewEls.toScale, {
                duration: .4,
                stagger: .03,
                opacity: 1,
                ease: 'power4.in'
            }, .6)
            .to(island.mapViewEls.toScale, {
                duration: .4,
                stagger: .03,
                scale: 1,
                transformOrigin: '50% 100%',
                ease: 'back.out(3)'
            }, .6)
    }
    

    
    // for performance
    island.toIslandAnimation
        .set(island.detailedViewContainer, {
            display: 'block'
        }, 0);
    island.toMapAnimation
        .set(island.detailedViewContainer, {
            display: 'block'
        }, island.toMapAnimation.duration())
});