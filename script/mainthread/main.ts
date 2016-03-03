class AppMain {
    private _canvas: HTMLCanvasElement;
    private _kInput: HTMLInputElement;
    private _pointInput: HTMLInputElement;
    private _startButton: HTMLButtonElement;
    private _stopButton: HTMLButtonElement;
    private _worker: Worker;
    private _context: Window;
    private _canvasWidth = -1;
    private _canvasHeight = -1;
    
 constructor( context: Window ) {
     this._context = context;
     this._canvas = <HTMLCanvasElement>this._context.document.getElementById("canvas");
     this._kInput = <HTMLInputElement>this._context.document.getElementById("kValue");
     this._pointInput = <HTMLInputElement>this._context.document.getElementById("point");
     this._startButton = <HTMLButtonElement>this._context.document.getElementById("startButton");
     this._stopButton = <HTMLButtonElement>this._context.document.getElementById("stopButton");     
     
     this.InitializeEventHandlers();
     this.InitializeWorker();
     
     this._context.requestAnimationFrame(()=> { this.RecalcCanvas(this._canvas);});
 }   
 
 private InitializeEventHandlers() {
     this._stopButton.disabled = true;
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
        if(canvas.clientWidth !== this._canvasWidth || canvas.clientHeight !== this._canvasHeight)
        {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            this._canvasWidth = canvas.clientWidth;
            this._canvasHeight = canvas.clientHeight;
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