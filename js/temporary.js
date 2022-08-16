//    let scale = 1;
//     // Circle transform. Inits to 1:1 scale (called an "identity transform").
//     var circleTransform = map.createSVGMatrix();  // start
//     map.addEventListener("wheel", wheelZoom);
//
//
// function wheelZoom(event) {
//     event.preventDefault();
//
//     // Get the mouse position as SVG coordinates
//     var coords = convertScreenCoordsToSvgCoords(event.clientX, event.clientY);
//
//     // Calculate an appropriate scale adjustment
//     var scale = 1.0 + (event.deltaY * 0.001);
//
//     // To scale around the mouse coords, first we transform the coordinate
//     // system so that the origin is at the mouse coords.
//     circleTransform = circleTransform.translate(coords.x, coords.y);
//     // Then we apply the scale
//     circleTransform = circleTransform.scale(scale, scale);
//     // Finally we move the coordinate system back to where it was
//     circleTransform = circleTransform.translate(-coords.x, -coords.y);
//
//     // Now we need to update the circle's transform
//     var transform = map.createSVGTransform();        // An SVGTransform DOM object...
//     transform.setMatrix(circleTransform);            // set to the new circleTransform...
//     circle.transform.baseVal.initialize(transform);  // and used to update the circle transform property
// }
//
//
// function convertScreenCoordsToSvgCoords(x, y) {
//     var pt = svg.createSVGPoint();  // An SVGPoint SVG DOM object
//     pt.x = x;
//     pt.y = y;
//     // getScreenCTM tells us the combined transform that determines where
//     // the circle is rendered. Including any viewBox.
//     // We use the inverse of that to convert the mouse X and Y to their
//     // equivalent values inside the SVG.
//     pt = pt.matrixTransform(circle.getScreenCTM().inverse());
//     return {'x': pt.x, 'y': pt.y};
// }










const shapesToBeBoxed = Array.from(document.querySelectorAll('.test > *'));
let outputString = '';
const symbolName = 'two-color-tree-symbol';
shapesToBeBoxed.forEach(b => {
    const box = b.getBBox();
    outputString +=
        ('<use xlink:href="#' + symbolName + '" x="' + box.x.toFixed(0) + '" y="' + box.y.toFixed(0) + '" width="' + box.width.toFixed(0) + '" height="' + box.height.toFixed(0) + '"/>');
})

console.log('<g>' + outputString + '</g>');