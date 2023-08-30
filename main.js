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

const draw = function(chunkOffsets = 0) {
    const ctx = document.getElementById("world").getContext("2d");
    
    ctx.clearRect(0, 0, 3000, 3000);
    
    for (let cRow = 0; cRow < world.chunksX; cRow++) {
        const row = world.chunks[cRow];

        for (let cIndex = 0; cIndex < row.length; cIndex++) {
            const chunkData = row[cIndex].cells;

            for(let tRow = 0; tRow < chunkData.length; tRow++) {
                const tiles = chunkData[tRow];

                for (let tIndex = 0; tIndex < tiles.length; tIndex++) {
                    const tileHeight = tiles[tIndex];
                    const chunkWidth = world.chunkSize * tileSize; // nb of tiles on a chunk's side * the rendering size of one tile
                    const chunkOffsetX = chunkWidth * (cRow + chunkOffsets);
                    const chunkOffsetY = chunkWidth * (cIndex + chunkOffsets);
                    const tileOffsetX = tileSize * tRow; // offset within the chunk
                    const tileOffsetY = tileSize * tIndex;

                    ctx.fillStyle = colors[tileHeight - 1];
                    ctx.fillRect(
                        chunkOffsetY + tileOffsetY,
                        chunkOffsetX + tileOffsetX,
                        tileSize,
                        tileSize
                    );
                    
                    if (debugHeightmap) {
                        ctx.fillStyle = ([0, 15].includes(+tRow) || [0, 15].includes(+tIndex)) ? "#FFFFFF66" : "#00000066";
                        ctx.font = "12px serif";
                        ctx.fillText(tileHeight, chunkOffsetY + tileOffsetY, chunkOffsetX + tileOffsetX + 12);
                    }
                }
            }
        }
    }
}
const drawDebuggingChunks = () => {
    const canvasObj = document.getElementById("world");
    const ctx = canvasObj.getContext("2d");
    const expectedChunks = Math.ceil(canvasObj.width / chunkSize);
    const totalWidth = chunkSize * tileSize;

    for (let i = 0; i < expectedChunks; i++) {
        for (let j = 0; j < expectedChunks; j++) {
            ctx.fillStyle = "#BB252566";
            ctx.strokeRect(i * totalWidth, j * totalWidth, totalWidth, totalWidth);
        }
    }
}

// instanciate a 1x1 16px Chunk world
const chunkSize = 16;
const world = new World(2, 2, chunkSize);

world.generate();
draw();




// DEBUG
drawDebuggingChunks();


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