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
    sea: map.querySelector('.island-back.central .sea'),
    highlight: map.querySelector('.island-back.central .highlight'),
    mapViewEls: {},
    detailedViewContainer: map.querySelector('.central .detailed-view'),
    detailedViewEls: {},
    detailedViewLoopedAnimations: [],
    toMapAnimation: null,
    toIslandAnimation: null,
}, {
    name: 'denver',
    viewBox: '200 620 800 1100',
    sea: map.querySelector('.island-back.denver .sea'),
    highlight: map.querySelector('.island-back.denver .highlight'),
    mapViewEls: {},
    detailedViewContainer: map.querySelector('.denver .detailed-view'),
    detailedViewEls: {},
    detailedViewLoopedAnimations: [],
    toMapAnimation: null,
    toIslandAnimation: null,
}, {
    name: 'atlanta',
    viewBox: '455 900 600 1200',
    sea: map.querySelector('.island-back.atlanta .sea'),
    highlight: map.querySelector('.island-back.atlanta .highlight'),
    mapViewEls: {},
    detailedViewContainer: map.querySelector('.atlanta .detailed-view'),
    detailedViewEls: {},
    detailedViewLoopedAnimations: [],
    toMapAnimation: null,
    toIslandAnimation: null,
}, {
    name: 'bay',
    viewBox: '1450 420 600 1100',
    sea: map.querySelector('.island-back.bay .sea'),
    highlight: map.querySelector('.island-back.bay .highlight'),
    mapViewEls: {},
    detailedViewContainer: map.querySelector('.bay .detailed-view'),
    detailedViewEls: {},
    detailedViewLoopedAnimations: [],
    toMapAnimation: null,
    toIslandAnimation: null,
}, {
    name: 'memphis',
    viewBox: '1000 1250 900 750',
    sea: map.querySelector('.island-back.memphis .sea'),
    highlight: map.querySelector('.island-back.memphis .highlight'),
    mapViewEls: {},
    detailedViewContainer: map.querySelector('.memphis .detailed-view'),
    detailedViewEls: {},
    detailedViewLoopedAnimations: [],
    toMapAnimation: null,
    toIslandAnimation: null,
}, {
    name: 'LA',
    viewBox: '620 500 850 800',
    sea: map.querySelector('.island-back.LA .sea'),
    highlight: map.querySelector('.island-back.LA .highlight'),
    mapViewEls: {},
    detailedViewContainer: map.querySelector('.LA .detailed-view'),
    detailedViewEls: {},
    detailedViewLoopedAnimations: [],
    toMapAnimation: null,
    toIslandAnimation: null,
}, {
    name: 'chicago',
    viewBox: '1600 900 700 1200',
    sea: map.querySelector('.island-back.chicago .sea'),
    highlight: map.querySelector('.island-back.chicago .highlight'),
    mapViewEls: {
        toScale: Array.from(map.querySelectorAll('.chicago .map-view .to-scale > *')),
        toFade: Array.from(map.querySelectorAll('.chicago .map-view .to-fade > *')),
    },
    detailedViewContainer: map.querySelector('.chicago .detailed-view'),
    detailedViewEls: {
        toScale: Array.from(map.querySelectorAll('.chicago .detailed-view .to-scale > *')),
        toFade: Array.from(map.querySelectorAll('.chicago .detailed-view .to-fade > *')),
        toDrop: Array.from(map.querySelectorAll('.chicago .detailed-view .to-drop > *')),
        people: Array.from(map.querySelectorAll('.chicago .detailed-view .person')),
        roads: map.querySelector('.chicago .detailed-view .roads'),
        ship: map.querySelector('.chicago .detailed-view .ship'),
        plane: map.querySelector('.chicago .detailed-view .plane'),
    },
    detailedViewLoopedAnimations: [
        
    ],
    toMapAnimation: null,
    toIslandAnimation: null,
}];


