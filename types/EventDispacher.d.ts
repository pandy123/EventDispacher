export declare type EventListner = {
    callback: Function;
    sender: any;
    weight: number;
    count: number;
};
export declare type EventListnerMap = {
    [key: string]: Array<EventListner>;
};
/** Class EventDispacher for event-driven architecture. */
export declare class EventDispacher {
    /**event types */
    events: Array<string>;
    /**callbacks */
    callbacks: EventListnerMap;
    constructor();
    /**
     * add one Listner
     * @param sender
     * @param name
     * @param callback
     * @param weight
     */
    addListener(sender: any, name: string, callback: Function, weight?: number): this;
    private _hasEvent(name);
    /**
     * listen once
     * @param sender
     * @param name
     * @param callback
     * @param weight
     */
    once(sender: any, name: string, callback: Function, weight?: number): void;
    /**
     * remove one listner
     * @param name
     * @param callback
     */
    removeListenr(name: string, callback?: null): this;
    /**
     *
     * @param name
     * @param callback
     */
    private _getCallbackIndex(name, callback?);
    /**
     *
     * @param name
     * @param event
     */
    dispach(name: string, event: any): this;
    /**
     * Clear all events and callback links.
     *
     * @return {this}
     */
    clear(): this;
}
