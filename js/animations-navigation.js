islands.forEach((island, islandIdx) => {
    addMapHidingToTimeline(island.showIslandFromMapAnimation);
    addIslandSelectionToTimeline(island.showIslandFromMapAnimation, islandIdx);

    addMapShowingToTimeline(island.hideIslandToMapAnimation, islandIdx);

    addIslandSelectionToTimeline(island.showIslandFromIslandAnimation, islandIdx);
    
    if (island.name === 'chicago') {
        addChicagoAppearingToTimeline(island.showIslandFromMapAnimation, islandIdx);
        addChicagoAppearingToTimeline(island.showIslandFromIslandAnimation, islandIdx);
        addChicagoDisappearingToTimeline(island.hideIslandToMapAnimation, islandIdx);
    }
    
    // for performance
    island.showIslandFromMapAnimation
        .set(island.detailedViewContainer, {
            display: 'block'
        }, 0);
    island.showIslandFromIslandAnimation
        .set(island.detailedViewContainer, {
            display: 'block'
        }, 0);
    island.hideIslandToMapAnimation
        .set(island.detailedViewContainer, {
            display: 'none'
        }, island.hideIslandToMapAnimation.duration())
});


function addMapHidingToTimeline(tl) {
    tl
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
        .to([mainRoad, crosswalks], {
            duration: .3,
            opacity: 0
        }, 0)
        .to(titles, {
            duration: .3,
            attr: {opacity: .5}
        }, .3)
        .set(zoomingControls, {
            display: 'block'
        }, .4)
        .fromTo(zoomingControls, {
            opacity: 0
        }, {
            duration: .2,
            opacity: 1
        }, .4);
}

function addIslandSelectionToTimeline(tl, idx) {
    tl
        .to(islands[idx].sea, {
            duration: .3,
            attr: {opacity: 1}
        }, .3)
        .to(islands.filter((v, i) => (i !== idx)).map(v => v.sea), {
            duration: .3,
            attr: {opacity: 0}
        }, .3)
        .to(islands[idx].land, {
            duration: .3,
            attr: {fill: islands[idx].landColors[0]}
        }, .3)
        .to(islands.filter((v, i) => (i !== idx)).map(v => v.land), {
            duration: .3,
            attr: {fill: '#a4def7'}
        }, .3)
        .to(islands[idx].landShadow, {
            duration: .3,
            attr: {fill: islands[idx].landColors[1]}
        }, .3)
        .to(islands.filter((v, i) => (i !== idx)).map(v => v.landShadow), {
            duration: .3,
            attr: {fill: '#8cceea'}
        }, .3)
        .to(islands[idx].content, {
            duration: .3,
            opacity: 1
        }, .3)
        .to(islands.filter((v, i) => (i !== idx)).map(v => v.content), {
            duration: .3,
            opacity: 0
        }, .3);
}

function addMapShowingToTimeline(tl, idx) {
    tl
        .fromTo(zoomingControls, {
            opacity: 1
        }, {
            duration: .2,
            opacity: 0
        }, 0)
        .set(zoomingControls, {
            display: 'none'
        }, '>')
        .to(mapBack, {
            duration: .3,
            opacity: 1
        }, .4)
        .to(container, {
            duration: .4,
            background: '#8cceea'
        }, .4)
        .to(titles, {
            duration: .3,
            attr: {opacity: 1}
        }, .4)
        .to([mainRoad, crosswalks], {
            duration: .5,
            opacity: 1,
            ease: 'power1.in'
        }, .4)
        .to(mainMapPlane, {
            duration: .5,
            opacity: 1
        }, .5)

        .to(islands[idx].sea, {
            duration: .3,
            attr: {opacity: 0}
        }, .4)
        .to(islands.filter((v, i) => (i !== idx)).map(v => v.content), {
            duration: .3,
            opacity: 1
        }, .3)

        .to(islands.filter((v, i) => (i !== idx)).map(v => v.land), {
            duration: .3,
            opacity: 1
        }, .3)

    islands.forEach(island => {
        tl
            .to(island.land, {
                duration: .3,
                attr: {fill: island.landColors[0]}
            }, .3)
            .to(island.landShadow, {
                duration: .3,
                attr: {fill: island.landColors[1]}
            }, .3)
    });
}