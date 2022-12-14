function generateMarkers(html) {
    const doc = parser.parseFromString(html, 'text/html');
    const links = Array.from(doc.querySelectorAll('ul ul li a'));
    links.forEach(l => {
        const contentPath = l.getAttribute('href');

        const islandCodeLetter = l.innerHTML.slice(0, 1);
        const islandCode = l.innerHTML.slice(0, 3);
        const islandTitle = l.innerHTML.substring(6)
        const islandSlug = contentPath.substring(contentPath.indexOf('/') + 5, contentPath.lastIndexOf('.html'));

        const island = islands.find(i => i.popupCode.toUpperCase() === islandCodeLetter.toUpperCase());

        if (island && markersRef[islandCode]) {
            // otherwise, it should be a placeholder
            const box = island.highlight.getBBox();

            const popupData = {
                code: islandCode,
                slickPlanExportURL: contentPath,
                el: null,
                labels: markersRef[islandCode].labels,
                title: islandTitle,
                slug: islandSlug
            };
            if (markersRef[islandCode]) {
                popupData.x = markersRef[islandCode].pos[0];
                popupData.y = markersRef[islandCode].pos[1];
                popupData.type = markersRef[islandCode].type;
            } else {
                popupData.x = box.x + Math.random() * box.width;
                popupData.y = box.y + Math.random() * box.height;
                popupData.type = 1;
            }
            
            
            const gDot = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            gDot.classList.add('marker');
            gsap.set(gDot, {
                x: popupData.x,
                y: popupData.y
            });
            const dotClickable = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            dotClickable.setAttributeNS(null, 'data-popup-code', islandCode);
            dotClickable.setAttributeNS(null, 'cx', 0);
            dotClickable.setAttributeNS(null, 'cy', 0);
            dotClickable.setAttributeNS(null, 'r', markerSize[2]);
            dotClickable.setAttributeNS(null, 'fill', 'transparent');
            dotClickable.style.pointerEvents = 'auto';
            dotClickable.style.cursor = 'pointer';
            dotClickable.classList.add('clickable');

            const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            dot.setAttributeNS(null, 'cx', 0);
            dot.setAttributeNS(null, 'cy', 0);
            dot.setAttributeNS(null, 'r', markerSize[0]);
            dot.classList.add('visible');

            const iconSize = popupData.type > 2 ? 8 : 12;
            let icon = document.createElementNS('http://www.w3.org/2000/svg', 'use');
            icon.setAttributeNS(null, 'x', -.5 * iconSize);
            icon.setAttributeNS(null, 'y', -.5 * iconSize);
            icon.setAttributeNS(null, 'width', iconSize);
            icon.setAttributeNS(null, 'height', iconSize);
            icon.setAttributeNS(null, 'fill', '#fff');

            const iconsReference = [
                '#play-icon-symbol',
                '#info-icon-symbol',
                '#newspaper-icon-symbol',
                '#policy-icon-symbol',
                '#capital-icon-symbol',
                '#health-icon-symbol',
                '#climate-icon-symbol',
                '#learning-icon-symbol',
                '#evolution-icon-symbol',
                '#partners-icon-symbol',
                '#reports-icon-symbol',
            ]
            icon.setAttributeNS(null, 'href', iconsReference[popupData.type]);
            
            gDot.appendChild(dotClickable);
            gDot.appendChild(dot);
            gDot.appendChild(icon);

            popupData.el = gDot;
            island.popups.push(popupData);
            island.markersContainer.appendChild(gDot);
        }
    })

    islands.forEach((island, islandIdx) => {
        island.popups.forEach(p => {
            p.el.querySelector('.clickable').onclick = function () {
                
                d3Svg.transition().duration(700).call(
                    zoom.transform,
                    d3.zoomIdentity
                        .translate(.9 * viewBoxCenter.x, viewBoxCenter.y)
                        .scale(currentSvgScale)
                        .translate(-gsap.getProperty(p.el, 'x'), -gsap.getProperty(p.el, 'y')),
                );

                deHoverMarkers();
                deselectMarkers();
                selectMarker(this);

                const contentURL = './website-exported/' + p.slickPlanExportURL;
                updateModalContent(contentURL, p.type, islandIdx, p.slug);
                updatePageUrl(p.slug);
            }
            p.el.querySelector('.clickable').onmouseenter = function () {
                hoverMarker(this);
                markerTitleContainer.classList.add('visible');
                updateMarkerTooltipContent(p.title, p.labels);
                updateMarkerTitlePosition(this);
            }
            p.el.querySelector('.clickable').onmouseleave = function () {
                deHoverMarkers();
                markerTitleContainer.classList.remove('visible');
            }
        });

        island.markerPulsingTween = gsap.to(island.markersContainer.querySelectorAll('.marker .visible'), {
            duration: .7,
            attr: { 'r' : .8 * markerSize[1] },
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true,
            paused: true
        });
    });
}

function updateMarkerTitlePosition(markerEl) {
    gsap.set(markerTitleContainer, {
        x: gsap.getProperty(markerEl.parentElement, 'x'),
        y: gsap.getProperty(markerEl.parentElement, 'y')
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
}

function updateMarkerTooltipContent(title, labels) {
    markerTitle.innerHTML = title;
    markerLabels.innerHTML = '';
    let tooltipTotalWidth = markerTitle.getBBox().width + 15;
    let labelsWidthArray = [];
    labels.forEach((l, lIdx) => {
        const labelEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        labelEl.innerHTML = l;
        labelEl.setAttribute('text-anchor', 'middle');
        markerLabels.appendChild(labelEl);
        labelsWidthArray[lIdx] = labelEl.getBBox().width;
        labelsWidthArray[lIdx] += 5;
    });
    const labelsWidthSum = labelsWidthArray.reduce((a, b) => a + b, 0);
    let labelOffset = -.5 * labelsWidthSum;
    Array.from(markerLabels.querySelectorAll('text')).forEach((lEl, lIdx) => {
        if (lIdx) {
            labelOffset += .5 * labelsWidthArray[lIdx - 1];
        }
        labelOffset += .5 * labelsWidthArray[lIdx];
        gsap.set(lEl, {
            attr: { x: labelOffset }
        })
    })
    tooltipTotalWidth = Math.max(tooltipTotalWidth, labelsWidthSum);
    gsap.set(markerTitleContainerBack, {
        x: -.5 * tooltipTotalWidth,
    });
    gsap.set(markerTitleContainerBackRect, {
        attr: {
            width: tooltipTotalWidth
        } 
    });
    gsap.set(markerTitleContainerBackArrow, {
        attr: {
            d: 'M' + (.5 * tooltipTotalWidth - 4) + ',-30.2 l 4,6 l4,-6'
        } 
    });
}
function deHoverMarkers() {
    Array.from(document.querySelectorAll('.marker circle.clickable.hovered')).forEach(c => {
        c.classList.remove('hovered');
    });
}
function hoverMarker(markerCircle) {
    markerCircle.classList.add('hovered');
}

modalCloseBtn.addEventListener('click', () => {
    closeModal();
    deselectMarkers();
});
modalBackAll.forEach(b => {
    b.addEventListener('click', () => {
        closeModal();
        deselectMarkers();
    });
})


function updateModalContent(slickPlanExportURL, contentType, islandIdx, slug) {
    modalContentContainer.scrollTop = 0;

    fetch(slickPlanExportURL).then((response) => {
        return response.text();
    }).then((html) => {

        // Get the corresponding SlickPlan page
        const doc = parser.parseFromString(html, 'text/html');

        // Parse the page the modal HTML content
        modalContentContainer.innerHTML = '';
        const main = doc.querySelector('#main');
        if (contentType !== 0) {

            let internalHost = location.host.replace('www.', "");
            internalHost = new RegExp(internalHost, 'i');

            // text content
            const links = Array.from(main.querySelectorAll('a'));
            links.forEach(l => {
                const linkURL = l.getAttribute('href');
                if (isImgLink(linkURL)) {
                    // Replace links to image files with proper images
                    const newImage = document.createElement('img');
                    if (linkURL.startsWith('assets')) {
                        newImage.setAttribute('src', './website-exported/' + linkURL);
                    } else {
                        newImage.setAttribute('src', linkURL);
                    }

                    // If there is a text under the image link separated by /br line
                    // we consider that text as alt.
                    // Weird but that's how it comes from SlickPlan
                    if (l.nextSibling.tagName) {
                        if (l.nextSibling.tagName.toUpperCase() === 'BR') {
                            newImage.setAttribute('alt', l.nextSibling.nextSibling.textContent);
                            l.nextSibling.nextSibling.remove();
                            l.nextSibling.remove();
                        }
                    }
                    l.parentNode.replaceChild(newImage, l);

                } else {
                    if (isPdfLink(linkURL)) {
                        if(!l.querySelector('img')) {
                            // For text links to pdf files we add the icon
                            // If the link itself is an image, we don't
                            l.innerHTML = l.innerHTML.replace(/^\s*\w+/, 
                                '<span style="white-space: nowrap"><img class="pdf-inline-icon" src="./img/pdf-icon.svg">$&</span>'
                            );
                        }
                    }

                    const href = l.host;
                    if (!internalHost.test(href)) { // make sure the href doesn't contain current site's host
                        l.setAttribute('target', '_blank');
                    }
                }
            });

            const figures = Array.from(doc.querySelectorAll('figure'));
            figures.forEach(f => {
                if (Array.from(f.querySelectorAll('*')).length === 0) {
                    f.parentNode.innerHTML = f.innerHTML;
                }
            });
            
            modalContentContainer.append(main);

            modalContainer.classList.remove('is-centralised');

        } else {

            if (main.querySelector('h1')) {
                modalVideoTitle.innerHTML = main.querySelector('h1').innerHTML;
            } else {
                modalVideoTitle.innerHTML = '&nbsp;';
            }
            
            let iframeProvided;
            if (main.querySelector('pre')) {
                iframeProvided = main.querySelector('pre').innerHTML;
                iframeProvided = iframeProvided.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
                iframeProvided = parser.parseFromString(iframeProvided, 'text/html');
                iframeProvided = iframeProvided.querySelector('iframe');
            }

            if (iframeProvided) {
                modalContentContainer.append(iframeProvided);
            } else {
                const newIframe = document.createElement('iframe');
                newIframe.setAttribute('src', 'https://www.youtube.com/embed/ScMzIvxBSi4?controls=0');
                newIframe.setAttribute('width', '560');
                newIframe.setAttribute('height', '349');
                newIframe.setAttribute('frameBorder', '0');
                modalContentContainer.append(newIframe);
            }
            
            modalContainer.classList.add('is-centralised');
        }

        modalContainer.setAttribute('data-active-island', islands[islandIdx].name);
        openModal(islandIdx);

    }).catch((err) => {
        console.warn('Modal content loader failed: ', err);
    });
}

function updatePageUrl(code) {
    window.location.hash = code;
}

function openModal(islandIdx, isIntoMessage = false) {
    markerTitleContainer.classList.remove('can-be-visible');
    markerTitleContainer.classList.remove('visible');
    gsap.to(header, {
        duration: .3,
        opacity: 0
    });
    if (!isIntoMessage) {
        gsap.to(islands[islandIdx].modalBack, {
            duration: .3,
            opacity: 1
        });
        gsap.set(islands[islandIdx].modalBack, {
            pointerEvents: 'auto'
        });
        islands[islandIdx].markerPulsingTween.pause();
    } else {
        gsap.to(islands[0].modalBack, {
            duration: .3,
            opacity: 1
        });
        gsap.set(islands[0].modalBack, {
            pointerEvents: 'auto'
        });
    }
    gsap.to(mapLegend, {
        duration: .3,
        opacity: 0
    });
    gsap.set(modal, {
        display: 'flex'
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
    markerTitleContainer.classList.add('can-be-visible');
    gsap.to(header, {
        duration: .3,
        opacity: 1
    });
    gsap.to(modalBackAll, {
        duration: .3,
        opacity: 0
    });
    gsap.set(modalBackAll, {
        pointerEvents: 'none'
    });
    gsap.to(mapLegend, {
        duration: .3,
        opacity: 1
    });
    gsap.to(modal, {
        duration: .25,
        y: 100,
        opacity: 0,
        onComplete: () => {
            modalContentContainer.scrollTop = 0;
            gsap.set(modal, {
                display: 'none'
            });
            modalContainer.classList.remove('is-intro');
            modalContentContainer.innerHTML = '';
            modalVideoTitle.innerHTML = '';
        }
    });

    updatePageUrl('');
    if (islands[activeIslandIdx]) {
        islands[activeIslandIdx].markerPulsingTween.play();
    }
}
