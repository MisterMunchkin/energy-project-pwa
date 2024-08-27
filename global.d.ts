import type NodeCache from "node-cache";

declare global {
  var serverCache: NodeCache;
}

export {};