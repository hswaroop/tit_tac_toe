let stats = new takeFrom(3,3,9);

class Images {
    grid, TicTacToe,restart;
    constructor() {
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
        this.TicTacToe.x = this.grid.x + this.grid.width/2 - this.TicTacToe.width/2;
        this.TicTacToe.y = this.grid.y/2 - this.TicTacToe.width/2;
    }

    addRestart() {
        this.restart = new game.Sprite.fromImage("../assets/restart.png");
        game.app.stage.addChild(this.restart);
        this.restart.width = game.app.renderer.width / 8;
        this.restart.height = game.app.renderer.height / 8;
        this.restart.x = this.grid.x + this.grid.width/2 - this.restart.width/2;
        this.restart.y = this.grid.y + this.grid.height + this.restart.height/2;
        this.restart.interactive = true;
        this.restart.buttonMode = true;
    }

    makeResponsive()
    {
        let countH = this.grid.y;
        for(let i=0;i<stats.row;i++)
        {
            let countW = 0;
            for(let j=0;j<stats.col;j++)
            {
                let rectangle = new PIXI.Graphics();
                rectangle.beginFill(0x66CCFF);
                rectangle.drawRect(0,0,this.grid.width/stats.col,this.grid.height/stats.row);
                rectangle.x = this.grid.x + countW;
                rectangle.y = countH;
                rectangle.interactive = true;
                rectangle.buttonMode = true;
                rectangle.alpha = 0;
                rectangle.endFill();
                game.app.stage.addChild(rectangle);

                
                rectangle.on('mousedown', function()
                {
                    let xPlay = new game.Sprite.fromImage("../assets/x.png");
                    game.app.stage.addChild(xPlay);
                    xPlay.x = rectangle.x + rectangle.width/2 - xPlay.width/2;
                    xPlay.y = rectangle.y + rectangle.height/2 - xPlay.height/2;
                })

                countW = countW + (this.grid.width/stats.col);
            }
            countH = countH + (this.grid.height/stats.row);
        }
    }
}
