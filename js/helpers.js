function updateIslandSelection() {
    islands.forEach((island, islandIdx) => {
        if (islandIdx === activeIslandIdx) {
            island.highlight.classList.add('selected')
        } else {
            island.highlight.classList.remove('selected')
        }
    })    
}
