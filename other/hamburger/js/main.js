let size = document.getElementsByName('size')
console.log(size)


class Burger {
    constructor () {
        this.size = _getSize()
        this.stuff = _getstuff()
        this.toppings = _getToppings()
    }
    
    _getSize() {
        let size = document.querySelector(`input[name="${size}"]:checked`)
        console.log(size)
    }

}