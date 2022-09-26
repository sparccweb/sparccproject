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
        console.log('1');
        gsap.set(header, {
            height: .06 * window.innerHeight,
            fontSize: .02 * window.innerHeight,
            maxWidth: '80%',
            alignItems: 'center'
        });
        gsap.set(mainTitle, {
            paddingTop: 0,
        });
    } else {
        console.log('2');
        gsap.set(header, {
            height: .5 * (window.innerHeight - window.innerWidth / viewBoxRatio),
            fontSize: .02 * window.innerHeight,
            maxWidth: 'none',
            alignItems: 'start'
        });
        gsap.set(mainTitle, {
            paddingTop: mainLogo.clientHeight,
        });
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
function setTouchScreenClass() {
    document.body.className += ' disable-hover';
    document.removeEventListener('touchstart', setTouchScreenClass, true);
}