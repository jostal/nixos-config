import { App, Widget, Variable, Utils } from "../imports.js";
import icons from "../icons.js";

export const opened = Variable('')
App.connect('window-toggled', (_, name, visible) => {
  if (name === 'controlCenter' && !visible)
    Utils.timeout(500, () => opened.value = '')
})

export const Arrow = (name, activate) => {
  let deg = 0
  let iconOpened = false
  return Widget.Button({
    child: Widget.Icon({
      icon: icons.ui.arrow.right
    }).hook(opened, icon => {
      if (opened.value === name && !iconOpened || opened.value !== name && iconOpened) {
        const step = opened.value === name ? 10 : -10
        iconOpened = !iconOpened
        for (let i = 0; i < 9; ++i) {
          Utils.timeout(15 * i, () => {
            deg += step
            icon.setCss(`gtk-icon-transform: rotate(${deg}deg)`)
          })
        }
      }
    }),
    onClicked: () => {
      opened.value = opened.value === name ? '' : name
      if (typeof activate === 'function')
        activate()
    }
  })
}

export const ArrowToggleButton = ({
  name,
  icon,
  label,
  activate,
  deactivate,
  activateOnArrow = true,
  service,
  condition
}) => Widget.Box({
  className: 'toggleButton',
  children: [
    Widget.Button({
      child: Widget.Box({
        hexpand: true,
        className: 'label-box horizontal',
        children: [icon, label]
      }),
      onClicked: () => {
        if (condition()) {
          deactivate()
          if (opened.value === name)
            opened.value = ''
        } else {
          activate()
        }
      }
    }),
    Arrow(name, activateOnArrow && activate)
  ]
}).hook(service, box => {
  box.toggleClassName('active', condition())
})

export const SimpleToggleButton = ({
  icon,
  toggle,
  service,
  condition
}) => Widget.Button({
  className: 'simpleToggle',
  child: icon,
  onClicked: toggle
}).hook(service, button => {
  button.toggleClassName('active', condition())
})
