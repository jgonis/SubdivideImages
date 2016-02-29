/// <reference path="../../../../../AppData/Roaming/npm/node_modules/typescript/lib/lib.webworker.d.ts" />
(( context: WorkerGlobalScope ) => {
	self.onmessage = (event) => {
  		if(event.data === "start") {
			
		}
	} 
	
	function iterate() {
		let iterations = 0;
		let startTime = Date.now();
		let currentTime = Date.now();
	}
})(self);