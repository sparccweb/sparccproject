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

            const dotTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            dotTitle.setAttributeNS(null, 'text-anchor', 'middle');
            dotTitle.setAttributeNS(null, 'font-size', '6');
            dotTitle.setAttributeNS(null, 'font-weight', '600');
            dotTitle.setAttributeNS(null, 'x', 16);
            dotTitle.setAttributeNS(null, 'y', -8);
            dotTitle.setAttributeNS(null, 'fill', '#fff');
            dotTitle.innerHTML = popupData.code;

            let icon = document.createElementNS('http://www.w3.org/2000/svg', 'use');
            icon.setAttributeNS(null, 'x', -6);
            icon.setAttributeNS(null, 'y', -6);
            icon.setAttributeNS(null, 'width', 12);
            icon.setAttributeNS(null, 'height', 12);
            icon.setAttributeNS(null, 'fill', '#fff');

            if (popupData.type === 0) {
                icon.setAttributeNS(null, 'href', '#play-icon-symbol');
            } else if (popupData.type === 1) {
                icon.setAttributeNS(null, 'href', '#info-icon-symbol');
            } else {
                icon.setAttributeNS(null, 'href', '#newspaper-icon-symbol');
            }

            gDot.appendChild(dotClickable);
            gDot.appendChild(dot);
            gDot.appendChild(dotTitle);
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
    const box = markerEl.getBoundingClientRect();
    gsap.set(markerTitleContainer, {
        x: box.x + box.width,
        y: box.y
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
    labels.forEach(l => {
        const labelEl = document.createElement('div');
        labelEl.classList.add('marker-title-label');
        labelEl.innerHTML = l;
        markerLabels.appendChild(labelEl);
    })
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

    fetch(slickPlanExportURL).then((response) => {
        return response.text();
    }).then((html) => {

        // Get the corresponding SlickPlan page
        const doc = parser.parseFromString(html, 'text/html');

        // Update dynamic meta tags
        if (doc.title) {
            document.title = doc.title;
            document.querySelector('meta[name="og:title"]').setAttribute('content', doc.title);
        }
        if (doc.querySelector('meta[name="description"]')) {
            const description = doc.querySelector('meta[name="description"]').getAttribute('content');
            document.querySelector('meta[name="description"]').setAttribute('content', description);
            document.querySelector('meta[name="og:description"]').setAttribute('content', description);
        }
        if (doc.querySelector('meta[name="keywords"]')) {
            const keywords = doc.querySelector('meta[name="keywords"]').getAttribute('content');
            document.querySelector('meta[name="keywords"]').setAttribute('content', keywords);
        }
        document.querySelector('meta[name="og:url"]').setAttribute('content', window.location.href.split("#")[0] + '#' + slug);

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
                    newImage.setAttribute('src', './website-exported/' + linkURL);

                    // If there is a text under the image link separated by /br line
                    // we consider that text as alt.
                    // Weird but that's how it comes from SlickPlan
                    if (l.nextSibling.tagName) {
                        if (l.nextSibling.tagName.toUpperCase() === 'BR') {
                            newImage.setAttribute('alt', l.nextSibling.nextSibling);
                            l.nextSibling.nextSibling.remove();
                        }
                    }
                    l.parentNode.replaceChild(newImage, l);

                } else {
                    if (isPdfLink(linkURL)) {
                        if(!l.querySelector('img')) {
                            // For text links to pdf files we add the icon
                            // If the link itself is an image, we don't
                            const newImage = document.createElement('img');
                            newImage.classList.add('pdf-inline-icon');
                            newImage.setAttribute('src', './img/pdf-icon.svg');
                            l.parentNode.insertBefore(newImage, l);
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

            // const addThisEl = document.createElement('div');
            // addThisEl.classList.add('addthis_inline_share_toolbox_by2v');
            // main.appendChild(addThisEl);
            
            modalContentContainer.append(main);
            modalContainer.classList.remove('is-video');

        } else {

            if (main.querySelector('h1')) {
                const titleEl = document.createElement('div');
                titleEl.classList.add('video-title');
                modal.append(titleEl);
                titleEl.innerHTML = main.querySelector('h1').innerHTML;
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
            
            modalContainer.classList.add('is-video');
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

function openModal(islandIdx) {
    markerTitleContainer.classList.remove('can-be-visible');
    markerTitleContainer.classList.remove('visible');
    gsap.to(header, {
        duration: .3,
        opacity: 0
    });
    gsap.to(islands[islandIdx].modalBack, {
        duration: .3,
        opacity: 1
    });
    gsap.set(islands[islandIdx].modalBack, {
        pointerEvents: 'auto'
    });
    islands[islandIdx].markerPulsingTween.pause();
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
    gsap.to(modal, {
        duration: .25,
        y: 100,
        opacity: 0,
        onComplete: () => {
            gsap.set(modal, {
                display: 'none'
            });
            modalContentContainer.innerHTML = '';
        }
    });

    updatePageUrl('');

    islands[activeIslandIdx].markerPulsingTween.play();
}
