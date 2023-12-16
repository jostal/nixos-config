import App from 'resource:///com/github/Aylur/ags/app.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';

Utils.monitorFile(
  globalThis.configDir + '/scss',

  function() {
    const scss = globalThis.configDir + '/scss/style.scss'
    const css = globalThis.configDir + '/scss/style.css'

    console.log("scss reload")

    Utils.exec(`sassc ${scss} ${css}`)
    App.resetCss()
    App.applyCss(css)
  },
  'directory'
)
