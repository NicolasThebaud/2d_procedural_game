import BIOMES from "./BiomeEnum.js"

class BiomeGenerator {
    constructor(chunksX, chunksY) {
        this.chunksX = chunksX;
        this.chunksY = chunksY;
        
        this.decay = 0.99;
        this.chance = 100;
        this.neighbourQueue = [];
        this.visited = {};
        this.terrain = [];
        this.size = 6;
    }

    registerCanvas(canvasObj) {
        this.canvasObj = canvasObj;
        this.ctx = canvasObj.getContext("2d");

        this.ctx.fillStyle = BIOMES["0"].color;
        this.ctx.fillRect(0, 0, this.size * this.chunksX, this.size * this.chunksY);
    }

    getBiomeAt (x, y) {
        // console.warn("?", this.terrain[x][y], BIOMES[this.terrain[x][y] || 0])
        return BIOMES[this.terrain[x][y] || 0];
    }

    generate() {
        [BIOMES["1"], BIOMES["2"], BIOMES["5"]].forEach((biome) => {
            for(let b = 0; b < Math.floor((Math.random() * biome.weight) + 2); b++) {
                this.chance = 100;
                this.spread(...this.__findUnoccupied(), biome);
            }
        });
    }

    spread (x, y, biome) {
        this.spreadCell(x, y, biome);
        
        if (!this.neighbourQueue.length) { return; }
        do {
            this.spreadCell(...this.neighbourQueue.shift(), biome);
        } while (this.neighbourQueue.length);
    }

    spreadCell (x, y, biome) {
        this.__fill(x, y, biome.color);
        this.visited[`${x}-${y}`] = true;
        this.terrain[y] = this.terrain[y] || [];
        this.terrain[y][x] = biome.id;

        if (Math.random() * 100 <= this.chance) {
            [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]].forEach(([i, j]) => {
                if (!this.visited[`${i}-${j}`]
                    && i >= 0 && i < this.chunksX
                    && j >= 0 && j < this.chunksY) {
                    this.visited[`${i}-${j}`] = true;
                    this.neighbourQueue.push([i, j]);
                  }
            });
            this.chance *= this.decay;
        }
    }

    __fill (x, y, theme) {
        this.ctx.fillStyle = theme;
        this.ctx.fillRect(x * this.size, y * this.size, this.size, this.size);
    }

    __findUnoccupied () {
        let x, y, failsafe = 100;
  
        do {
            x = Math.floor(Math.random() * this.chunksX);
            y = Math.floor(Math.random() * this.chunksY);
            failsafe--;
        } while (this.visited[`${x}-${y}`] && failsafe);
        
        return !failsafe ? [-1, -1] : [x, y];
    }
}

export default BiomeGenerator;