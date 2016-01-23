(( context: Worker ) => {
	self.onmessage = (event) => {
  		if(event.data === "start") {
			console.log("starting in worker");
            self.postMessage({"type": "tick", "ticks": 10});
			//self.setTimeout(iterate, 0);
		}
	} 
	
	function iterate() {
		//console.log("starting iteration");
		let iterations = 0;
		let startTime = self.performance.now();
		let currentTime = self.performance.now();
		while((currentTime - startTime) < 4.0 ) {
			iterations++;
			currentTime = self.performance.now();
		}
		self.postMessage({"type": "tick", "ticks": iterations});
		self.setTimeout(iterate, 0);
	}
})(self);