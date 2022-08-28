const shapesToBeBoxed = Array.from(document.querySelectorAll('.ttt'));
let outputString = '';
const symbolName = 'indian-side-face';
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