import Renderer from "./scripts/Renderer.js";
import World from "./scripts/World.js";


const canvasObj = document.getElementById("world");

let chunkSize = 16;
let tileSize = 12;
const chunkResolution = chunkSize * tileSize;

const renderer = new Renderer(chunkSize, tileSize);
const world = new World(4, 4, chunkSize);

renderer.registerCanvas(canvasObj);
world.registerRenderer(renderer);
world.generate();


document.addEventListener("keyup", (e) => {
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