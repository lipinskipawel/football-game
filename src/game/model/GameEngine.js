import Point from "./Point";
import preparePoint from "./StartingPoints";

class GameEngine {
  constructor(width, height) {
    this.points = this.getAllDots(width, height);
    this.ball = this.points[58];
    this.movesHistory = [this.ball];
  }

  toPoint(x, y) {
    const realCoordinates = this.points
      .map((point, index) => {
        const distance = point.computeDistance(x, y);
        const result = { distance: distance, index: index };
        return result;
      })
      .sort((a, b) => {
        return a.distance - b.distance;
      })
      .slice(0, 4);
    return this.points[realCoordinates[0].index];
  }

  getAllDots(width, height) {
    const x = this._computeXes(width);
    const y = this._computeYes(height);
    var index = 0;
    var points = [];

    for (var i = 0; i < y.length; i++) {
      for (var j = 0; j < x.length; j++) {
        const point = new Point(x[j], y[i], index);
        points.push(preparePoint(point));
        index++;
      }
    }
    return points;
  }

  _computeXes(width) {
    const spaceBetweenDots = width / 9;
    const startingPoint = spaceBetweenDots / 2;
    const xes = new Array(9);

    for (var i = 0; i < 9; i++) {
      xes[i] = startingPoint + spaceBetweenDots * i;
    }
    return xes;
  }

  _computeYes(width) {
    const spaceBetweenDots = width / 13;
    const startingPoint = spaceBetweenDots / 2;
    const xes = new Array(9);

    for (var i = 0; i < 13; i++) {
      xes[i] = startingPoint + spaceBetweenDots * i;
    }
    return xes;
  }

  helper_printing_all_points() {
    return this.points;
  }

  makeMove(point) {
    this.ball.makeMove(point);
    this.points[point.index].makeMove(this.ball);
    this.ball = this.points[point.index];
    this.movesHistory.push(point);
  }

  canMove(point) {
    return this.ball.canMove(point.index);
  }
}

export default GameEngine;
