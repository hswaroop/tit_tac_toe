var Load = /** @class */ (function () {
    function Load(PIXI) {
        this.Sprite = PIXI.Sprite;
        this.loader = PIXI.loader;
        this.update();
    }
    Load.prototype.update = function () {
        var type = "WebGL";
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
        var assets = [
            "../assets/grid.png",
            "../assets/o.png",
            "../assets/restart.png",
            "../assets/TicTacToe.png",
            "../assets/x.png"
        ];
        var loaderOpaque = new this.Sprite.fromImage("../assets/loaderOpaque.png");
        this.app.stage.addChild(loaderOpaque);
        var loaderTrans = new this.Sprite.fromImage("../assets/loaderTrans.png");
        this.app.stage.addChild(loaderTrans);
        loaderTrans.height = this.app.renderer.height / 8;
        loaderTrans.width = 0;
        loaderOpaque.width = this.app.renderer.width / 2.5;
        loaderOpaque.height = this.app.renderer.height / 8;
        loaderOpaque.x = this.app.renderer.width / 2 - loaderOpaque.width / 2;
        loaderOpaque.y = this.app.renderer.height / 2 - loaderOpaque.height / 2;
        loaderTrans.x = loaderOpaque.x;
        loaderTrans.y = loaderOpaque.y;
        this.loader.add(assets);
        this.loader.load();
        this.loader.on('progress', function () {
            var ploaded = this.loader.progress;
            loaderTrans.width = (ploaded * loaderOpaque.width) / 100;
            alert(this.loader.progress);
            //loaderTrans.mask = loaderOpaque;
        }, this);
        this.loader.on('complete', function () {
            loaderTrans.visible = false;
            loaderOpaque.visible = false;
            var image = new Images();
        });
    };
    return Load;
}());
var game = new Load(PIXI);
/*let this.application = PIXI.this.application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle;*/ 
