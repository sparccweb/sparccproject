// ------------------------------------------------------------------

setupLayout();
gsap.set(header, {
    opacity: 1
})
window.onresize = setupLayout;

function orientationChanged() {
    const timeout = 120;
    return new window.Promise(function(resolve) {
        const go = (i, height0) => {
            window.innerHeight !== height0 || i >= timeout ?
                resolve() :
                window.requestAnimationFrame(() => go(i + 1, height0));
        };
        go(0, window.innerHeight);
    });
}
window.addEventListener('orientationchange', function () {
    orientationChanged().then(function() {
        setupLayout();
    });
});

document.addEventListener('touchstart', setTouchScreenClass, true);



// ------------------------------------------------------------------
// Once the SlickPlan data is here, fetch popups data

fetch('./website-exported/sitemap.html').then((response) => {
    return response.text();
}).then((html) => {

    // Grab data we need for markers & modals
    generateMarkers(html);
    createMapNavigationAnimations();

    loaderAnimation.play(0);
    gsap.delayedCall(5, () => {
        birdAnimations[0].pause();
        birdAnimations[1].pause();
    });

    // ------------------------------------------------------------------
    // Check if the URL contains the existing marker and go there if yes
    const inputURL = window.location.hash.substring(1);
    const popupData = islands.map(i => i.popups).flat().find(popup => popup.slug.toUpperCase() === inputURL.toUpperCase());

    if (popupData) {
        const islandCode = popupData.code;
        const markerToFocus = document.querySelector('circle.clickable[data-popup-code="' + islandCode + '"]');
        const island = islands.find(island => island.popups.indexOf(popupData) !== -1);

        modalContainer.classList.remove('is-intro');

        view = views.i;
        goToIslandView();

        d3Svg.call(
            zoom.transform,
            d3.zoomIdentity
                .translate(.9 * viewBoxCenter.x, viewBoxCenter.y)
                .scale(6)
                .translate(-gsap.getProperty(popupData.el, "x"), -gsap.getProperty(popupData.el, "y")),
        );

        island.detailedViewLoopedAnimations.forEach(tl => tl.play(0));
        island.markerPulsingTween.play(0);
        activeIslandIdx = islands.indexOf(island);
        updateIslandSelection();

        island.mapToIslandAnimation.progress(1);

        gsap.delayedCall(loaderAnimation.duration() / loaderAnimation.timeScale(), () => {
            selectMarker(markerToFocus);
            const contentURL = './website-exported/' + popupData.slickPlanExportURL;
            updateModalContent(contentURL, popupData.type, activeIslandIdx, popupData.slug);
        });

    } else {
        updatePageUrl('');
    }

}).catch((err) => {
    console.warn('Sitemap loader failed: ', err);
});




// ------------------------------------------------------------------
// Setup navigation (pan & zoom)

const zoom = d3.zoom()
    .scaleExtent([1, maxZoomLevel])
    .on("zoom", zoomed)
    .on("end", zoomEnd);

d3Svg.call(zoom);

function zoomed(e) {
    const t = e.transform;
    if (view !== views.m) {
        currentZoomTransform = t;
    }
    if (currentZoomTransform.k <= maxZoomLevel && currentZoomTransform.k >= 1) {
        currentSvgScale = currentZoomTransform.k;
        d3SvgMainMap.attr("transform", currentZoomTransform);
    }
}
function zoomEnd() {
    if (currentZoomTransform.k >= maxZoomLevel) {
        zoomInBtn.classList.add('disabled');
    } else {
        zoomInBtn.classList.remove('disabled');
    }
    if (currentZoomTransform.k <= 1) {
        zoomOutBtn.classList.add('disabled');
    } else {
        zoomOutBtn.classList.remove('disabled');
    }
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



// ------------------------------------------------------------------
// Setup navigation (click on island)

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
            island.hideIslandToMapAnimation.pause();
            island.mapToIslandAnimation.play(0);
        } else {
            if (activeIslandIdx) {
                islands[activeIslandIdx].mapToIslandAnimation.pause();
                islands[activeIslandIdx].mapToIslandAnimation.progress(1);
            }
            if (activeIslandIdx !== islandIdx) {
                closeModal();
                deselectMarkers();
                updateIslandToIslandAnimation(activeIslandIdx, islandIdx);
                if (islandIdx) {
                    islandToIslandAnimation.play(.5);
                } else {
                    islandToIslandAnimation.play(0);
                }
            }
        }

        island.detailedViewLoopedAnimations.forEach(tl => tl.play());
        island.markerPulsingTween.play(0);
        activeIslandIdx = islandIdx;
        updateIslandSelection();

        if (view === views.m) {
            view = views.i;
            goToIslandView();
        }
    });
})


// ------------------------------------------------------------------
// Setup navigation (back to the map view)

toMapBtn.addEventListener('click', () => {
    closeModal();
    deselectMarkers();
    
    resetZoom(.6);
    gsap.delayedCall(.6, () => {
        view = views.m;
    });

    islandToIslandAnimation.pause();
    islands[activeIslandIdx].mapToIslandAnimation.pause();
    islands[activeIslandIdx].mapToIslandAnimation.progress(1);
    islands[activeIslandIdx].hideIslandToMapAnimation.play(0);

    goToMapView();

    islands[activeIslandIdx].detailedViewLoopedAnimations.forEach(tl => tl.pause());
    islands[activeIslandIdx].markerPulsingTween.pause();
    activeIslandIdx = null;
    updateIslandSelection();
});