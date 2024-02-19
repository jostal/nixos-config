import App from 'resource:///com/github/Aylur/ags/app.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';

export function scssWatcher() {
  // reload css
  Utils.monitorFile(
    globalThis.configDir + '/scss',

    function() {
      const scss = globalThis.configDir + '/scss/style.scss'
      const css = globalThis.configDir + '/style.css'

      console.log("reloading scss")

      Utils.exec(`sassc ${scss} ${css}`)
      App.resetCss()
      App.applyCss(css)
    },
  )

  Utils.monitorFile(
    globalThis.configDir + '/scss/widgets',

    function() {
      const scss = globalThis.configDir + '/scss/style.scss'
      const css = globalThis.configDir + '/style.css'

      console.log("reloading scss")

      Utils.exec(`sassc ${scss} ${css}`)
      App.resetCss()
      App.applyCss(css)
    },
  )
}
