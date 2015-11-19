///<reference path="Vector.ts"/>
///<reference path="ImmutableVector.ts"/>
///<reference path="MutableVector.ts"/>
///<reference path="worker.ts"/>
((context: Window) => {
    context.onload = () => {
        myInit();
    }
    let count = 0;
    let currentTotal = 0.0;
    function myInit() {
        if(context.Worker) {
            let myWorker = new Worker("build/worker.js");
            myWorker.onmessage = (event) => {
                if(event.data["type"] === 'start') {
                    console.log("start message received");
                } else if(event.data["type"] === "tick") {
                    let ticks = context.document.getElementById("ticks");
                    if(ticks) {
                        currentTotal += event.data["ticks"];
                        count++;
                        ticks.textContent = (currentTotal / count).toString();
                    }
                }
            }
            myWorker.postMessage("start");
        }
        
        let image = new Image();
        image.src = 'img.jpg';
        console.log(image.width);
        console.log(image.height);
        console.log(image.width / image.height);
        let canvas: HTMLCanvasElement = <HTMLCanvasElement> context.document.getElementById("canvas");
        if(canvas) {
            canvas.width = 600;
            canvas.height = canvas.width / (image.width / image.height );
            let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        }
    }
})(window);