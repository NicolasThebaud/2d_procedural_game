import Chunk from "./Chunk.js";

class World {

    constructor(chunksX, chunksY, chunkSize) {
        this.chunksX = chunksX;
        this.chunksY = chunksY;
        this.chunkSize = chunkSize
        this.chunks = Array.apply(null, { length: this.chunksX })
            .map(() => new Array(this.chunksY));

        
    }

    generate() {
        for (let i = 0; i < this.chunksX; i++) {
            for (let j = 0; j < this.chunksY; j++) {
                // look for preexisting neighbouring chunks
                let iLookup = i > 0 ? this.chunks[i - 1][j] : null; // chunk above
                let jLookup = j > 0 ? this.chunks[i][j - 1] : null; // adjacent chunk (left)
                
                let mask = [ // take heightmap from neighbouring chunks if they exist
                    jLookup ? jLookup.sw : (iLookup ? iLookup.ne : -1), // north-west is left chunk's nort-east, or top chunk's sw
                    jLookup ? jLookup.se : -1,  // north-east is top's south-east
                    iLookup ? iLookup.se : -1,
                    -1
                ];

                let corners = this.getRandomCorners(mask); // generate corners that aren't lookups (-1)
                
                this.chunks[i][j] = (new Chunk(...corners, this.chunkSize)).initChunk();
            }
        }
    }

    getRandomCorners(mask) {
        return mask.map(corner => corner > -1 ? corner : this.rng());
    }
      
    rng() {
        return ~~(Math.random() * 9) + 1;
    }
};

export default World;