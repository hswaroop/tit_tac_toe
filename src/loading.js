var type = "WebGL";
if (!PIXI.utils.isWebGLSupported())
    type = "canvas";
PIXI.utils.sayHello(type);
var Application = PIXI.Application, Container = PIXI.Container, loader = PIXI.loader, resources = PIXI.loader.resources, TextureCache = PIXI.utils.TextureCache, Sprite = PIXI.Sprite, Rectangle = PIXI.Rectangle;
var app = new Application({
    width: window.innerWidth / 2,
    height: window.innerHeight - 50,
    antialias: true,
    transparent: false,
    resolution: 1
});
document.body.appendChild(app.view);
loader
    .add("../assets/loaderTrans.png")
    .add("../assets/loaderOpaque.png")
    .load(setup);
function setup() {
    var loaderTrans = new Sprite(resources["../assets/loaderTrans.png"].texture);
    app.stage.addChild(loaderTrans);
    loaderTrans.width = app.renderer.width / 2;
    loaderTrans.height = app.renderer.height / 6;
    var loaderOpaque = new Sprite(resources["../assets/loaderOpaque.png"].texture);
    app.stage.addChild(loaderOpaque);
    loaderOpaque.width = app.renderer.width / 2;
    loaderOpaque.height = app.renderer.height / 6;

    loaderTrans.mask = loaderOpaque;
}
