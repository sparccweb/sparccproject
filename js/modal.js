document.querySelector('.popup-test').onclick = function () {
    openModal();
}

modalCloseBtn.onclick = function () {
    closeModal();
}

function updateModalContent() {

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