const container = document.querySelector('.full-page');

const map = document.querySelector('svg.map');

const modal = document.querySelector('.modal');
const modalContentContainer = document.querySelector('.modal-content');
const modalCloseBtn = document.querySelector('#close-modal-btn');

const loaderMap = map.querySelector('.loader-map');
const loaderSea = map.querySelector('.loader-sea');
const loaderLand = map.querySelector('.loader-land');
const loaderLandEls = Array.from(map.querySelectorAll('.loader-els g *'));
const loaderStates = Array.from(map.querySelectorAll('.loader-states > g'));
const loaderWhale = map.querySelector('.loader-whale');
const loaderClouds = Array.from(map.querySelectorAll('.loader-clouds > *'));

const mainMapWrapper = map.querySelector('.main-map');

const mainRoad = map.querySelector('.main-road');
const mapBack = map.querySelector('.map-back');
const mainMapPlaneContainer = map.querySelector('.main-map-plane-container');
const mainMapPlane = map.querySelector('.main-map-plane');
const crosswalks = map.querySelector('.crosswalks');

const ferrisWheelAnimated = document.querySelector('.ferris-wheel-animated');
const ferrisWheelRotatingPart = ferrisWheelAnimated.querySelector('.ferris-wheel-rotating');
const ferrisWheelCabins = Array.from(ferrisWheelAnimated.querySelectorAll('.ferris-wheel-cabins > path'));

const bees = Array.from(map.querySelectorAll('.bee'));
const beesWrappers = Array.from(map.querySelectorAll('.bee-wrapper'));
const beesTrajectories = Array.from(map.querySelectorAll('.bee-trajectory'));
const titles = Array.from(map.querySelectorAll('.titles'));

const bird = map.querySelector('.bird');
const birdWrapper = document.querySelector('.bird-symbol-wrapper');
const birdWing = document.querySelector('.bird-wing');
const birdTrajectories = Array.from(map.querySelectorAll('.bird-trajectories > *'));

const mainMapBoat = map.querySelector('.main-map-boat');

const d3Svg = d3.select("svg.map");
const d3SvgMainMap = d3Svg.select(".main-map");

const zoomingControls = document.querySelector('.zooming-controls');
const toMapBtn = document.querySelector('#go-to-map-btn');
const zoomInBtn = document.querySelector('#zoom-in-btn');
const zoomOutBtn = document.querySelector('#zoom-out-btn');

let currentZoomTransform = d3.zoomIdentity;

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

const beesAnimations = [ gsap.timeline({ repeat: -1 }), gsap.timeline({ repeat: -1 }) ];
const mainBoatAnimation = gsap.timeline({ repeat: -1 });
const ferrisWheelAnimation = gsap.timeline({ repeat: -1 });
const birdAnimations = [ gsap.timeline({ repeat: -1, yoyo: true }), gsap.timeline({ repeat: -1 }) ];


const islandToIslandAnimation = gsap.timeline({ paused: true });

const peopleFstColoredElements = document.querySelectorAll('.fst-color');
const peopleScdColoredElements = document.querySelectorAll('.scd-color');
const peopleTrdColoredElements = document.querySelectorAll('.trd-color');

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
    detailedViewContainer: map.querySelectorAll('.central .detailed-view'),
    detailedViewEls: {
        toScale: Array.from(map.querySelectorAll('.central .detailed-view .to-scale > *')),
        toScaleCentered: Array.from(map.querySelectorAll('.central .detailed-view .to-scale-center > *')),
        toFade: Array.from(map.querySelectorAll('.central .detailed-view .to-fade > *')),
        corn: {
            leaf: document.querySelector('.central-corn-leaf'),
            cob: document.querySelector('.central-corn-cob'),
            stem: document.querySelector('.central-corn-stem'),
            curve: document.querySelector('.central-corn-curve'),
            beans: Array.from(document.querySelectorAll('.central-corn-beans > g')),
        },
        cart: map.querySelector('.central .cart'),
        tools: Array.from(map.querySelectorAll('.central .tools > *')),
    },
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
    peopleColors: [ '#324c93', '#4059ad', '#526eb2' ],
    landShadow: Array.from(map.querySelectorAll('.island-back.denver .land-shadow')),
    content: map.querySelector('.island-content.denver'),
    mapViewEls: {
        toScale: Array.from(map.querySelectorAll('.denver .map-view .to-scale > *')),
        toFade: Array.from(map.querySelectorAll('.denver .map-view .to-fade > *')),
        toDrop: Array.from(map.querySelectorAll('.denver .map-view .to-drop > *')),
    },
    detailedViewContainer: map.querySelector('.denver .detailed-view'),
    detailedViewEls: {
        roads: map.querySelector('.denver .detailed-view .roads'),
        toScale: Array.from(map.querySelectorAll('.denver .detailed-view .to-scale > *')),
        toFade: Array.from(map.querySelectorAll('.denver .detailed-view .to-fade > *')),
        toDrop: Array.from(map.querySelectorAll('.denver .detailed-view .to-drop > *')),
        planes: Array.from(map.querySelectorAll('.denver .detailed-view .plane')),
        bear: map.querySelector('.denver .detailed-view .bear'),
        ball: map.querySelector('.denver .detailed-view .ball'),
        boat: map.querySelector('.denver .detailed-view .yellow-boat'),
    },
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
    peopleColors: [ '#21505b', '#2e6171', '#327484' ],
    content: map.querySelector('.island-content.atlanta'),
    mapViewEls: {
        toScale: Array.from(map.querySelectorAll('.atlanta .map-view .to-scale > *')),
        toFade: Array.from(map.querySelectorAll('.atlanta .map-view .to-fade > *')),
        toDrop: Array.from(map.querySelectorAll('.atlanta .map-view .to-drop > *')),
    },
    detailedViewContainer: map.querySelector('.atlanta .detailed-view'),
    detailedViewEls: {
        roads: map.querySelector('.atlanta .detailed-view .roads'),
        toScale: Array.from(map.querySelectorAll('.atlanta .detailed-view .to-scale > *')),
        toFade: Array.from(map.querySelectorAll('.atlanta .detailed-view .to-fade > *')),
        toDrop: Array.from(map.querySelectorAll('.atlanta .detailed-view .to-drop > *')),
        plane: map.querySelector('.atlanta .detailed-view .plane'),
        bird: map.querySelector('.atlanta .detailed-view .bird'),
    },
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
    peopleColors: [ '#168c99', '#009fb7', '#05b7c9' ],
    content: map.querySelector('.island-content.bay'),
    mapViewEls: {
        toScale: Array.from(map.querySelectorAll('.bay .map-view .to-scale > *')),
        toFade: Array.from(map.querySelectorAll('.bay .map-view .to-fade > *')),
    },
    bayTowers: Array.from(map.querySelectorAll('.island-content.bay .bay-towers')),
    balloons: Array.from(map.querySelectorAll('.island-content.bay .balloon')),
    balloonsTrajectories: Array.from(map.querySelectorAll('.island-content.bay .balloon-trajectory')),
    detailedViewContainer: map.querySelector('.bay .detailed-view'),
    detailedViewEls: {
        roads: map.querySelector('.bay .detailed-view .roads'),
        toScale: Array.from(map.querySelectorAll('.bay .detailed-view .to-scale > *')),
        toFade: Array.from(map.querySelectorAll('.bay .detailed-view .to-fade > *')),
        toDrop: Array.from(map.querySelectorAll('.bay .detailed-view .to-drop > *')),
        people: Array.from(map.querySelectorAll('.bay .detailed-view .people > *')),
        ship: map.querySelector('.bay .detailed-view .ship'),
        plane: map.querySelector('.bay .detailed-view .plane'),
    },
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
    peopleColors: [ '#ddb94a', '#ffdc5e', '#ffe180' ],
    content: map.querySelector('.island-content.memphis'),
    mapViewEls: {
        toScale: Array.from(map.querySelectorAll('.memphis .map-view .to-scale > *')),
        toFade: Array.from(map.querySelectorAll('.memphis .map-view .to-fade > *')),
        neon: map.querySelector('.memphis .detailed-view .neon'),
    },
    detailedViewContainer: map.querySelectorAll('.memphis .detailed-view'),
    detailedViewEls: {
        roads: map.querySelector('.memphis .detailed-view .roads'),
        toScale: Array.from(map.querySelectorAll('.memphis .detailed-view .to-scale > *')),
        toFade: Array.from(map.querySelectorAll('.memphis .detailed-view .to-fade > *')),
        toDrop: Array.from(map.querySelectorAll('.memphis .detailed-view .to-drop > *')),
        plane: map.querySelector('.memphis .detailed-view .plane'),
    },
    neon: map.querySelector('.memphis .neon'),
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
    peopleColors: [ '#a33636', '#b0413e', '#c15959' ],
    content: map.querySelector('.island-content.LA'),
    mapViewEls: {
        toScale: Array.from(map.querySelectorAll('.LA .map-view .to-scale > *')),
        toFade: Array.from(map.querySelectorAll('.LA .map-view .to-fade > *')),
        van: Array.from(map.querySelectorAll('.LA .map-view .van')),
        bench: Array.from(map.querySelectorAll('.LA .map-view .bench')),
    },
    detailedViewContainer: map.querySelector('.LA .detailed-view'),
    detailedViewEls: {
        roads: map.querySelector('.LA .detailed-view .roads'),
        toScale: Array.from(map.querySelectorAll('.LA .detailed-view .to-scale > *')),
        toFade: Array.from(map.querySelectorAll('.LA .detailed-view .to-fade > *')),
        toDrop: Array.from(map.querySelectorAll('.LA .detailed-view .to-drop > *')),
        people: Array.from(map.querySelectorAll('.LA .detailed-view .people > *')),
        van: map.querySelector('.LA .detailed-view .van'),
        car: map.querySelector('.LA .detailed-view .car'),
        whaleContainer: map.querySelector('.LA .detailed-view .whale-container'),
        whale: map.querySelector('.LA .detailed-view .whale'),
        surf: map.querySelector('.LA .detailed-view .surf-board'),
        flags: map.querySelector('.LA .detailed-view .flags'),
        hollywood: Array.from(map.querySelectorAll('.LA .detailed-view .hollywood-letters > *')),
        bench: map.querySelector('.LA .detailed-view .bench'),
    },
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
    peopleColors: [ '#865ebf', '#9d75cb', '#b08de2' ],
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
        people: Array.from(map.querySelectorAll('.LA .detailed-view .people > *')),
        roads: map.querySelector('.chicago .detailed-view .roads'),
        ship: map.querySelector('.chicago .detailed-view .ship'),
        plane: map.querySelector('.chicago .detailed-view .plane'),
    },
    detailedViewLoopedAnimations: [],
    mapToIslandAnimation: gsap.timeline({ paused: true }),
    hideIslandToMapAnimation: gsap.timeline({ paused: true }),
}];
