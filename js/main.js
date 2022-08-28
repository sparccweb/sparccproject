setupLayout();
window.onresize = setupLayout;
function setupLayout() {
    gsap.set(container, {
        height: window.innerHeight
    })
}


fetch('./website-exported/sitemap.html').then((response) => {
    return response.text();
}).then((html) => {
    generateMarkers(html);
    createMapNavigationAnimations();

    loaderAnimation.play(0);
    gsap.delayedCall(4.5, () => {
        gsap.to(birdWrapper, {
            duration: .2,
            opacity: 0
        })
    });

    const modalCodeFromUrl = window.location.hash.substring(1);
    const islandCode = modalCodeFromUrl.slice(0, 1);
    const contentName = modalCodeFromUrl.slice(0, 3);

    const markerToFocus = document.querySelector('circle[data-popup-name="' + contentName + '"]');

    const island = islands.find(i => i.popupCode.toUpperCase() === islandCode.toUpperCase());
    if (markerToFocus && island) {

        view = views.i;
        const popup = island.popups.find(p => p.el === markerToFocus.parentElement);

        d3Svg.call(
            zoom.transform,
            d3.zoomIdentity
                .translate(.9 * viewBoxCenter.x, viewBoxCenter.y)
                .scale(6)
                .translate(-gsap.getProperty(popup.el, "x"), -gsap.getProperty(popup.el, "y")),
        );

        island.detailedViewLoopedAnimations.forEach(tl => tl.play(0));
        activeIslandIdx = islands.indexOf(island);
        updateIslandSelection();

        island.mapToIslandAnimation.progress(1);

        gsap.delayedCall(loaderAnimation.duration() / loaderAnimation.timeScale(), () => {
            selectMarker(markerToFocus);
            const contentURL = './website-exported/' + popup.url;
            updateModalContent(contentURL);
        });

    } else {
        updatePageUrl('');
    }

}).catch((err) => {
    console.warn('Sitemap loader failed: ', err);
});

 


const zoom = d3.zoom()
    .scaleExtent([1, 20])
    .on("zoom", zoomed);

d3Svg.call(zoom);

function zoomed(e) {
    const t = e.transform;
    if (view === views.m) {

    } else {
        currentZoomTransform = t;
    }
    currentSvgScale = currentZoomTransform.k;
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
        
        const box = island.highlight.getBBox();
        const boxRatio = box.width / box.height;
        const windowRatio = window.innerWidth / window.innerHeight;
        if (boxRatio > windowRatio) {
            currentSvgScale = viewBox.width / box.width;
        } else {
            if (windowRatio > viewBoxRatio) {
                currentSvgScale = viewBox.height / box.height;
            } else {
                currentSvgScale = viewBox.height / box.height * (viewBoxRatio / windowRatio);
            }
        }
        currentSvgScale *= .8;
        
        d3Svg.transition().duration(700).call(
            zoom.transform,
            d3.zoomIdentity
                .translate(viewBoxCenter.x, viewBoxCenter.y)
                .scale(currentSvgScale)
                .translate(-(box.x + box.x + box.width) / 2, -(box.y + box.y + box.height) / 2),
            d3.pointer(e, d3Svg.node())
        );

        if (view === views.m) {
            island.mapToIslandAnimation.play(0);
        } else {
            if (activeIslandIdx !== islandIdx) {
                closeModal();
                deselectMarkers();

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
    closeModal();
    deselectMarkers();
    
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