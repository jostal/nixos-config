import Topbar from './topbar/Topbar.js';
import App from 'resource:///com/github/Aylur/ags/app.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';
import { forMonitors } from './utils.js';
import { init } from './settings/setup.js';
import { exec } from 'resource:///com/github/Aylur/ags/utils.js';


init();

const windows = () => [
  forMonitors(Topbar),
]

const scss = globalThis.configDir + '/scss/style.scss';
const css = globalThis.configDir + '/scss/style.css';
exec(`sassc ${scss} ${css}`)

Utils.monitorFile(
  globalThis.configDir + '/scss',

  function() {
    console.log("scss reload")

    Utils.exec(`sassc ${scss} ${css}`)
    App.resetCss()
    App.applyCss(css)
  },
  'directory'
)

export default {
  windows: windows().flat(),
  maxStreamVolume: 1,
  cacheNotificationActions: true,
  style: css,
}
