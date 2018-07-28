class Logics
{
    stats:takeFrom;
    constructor(stats)
    {
        this.stats = stats;
       // alert(image.grid.x);
        this.makeResponsive();
    }


    makeResponsive()
    {
        let countH = 0;
        for(let i=0;i<stats.row;i++)
        {
            let countW = 0;
            countH = countH + image.grid.y;
            for(let j=0;j<stats.col;j++)
            {
                let rectangle = new PIXI.Graphics();
                rectangle.beginFill(0x66CCFF);
                rectangle.drawRect(0,0,0,0);
                rectangle.x = image.grid.x + countW;
                rectangle.y = countH;
                rectangle.width = image.grid.width/stats.col;
                rectangle.height = image.grid.height/stats.row;

                //rectangle.name =
                rectangle.interactive = true;
                rectangle.buttonMode = true;

                game.app.stage.addChile(rectangle);

                /*rectangle.on('mousedown', function()
                {
                    let xPlay = new Sprite.fromImage("../assets/x.png");
                    app.stage.addChild(xPlay);
                    xPlay.x =
                })*/

                countW = countW + image.grid.width;
            }
            countH = countH + image.grid.height;
        }
    }
}