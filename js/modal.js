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
                el: null
            };
            if (markersRef[contentName]) {
                popupData.x = markersRef[contentName].pos[0];
                popupData.y = markersRef[contentName].pos[1];
            } else {
                popupData.x = box.x + Math.random() * box.width;
                popupData.y = box.y + Math.random() * box.height;
            }
            
            
            const gDot = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            gDot.classList.add('marker');
            gsap.set(gDot, {
                x: popupData.x,
                y: popupData.y
            });
            const dotClickable = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            dotClickable.setAttributeNS(null, 'data-popup-name', contentName);
            dotClickable.setAttributeNS(null, 'cx', 0);
            dotClickable.setAttributeNS(null, 'cy', 0);
            dotClickable.setAttributeNS(null, 'r', markerSize[2]);
            dotClickable.setAttributeNS(null, 'fill', 'transparent');
            dotClickable.style.pointerEvents = 'auto';
            dotClickable.style.cursor = 'pointer';
            dotClickable.classList.add('clickable');

            const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            dot.setAttributeNS(null, 'data-popup-name', contentName);
            dot.setAttributeNS(null, 'cx', 0);
            dot.setAttributeNS(null, 'cy', 0);
            dot.setAttributeNS(null, 'r', markerSize[0]);
            dot.setAttributeNS(null, 'fill', '#000');
            dot.classList.add('visible');

            const dotTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            dotTitle.setAttributeNS(null, 'text-anchor', 'middle');
            dotTitle.setAttributeNS(null, 'font-size', '6');
            dotTitle.setAttributeNS(null, 'font-weight', '600');
            dotTitle.setAttributeNS(null, 'x', 0);
            dotTitle.setAttributeNS(null, 'y', .5 * markerSize[0]);
            dotTitle.setAttributeNS(null, 'fill', '#fff');
            dotTitle.innerHTML = popupData.name;

            gDot.appendChild(dotClickable);
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
            p.el.querySelector('.clickable').onclick = function () {
                
                d3Svg.transition().duration(700).call(
                    zoom.transform,
                    d3.zoomIdentity
                        .translate(.9 * viewBoxCenter.x, viewBoxCenter.y)
                        .scale(currentSvgScale)
                        .translate(-gsap.getProperty(p.el, "x"), -gsap.getProperty(p.el, "y")),
                );

                deselectMarkers();
                selectMarker(this);

                const contentURL = './website-exported/' + p.url;
                updateModalContent(contentURL);

                updatePageUrl(p.name);
            }
        })
    })
}

function deselectMarkers() {
    Array.from(document.querySelectorAll('.marker-circle-selected')).forEach(c => {
        c.classList.remove('marker-circle-selected');
        gsap.to(c.querySelector('.clickable'), {
            duration: .3,
            attr: {
                r: markerSize[2],
            }
        })
        gsap.to(c.querySelector('.visible'), {
            duration: .3,
            attr: {
                r: markerSize[0],
            }
        })
    });
}
function selectMarker(markerCircle) {
    const markerGroup = markerCircle.parentElement;
    markerGroup.classList.add('marker-circle-selected');
    gsap.to(markerCircle, {
        duration: .3,
        attr: {
            r: markerSize[1],
        },
        ease: 'back(3).out'
    })
    gsap.to(markerGroup.querySelector('.visible'), {
        duration: .3,
        attr: {
            r: markerSize[1],
        },
        ease: 'power2.in'
    })
}

modalCloseBtn.onclick = function () {
    closeModal();
    deselectMarkers();
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
        
        // console.log('textContent', main.textContent)

        modalContentContainer.innerHTML = '';
        modalContentContainer.append(main);
        openModal();
    }).catch((err) => {
        console.warn('Modal content loader failed: ', err);
    });
}

function updatePageUrl(name) {
    window.location.hash = name;
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
    });
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
    });

    updatePageUrl('');
}