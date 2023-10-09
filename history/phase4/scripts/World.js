import Chunk from "./Chunk.js";

class World {
    constructor(chunksX, chunksY, chunkSize) {
        this.chunksX = chunksX;
        this.chunksY = chunksY;
        this.chunkSize = chunkSize
        this.chunks = Array.apply(null, { length: this.chunksY }) // vertical rows
            .map(() => new Array(this.chunksX)); // chunks in one row
    }

    registerRenderer(instance) {
        this.renderer = instance;
    }

    registerBiomeGenerator(instance) {
        this.biomeGenerator = instance;
    }

    generate() {
        this.biomeGenerator.generate();
        // this.renderer.updateWorldSize(this.chunksX, this.chunksY);

        for (let i = 0; i < this.chunksY; i++) {
            for (let j = 0; j < this.chunksX; j++) {
                // look for preexisting neighbouring chunks
                let iLookup = i > 0 ? this.chunks[i - 1][j] : null; // chunk above
                let jLookup = j > 0 ? this.chunks[i][j - 1] : null; // adjacent chunk (left)
                
                let mask = [ // take heightmap from neighbouring chunks if they exist
                    jLookup ? jLookup.ne : (iLookup ? iLookup.sw : -1), // north-west is left chunk's nort-east, or top chunk's sw
                    iLookup ? iLookup.se : -1,  // north-east is top's south-east
                    jLookup ? jLookup.se : -1,
                    -1
                ];

                let corners = this.getRandomCorners(mask, this.biomeGenerator.getBiomeAt(i, j)); // generate corners that aren't lookups (-1)
                
                this.chunks[i][j] = (new Chunk(...corners, this.chunkSize)).initChunk();
                this.renderer.renderSingleChunk(i, j, this.chunks[i][j]);
            }
        }
    }

    getRandomCorners(mask, biome) {
        return mask.map(corner => corner > -1 ? corner : this.rng(biome.minH, biome.maxH));
    }
      
    rng(min, max) {
        return ~~(Math.random() * (max - (min - 1))) + min;
        // return ~~(Math.random() * 9) + 1;
    }

    genExtraXChunks() {
        const xLookup = this.chunks.map(row => row[row.length - 1]);
        let neLookup;

        // this.renderer.updateWorldSize(this.chunksX + 1, this.chunksY);

        for (let j in xLookup) {
            const chunk = xLookup[j];
            const newC = new Chunk(
                chunk.ne,
                (neLookup ? neLookup : this.rng()),
                chunk.se,
                this.rng(),
                this.chunkSize
            );
            
            neLookup = newC.se;
            newC.initChunk();
            this.chunks[j].push(newC);
        }

        this.chunksX++;
        this.renderer.renderChunks(this.chunks);
        // this.renderer.scroll(0); // scroll to the right
    }
      
    genExtraYChunks() {
        const newRow = [];
        const prevRow = this.chunks[this.chunksY - 1]; // last row
        let swLookup;

        // this.renderer.updateWorldSize(this.chunksX, this.chunksY + 1);

        for (let i in prevRow) {
            const chunk = prevRow[i];
            const newC = new Chunk(
                chunk.sw,
                chunk.se,
                (swLookup ? swLookup : this.rng()),
                this.rng(),
                this.chunkSize
            );
        
            swLookup = newC.se;
            newC.initChunk();
            newRow.push(newC);
        }

        this.chunks.push(newRow);
        this.chunksY++;
        this.renderer.renderChunks(this.chunks);
        // this.renderer.scroll(1); // scroll to the bottom
    }
};

export default World;