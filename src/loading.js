"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("./view");
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
var assets = [
    "../assets/grid.png",
    "../assets/o.png",
    "../assets/restart.png",
    "../assets/TicTacToe.png",
    "../assets/x.png"
];
var loaderOpaque = new Sprite.fromImage("../assets/loaderOpaque.png");
app.stage.addChild(loaderOpaque);
var loaderTrans = new Sprite.fromImage("../assets/loaderTrans.png");
app.stage.addChild(loaderTrans);
loaderTrans.height = app.renderer.height / 8;
loaderTrans.width = 0;
loaderOpaque.width = app.renderer.width / 2.5;
loaderOpaque.height = app.renderer.height / 8;
loaderOpaque.x = app.renderer.width / 2 - loaderOpaque.width / 2;
loaderOpaque.y = app.renderer.height / 2 - loaderOpaque.height / 2;
loaderTrans.x = loaderOpaque.x;
loaderTrans.y = loaderOpaque.y;
loader.add(assets);
loader.load();
loader.on('progress', function () {
    var ploaded = loader.progress;
    loaderTrans.width = (ploaded * loaderOpaque.width) / 100;
    alert(loader.progress);
    //loaderTrans.mask = loaderOpaque;
});
loader.on('complete', function () {
    loaderTrans.visible = false;
    loaderOpaque.visible = false;
    var image = new view_1.Images();
});
