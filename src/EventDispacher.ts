
export type EventListner = {
   callback: Function;
   sender: any;
   weight: number;
   count: number;
}
export type EventListnerMap = {
   [key: string]: Array<EventListner>
}

/** Class EventDispacher for event-driven architecture. */
export class EventDispacher {
   /**event types */
   public events: Array<string>;
   /**callbacks */
   public callbacks: EventListnerMap;

   constructor() {
      this.events = new Array<string>();
      this.callbacks = new Object() as EventListnerMap;
      return this;
   }
   /**
    * add one Listner
    * @param sender 
    * @param name 
    * @param callback 
    * @param weight 
    */
   public addListener(sender: any, name: string, callback: Function, weight: number = 1) {
      var count = 1;
      if (this._hasEvent(name)) {
         this.callbacks[name].push({
            callback,
            sender,
            weight,
            count
         }
         )
      } else {
         this.callbacks[name] = new Array<EventListner>();
         this.events.push(name);
         this.callbacks[name].push({
            callback,
            sender,
            weight,
            count
         }
         )
      }
      //this.callbacks[name].sort((a: any, b: any) => a.weight > b.weight);
      return this;
   }

   private _hasEvent(name: string) {
      return this.events.indexOf(name) > -1;
   }

   /**
    * listen once
    * @param sender 
    * @param name 
    * @param callback 
    * @param weight 
    */
   once(sender: any, name: string, callback: Function, weight: number = 1) {
      var count = 0;
      if (this._hasEvent(name)) {
         this.callbacks[name].push({
            callback,
            sender,
            weight,
            count
         }
         )
      } else {
         this.callbacks[name] = new Array<EventListner>();
         this.events.push(name);
         this.callbacks[name].push({
            callback,
            sender,
            weight,
            count
         }
         )
      }
   }

   /**
    * remove one listner
    * @param name 
    * @param callback 
    */
   public removeListener(name: string, callback = null) {
      if (this._hasEvent(name)) {
         if (callback === null) {
            var index = this.events.indexOf(name);
            this.events.splice(index, 1);
            delete this.callbacks[name];
         } else {
            var index = this._getCallbackIndex(name, callback);
            var callbackList = this.callbacks[name];
            callbackList.splice(index, 1);
         }
      }
      return this;
   }

   /**
    * 
    * @param name 
    * @param callback 
    */
   private _getCallbackIndex(name: string, callback = null): number {
      var callbackArray = this.callbacks[name];
      for (var i = 0; i < callbackArray.length; i++) {
         if ((callbackArray[i] as EventListner).callback == callback) {
            return i;
         }
      }
      return -1;
   }

   /**
    * 
    * @param name 
    * @param event 
    */
   dispach(name: string, event: any) {
      if (this.callbacks[name]) {
         // All callbacks will be triggered sorter by "weight" parameter.
         this.callbacks[name].forEach(
            (lisner) => {
               if (lisner.count == 0) {
                  lisner.callback(event);
                  lisner.count--;
               } else if (lisner.count > 0) {
                  lisner.callback(event);
                  lisner.count++;
               }
            }
         )

      }
      return this;
   }

   /**
    * Clear all events and callback links.
    *
    * @return {this}
    */
   public clear() {
      this.events = new Array<string>();
      this.callbacks = new Object() as EventListnerMap;
      return this;
   }
}
