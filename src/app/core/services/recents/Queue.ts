export class RecentQueue<T>{
    queueData: T[] = [];
    maxSize: number = 0;
    private comparator: (a: T, b: T) => boolean;

    constructor(maxSize: number, comparator: (a: T, b: T) => boolean){
        this.maxSize = maxSize;
        this.comparator = comparator;
    }

    enQueue(data: T){
        const index = this.queueData.findIndex(item => this.comparator(item, data));

        if (index !== -1) {
            this.queueData.splice(index, 1);
        } else if (this.isFull()) {
            this.queueData.pop();
        }

        this.queueData.unshift(data);
    }

    isEmpty(): boolean {
        return this.queueData.length === 0;
    }

    isFull(): boolean {
        return this.queueData.length >= this.maxSize;
    }

    getQueue(): T[]{
        return this.queueData;
    }

    setQueue(queue: T[]){
        this.queueData = queue.slice(0, this.maxSize);
    }
}