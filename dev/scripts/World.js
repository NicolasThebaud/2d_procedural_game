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
                    jLookup ? jLookup.ne : (iLookup ? iLookup.sw : -1), // north-west is left chunk's nort-east, or top chunk's sw
                    iLookup ? iLookup.se : -1,  // north-east is top's south-east
                    jLookup ? jLookup.se : -1,
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

    genExtraXChunk() {
        const newColumn = [];
        const prevColumn = this.chunks[this.chunksX - 1]; // last row
        
        for (const i in prevColumn) {
            const chunk = prevColumn[i];
            const northEast = newColumn.length ? newColumn[newColumn.length - 1].se : this.rng();
            const newC = new Chunk(chunk.ne, northEast, chunk.se, this.rng(), this.chunkSize);
          
            newC.initChunk();
            newColumn.push(newC);      
        }
        
        this.chunks.push(newColumn);
        this.chunksX++;
    }
      
    genExtraYChunk() {
        const yLookup = this.chunks.map(row => row[row.length - 1]);
        let swLookup;
        
        for (let j in yLookup) {
            const chunk = yLookup[j];
            const newC = new Chunk(
                chunk.sw,
                chunk.se,
                (swLookup ? swLookup : this.rng()),
                this.rng(),
                this.chunkSize
            );
            
            swLookup = newC.se;
            newC.initChunk();
            this.chunks[j].push(newC);
        }
        
        this.chunksY++;
    }
};

export default World;