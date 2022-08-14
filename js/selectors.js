const container = document.querySelector('.full-page');

const map = document.querySelector('svg.map');
const mainRoad = map.querySelector('.main-road');
const mapBack = map.querySelector('.map-back');
const mainMapPlaneContainer = map.querySelector('.main-map-plane-container');
const mainMapPlane = map.querySelector('.main-map-plane');
const crosswalks = map.querySelector('.crosswalks');

const initViewBox = '0 0 2500 2500';
const islands = [{
    name: 'central',
    viewBox: '850 750 800 1050',
    highlight: map.querySelector('.island-back.central .highlight'),
    mapViewEls: {},
    detailedViewEls: {},
    toMapAnimation: null,
    toIslandAnimation: null,
}, {
    name: 'chicago',
    viewBox: '1600 900 700 1200',
    highlight: map.querySelector('.island-back.chicago .highlight'),
    mapViewEls: {
        toScale: Array.from(map.querySelectorAll('.chicago .map-view .to-scale > *')),
        toFade: Array.from(map.querySelectorAll('.chicago .map-view .to-fade > *')),
    },
    detailedViewEls: {
        toScale: Array.from(map.querySelectorAll('.chicago .detailed-view .to-scale > *')),
        toFade: Array.from(map.querySelectorAll('.chicago .detailed-view .to-fade > *')),
        toDrop: Array.from(map.querySelectorAll('.chicago .detailed-view .to-drop > *')),
        people: Array.from(map.querySelectorAll('.chicago .detailed-view .person')),
        roads: map.querySelector('.chicago .detailed-view .roads'),
        ship: map.querySelector('.chicago .detailed-view .ship'),
        plane: map.querySelector('.chicago .detailed-view .plane'),
    },
    toMapAnimation: null,
    toIslandAnimation: null,
}];


