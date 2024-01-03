import { Widget, Hyprland } from "../imports.js";
import Seperator from "../seperator/Seperator.js";

const FocusedTitle = () => Widget.EventBox({
  className: 'titleContainer',
  child: Widget.Box({
    className: 'titleBox',
    children: [
      Widget.Label({
        className: "titleClass",
        truncate: "end",
        maxWidthChars: 22,
        setup: self => self
          .hook(Hyprland.active.client, label => {
            label.label = Hyprland.active.client.class.length === 0 ? 'Desktop' : Hyprland.active.client.class.toUpperCase()
          })
      }),
      Seperator("-", "5px", "0"),
      Widget.Label({
        className: 'title',
        truncate: 'end',
        maxWidthChars: 22,
        setup: self => self
          .hook(Hyprland.active.client, label => {
            let title = Hyprland.active.client.title.length === 0 || Hyprland.active.client.title === Hyprland.active.client.class ? `Workspace ${Hyprland.active.workspace.id}` : Hyprland.active.client.title
            label.label = title
            label.tooltipText = title
          })
      })
    ]
  })
})

export default FocusedTitle
