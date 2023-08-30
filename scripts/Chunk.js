class Chunk {
    constructor(nw, ne, sw, se, size) {
      this.nw = nw;
      this.ne = ne;
      this.sw = sw;
      this.se = se;
      this.width = this.height = size;
      this.cells = [];
      this.steps = Array.apply(null, {length: size})
        .map((_, i) => i / (size - 1));
    }   
    
    initChunk() {
        const cells = [];
        
        for (let y = 0; y < this.height; y++) {
          cells[y] = []; // create a new line

          for (let x = 0; x < this.width; x++) {
            let topH = this.nw + this.steps[x] * (this.ne - this.nw);
            let botH = this.sw + this.steps[x] * (this.se - this.sw);
            let cellHeight = topH + this.steps[y] * (botH - topH);
            
            cells[y][x] = Math.round(cellHeight + (Math.random() / (cellHeight > 6 ? 2 : 8)));
          }
        }
    
        return this.cells = cells, this;
    }
};

export default Chunk;