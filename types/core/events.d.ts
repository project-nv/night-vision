/* BSoup: 
In the future, I think the Events constructor should be made private, and
have an instance of Event created with a static method (ex. Events.instance())

Then the class will self-enforce that it is a singleton without relying on an 
instance function: events.js line 68 
*/

// BSoup: method param types are WIP, but here's the first run-through.

export interface Events {
  /** Immediately calls all handlers with the specified type (there can be only one listener of this type per each component)*/
  emit(type: string, obj: {}): void;

  /** Emit an event to a specific component */
  emitSpec(comp: any, type: string, obj: {}): void;

  /** Add an event listener to a specific component */
  on(compAndType: any, f: any): void;

  /** Remove event listener(s) from a specific component */
  off(comp: any, type?: string): void;
}
