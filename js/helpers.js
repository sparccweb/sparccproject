function updateIslandSelection() {
    islands.forEach((island, islandIdx) => {
        if (islandIdx === activeIslandIdx) {
            island.highlight.classList.add('selected')
        } else {
            island.highlight.classList.remove('selected')
        }
    })    
}

const isImgLink = (url) => {
    url = '' + url;
    return (url.match(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i) !== null);
}

const isPdfLink = (url) => {
    url = '' + url;
    return (url.match(/\.(pdf)$/i) !== null);
}

function setupLayout() {
    gsap.set(container, {
        height: window.innerHeight
    });

    const windowRatio = window.innerWidth / window.innerHeight;
    if (windowRatio > .8 * viewBoxRatio) {
        gsap.set(header, {
            height: .08 * window.innerHeight,
            fontSize: .03 * window.innerHeight,
            maxWidth: .88 * window.innerHeight * viewBoxRatio + 'px',
            alignItems: 'center'
        })
    } else {
        gsap.set(header, {
            height: .5 * (window.innerHeight - window.innerWidth / viewBoxRatio),
            fontSize: .045 * window.innerHeight,
            maxWidth: 'none',
            alignItems: 'start'
        })
    }
}
function goToIslandView() {
    markerTitleContainer.classList.add('can-be-visible');
    gsap.to(mainLogo, {
        duration: .5,
        backgroundColor: '#cdeff9'
    });
    gsap.to(mainTitle, {
        duration: .5,
        opacity: 0
    });
}

function goToMapView() {
    markerTitleContainer.classList.remove('can-be-visible');
    markerTitleContainer.classList.remove('visible');
    gsap.to(mainLogo, {
        duration: .5,
        backgroundColor: '#bde3f4'
    });
    gsap.to(mainTitle, {
        duration: .5,
        opacity: 1
    });
}