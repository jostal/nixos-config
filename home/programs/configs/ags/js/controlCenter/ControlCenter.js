import { Widget, App } from "../imports.js"
import PopupWindow from "../misc/PopupWindow.js"
import Header from "./modules/Header.js"
import Settings from "./modules/Settings.js"

const ControlCenter = () => Widget.Box({
  hexpand: true,
  children: [
    Widget.EventBox({
      onPrimaryClick: () => App.closeWindow("controlCenter"),
      onSecondaryClick: () => App.closeWindow("controlCenter"),
      onMiddleClick: () => App.closeWindow("controlCenter")
    }),
    Widget.Box({
      vertical: true,
      vexpand: true,
      className: "controlCenter",
      children: [
        // Header(),
        Settings()
      ]
    })
  ]
})

export default () => PopupWindow({
  margins: [5, 5],
  className: "controlCenterContainer",
  anchor: ["right", "top"],
  name: "controlCenter",
  child: ControlCenter()
})
