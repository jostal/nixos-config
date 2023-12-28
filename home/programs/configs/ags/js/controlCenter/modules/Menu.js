import { Widget } from "../../imports.js";

export default ({ title, icon, content, headerChild = Widget.Box() }) => Widget.Box({
  children: [
    Widget.Box({
      className: "settingsMenu",
      vertical: true,
      children: [
        Widget.Box({
          className: "settingsTitle",
          hpack: "center",
          spacing: 3,
          children: [
            Widget.Icon(icon),
            Widget.Label(title),
            Widget.Box({ hexpand: true }),
            headerChild
          ]
        }),
        Widget.Separator(),
        Widget.Box({
          className: "settingsContent",
          children: [content]
        })
      ]
    }),
  ]
})
