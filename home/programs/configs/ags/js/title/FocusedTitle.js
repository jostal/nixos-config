import { Widget, Hyprland } from "../imports.js";

const FocusedTitle = () => Widget.EventBox({
  className: 'titleContainer',
  child: Widget.Box({
    vertical: true,
    className: 'titleBox',
    children: [
      Widget.Label({
        hpack: "end",
        className: "titleClass",
        truncate: "end",
        maxWidthChars: 22,
        setup: self => self
          .hook(Hyprland.active.client, label => {
            label.label = Hyprland.active.client.class.length === 0 ? 'Desktop' : Hyprland.active.client.class
          })
      }),
      Widget.Label({
        hpack: "end",
        className: 'title',
        truncate: 'end',
        maxWidthChars: 22,
        setup: self => self
          .hook(Hyprland.active.client, label => {
            label.label = Hyprland.active.client.title.length === 0 ? `Workspace ${Hyprland.active.workspace.id}` : Hyprland.active.client.title
          })
      })
    ]
  })
})

export default FocusedTitle
