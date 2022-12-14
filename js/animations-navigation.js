function createMapNavigationAnimations() {
    islands.forEach((island, islandIdx) => {
        updateMapToIslandAnimation(islandIdx);
        updateIslandToMapAnimation(islandIdx);
    });
}

function updateMapToIslandAnimation(islandIdx) {
    const island = islands[islandIdx];
    
    island.mapToIslandAnimation.clear();
    addMapHidingToTimeline(island.mapToIslandAnimation);
    addIslandSelectionToTimeline(island.mapToIslandAnimation, islandIdx);

    if (island.name === 'chicago') {
        addChicagoDetailsToTimeline(island.mapToIslandAnimation, islandIdx);
    } else if (island.name === 'LA') {
        addLADetailsToTimeline(island.mapToIslandAnimation, islandIdx);
    } else if (island.name === 'bay') {
        addBayDetailsToTimeline(island.mapToIslandAnimation, islandIdx);
    } else if (island.name === 'atlanta') {
        addAtlantaDetailsToTimeline(island.mapToIslandAnimation, islandIdx);
    } else if (island.name === 'denver') {
        addDenverDetailsToTimeline(island.mapToIslandAnimation, islandIdx);
    } else if (island.name === 'memphis') {
        addMemphisDetailsToTimeline(island.mapToIslandAnimation, islandIdx);
    } else if (island.name === 'central') {
        addCentralDetailsToTimeline(island.mapToIslandAnimation, islandIdx);
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
    } else if (island.name === 'bay') {
        hideBayDetailsToTimeline(island.hideIslandToMapAnimation, islandIdx);
    } else if (island.name === 'atlanta') {
        hideAtlantaDetailsToTimeline(island.hideIslandToMapAnimation, islandIdx);
    } else if (island.name === 'denver') {
        hideDenverDetailsToTimeline(island.hideIslandToMapAnimation, islandIdx);
    } else if (island.name === 'memphis') {
        hideMemphisDetailsToTimeline(island.hideIslandToMapAnimation, islandIdx);
    } else if (island.name === 'central') {
        hideCentralDetailsToTimeline(island.hideIslandToMapAnimation, islandIdx);
    }
    
    island.hideIslandToMapAnimation
        .set(island.detailedViewContainer, {
            display: 'none'
        }, island.hideIslandToMapAnimation.duration());
}

function updateIslandToIslandAnimation(startIslandIdx, endIslandIdx) {
    islandToIslandAnimation.clear();

    if (islands[endIslandIdx].name !== 'central') {
        islandToIslandAnimation
            .fromTo(islands[endIslandIdx].detailedViewContainer, {
                opacity: 0
            }, {
                duration: 1,
                opacity: 1
            }, .3);
    }
        
    addIslandDeselectionToTimeline(islandToIslandAnimation, startIslandIdx);
    addIslandSelectionToTimeline(islandToIslandAnimation, endIslandIdx);
    
    if (islands[endIslandIdx].name === 'chicago') {
        addChicagoDetailsToTimeline(islandToIslandAnimation, endIslandIdx);
    } else if (islands[endIslandIdx].name === 'LA') {
        addLADetailsToTimeline(islandToIslandAnimation, endIslandIdx);
    } else if (islands[endIslandIdx].name === 'bay') {
        addBayDetailsToTimeline(islandToIslandAnimation, endIslandIdx);
    } else if (islands[endIslandIdx].name === 'atlanta') {
        addAtlantaDetailsToTimeline(islandToIslandAnimation, endIslandIdx);
    } else if (islands[endIslandIdx].name === 'denver') {
        addDenverDetailsToTimeline(islandToIslandAnimation, endIslandIdx);
    } else if (islands[endIslandIdx].name === 'memphis') {
        addMemphisDetailsToTimeline(islandToIslandAnimation, endIslandIdx);
    } else if (islands[endIslandIdx].name === 'central') {
        addCentralDetailsToTimeline(islandToIslandAnimation, endIslandIdx);
    }

    if (islands[startIslandIdx].name === 'chicago') {
        hideChicagoDetailsToTimeline(islandToIslandAnimation, startIslandIdx);
    } else if (islands[startIslandIdx].name === 'LA') {
        hideLADetailsToTimeline(islandToIslandAnimation, startIslandIdx);
    } else if (islands[startIslandIdx].name === 'bay') {
        hideBayDetailsToTimeline(islandToIslandAnimation, startIslandIdx);
    } else if (islands[startIslandIdx].name === 'atlanta') {
        hideAtlantaDetailsToTimeline(islandToIslandAnimation, startIslandIdx);
    } else if (islands[startIslandIdx].name === 'denver') {
        hideDenverDetailsToTimeline(islandToIslandAnimation, startIslandIdx);
    } else if (islands[startIslandIdx].name === 'memphis') {
        hideMemphisDetailsToTimeline(islandToIslandAnimation, startIslandIdx);
    } else if (islands[startIslandIdx].name === 'central') {
        hideCentralDetailsToTimeline(islandToIslandAnimation, startIslandIdx);
    }

    islandToIslandAnimation
        .set(islands[endIslandIdx].detailedViewContainer, {
            display: 'block'
        }, 0)
        .set(islands[startIslandIdx].detailedViewContainer, {
            display: 'none'
        }, islandToIslandAnimation.duration());
}



function addMapHidingToTimeline(tl) {
    tl
        .to(mainMapPlane, {
            duration: .7,
            opacity: 0
        }, 0)
        .to(mapBack, {
            duration: .5,
            opacity: 0
        }, 0)
        .set(mapBack, {
            pointerEvents: 'none'
        }, 0)
        .fromTo(document.body, {
            background: '#8cceea'
        }, {
            duration: .4,
            background: '#bbe9f9'
        }, 0)
        .to([mainRoad, crosswalks], {
            duration: .3,
            opacity: 0
        }, 0)
        .set(islands.map(v => v.highlight), {
            attr: { 'stroke-width': 10 }
        }, .2)
        .to(titles, {
            duration: .3,
            attr: {opacity: .5}
        }, .3)
        .set([zoomingControls, mapLegend], {
            display: 'block'
        }, .5)
        .fromTo([zoomingControls, mapLegend], {
            opacity: 0
        }, {
            duration: 1,
            opacity: 1
        }, .5)
}

function addIslandSelectionToTimeline(tl, idx) {
    const island = islands[idx];
    if (island.name !== 'central') {
        tl
            .to(peopleFstColoredElements, {
                duration: .1,
                attr: { fill: island.peopleColors[0] }
            }, 0)
            .to(peopleScdColoredElements, {
                duration: .1,
                attr: { fill: island.peopleColors[1] }
            }, 0)
            .to(peopleTrdColoredElements, {
                duration: .1,
                attr: { fill: island.peopleColors[2] }
            }, 0)
            .to(craneFstColoredElements, {
                duration: .1,
                attr: { fill: island.buildingColors[0] }
            }, .5)
            .to(craneScdColoredElements, {
                duration: .1,
                attr: { fill: island.buildingColors[1] }
            }, .5)
    }
    if (island.name === 'bay' || island.name === 'chicago') {
        tl
            .to(shipFstColoredElements, {
                duration: .1,
                attr: { fill: island.buildingColors[0] }
            }, 0)
            .to(shipScdColoredElements, {
                duration: .1,
                attr: { fill: island.buildingColors[1] }
            }, 0)
            .to(shipTrdColoredElements, {
                duration: .1,
                attr: { fill: island.buildingColors[2] }
            }, 0)
    }

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
        
        .fromTo(island.popups.map(p => p.el), {
            scale: 0,
            transformOrigin: '50% 50%'
        }, {
            duration: .6,
            stagger: .05,
            scale: 1,
            transformOrigin: '50% 50%',
            ease: 'back(3).out'
        }, 1.7)
}
function addIslandDeselectionToTimeline(tl, idx) {
    const island = islands[idx];
    tl
        .to(island.sea, {
            attr: {
                opacity: 0
            }
        }, .3)
        .to(island.land, {
            attr: {
                fill: '#a4def7'
            }
        }, .3)
        .to(island.landShadow, {
            attr: {
                fill: '#8cceea'
            }
        }, .3)
        .to(island.content, {
            opacity: 0
        }, .3)

        .to(island.popups.map(p => p.el), {
            scale: 0,
            transformOrigin: '50% 50%'
        }, .3)
}

function addMapShowingToTimeline(tl, idx) {
    tl
        .set([ craneFstColoredElements, craneScdColoredElements ], {
            attr: { fill: 'auto' }
        }, .3)
        .fromTo([zoomingControls, mapLegend], {
            opacity: 1
        }, {
            duration: .2,
            opacity: 0
        }, 0)
        .set([zoomingControls, mapLegend], {
            display: 'none'
        }, '>')
        .set(islands.map(v => v.highlight), {
            attr: {'stroke-width': 20}
        }, .2)
        .set(mapBack, {
            pointerEvents: 'auto'
        }, 0)
        .to(mapBack, {
            duration: .3,
            opacity: 1
        }, .5)
        .to(document.body, {
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
        }, .3)
        
        .to(islands[idx].popups.map(p => p.el), {
            duration: .2,
            scale: 0,
            transformOrigin: '50% 50%',
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