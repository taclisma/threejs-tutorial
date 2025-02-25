import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from "three";

class GameScene {
    private static _instance = new GameScene();
    public static get instance(){
        return this._instance;
    }
    private _width: number;
    private _height: number;
    private _renderer: WebGLRenderer;
    private _camera: PerspectiveCamera;

    private readonly _scene = new Scene();
    constructor() {
        this._width = window.innerWidth;
        this._height = window.innerHeight;

        this._renderer = new WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._renderer.setSize(this._width, this._height);
        // encontrar div com id app
        const targetElement = document.querySelector<HTMLDivElement>("#app");
        if(!targetElement){
            throw "unable to find target element";
        }

        targetElement.appendChild(this._renderer.domElement);

        const aspectRatio = this._width / this._height;
        this._camera = new PerspectiveCamera(45, aspectRatio, 0.1, 1000);
        this._camera.position.set(0,0,3);

        window.addEventListener("resize", this.resize, false);
    }
    private resize = () => {
        this._width = window.innerWidth;
        this._height = window.innerHeight;
        this._renderer.setSize(this._width, this._height);
        this._camera.aspect = this._width / this._height;

        this._camera.updateProjectionMatrix()
    }

    public render = () => {
        requestAnimationFrame(this.render);
        this._renderer.render(this._scene, this._camera)
    }

    public load = () => {
        const geometry = new BoxGeometry(1,1,1);
        const material = new MeshBasicMaterial({color: 0x00ff00});
        const cube = new Mesh(geometry, material);

        this._scene.add(cube);
    }
}

export default GameScene;