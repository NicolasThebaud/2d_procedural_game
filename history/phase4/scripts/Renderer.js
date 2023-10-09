class Renderer {
    constructor(chunkSize, tileSize) {
        this.chunkSize = chunkSize;
        this.tileSize = tileSize;
        this.chunkResolution = chunkSize * tileSize;
        this.colors = [
            "#19729f",
            "#2988ae",
            "#309ec0",
            "#28CC1F",
            "#099e00",
            "#008800",
            "#006600",
            "#A3927F",
            "#8D7B68",
            "#F5F5F5"
        ];
    }

    registerCanvas(canvasObj) {
        this.canvasObj = canvasObj;
        this.ctx = canvasObj.getContext("2d");
    }

    /* updateSizes(chunkSize, tileSize, chunksX, chunksY) {
        this.chunkSize = chunkSize;
        this.tileSize = tileSize;
        this.chunkResolution = chunkSize * tileSize;

        this.updateWorldSize(chunksX, chunksY);
    }

    enableHeightmapDebug() {
        this.debugHeightmap = true;
    }

    enableChunkDebug() {
        this.debugChunks = true;
    }

    updateWorldSize(width, height) {
        this.canvasObj.width = (width + 1) * this.chunkResolution;
        this.canvasObj.height = (height + 1) * this.chunkResolution;
    } */

    scroll(direction) {
        const container = this.canvasObj.parentElement;


        if (direction) {
            // scroll down
            container.scrollTo(container.scrollLeft, this.canvasObj.height);    
        } else {
            // scroll right
            container.scrollTo(this.canvasObj.width, container.scrollTop);
        }
    }

    renderSingleChunk(i, j, data) {
        for(let tRow = 0; tRow < data.cells.length; tRow++) {
            const tiles = data.cells[tRow];

            for (let tIndex = 0; tIndex < tiles.length; tIndex++) {
                const tileHeight = tiles[tIndex]; // heightmap
                const chunkOffsetX = this.chunkResolution * i;
                const chunkOffsetY = this.chunkResolution * j;
                const tileOffsetX = this.tileSize * tRow; // offset within the chunk
                const tileOffsetY = this.tileSize * tIndex;

                this.ctx.fillStyle = this.colors[tileHeight - 1];
                this.ctx.fillRect(
                    chunkOffsetY + tileOffsetY,
                    chunkOffsetX + tileOffsetX,
                    this.tileSize,
                    this.tileSize
                );
                
                if (this.debugHeightmap) {
                    this.ctx.fillStyle = ([0, 15].includes(+tRow) || [0, 15].includes(+tIndex)) ? "#FFFFFF66" : "#00000066";
                    this.ctx.font = this.tileSize + "px serif";
                    this.ctx.fillText(tileHeight, chunkOffsetY + tileOffsetY, chunkOffsetX + tileOffsetX + this.tileSize);
                }
            }
        }

        if (this.debugChunks) {
            this.ctx.fillStyle = "#BB252566";
            this.ctx.lineWidth = 2;

            this.ctx.strokeRect(j * this.chunkResolution, i * this.chunkResolution, this.chunkResolution, this.chunkResolution);
        }
    }

    renderChunks(worldData) {
        this.ctx.clearRect(0, 0, this.canvasObj.width, this.canvasObj.height)

        for (let rowIndex = 0; rowIndex < worldData.length; rowIndex++) {
            const row = worldData[rowIndex];

            for (let colIndex = 0; colIndex < row.length; colIndex++) {
                this.renderSingleChunk(rowIndex, colIndex, row[colIndex]);
            }
        }
    }
}

export default Renderer;