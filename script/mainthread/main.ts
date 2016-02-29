class AppMain {
    private _canvas: HTMLCanvasElement;
    private _kInput: HTMLInputElement;
    private _pointInput: HTMLInputElement;
    private _startButton: HTMLButtonElement;
    private _stopButton: HTMLButtonElement;
    
 constructor(   canvas: HTMLCanvasElement, 
                kInput: HTMLInputElement, 
                pointInput: HTMLInputElement,
                startButton: HTMLButtonElement,
                stopButton: HTMLButtonElement) {
     this._canvas = canvas;
     this._kInput = kInput;
     this._pointInput = pointInput;
     this._startButton = startButton;
     this._stopButton = stopButton;
     
     this.InitializeEventHandlers();
 }   
 
 private InitializeEventHandlers() {
     
 }
}

((context: Window) => {
    context.onload = () => {
        myInit();
    }
   
    let count = 0;
    let currentTotal = 0.0;
    let canvasWidth = -1;
    let canvasHeight = -1;
    
    function recalcCanvas() {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>context.document.getElementById("canvas");
        resizeCanvas(canvas);
        
        let ctx: CanvasRenderingContext2D = canvas.getContext("2d");        
        context.requestAnimationFrame(()=> {recalcCanvas();});
    }
    
    function resizeCanvas(canvas: HTMLCanvasElement) {
        if(canvas.clientWidth !== canvasWidth || canvas.clientHeight !== canvasHeight)
        {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            canvasWidth = canvas.clientWidth;
            canvasHeight = canvas.clientHeight;
        }
    }
    
    function paintImageToCanvas(imageArg: HTMLImageElement) {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>context.document.getElementById("canvas");
        resizeCanvas(canvas);
        
        let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
        ctx.drawImage(imageArg, 0, 0, canvas.width, canvas.height);
    }
    
    function getImage() {
        let image = new Image();
        image.onload = (event: Event) => {
            paintImageToCanvas(image);
        };
        image.src = "../img.jpg";
    }
    
    function myInit() {
        let myWorker = new Worker("build/worker.js");
        myWorker.onmessage = (event) => {
            if(event.data["type"] === 'start') {
                console.log("start message received");
            } else if(event.data["type"] === "tick") {
                console.log("ticks message received " + event.data.ticks + " iterations per 100ms");
            }
        }
        myWorker.postMessage("start");        
        context.requestAnimationFrame(()=> {recalcCanvas();});
        context.setTimeout(getImage, 30);
        
    }
})(window);