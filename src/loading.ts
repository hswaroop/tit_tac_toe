class Load{
    constructor(PIXI)
    {
        this.Sprite = PIXI.Sprite;
        this.loader = PIXI.loader;
        this.update();
    }

    update()
    {
        let type = "WebGL";
        if (!PIXI.utils.isWebGLSupported())
            type = "canvas";
        PIXI.utils.sayHello(type);



        this.app = new PIXI.Application({
            width: window.innerWidth / 2,
            height: window.innerHeight - 50,
            antialias: true,
            transparent: false,
            resolution: 1
        });

        document.body.appendChild(this.app.view);

        let  assets =  [

            "../assets/grid.png",
            "../assets/o.png",
            "../assets/restart.png",
            "../assets/TicTacToe.png",
            "../assets/x.png"

        ];


        let loaderOpaque = new this.Sprite.fromImage("../assets/loaderOpaque.png");
        this.app.stage.addChild(loaderOpaque);


        let loaderTrans = new this.Sprite.fromImage("../assets/loaderTrans.png");
        this.app.stage.addChild(loaderTrans);

        loaderTrans.height = this.app.renderer.height/8;
        loaderTrans.width = 0;
        loaderOpaque.width = this.app.renderer.width/2.5;
        loaderOpaque.height = this.app.renderer.height/8;
        loaderOpaque.x = this.app.renderer.width/2 - loaderOpaque.width/2;
        loaderOpaque.y = this.app.renderer.height/2 - loaderOpaque.height/2;
        loaderTrans.x = loaderOpaque.x;
        loaderTrans.y = loaderOpaque.y;

        this.loader.add(assets);

        this.loader.load();

        this.loader.on('progress', function(){
            let ploaded = this.loader.progress;
            loaderTrans.width = (ploaded * loaderOpaque.width)/100;
            alert(this.loader.progress);
            //loaderTrans.mask = loaderOpaque;
        }, this);


        this.loader.on('complete', function(){
            loaderTrans.visible = false;
            loaderOpaque.visible = false;
            let image = new Images();
        });
    }
}

let game = new Load(PIXI);

/*let this.application = PIXI.this.application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle;*/