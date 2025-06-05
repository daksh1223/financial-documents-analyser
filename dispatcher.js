const { Worker } = require("worker_threads");

class Dispatcher {
  constructor(maxConcurrency = 5) {
    this.maxConcurrency = maxConcurrency;
    this.running = 0;
    this.queue = [];
  }

  async _runNext() {
    if (this.queue.length === 0 || this.running >= this.maxConcurrency) return;

    const filePath = this.queue.shift();
    this.running++;

    console.log("DISPATCHING", filePath);
    const worker = new Worker("./worker.js", {
      workerData: filePath
    });

    worker.on("message", (msg) => {
      console.log("Worker finished:", msg);
    });

    worker.on("error", (err) => {
      console.error("Worker error:", err);
    });

    worker.on("exit", (code) => {
      this.running--;
      this._runNext();
    });
  }

  submit(filePath) {
    this.queue.push(filePath);
    this._runNext();
  }
}

module.exports = Dispatcher;
