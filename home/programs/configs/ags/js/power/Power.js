import { Widget } from "../imports.js";
import icons from "../icons.js";
import PopupWindow from "../misc/PopupWindow.js";
import { systemShutdown } from "./PowerUtils.js";

const ControlButton = (className, iconName, clickEvent) => Widget.Button({
  className,
  child: Widget.Icon(iconName)
})

const PowerControls = () => Widget.Box({
  className: "powerControls",
  children: [
    ControlButton("power", icons.system.shutdown, systemShutdown)
  ]
})

export default () => PopupWindow({
  name: "power",
  layer: "overlay",
  child: PowerControls()
})
