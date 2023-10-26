import Renderer from "./scripts/Renderer.js";
import World from "./scripts/World.js";
import Player from "./scripts/Player.js"


const canvasObj = document.getElementById("world");
const playerLayer = document.getElementById("player").getContext("2d");

let chunkSize = 16;
let tileSize = 6;
const chunkResolution = chunkSize * tileSize;

const renderer = new Renderer(chunkSize, tileSize);
const world = new World(5, 5, chunkSize);
const player = new Player(0, 0);

renderer.registerCanvas(canvasObj);
world.registerRenderer(renderer);
world.generate();

const renderPlayer = (i, j) => {
    playerLayer.clearRect(0, 0, 1920, 1080);
    playerLayer.strokeStyle = "#D80032";
    playerLayer.lineWidth = 4;
    playerLayer.strokeRect(j * chunkResolution, i * chunkResolution, chunkResolution, chunkResolution);
};
renderPlayer(...player.getCoords());

document.addEventListener("keyup", (e) => {
    const container = document.querySelector("#container");
    const discoverNeighbours = (i, j) => {
        world.discover(i, j);
        world.discover(i - 1, j);
        world.discover(i + 1, j);
        world.discover(i, j - 1);
        world.discover(i, j + 1);
    };

    switch(e.key) {
        case "d": {
            player.right();
            const coords = player.getCoords();
            renderPlayer(...coords);
            discoverNeighbours(...coords);
            break;
        }
        case "q": {
            player.left();
            const coords = player.getCoords();
            renderPlayer(...coords);
            discoverNeighbours(...coords);
            break;
        }
        case "s": {
            player.down();
            const coords = player.getCoords();
            renderPlayer(...coords);
            discoverNeighbours(...coords);
            break;
        }
        case "z": {
            player.up();
            const coords = player.getCoords();
            renderPlayer(...coords);
            discoverNeighbours(...coords);
            break;
        }
    }
});