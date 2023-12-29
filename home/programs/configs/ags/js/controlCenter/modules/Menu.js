import { Widget } from "../../imports.js";

export default ({ title, icon, iconWidget, content, headerChild = Widget.Box({ hexpand: true }), ...props }) => Widget.Box({
  ...props,
  children: [
    Widget.Box({
      className: "settingsMenu",
      vertical: true,
      children: [
        Widget.CenterBox({
          className: "settingsTitle",
          startWidget: Widget.Box({ hexpand: true }),
          centerWidget: Widget.Box({
            spacing: 5,
            children: [
              iconWidget || Widget.Icon(icon),
              Widget.Label(title),
            ]
          }),
          endWidget: headerChild,
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
