import { Widget, Hyprland } from "../imports.js";
import icons from "../icons.js";
import PopupWindow from "../misc/PopupWindow.js";

const systemShutdown = () => {
  Hyprland.sendMessage("dispatch exec systemctl poweroff")
}

const systemReboot = () => {
  Hyprland.sendMessage("dispatch exec systemctl reboot")
}

const ControlButton = (className, iconName, clickEvent) => Widget.Button({
  onClicked: clickEvent,
  className: `controlButton ${className}`,
  cursor: "pointer",
  child: Widget.Icon(iconName)
})

const Controls = () => Widget.Box({
  className: "powerControls",
  vpack: "center",
  hexpand: true,
  hpack: "center",
  children: [
    ControlButton("power", icons.system.shutdown, systemShutdown),
    ControlButton("restart", icons.system.restart, systemReboot)
  ]
})


const PowerControls = () => Widget.Box({
  className: "powerContainer",
  expand: true,
  children: [
    Controls()
  ]
})

export default () => PopupWindow({
  name: "power",
  layer: "overlay",
  anchor: ["top", "left", "right", "bottom"],
  exclusivity: "ignore",
  child: PowerControls()
})
