class Point {
    private _x: number = -1;
    private _y: number = -1;
    private _r: number = 0;
    private _g: number = 0;
    private _b: number = 0;


    constructor(x: number, y: number, r: number, g: number, b: number) {
        this._x = x;
        this._y = y;
        this._r = r;
        this._g = g;
        this._b = b;
    }

    public X() {
        return this._x;
    }

    public Y() {
        return this._y;
    }

    public Color() {
        return "rgb(" + this._r.toString() + ", " + this._g.toString() + ", " + this._b.toString() + ")";
    }
}

class RandGenerator {
    public static GetRandBetween(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;;
    }
}

class AppMain {
    private _canvas: HTMLCanvasElement;
    private _kInput: HTMLInputElement;
    private _pointInput: HTMLInputElement;
    private _startButton: HTMLButtonElement;
    private _stopButton: HTMLButtonElement;
    private _worker: Worker;
    private _context: Window;
    private _canvasWidth: number = -1;
    private _canvasHeight: number = -1;
    private _numberOfMeans: number = -1;
    private _numberOfPoints: number = -1;
    private _points: Array<Point>;


    constructor(context: Window) {
        this._context = context;
        this._canvas = <HTMLCanvasElement>this._context.document.getElementById("canvas");
        this._kInput = <HTMLInputElement>this._context.document.getElementById("kValue");
        this._pointInput = <HTMLInputElement>this._context.document.getElementById("point");
        this._startButton = <HTMLButtonElement>this._context.document.getElementById("startButton");
        this._stopButton = <HTMLButtonElement>this._context.document.getElementById("stopButton");

        this.InitializeEventHandlers();
        this.InitializeWorker();

        this._context.onresize = (event: UIEvent) => {
            this._context.requestAnimationFrame(() => {
                this.RecalcCanvas(this._canvas);
            })
        };
        this.RecalcCanvas(this._canvas);
    }

    private InitializeEventHandlers() {
        this._startButton.onclick = (event: MouseEvent) => { this.StartClicked(event); };
        this._stopButton.onclick = (event: MouseEvent) => { this.StopClicked(event); };
        this._kInput.onchange = (event: Event) => { this.KValueChanged(event); };
        this._pointInput.onchange = (event: Event) => { this.PointValueChanged(event); };
    }

    private StartClicked(event: MouseEvent) {
        this._kInput.disabled = true;
        this._pointInput.disabled = true;
        this._stopButton.disabled = false;
        this._startButton.disabled = true;
    }

    private StopClicked(event: MouseEvent) {
        this._startButton.disabled = false;
        this._pointInput.disabled = false;
        this._kInput.disabled = false;
        this._stopButton.disabled = true;
    }

    private KValueChanged(event: Event) {
        this.DetermineKValue();
    }

    private DetermineKValue() {
        if (this._kInput.checkValidity() == true) {
            this._numberOfMeans = this._kInput.valueAsNumber;
            this._startButton.disabled = false;
        } else {
            this._startButton.disabled = true;
        }
    }

    private PointValueChanged(event: Event) {
        this.DeterminePointValue();
    }

    private DeterminePointValue() {
        if (this._pointInput.checkValidity() == true) {
            this._numberOfPoints = this._pointInput.valueAsNumber;
            this._startButton.disabled = false;
            this.GeneratePoints(this._numberOfPoints);
        } else {
            this._startButton.disabled = true;
        }
    }

    private GeneratePoints(numberOfPoints: number) {
        let ctx = this._canvas.getContext("2d");
        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        if (numberOfPoints > 0) {
            this._points = new Array<Point>(numberOfPoints);
        }

        for (let i: number = 0; i < this._points.length; i++) {

            this._points[i] = new Point(RandGenerator.GetRandBetween(10, this._canvasWidth-10),
                RandGenerator.GetRandBetween(10, this._canvasHeight-10), 255, 0, 0);
        }

        this.DrawPoints(this._points);
    }
    
    private DrawPoints(points: Array<Point>) {
        let ctx: CanvasRenderingContext2D = this._canvas.getContext("2d");
        ctx.beginPath();
        for(let i: number = 0; i < this._points.length; i++) {
            let x: number = this._points[i].X();
            let y: number = this._points[i].Y();
            ctx.fillStyle = this._points[i].Color();
            ctx.moveTo(x, y)
            ctx.arc(x, y, 10, 0, 2*Math.PI, false);
        }
        ctx.fill(); 
        
    }

    private InitializeWorker() {
        this._worker = new Worker("build/worker.js");
        /*myWorker.onmessage = (event) => {
            if(event.data["type"] === 'start') {
                console.log("start message received");
            } else if(event.data["type"] === "tick") {
                console.log("ticks message received " + event.data.ticks + " iterations per 100ms");
            }
        }
        myWorker.postMessage("start");        
        context.requestAnimationFrame(()=> {recalcCanvas();});*/
    }

    private RecalcCanvas(canvas: HTMLCanvasElement) {
        if (canvas.clientWidth !== this._canvasWidth || canvas.clientHeight !== this._canvasHeight) {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            this._canvasWidth = canvas.clientWidth;
            this._canvasHeight = canvas.clientHeight;
            this.DetermineKValue();
            this.DeterminePointValue();
            this.GeneratePoints(this._numberOfPoints);
        }
    }
}

((context: Window) => {
    context.onload = () => {
        myInit(context);
    }

    let app: AppMain;

    function myInit(context: Window) {
        app = new AppMain(context);
    }
})(window);