const container = document.querySelector('.full-page');

const map = document.querySelector('svg.map');
const mainRoad = map.querySelector('.main-road');
const mapBack = map.querySelector('.map-back');
const mainMapPlaneContainer = map.querySelector('.main-map-plane-container');
const mainMapPlane = map.querySelector('.main-map-plane');
const crosswalks = map.querySelector('.crosswalks');

const ferrisWheelAnimated = map.querySelector('.ferris-wheel-animated');
const ferrisWheelRotatingPart = ferrisWheelAnimated.querySelector('.ferris-wheel-rotating');
const ferrisWheelCabins = Array.from(ferrisWheelAnimated.querySelectorAll('.ferris-wheel-cabins > path'));

const bees = Array.from(map.querySelectorAll('.bee'));
const beesWrappers = Array.from(map.querySelectorAll('.bee-wrapper'));
const beesTrajectories = Array.from(map.querySelectorAll('.bee-trajectory'));
const titles = Array.from(map.querySelectorAll('.titles'));

const d3Svg = d3.select("svg.map");
const d3SvgMainMap = d3Svg.select(".main-map");

const zoomingControls = document.querySelector('.zooming-controls');
const toMapBtn = document.querySelector('#go-to-map-btn');
const zoomInBtn = document.querySelector('#zoom-in-btn');
const zoomOutBtn = document.querySelector('#zoom-out-btn');

let currentZoomTransform = d3.zoomIdentity;
const maxZoomingLevel = 12;

const viewBox = {
    x0: 200,
    y0: 600,
    width: 2100,
    height: 1300
}
const viewBoxRatio = viewBox.width / viewBox.height;

const viewBoxCenter = {
    x: 1250, 
    y: 1250
}

const mapViewAnimations = {
    bees: []
}

const islands = [{
    name: 'central',
    // selected: false,
    viewBox: '850 750 800 1050',
    sea: map.querySelector('.island-back.central .sea'),
    highlight: map.querySelector('.island-back.central .highlight'),
    land: Array.from(map.querySelectorAll('.island-back.central .land')),
    landShadow: Array.from(map.querySelectorAll('.island-back.central .land-shadow')),
    content: map.querySelector('.island-content.central'),
    mapViewEls: {},
    detailedViewContainer: map.querySelector('.central .detailed-view'),
    detailedViewEls: {},
    detailedViewLoopedAnimations: [],
    toMapAnimation: null,
    toIslandAnimation: null,
}, {
    name: 'denver',
    // selected: false,
    viewBox: '200 620 800 1100',
    sea: map.querySelector('.island-back.denver .sea'),
    highlight: map.querySelector('.island-back.denver .highlight'),
    land: Array.from(map.querySelectorAll('.island-back.denver .land')),
    landShadow: Array.from(map.querySelectorAll('.island-back.denver .land-shadow')),
    content: map.querySelector('.island-content.denver'),
    mapViewEls: {},
    detailedViewContainer: map.querySelector('.denver .detailed-view'),
    detailedViewEls: {},
    detailedViewLoopedAnimations: [],
    toMapAnimation: null,
    toIslandAnimation: null,
}, {
    name: 'atlanta',
    // selected: false,
    viewBox: '455 900 600 1200',
    sea: map.querySelector('.island-back.atlanta .sea'),
    highlight: map.querySelector('.island-back.atlanta .highlight'),
    land: Array.from(map.querySelectorAll('.island-back.atlanta .land')),
    landShadow: Array.from(map.querySelectorAll('.island-back.atlanta .land-shadow')),
    content: map.querySelector('.island-content.atlanta'),
    mapViewEls: {},
    detailedViewContainer: map.querySelector('.atlanta .detailed-view'),
    detailedViewEls: {},
    detailedViewLoopedAnimations: [],
    toMapAnimation: null,
    toIslandAnimation: null,
}, {
    name: 'bay',
    // selected: false,
    viewBox: '1350 420 800 1100',
    sea: map.querySelector('.island-back.bay .sea'),
    highlight: map.querySelector('.island-back.bay .highlight'),
    land: Array.from(map.querySelectorAll('.island-back.bay .land')),
    landShadow: Array.from(map.querySelectorAll('.island-back.bay .land-shadow')),
    content: map.querySelector('.island-content.bay'),
    mapViewEls: {},
    detailedViewContainer: map.querySelector('.bay .detailed-view'),
    detailedViewEls: {},
    detailedViewLoopedAnimations: [],
    toMapAnimation: null,
    toIslandAnimation: null,
}, {
    name: 'memphis',
    // selected: false,
    viewBox: '1000 1250 900 750',
    sea: map.querySelector('.island-back.memphis .sea'),
    highlight: map.querySelector('.island-back.memphis .highlight'),
    land: Array.from(map.querySelectorAll('.island-back.memphis .land')),
    landShadow: Array.from(map.querySelectorAll('.island-back.memphis .land-shadow')),
    content: map.querySelector('.island-content.memphis'),
    mapViewEls: {},
    detailedViewContainer: map.querySelector('.memphis .detailed-view'),
    detailedViewEls: {},
    detailedViewLoopedAnimations: [],
    toMapAnimation: null,
    toIslandAnimation: null,
}, {
    name: 'LA',
    // selected: false,
    viewBox: '620 500 850 800',
    sea: map.querySelector('.island-back.LA .sea'),
    highlight: map.querySelector('.island-back.LA .highlight'),
    land: Array.from(map.querySelectorAll('.island-back.LA .land')),
    landShadow: Array.from(map.querySelectorAll('.island-back.LA .land-shadow')),
    content: map.querySelector('.island-content.LA'),
    mapViewEls: {},
    detailedViewContainer: map.querySelector('.LA .detailed-view'),
    detailedViewEls: {},
    detailedViewLoopedAnimations: [],
    toMapAnimation: null,
    toIslandAnimation: null,
}, {
    name: 'chicago',
    // selected: false,
    viewBox: '1600 900 700 1200',
    sea: map.querySelector('.island-back.chicago .sea'),
    highlight: map.querySelector('.island-back.chicago .highlight'),
    land: Array.from(map.querySelectorAll('.island-back.chicago .land')),
    landShadow: Array.from(map.querySelectorAll('.island-back.chicago .land-shadow')),
    content: map.querySelector('.island-content.chicago'),
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


