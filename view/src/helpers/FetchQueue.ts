type Queue = {
  url: string,
  options: any,
  resolve: Function,
  reject: Function
}

export class FetchQueue {
  queue: Queue[]
  isProcessing: boolean
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  add(url: string, options: any) {
    return new Promise((resolve, reject) => {
      this.queue.push({ url, options, resolve, reject });
      this.processNext();
    });
  }

  async processNext() {
    if (this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;
    const { url, options, resolve, reject }: Queue = this.queue.shift()!;

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    } finally {
      this.isProcessing = false;
      this.processNext();
    }
  }
}
