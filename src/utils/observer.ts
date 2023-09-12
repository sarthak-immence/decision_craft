interface ISubject<T> {
    subscribe(observer: (data: T) => void): void
    unsubscribe(observerId: number): void
    next(data: T): void
}
export class Subject<T> implements ISubject<T> {
    private observers: [number, (data: T) => void][] = [];

    subscribe(observer: (data: T) => void): number {
        const id = Math.random();
        this.observers.push([id, observer]);
        return id;
    }

    unsubscribe(observerId: number) {
        this.observers = this.observers.filter((element) => observerId != element[0])
    }

    next(data: T | null = null) {
        this.observers.forEach(observer => {
            observer[1](data as T);
        })
    }
}
