var stats = new takeFrom(3, 3, 9);
var Images = /** @class */ (function () {
    function Images() {
        this.turn = 'x';
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
                rectangle.turn = '';
                rectangle.name = i + "," + j;
                rectangle.endFill();
                game.app.stage.addChild(rectangle);
                rectangle.on('mousedown', function () {
                    if (this.turn === 'x') {
                        var xPlay = new game.Sprite.fromImage("../assets/x.png");
                        game.app.stage.addChild(xPlay);
                        xPlay.x = rectangle.x + rectangle.width / 2 - xPlay.width / 2;
                        xPlay.y = rectangle.y + rectangle.height / 2 - xPlay.height / 2;
                        rectangle.turn = 'x';
                        rectangle.interactive = false;
                        rectangle.buttonMode = false;
                        this.turn = 'o';
                    }
                    else {
                        var oPlay = new game.Sprite.fromImage("../assets/o.png");
                        game.app.stage.addChild(oPlay);
                        oPlay.x = rectangle.x + rectangle.width / 2 - oPlay.width / 2;
                        oPlay.y = rectangle.y + rectangle.height / 2 - oPlay.height / 2;
                        rectangle.turn = 'o';
                        rectangle.interactive = false;
                        rectangle.buttonMode = false;
                        this.turn = 'x';
                    }
                    var that = this;
                    var checkDiagonal = function () {
                        return new Promise(function (resolve, reject) {
                            if (that.diagonal())
                                reject();
                            else
                                resolve();
                        });
                    };
                    var checkColumn = function () {
                        return new Promise(function (resolve, reject) {
                            if (that.anyColumn())
                                reject();
                            else
                                resolve();
                        });
                    };
                    var checkRow = function () {
                        return new Promise(function (resolve, reject) {
                            if (that.anyRow())
                                reject();
                            else
                                resolve();
                        });
                    };
                    var checkOppDiagonal = function () {
                        return new Promise(function (resolve, reject) {
                            if (that.oppDiagonal())
                                reject();
                            else
                                resolve();
                        });
                    };
                    var checkTerminal = function () {
                        return new Promise(function (resolve, reject) {
                            if (that.terminal())
                                resolve();
                            else
                                reject();
                        });
                    };
                    checkDiagonal().then(function () { return checkColumn(); }, function () { return alert("player " + rectangle.turn + " has won"); })
                        .then(function () { return checkRow(); }, function () { return alert("player " + rectangle.turn + " has won"); })
                        .then(function () { return checkOppDiagonal(); }, function () { return alert("player " + rectangle.turn + " has won"); })
                        .then(function () { return checkTerminal(); }, function () { return alert("player " + rectangle.turn + " has won"); })
                        .then(function () { return alert("game has drawn"); }, null);
                }, this_1);
                countW = countW + (this_1.grid.width / stats.col);
            };
            var this_1 = this;
            for (var j = 0; j < stats.col; j++) {
                _loop_1(j);
            }
            countH = countH + (this.grid.height / stats.row);
        }
    };
    Images.prototype.diagonal = function () {
        var checkD = game.app.stage.getChildByName(0 + "," + 0).turn;
        if (checkD === '')
            return false;
        for (var i = 1; i < stats.row; i++) {
            for (var j = 1; j < stats.col; j++) {
                if ((i === j) && (checkD !== game.app.stage.getChildByName(i + "," + j).turn))
                    return false;
            }
        }
        return true;
    };
    ;
    Images.prototype.anyColumn = function () {
        var flagC = 0;
        for (var i = 0; i < stats.row; i++) {
            var checkC = game.app.stage.getChildByName(0 + "," + i).turn;
            if (checkC === '') {
                if (i === stats.row - 1)
                    return false;
                else
                    continue;
            }
            for (var j = 1; j < stats.col; j++) {
                if (checkC !== game.app.stage.getChildByName(j + "," + i).turn) {
                    flagC = 1;
                    break;
                }
            }
            if (flagC === 0)
                return true;
            else
                return false;
        }
    };
    Images.prototype.anyRow = function () {
        var flagR = 0;
        for (var i = 0; i < stats.row; i++) {
            var checkR = game.app.stage.getChildByName(i + "," + 0).turn;
            if (checkR === '') {
                if (i === stats.row - 1)
                    return false;
                else
                    continue;
            }
            for (var j = 1; j < stats.col; j++) {
                if (checkR !== game.app.stage.getChildByName(i + "," + j).turn) {
                    flagR = 1;
                    break;
                }
            }
            if (flagR === 0)
                return true;
            else
                return false;
        }
    };
    Images.prototype.oppDiagonal = function () {
        var checkOD = game.app.stage.getChildByName(0 + "," + (stats.col - 1)).turn;
        if (checkOD === '')
            return false;
        var j = stats.col - 1;
        for (var i = 0; i < stats.row; i++) {
            if (checkOD !== game.app.stage.getChildByName(i + 1 + "," + (j - 1)).turn)
                return false;
            j--;
            if (j == 0)
                break;
        }
        return true;
    };
    Images.prototype.terminal = function () {
        for (var i = 0; i < stats.row; i++) {
            for (var j = 0; j < stats.col; j++) {
                if (game.app.stage.getChildByName(i + "," + j).turn === '')
                    return false;
            }
        }
        return true;
    };
    return Images;
}());
