document.querySelector('.popup-test').onclick = function () {
    updateModalContent();
}

modalCloseBtn.onclick = function () {
    closeModal();
}

function updateModalContent() {
    fetch('./website-exported/chicago/community-ownership-incubation-lab.html').then((response) => {
        return response.text();
    }).then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const main = doc.querySelector('#main');

        modalContentContainer.innerHTML = '';
        modalContentContainer.append(main);
        openModal();
    }).catch((err) => {
        console.warn('Modal loader failed: ', err);
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