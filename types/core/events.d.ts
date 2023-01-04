/* BSoup: 
In the future, I think the Events constructor should be made private, and
have an instance of Event created with a static method (ex. Events.instance())

Then the class will self-enforce that it is a singleton without relying on an 
instance function: events.js line 68 
*/

// BSoup: method param types are WIP, but here's the first run-through.

type ChartComponentName = "chart"
type MetaComponentName = "meta"
type HubComponentName = "hub"

type ChartEventName =
  | "cursor-changed"
  | "cursor-locked"
  | "full-update"
  | "range-changed"
  | "update-layout"

type HubEventName =
  | "display-overlay"
  | "set-scale-index"

type MetaEventName =
  | "grid-mousedown"
  | "select-overlay"
  | "sidebar-transform"

type ChartEventCompAndType = `${ChartComponentName}:${ChartEventName}`
type HubEventCompAndType = `${HubComponentName}:${HubEventName}`;
type MetaEventCompAndType = `${MetaComponentName}:${MetaEventName}`;

type BuiltInCompAndType =
  | ChartEventCompAndType
  | HubEventCompAndType
  | MetaEventCompAndType

type BuiltInComponentName = 
  | ChartComponentName
  | HubComponentName
  | MetaComponentName

type EventCompAndType = BuiltInCompAndType | string;
type ComponentName = BuiltInComponentName | string;

export interface Events {
  /** Immediately calls all handlers with the specified type (there can be only one listener of this type per each component)*/
  emit(type: string, obj: {}): void;

  /** Emit an event to a specific component */
  emitSpec(comp: ComponentName, type: string, obj: {}): void;

  /** Add an event listener to a specific component */
  on(compAndType: EventCompAndType, f: any): void;

  /** Remove event listener(s) from a specific component */
  off(comp: ComponentName, type?: string): void;
}
