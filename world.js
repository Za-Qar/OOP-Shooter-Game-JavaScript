class World {
  constructor(height = 100, width = 100) {
    this.height = height;
    this.width = width;
    this.topLeft = { x: 0, y: height };
    this.topRight = { x: width, y: height };
    this.bottomLeft = { x: 0, y: 0 };
    this.bottomRight = { x: width, y: 0 };
  }
}
