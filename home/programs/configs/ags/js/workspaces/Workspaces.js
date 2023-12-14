import Hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js'
import { Widget } from "../imports.js";

const WorkspaceButton = (i) => Widget.EventBox({
  className: 'wsButton',
  onPrimaryClickRelease: () => Hyprland.sendMessage(`dispatch workspace ${i}`),
  child: Widget.Label({
    label: `${i}`,
    className: 'wsButtonLabel'
  }),
  connections: [
    [Hyprland.active.workspace, (button) => {
      button.toggleClassName('active', Hyprland.active.workspace.id === i)
    }]
  ]
})

const Workspaces = () => Widget.EventBox({
  child: Widget.Box({
    className: 'wsContainer',
    children: Array.from({ length: 10 }, (_, i) => i + 1).map(i => WorkspaceButton(i)),
    connections: [
      [Hyprland, (box) => {
        box.children.forEach((button, i) => {
          const ws = Hyprland.getWorkspace(i + 1)
          const wsBefore = Hyprland.getWorkspace(i)
          const wsAfter = Hyprland.getWorkspace(i + 2)
          button.toggleClassName("occupied", ws?.windows > 0)
          button.toggleClassName("occupied-left", !wsBefore || wsBefore?.windows <= 0)
          button.toggleClassName("occupied-right", !wsAfter || wsAfter?.windows <= 0)
        })
      }, 'notify::workspaces']
    ]
  })
})


export default Workspaces
