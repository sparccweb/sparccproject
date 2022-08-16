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
let view = views.m;
let activeIslandIdx = null;


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

d3Svg.call(zoom);

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
            view = views.i;
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

        island.toIslandAnimation.play(0);
        island.detailedViewLoopedAnimations.forEach(tl => tl.play());
    });
})

toMapBtn.addEventListener('click', () => {
    resetZoom(.5);
    islands[activeIslandIdx].toMapAnimation.play(0);
    gsap.delayedCall(.5, () => {
        view = views.m;
        zoom.on("zoom", null);
    });
    gsap.delayedCall(islands[activeIslandIdx].toMapAnimation.duration() * .5, () => {
        islands[activeIslandIdx].detailedViewLoopedAnimations.forEach(tl => tl.pause());
        activeIslandIdx = null;
        updateIslandSelection();
    });
});