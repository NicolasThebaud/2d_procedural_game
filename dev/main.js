import Renderer from "./scripts/Renderer.js";
import World from "./scripts/World.js";


const canvasObj = document.getElementById("world");
const ctx = canvasObj.getContext("2d");

let chunkSize = 16;
let tileSize = 12;
const chunkResolution = chunkSize * tileSize;

const renderer = new Renderer(chunkSize, tileSize);

renderer.registerCanvas(canvasObj);
// /**/ renderer.enableHeightmapDebug();
// /**/ renderer.enableChunkDebug();

const world = new World(4, 4, chunkSize);

world.registerRenderer(renderer);
world.generate();

// DEBUG
// let [boxX, boxY] = [0, 0];

/* document.addEventListener("mousemove", (e) => {
    const arrow = document.querySelector("#arrow");
    const arrow_down = document.querySelector("#arrow_down");

    [boxX, boxY] = [
        Math.floor(e.offsetX / chunkResolution),
        Math.floor(e.offsetY / chunkResolution)
    ];

    arrow.style.opacity = 0;
    arrow_down.style.opacity = 0;

    if (boxX >= world.chunksX) {
        let svg_ = arrow.querySelector("svg");
        let {width, height} = svg_.getBoundingClientRect();

        svg_.style.marginLeft = `${(chunkResolution - width) / 2}px`;
        svg_.style.marginTop = `${(chunkResolution - height) / 2}px`;
        
        arrow.style.width = `${chunkResolution}px`;
        arrow.style.height = `${chunkResolution}px`;
        arrow.style.opacity = 1;
        arrow.style.top = 0;
        arrow.style.left = world.chunksX * chunkResolution;
    } else if (boxY >= world.chunksY) {
        let svg_down = arrow_down.querySelector("svg");
        let {width, height} = svg_down.getBoundingClientRect();

        svg_down.style.marginLeft = `${(chunkResolution - width) / 2}px`;
        svg_down.style.marginTop = `${(chunkResolution - height) / 2}px`;
        
        arrow_down.style.width = `${chunkResolution}px`;
        arrow_down.style.height = `${chunkResolution}px`;
        arrow_down.style.opacity = 1;
        arrow_down.style.top = world.chunksY * chunkResolution;
        arrow_down.style.left = 0;
    }
});

document.addEventListener("mouseup", (e) => {
    e.stopPropagation();

    if (boxX >= world.chunksX) {
        world.genExtraXChunks();
    } else if (boxY >= world.chunksY) {
        world.genExtraYChunks();
    }
}); */

document.addEventListener("keyup", (e) => {
    /* if (keyName === "PageUp") {
        renderer.updateSizes(chunkSize, --tileSize, world.chunksX, world.chunksY);
        renderer.renderChunks(world.chunks);
    }
    if (keyName === "PageDown") {
        renderer.updateSizes(chunkSize, ++tileSize, world.chunksX, world.chunksY);
        renderer.renderChunks(world.chunks);
    } */

    const container = document.querySelector("#container");

    switch(e.key) {
        case "d": {
            if(container.scrollLeft > (container.scrollWidth - container.offsetWidth)) {
                world.genExtraXChunks();   
            } else {
                container.scrollTo(container.scrollLeft + (chunkResolution / 4), container.scrollTop);
            }
            break;
        }
        case "q": {
            container.scrollTo(container.scrollLeft - (chunkResolution / 4), container.scrollTop);
            break;
        }
        case "s": {
            if(container.scrollTop > (container.scrollHeight - container.offsetHeight)) {
                world.genExtraYChunks();   
            } else {
                container.scrollTo(container.scrollLeft, container.scrollTop + (chunkResolution / 4));
            }
            break;
        }
        case "z": {
            container.scrollTo(container.scrollLeft, container.scrollTop - (chunkResolution / 4));
            break;
        }
    }
});