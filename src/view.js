var stats = new takeFrom(3, 3, 9);
var Images = /** @class */ (function () {
    function Images() {
        this.addGrid();
        this.addTitle();
        this.addRestart();
        this.makeResponsive();
    }
    Images.prototype.addGrid = function () {
        this.grid = new game.Sprite.fromImage("../assets/grid.png");
        game.app.stage.addChild(this.grid);
        this.grid.width = game.app.renderer.width / 2;
        this.grid.height = game.app.renderer.height / 2;
        this.grid.x = game.app.renderer.width / 2 - this.grid.width / 2;
        this.grid.y = game.app.renderer.height / 2 - this.grid.height / 2;
    };
    Images.prototype.addTitle = function () {
        this.TicTacToe = new game.Sprite.fromImage("../assets/TicTacToe.png");
        game.app.stage.addChild(this.TicTacToe);
        this.TicTacToe.width = game.app.renderer.width / 6;
        this.TicTacToe.height = game.app.renderer.height / 6;
        this.TicTacToe.x = this.grid.x + this.grid.width / 2 - this.TicTacToe.width / 2;
        this.TicTacToe.y = this.grid.y / 2 - this.TicTacToe.width / 2;
    };
    Images.prototype.addRestart = function () {
        this.restart = new game.Sprite.fromImage("../assets/restart.png");
        game.app.stage.addChild(this.restart);
        this.restart.width = game.app.renderer.width / 8;
        this.restart.height = game.app.renderer.height / 8;
        this.restart.x = this.grid.x + this.grid.width / 2 - this.restart.width / 2;
        this.restart.y = this.grid.y + this.grid.height + this.restart.height / 2;
        this.restart.interactive = true;
        this.restart.buttonMode = true;
    };
    Images.prototype.makeResponsive = function () {
        var countH = this.grid.y;
        for (var i = 0; i < stats.row; i++) {
            var countW = 0;
            var _loop_1 = function (j) {
                var rectangle = new PIXI.Graphics();
                rectangle.beginFill(0x66CCFF);
                rectangle.drawRect(0, 0, this_1.grid.width / stats.col, this_1.grid.height / stats.row);
                rectangle.x = this_1.grid.x + countW;
                rectangle.y = countH;
                rectangle.interactive = true;
                rectangle.buttonMode = true;
                rectangle.alpha = 0;
                rectangle.endFill();
                game.app.stage.addChild(rectangle);
                rectangle.on('mousedown', function () {
                    var xPlay = new game.Sprite.fromImage("../assets/x.png");
                    game.app.stage.addChild(xPlay);
                    xPlay.x = rectangle.x + rectangle.width / 2 - xPlay.width / 2;
                    xPlay.y = rectangle.y + rectangle.height / 2 - xPlay.height / 2;
                });
                countW = countW + (this_1.grid.width / stats.col);
            };
            var this_1 = this;
            for (var j = 0; j < stats.col; j++) {
                _loop_1(j);
            }
            countH = countH + (this.grid.height / stats.row);
        }
    };
    return Images;
}());
