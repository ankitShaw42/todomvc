class EventEmitter {
  constructor() {
    this.events = {};
  }

  /**
   * Register a callback for an event
   * @param {string} eventName The target event
   * @param {Function} callback The callback to be executed on event trigger
   */
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [callback];
    } else {
      this.events[eventName].push(callback);
    }
  }

  /**
   * Trigger all the callbacks for an event
   * @param {string} eventName The target event
   * @param  {...any} restArgs An array of items that the callback will be passed
   */
  trigger(eventName, ...restArgs) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((cb) => {
        cb.apply(null, restArgs);
      });
    } else {
      console.error('The triggered event does not exist');
    }
  }
}

const eventEmitter = new EventEmitter();

// eventEmitter.on('data', (arg1, arg2) => {
//   console.log('Hello,', arg1, arg2);
// });

// eventEmitter.trigger('data', 'World!', 'Bye', 'World');

export default eventEmitter;
