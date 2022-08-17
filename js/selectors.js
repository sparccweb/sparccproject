const container = document.querySelector('.full-page');

const mainMap = document.querySelector('.main-map');
const loaderMap = document.querySelector('.loader-map');

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

const views = {
    m: 'map',
    i: 'island'
}
let view = views.m;
let activeIslandIdx = null;

const mapViewAnimations = {
    bees: []
}

const islandToIslandAnimation = gsap.timeline({ paused: true });

const islands = [{
    name: 'central',
    sea: map.querySelector('.island-back.central .sea'),
    highlight: map.querySelector('.island-back.central .highlight'),
    land: Array.from(map.querySelectorAll('.island-back.central .land')),
    landShadow: Array.from(map.querySelectorAll('.island-back.central .land-shadow')),
    landColors: [
        map.querySelector('.island-back.central .land').getAttribute('fill'),
        map.querySelector('.island-back.central .land-shadow').getAttribute('fill'),
    ],
    content: map.querySelector('.island-content.central'),
    mapViewEls: {},
    detailedViewContainer: map.querySelector('.central .detailed-view'),
    detailedViewEls: {},
    detailedViewLoopedAnimations: [],
    mapToIslandAnimation: gsap.timeline({ paused: true }),
    hideIslandToMapAnimation: gsap.timeline({ paused: true }),
}, {
    name: 'denver',
    sea: map.querySelector('.island-back.denver .sea'),
    highlight: map.querySelector('.island-back.denver .highlight'),
    land: Array.from(map.querySelectorAll('.island-back.denver .land')),
    landColors: [
        map.querySelector('.island-back.denver .land').getAttribute('fill'),
        map.querySelector('.island-back.denver .land-shadow').getAttribute('fill'),
    ],
    landShadow: Array.from(map.querySelectorAll('.island-back.denver .land-shadow')),
    content: map.querySelector('.island-content.denver'),
    mapViewEls: {},
    detailedViewContainer: map.querySelector('.denver .detailed-view'),
    detailedViewEls: {},
    detailedViewLoopedAnimations: [],
    mapToIslandAnimation: gsap.timeline({ paused: true }),
    hideIslandToMapAnimation: gsap.timeline({ paused: true }),
}, {
    name: 'atlanta',
    sea: map.querySelector('.island-back.atlanta .sea'),
    highlight: map.querySelector('.island-back.atlanta .highlight'),
    land: Array.from(map.querySelectorAll('.island-back.atlanta .land')),
    landShadow: Array.from(map.querySelectorAll('.island-back.atlanta .land-shadow')),
    landColors: [
        map.querySelector('.island-back.atlanta .land').getAttribute('fill'),
        map.querySelector('.island-back.atlanta .land-shadow').getAttribute('fill'),
    ],
    content: map.querySelector('.island-content.atlanta'),
    mapViewEls: {},
    detailedViewContainer: map.querySelector('.atlanta .detailed-view'),
    detailedViewEls: {},
    detailedViewLoopedAnimations: [],
    mapToIslandAnimation: gsap.timeline({ paused: true }),
    hideIslandToMapAnimation: gsap.timeline({ paused: true }),
}, {
    name: 'bay',
    sea: map.querySelector('.island-back.bay .sea'),
    highlight: map.querySelector('.island-back.bay .highlight'),
    land: Array.from(map.querySelectorAll('.island-back.bay .land')),
    landShadow: Array.from(map.querySelectorAll('.island-back.bay .land-shadow')),
    landColors: [
        map.querySelector('.island-back.bay .land').getAttribute('fill'),
        map.querySelector('.island-back.bay .land-shadow').getAttribute('fill'),
    ],
    content: map.querySelector('.island-content.bay'),
    mapViewEls: {},
    detailedViewContainer: map.querySelector('.bay .detailed-view'),
    detailedViewEls: {},
    detailedViewLoopedAnimations: [],
    mapToIslandAnimation: gsap.timeline({ paused: true }),
    hideIslandToMapAnimation: gsap.timeline({ paused: true }),
}, {
    name: 'memphis',
    sea: map.querySelector('.island-back.memphis .sea'),
    highlight: map.querySelector('.island-back.memphis .highlight'),
    land: Array.from(map.querySelectorAll('.island-back.memphis .land')),
    landShadow: Array.from(map.querySelectorAll('.island-back.memphis .land-shadow')),
    landColors: [
        map.querySelector('.island-back.memphis .land').getAttribute('fill'),
        map.querySelector('.island-back.memphis .land-shadow').getAttribute('fill'),
    ],
    content: map.querySelector('.island-content.memphis'),
    mapViewEls: {},
    detailedViewContainer: map.querySelector('.memphis .detailed-view'),
    detailedViewEls: {},
    detailedViewLoopedAnimations: [],
    mapToIslandAnimation: gsap.timeline({ paused: true }),
    hideIslandToMapAnimation: gsap.timeline({ paused: true }),
}, {
    name: 'LA',
    sea: map.querySelector('.island-back.LA .sea'),
    highlight: map.querySelector('.island-back.LA .highlight'),
    land: Array.from(map.querySelectorAll('.island-back.LA .land')),
    landShadow: Array.from(map.querySelectorAll('.island-back.LA .land-shadow')),
    landColors: [
        map.querySelector('.island-back.LA .land').getAttribute('fill'),
        map.querySelector('.island-back.LA .land-shadow').getAttribute('fill'),
    ],
    content: map.querySelector('.island-content.LA'),
    mapViewEls: {},
    detailedViewContainer: map.querySelector('.LA .detailed-view'),
    detailedViewEls: {},
    detailedViewLoopedAnimations: [],
    mapToIslandAnimation: gsap.timeline({ paused: true }),
    hideIslandToMapAnimation: gsap.timeline({ paused: true }),
}, {
    name: 'chicago',
    sea: map.querySelector('.island-back.chicago .sea'),
    highlight: map.querySelector('.island-back.chicago .highlight'),
    land: Array.from(map.querySelectorAll('.island-back.chicago .land')),
    landShadow: Array.from(map.querySelectorAll('.island-back.chicago .land-shadow')),
    landColors: [
        map.querySelector('.island-back.chicago .land').getAttribute('fill'),
        map.querySelector('.island-back.chicago .land-shadow').getAttribute('fill'),
    ],
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
    mapToIslandAnimation: gsap.timeline({ paused: true }),
    hideIslandToMapAnimation: gsap.timeline({ paused: true }),
}];
