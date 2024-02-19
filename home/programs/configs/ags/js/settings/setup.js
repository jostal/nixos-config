import { scssWatcher } from './scss.js';
import { globals } from './globals.js';
import { Audio, Notifications } from '../imports.js';

export function init() {
  globals()
  Notifications.popupTimeout = 3000
  Notifications.cacheActions = true
  Audio.maxStreamVolume = 1
  scssWatcher()
}
