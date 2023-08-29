class World {

    constructor(chunksX, chunksY, chunkSize) {
        this.chunksX = chunksX;
        this.chunksY = chunksY;
        this.chunkSize = chunkSize
        this.chunks = Array.apply(null, { length: this.chunksX })
            .map(() => new Array(this.chunksY));
    }
};

export default {World};