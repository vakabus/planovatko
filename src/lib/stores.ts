import { writable, type Writable } from "svelte/store"
import type { Model } from "../model"

/**
 * The currently highlighted block id (highlighted = mouse hovers above it)
 */
export const BLOCK_HIGHLIGHTED: Writable<string | null> = writable(null)

/**
 * The currently focused block id (focused = clicked on)
 */
export const BLOCK_FOCUSED: Writable<string | null> = writable(null)

/**
 * The currently focused schedule interval index (fucused = clicked on)
 */
export const INTERVAL_FOCUSED: Writable<number | null> = writable(null)

/**
 * This store is only for the purpose of hot-reloading, should not be used elsewhere than in the top level app
 */
export const MODEL: Writable<Model | null> = writable(null)