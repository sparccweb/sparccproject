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

