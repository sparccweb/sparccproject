setupLayout();
window.onresize = setupLayout;
function setupLayout() {
    gsap.set(container, {
        height: window.innerHeight
    })
}
createMapNavigationAnimations();

gsap.delayedCall(.3, () => {
    loaderAnimation.play(0);
});



const zoom = d3.zoom()
    .scaleExtent([1, 15])
    .on("zoom", zoomed);

d3Svg.call(zoom);

function zoomed(e) {
    const t = e.transform;
    if (view === views.m) {

    } else {
        currentZoomTransform = t;
    }
    d3SvgMainMap.attr("transform", currentZoomTransform);
}

function resetZoom(dur) {
    dur *= 1000;
    d3Svg.transition().duration(dur).call(
        zoom.transform, d3.zoomIdentity
    );
}

zoomInBtn.addEventListener('click', () => {
    d3Svg.transition().call(zoom.scaleBy, 2);
});
zoomOutBtn.addEventListener('click', () => {
    d3Svg.transition().call(zoom.scaleBy, .5);
});



islands.forEach((island, islandIdx) => {
    island.highlight.addEventListener('click', (e) => {
        e.stopPropagation();

        if (view === views.m) {
            resetZoom(0);
        }
        
        gsap.set(island.highlight, {
            attr: { opacity: 0 }
        })
        
        let scale;
        const box = island.highlight.getBBox();
        const boxRatio = box.width / box.height;
        const windowRatio = window.innerWidth / window.innerHeight;
        if (boxRatio > windowRatio) {
            scale = viewBox.width / box.width;
        } else {
            if (windowRatio > viewBoxRatio) {
                scale = viewBox.height / box.height;
            } else {
                scale = viewBox.height / box.height * (viewBoxRatio / windowRatio);
            }
        }
        scale *= .8;
        
        d3Svg.transition().duration(700).call(
            zoom.transform,
            d3.zoomIdentity
                .translate(viewBoxCenter.x, viewBoxCenter.y)
                .scale(scale)
                .translate(-(box.x + box.x + box.width) / 2, -(box.y + box.y + box.height) / 2),
            d3.pointer(e, d3Svg.node())
        );

        if (view === views.m) {
            island.mapToIslandAnimation.play(0);
        } else {
            if (activeIslandIdx !== islandIdx) {
                updateIslandToIslandAnimation(activeIslandIdx, islandIdx);
                islandToIslandAnimation.play(.5);
            } else {

            }
        }
        
        island.detailedViewLoopedAnimations.forEach(tl => tl.play(0));
        activeIslandIdx = islandIdx;
        updateIslandSelection();

        if (view === views.m) {
            view = views.i;
        }
    });
})

toMapBtn.addEventListener('click', () => {
    resetZoom(.5);
    islands[activeIslandIdx].hideIslandToMapAnimation.play(0);
    gsap.delayedCall(.5, () => {
        view = views.m;
    });
    gsap.delayedCall(islands[activeIslandIdx].hideIslandToMapAnimation.duration() * .5, () => {
        islands[activeIslandIdx].detailedViewLoopedAnimations.forEach(tl => tl.pause());
        activeIslandIdx = null;
        updateIslandSelection();
    });
});