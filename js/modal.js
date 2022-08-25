function generateMarkers(html) {
    const doc = parser.parseFromString(html, 'text/html');
    const links = Array.from(doc.querySelectorAll('ul ul li a'));
    links.forEach(l => {
        const contentPath = l.getAttribute('href');
        const islandCode = l.innerHTML.slice(0, 1);
        const contentName = l.innerHTML.slice(0, 3);

        const island = islands.find(i => i.popupCode.toUpperCase() === islandCode.toUpperCase());

        if (island) {
            // otherwise, it should be a placeholder
            const box = island.highlight.getBBox();

            const popupData = {
                name: contentName,
                url: contentPath,
                x: box.x + Math.random() * box.width,
                y: box.y + Math.random() * box.height,
                el: null
            };
            
            const gDot = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            gDot.classList.add('marker');
            gsap.set(gDot, {
                x: popupData.x,
                y: popupData.y
            });
            const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            dot.setAttributeNS(null, 'data-popup-name', contentName);
            dot.setAttributeNS(null, 'cx', 0);
            dot.setAttributeNS(null, 'cy', 0);
            dot.setAttributeNS(null, 'r', 10);
            dot.setAttributeNS(null, 'fill', 'red');
            dot.style.pointerEvents = 'auto';
            dot.style.cursor = 'pointer';
            const dotTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            dotTitle.setAttributeNS(null, 'x', 0);
            dotTitle.setAttributeNS(null, 'y', -10);
            dotTitle.setAttributeNS(null, 'fill', '#000');
            dotTitle.innerHTML = popupData.name;

            gDot.appendChild(dot);
            gDot.appendChild(dotTitle);

            popupData.el = gDot;
            island.popups.push(popupData);
            
            if (island.detailedViewContainer.length) {
                island.detailedViewContainer[island.detailedViewContainer.length - 1].appendChild(gDot);
            } else {
                island.detailedViewContainer.appendChild(gDot);
            }
        }
    })

    islands.forEach(island => {
        island.popups.forEach(p => {
            p.el.querySelector('circle').onclick = function () {
                const name = this.getAttribute('data-popup-name');
                const URL = './website-exported/' + island.popups.find(p => p.name === name).url;
                updateModalContent(URL);
            }
        })
    })
}

modalCloseBtn.onclick = function () {
    closeModal();
}

function updateModalContent(URL) {
    fetch(URL).then((response) => {
        return response.text();
    }).then((html) => {
        const doc = parser.parseFromString(html, 'text/html');
        const main = doc.querySelector('#main');
        
        const links = Array.from(main.querySelectorAll('a'));
        links.forEach(l => {
            const imgURL = l.getAttribute('href');
            if (isImgLink(imgURL)) {
                const newImage = document.createElement('img');
                newImage.setAttribute('src', './website-exported/' + imgURL);
                l.parentNode.replaceChild(newImage, l);
            }
        })

        modalContentContainer.innerHTML = '';
        modalContentContainer.append(main);
        openModal();
    }).catch((err) => {
        console.warn('Modal content loader failed: ', err);
    });
}

function openModal() {
    gsap.set(modal, {
        display: 'block'
    });
    gsap.fromTo(modal, {
        y: 100,
        opacity: 0
    }, {
        duration: .25,
        y: 0,
        opacity: 1
    })
}

function closeModal() {
    gsap.to(modal, {
        duration: .25,
        y: 100,
        opacity: 0,
        onComplete: () => {
            gsap.set(modal, {
                display: 'none'
            });
        }
    })
}