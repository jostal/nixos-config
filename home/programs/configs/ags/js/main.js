import Topbar from './topbar/Topbar.js';
import { forMonitors } from './utils.js';
import { init } from './settings/setup.js';
import { exec } from 'resource:///com/github/Aylur/ags/utils.js';


init();

const windows = () => [
  forMonitors(Topbar),
]

const scss = globalThis.configDir + '/scss/style.scss';
const css = globalThis.configDir + '/style.css';
exec(`sassc ${scss} ${css}`)

export default {
  windows: windows().flat(),
  maxStreamVolume: 1,
  cacheNotificationActions: true,
  style: css,
}
