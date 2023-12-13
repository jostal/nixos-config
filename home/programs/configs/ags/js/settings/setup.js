import App from 'resource:///com/github/Aylur/ags/app.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';
import { globals } from './globals.js'

export function init() {
  globals()

  // reload css
  Utils.monitorFile(
    `${App.configDir}/scss`,

    function() {
      const scss = `${App.configDir}/scss/style.scss`
      const css = `${App.configDir}/scss/style.css`

      Utils.exec(`sassc ${scss} ${css}`)
      App.resetCss()
      App.applyCss(css)
    },
    'directory'
  )
}
