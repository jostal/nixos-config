import { Widget, App } from "../imports.js"
import PopupWindow from "../misc/PopupWindow.js"
import Header from "./modules/Header.js"
import Settings from "./modules/Settings.js"

const ControlCenter = () => Widget.Box({
  className: "controlCenterBox",
  children: [
    Widget.Box({
      className: "controlEventBox",
      children: [
        Widget.EventBox({
          expand: true,
          hpack: "fill",
          onPrimaryClick: () => App.closeWindow("controlCenter"),
          onSecondaryClick: () => App.closeWindow("controlCenter"),
          onMiddleClick: () => App.closeWindow("controlCenter")
        }),
      ]
    }),
    Widget.Box({
      expand: false,
      hpack: "end",
      vpack: "start",
      className: "controlCenter",
      children: [
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
