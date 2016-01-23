///<reference path="Vector.ts"/>
///<reference path="ImmutableVector.ts"/>
///<reference path="MutableVector.ts"/>
///<reference path="worker.ts"/>
///<reference path="../typings/chart.d.ts"/>
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
        canvasWidth = canvas.clientWidth;
        canvasHeight = canvas.clientHeight;
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        
        let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
        ctx.lineWidth=10;
        ctx.strokeStyle="rgb(255,0,0)";
        ctx.moveTo(10, 10);
        ctx.lineTo(100,100);
        ctx.stroke();
        
        context.setTimeout(()=> {recalcCanvas();}, 1000);
    }
    
    function myInit() {
        if(context.Worker) {
            let myWorker = new Worker("build/worker.js");
            myWorker.onmessage = (event) => {
                if(event.data["type"] === 'start') {
                    console.log("start message received");
                } else if(event.data["type"] === "tick") {
                    console.log("ticks message received");
                }
            }
            myWorker.postMessage("start");
        }
        
        context.setTimeout(()=> {recalcCanvas();}, 1000);
    }
})(window);