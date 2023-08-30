import World from "./scripts/World.js";
import Chunk from "./scripts/Chunk.js";


const debugHeightmap = false;
const tileSize = 12;
const colors = [
    "#156099",
    "#19729f",
    "#2988ae",
    "#309ec0",
    "#c2b26f",
    "#099e00",
    "#008800",
    "#006600",
    "#004400"
];

const draw = function(chunkOffsets = [0, 0]) {
    const ctx = document.getElementById("world").getContext("2d");
    
    ctx.clearRect(0, 0, 3000, 3000);
    
    for (let row in world.chunks) {
        const rowData = world.chunks[row];
        for (let chunk in rowData) {
            for (let x in rowData[chunk].cells) {
                const cellData = rowData[chunk].cells[x];
                for (let y in cellData) {
                    let offsetx = (world.chunkSize) * (chunk + chunkOffsets[0]) * tileSize;
                    let offsety = (world.chunkSize) * (row + chunkOffsets[1]) * tileSize;
                    ctx.fillStyle = colors[cellData[y] - 1];
                    ctx.fillRect(offsety + tileSize * y, offsetx + tileSize * x, tileSize, tileSize);
                    
                    if (debugHeightmap) {
                        ctx.fillStyle = ([0, 15].includes(+x) || [0, 15].includes(+y)) ? "#FFFFFF66" : "#00000066";
                        ctx.font = "12px serif";
                        ctx.fillText(world.chunks[row][chunk].cells[x][y], (offsety + tileSize * y), (offsetx + tileSize * x) + 12);
                    }
                }
            }
        }
    }
}

// instanciate a 1x1 16px Chunk world
const world = new World(1, 1, 16);

world.generate();
draw();







// DEMO
const ctxDemo = document.getElementById("demo").getContext("2d");

ctxDemo.clearRect(0, 0, 150, 150);
const demoSize = 19;
const demo = [
    [2, 4, 5, 7, 8],
    [4, 4, 5, 6, 7],
    [5, 5, 5, 5, 6],
    [7, 6, 5, 5, 5],
    [8, 7, 6, 5, 5]
];
for (let x in demo) {
    for (let y in demo[x]) {
        ctxDemo.fillStyle = colors[demo[x][y] - 1];
        ctxDemo.fillRect(demoSize * y, demoSize * x, demoSize, demoSize);
    }
}