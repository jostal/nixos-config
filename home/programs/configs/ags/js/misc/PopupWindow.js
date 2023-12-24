import { Widget, App } from "../imports.js";

const PopupRevealer = (windowName, transition, child) => Widget.Box({
  children: [
    Widget.Revealer({
      transition,
      child,
      transition_duration: 350,
    }).hook(App, (revealer, name, visible) => {
      if (name === windowName)
        revealer.revealChild = visible;
    })
  ]
})

export default ({ name, child, ...rest }) => Widget.Window({
  name,
  child: Widget.Box({
    children: [
      PopupRevealer(name, "slide_left", child)
    ]
  }),
  popup: true,
  focusable: true,
  visible: false,
  ...rest,
})
