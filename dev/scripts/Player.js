class Player {
    constructor() {
        this.i = 0;
        this.j = 0;
    }
    
    setCoords(i, j) {
        this.i = i;
        this.j = j;
    }

    getCoords() {
        return [this.i, this.j];
    }

    down() {
        this.i++;
    }
    up() {
        this.i--;
    }
    left() {
        this.j--;
    }
    right() {
        this.j++;
    }
}

export default Player;
