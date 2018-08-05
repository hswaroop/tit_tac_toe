let stats = new takeFrom(3,3,9);

class Images {
    grid
,
    TicTacToe
,
    restart;

    constructor() {
        this.turn = 'x';
        this.addGrid();
        this.addTitle();
        this.addRestart();
        this.makeResponsive();
    }

    addGrid() {
        this.grid = new game.Sprite.fromImage("../assets/grid.png");
        game.app.stage.addChild(this.grid);
        this.grid.width = game.app.renderer.width / 2;
        this.grid.height = game.app.renderer.height / 2;
        this.grid.x = game.app.renderer.width / 2 - this.grid.width / 2;
        this.grid.y = game.app.renderer.height / 2 - this.grid.height / 2;
    }

    addTitle() {
        this.TicTacToe = new game.Sprite.fromImage("../assets/TicTacToe.png");
        game.app.stage.addChild(this.TicTacToe);
        this.TicTacToe.width = game.app.renderer.width / 6;
        this.TicTacToe.height = game.app.renderer.height / 6;
        this.TicTacToe.x = this.grid.x + this.grid.width / 2 - this.TicTacToe.width / 2;
        this.TicTacToe.y = this.grid.y / 2 - this.TicTacToe.width / 2;
    }

    addRestart() {
        this.restart = new game.Sprite.fromImage("../assets/restart.png");
        game.app.stage.addChild(this.restart);
        this.restart.width = game.app.renderer.width / 8;
        this.restart.height = game.app.renderer.height / 8;
        this.restart.x = this.grid.x + this.grid.width / 2 - this.restart.width / 2;
        this.restart.y = this.grid.y + this.grid.height + this.restart.height / 2;
        this.restart.interactive = true;
        this.restart.buttonMode = true;
    }

    makeResponsive() {
        let countH = this.grid.y;
        for (let i = 0; i < stats.row; i++) {
            let countW = 0;
            for (let j = 0; j < stats.col; j++) {
                let rectangle = new PIXI.Graphics();
                rectangle.beginFill(0x66CCFF);
                rectangle.drawRect(0, 0, this.grid.width / stats.col, this.grid.height / stats.row);
                rectangle.x = this.grid.x + countW;
                rectangle.y = countH;
                rectangle.interactive = true;
                rectangle.buttonMode = true;
                rectangle.alpha = 0;
                rectangle.turn = '';
                rectangle.name = `${i},${j}`;
                rectangle.endFill();
                game.app.stage.addChild(rectangle);


                rectangle.on('mousedown', function () {
                    if (this.turn === 'x') {
                        let xPlay = new game.Sprite.fromImage("../assets/x.png");
                        game.app.stage.addChild(xPlay);
                        xPlay.x = rectangle.x + rectangle.width / 2 - xPlay.width / 2;
                        xPlay.y = rectangle.y + rectangle.height / 2 - xPlay.height / 2;
                        rectangle.turn = 'x';
                        rectangle.interactive = false;
                        rectangle.buttonMode = false;
                        this.turn = 'o';
                    }
                    else {
                        let oPlay = new game.Sprite.fromImage("../assets/o.png");
                        game.app.stage.addChild(oPlay);
                        oPlay.x = rectangle.x + rectangle.width / 2 - oPlay.width / 2;
                        oPlay.y = rectangle.y + rectangle.height / 2 - oPlay.height / 2;
                        rectangle.turn = 'o';
                        rectangle.interactive = false;
                        rectangle.buttonMode = false;
                        this.turn = 'x';
                    }

                    let that = this;

                    let checkDiagonal = function() {
                        return new Promise(function (resolve, reject) {
                            if (that.diagonal())
                                reject();
                            else
                                resolve();
                        })
                    };

                    let checkColumn = function() {
                        return new Promise(function (resolve, reject) {
                            if (that.anyColumn())
                                reject();
                            else
                                resolve();
                        })
                    };

                    let checkRow = function() {
                        return new Promise(function (resolve, reject) {
                            if (that.anyRow())
                                reject();
                            else
                                resolve();
                        })
                    };

                    let checkOppDiagonal = function()
                    {
                        return new Promise(function (resolve, reject) {
                            if (that.oppDiagonal())
                                reject();
                            else
                                resolve();
                        })
                    }

                    let checkTerminal = function()
                    {
                        return new Promise(function (resolve, reject) {
                            if (that.terminal())
                                resolve();
                        })
                    }

                    checkDiagonal().then(() => checkColumn())
                    .then(() => checkRow())
                    .then(() => checkOppDiagonal())
                    .then(() => checkTerminal())
                    .then(() => alert("game has drawn"))
                    .catch(() => alert("player " + rectangle.turn + " has won"));
                }, this);
                countW = countW + (this.grid.width / stats.col);
            }
            countH = countH + (this.grid.height / stats.row);
        }
    }


    diagonal()
        {
            let checkD = game.app.stage.getChildByName(`${0},${0}`).turn;
            if(checkD === '')
                return false;
            for(let i = 1;i<stats.row;i++)
            {
                for(let j = 1;j<stats.col;j++)
                {
                    if ((i === j) && (checkD !== game.app.stage.getChildByName(`${i},${j}`).turn))
                        return false;
                }
            }
            return true;
        };

    anyColumn()
    {

       let flagC = 0;
        for (let i = 0; i < stats.row; i++)
        {
            let checkC = game.app.stage.getChildByName(`${0},${i}`).turn;
            if (checkC === '')
            {
                if (i === stats.row - 1)
                    return false;
                else
                    continue;
            }
            for (let j = 1; j < stats.col; j++)
            {
                if (checkC !== game.app.stage.getChildByName(`${j},${i}`).turn)
                {
                    flagC = 1;
                    break;
                }
            }
            if(flagC === 0)
                return true;
            else
                return false;
        }
    }

    anyRow()
        {
            let flagR = 0;
            for (let i = 0; i < stats.row; i++)
            {
                let checkR = game.app.stage.getChildByName(`${i},${0}`).turn;
                if (checkR === '')
                {
                    if (i === stats.row - 1)
                        return false;
                    else
                        continue;
                }
                for (let j = 1; j < stats.col; j++)
                {
                    if (checkR !== game.app.stage.getChildByName(`${i},${j}`).turn)
                    {
                        flagR = 1;
                        break;
                    }
                }
                if(flagR === 0)
                    return true;
                else
                    return false;
        }
    }

    oppDiagonal()
    {
        let checkOD = game.app.stage.getChildByName(`${0},${stats.col-1}`).turn;
        if(checkOD === '')
            return false;
        let j = stats.col-1;
        for(let i = 0;i<stats.row;i++)
        {
                if(checkOD !== game.app.stage.getChildByName(`${i+1},${j-1}`).turn)
                    return false;
                j--;
                if(j == 0)
                    break;
        }
        return true;
    }

    terminal()
    {
        for(let i=0;i<stats.row;i++)
        {
            for(let j=0;j<stats.col;j++)
            {
                if(game.app.stage.getChildByName(`${i},${j}`).turn === '')
                    return false;
            }
        }
        return true;
    }
}


