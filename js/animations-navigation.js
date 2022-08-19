function creatMapNavigationAnimations() {
    islands.forEach((island, islandIdx) => {
        updateMapToIslandAnimation(islandIdx);
        updateIslandToMapAnimation(islandIdx);
    });
}

function updateMapToIslandAnimation(islandIdx) {
    const island = islands[islandIdx];
    
    island.mapToIslandAnimation.clear();
    addMapHidingToTimeline(island.mapToIslandAnimation);

    if (island.name === 'chicago') {
        addChicagoDetailsToTimeline(island.mapToIslandAnimation, islandIdx);
    } else if (island.name === 'LA') {
        addLADetailsToTimeline(island.mapToIslandAnimation, islandIdx);
    }
    islands.forEach((isl, idx) => {
        if (idx !== islandIdx) {
            addIslandDeselectionToTimeline(island.mapToIslandAnimation, idx);
        }
    });
    
    island.mapToIslandAnimation
        .set(island.detailedViewContainer, {
            display: 'block'
        }, 0);
}

function updateIslandToMapAnimation(islandIdx) {
    const island = islands[islandIdx];
    
    island.hideIslandToMapAnimation.clear();
    addMapShowingToTimeline(island.hideIslandToMapAnimation, islandIdx);
    
    if (island.name === 'chicago') {
        hideChicagoDetailsToTimeline(island.hideIslandToMapAnimation, islandIdx);
    } else if (island.name === 'LA') {
        hideLADetailsToTimeline(island.hideIslandToMapAnimation, islandIdx);
    }
    
    island.hideIslandToMapAnimation
        .set(island.detailedViewContainer, {
            display: 'none'
        }, island.hideIslandToMapAnimation.duration());
}

function updateIslandToIslandAnimation(startIslandIdx, endIslandIdx) {
    islandToIslandAnimation.clear();
    addIslandDeselectionToTimeline(islandToIslandAnimation, startIslandIdx);
    addIslandSelectionToTimeline(islandToIslandAnimation, endIslandIdx);
    if (islands[endIslandIdx].name === 'chicago') {
        addChicagoDetailsToTimeline(islandToIslandAnimation, endIslandIdx);
    }
    if (islands[startIslandIdx].name === 'chicago') {
        hideChicagoDetailsToTimeline(islandToIslandAnimation, startIslandIdx);
    }

    islandToIslandAnimation
        .set(islands[endIslandIdx].detailedViewContainer, {
            display: 'block'
        }, 0)
        .set(islands[startIslandIdx].detailedViewContainer, {
            display: 'none'
        }, islandToIslandAnimation.duration())
}



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
        }, .4)
        .set(islands.map(v => v.highlight), {
            attr: { 'stroke-width': 10 }
        }, .2);
}

function addIslandSelectionToTimeline(tl, idx) {
    const island = islands[idx];
    tl
        .to(island.sea, {
            duration: .3,
            attr: {
                opacity: 1
            }
        }, .3)
        .to(island.land, {
            duration: .3,
            attr: {
                fill: islands[idx].landColors[0]
            }
        }, .3)
        .to(island.landShadow, {
            duration: .3,
            attr: {
                fill: islands[idx].landColors[1]
            }
        }, .3)
        .to(island.content, {
            duration: .3,
            opacity: 1
        }, .3)
}
function addIslandDeselectionToTimeline(tl, idx) {
    const island = islands[idx];
    tl
        .to(island.sea, {
            duration: .3,
            attr: {
                opacity: 0
            }
        }, .3)
        .to(island.land, {
            duration: .3,
            attr: {
                fill: '#a4def7'
            }
        }, .3)
        .to(island.landShadow, {
            duration: .3,
            attr: {
                fill: '#a4def7'
            }
        }, .3)
        .to(island.content, {
            duration: .3,
            opacity: 0
        }, .3)
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
        .set(islands.map(v => v.highlight), {
            attr: {'stroke-width': 30}
        }, .2)
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
        .to(islands.map(v => v.content), {
            duration: .3,
            opacity: 1
        }, .3);

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