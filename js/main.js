setupLayout();
window.onresize = setupLayout;
function setupLayout() {
    gsap.set(container, {
        height: window.innerHeight
    })
}


gsap.set(mainMap, {
    display: 'block'
})
gsap.to(loaderMap, {
    duration: .3,
    opacity: 0
})
gsap.to(mainMap, {
    duration: .3,
    opacity: 1
})



const zoom = d3.zoom()
    .scaleExtent([2.5, maxZoomingLevel])
    .on("zoom", null);


function zoomed({transform}) {
    currentZoomTransform = transform;
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

        activeIslandIdx = islandIdx;
        updateIslandSelection();
        
        if (view === views.m) {
            d3Svg.call(zoom);
            resetZoom(0);
            zoom.on("zoom", zoomed);
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

        
        d3Svg.transition().duration(500).call(
            zoom.transform,
            d3.zoomIdentity
                .translate(viewBoxCenter.x, viewBoxCenter.y)
                .scale(scale)
                .translate(-(box.x + box.x + box.width) / 2, -(box.y + box.y + box.height) / 2),
            d3.pointer(e, d3Svg.node())
        );

        if (view === views.m) {
            island.showIslandFromMapAnimation.play(0);
        } else {
            island.showIslandFromIslandAnimation.play(0);
        }
        island.detailedViewLoopedAnimations.forEach(tl => tl.play());

        if (view === views.m) {
            view = views.i;
        }
    });
})

toMapBtn.addEventListener('click', () => {
    resetZoom(.5);
    islands[activeIslandIdx].hideIslandToMapAnimation.play(0);
    gsap.delayedCall(.5, () => {
        d3Svg.on(".zoom", null);
        view = views.m;
    });
    gsap.delayedCall(islands[activeIslandIdx].hideIslandToMapAnimation.duration() * .5, () => {
        islands[activeIslandIdx].detailedViewLoopedAnimations.forEach(tl => tl.pause());
        activeIslandIdx = null;
        updateIslandSelection();
    });
});