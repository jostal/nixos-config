import App from 'resource:///com/github/Aylur/ags/app.js';
import { scssWatcher } from './scss.js';
import { globals } from './globals.js';

export function init() {
  globals()
  scssWatcher()
}
