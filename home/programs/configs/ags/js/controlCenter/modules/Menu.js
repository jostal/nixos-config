import { Widget } from "../../imports.js";

export default ({ title, icon, content, headerChild = Widget.Box() }) => Widget.Box({
  children: [
    Widget.Box({
      className: "settingsMenu",
      children: [
        Widget.Icon(icon),
        Widget.Label(title),
        Widget.Box({ hexpand: true }),
        headerChild
      ]
    }),
    // seperator
    Widget.Box({
      className: "settingsContent",
      children: [content]
    })
  ]
})
