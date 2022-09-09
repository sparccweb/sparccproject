const shapesToBeBoxed = Array.from(document.querySelectorAll('.ttt > *'));
let outputString = '';
const symbolName = 'mem-landscape-flower';
shapesToBeBoxed.forEach(b => {
    const box = b.getBBox();

    // outputString +=
    //     ('<g><use xlink:href="#' + symbolName + '" x="' + box.x.toFixed(0) + '" y="' + box.y.toFixed(0) + '" width="' + box.width.toFixed(0) + '" height="' + box.height.toFixed(0) + '"/></g>');

    // outputString +=
    //     ('<use xlink:href="#' + symbolName + '" x="' + box.x.toFixed(0) + '" y="' + box.y.toFixed(0) + '" width="' + box.width.toFixed(0) + '" height="' + box.height.toFixed(0) + '"/>');

    console.log('<use xlink:href="#' + symbolName + '" x="' + box.x.toFixed(1) + '" y="' + box.y.toFixed(1) + '" width="' + box.width.toFixed(1) + '" height="' + box.height.toFixed(1) + '"/>');
})

// console.log('<g>' + outputString + '</g>');
// console.log(outputString);


const cb = document.querySelector('#show-marker-names');

function testTest() {
    gsap.set('.marker text', {
        display: cb.checked ? 'block' : 'none'
    })
}



const t = Object.values(markersRef).map(v => v.labels).flat().filter((v, idx, self) => self.indexOf(v) === idx);
console.log(t)