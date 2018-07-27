"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Images = /** @class */ (function () {
    function Images() {
        this.addGrid();
        this.addTitle();
        this.addRestart();
    }
    Images.prototype.addGrid = function () {
        this.grid = new Sprite.fromImage("this.grid.png");
        app.stage.addChild(this.grid);
        this.grid.width = app.renderer.width / 2;
        this.grid.height = app.renderer.height / 2;
        this.grid.x = app.renderer.width / 2 - this.grid.width / 2;
        this.grid.y = app.renderer.height / 2 - this.grid.height / 2;
    };
    Images.prototype.addTitle = function () {
        this.TicTacToe = new Sprite.fromImage("this.TicTacToe.png");
        app.stage.addChild(this.TicTacToe);
        this.TicTacToe.width = app.renderer.width / 3;
        this.TicTacToe.height = app.renderer.height / 3;
        this.TicTacToe.x = this.grid.x;
    };
    Images.prototype.addRestart = function () {
        this.restart = new Sprite(id["this.restart.png"]);
        app.stage.addChild(this.restart);
        this.restart.width = app.renderer.width / 8;
        this.restart.height = app.renderer.height / 8;
        this.restart.x = this.grid.x + this.grid.width / 2 - this.restart.width / 2;
        this.restart.y = this.grid.y + this.grid.height + this.restart.height / 2;
        this.restart.interactive = true;
        this.restart.buttonMode = true;
    };
    return Images;
}());
exports.Images = Images;
