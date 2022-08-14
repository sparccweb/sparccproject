setupLayout();
window.onresize = setupLayout;
function setupLayout() {
    gsap.set(container, {
        height: window.innerHeight
    })
}

const views = {
    m: 'map',
    i: 'island'
}
let view;
let activeIslandIdx = null;
setMapView();



function setMapView() {
    view = views.m;
    map.classList.add('unzoomed');
}
function setIslandView() {
    view = views.i;
    map.classList.remove('unzoomed');
    gsap.set(islands[activeIslandIdx].highlight, {
        attr: { opacity: 0 }
    })
}

islands.forEach((island, islandIdx) => {
    island.highlight.addEventListener('mouseenter', () => {
        if (view === views.m) {
            gsap.to(island.highlight, {
                duration: .1,
                attr: { opacity: 1 }
            })
        }
    });
    island.highlight.addEventListener('mouseleave', () => {
        if (view === views.m) {
            gsap.to(island.highlight, {
                duration: .1,
                attr: { opacity: 0 }
            })
        }
    });
    island.highlight.addEventListener('click', () => {
        activeIslandIdx = islandIdx;
        setIslandView();
        island.toIslandAnimation.play(0);
        island.detailedViewLoopedAnimations.forEach(tl => tl.play());
    });    
})

document.querySelector('#go-to-map').addEventListener('click', () => {
    islands[activeIslandIdx].toMapAnimation.play(0);
    gsap.delayedCall(islands[activeIslandIdx].toMapAnimation.duration() * .5, () => {
        setMapView();
        islands[activeIslandIdx].detailedViewLoopedAnimations.forEach(tl => tl.pause());
    });
});