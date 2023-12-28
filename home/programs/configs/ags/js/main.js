import Topbar from './topbar/Topbar.js';
import ControlCenter from './controlCenter/ControlCenter.js';
import { forMonitors } from './utils.js';
import { init } from './settings/setup.js';
import { exec } from 'resource:///com/github/Aylur/ags/utils.js';
import { NotificationPopup } from './misc/Notification.js';


init();

const windows = () => [
  forMonitors(Topbar),
  forMonitors(NotificationPopup),
  ControlCenter(),
]

const scss = globalThis.configDir + '/scss/style.scss';
const css = globalThis.configDir + '/style.css';
exec(`sassc ${scss} ${css}`)

export default {
  windows: windows().flat(),
  maxStreamVolume: 1,
  notificationPopupTimeout: 5000,
  cacheNotificationActions: true,
  style: css,
}
