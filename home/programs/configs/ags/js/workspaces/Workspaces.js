import Hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js'
import { Widget } from "../imports.js";

const getWorkspaceMonitor = (id) => {
  let ws = Hyprland.getWorkspace(id)

  switch (ws?.monitor) {
    case "DVI-D-1":
      return "ᴸ"
    case "HDMI-A-1":
      return "ꟲ"
    case "HDMI-A-2":
      return "ᴿ"
    default:
      return ""
  }
}

const WorkspaceButton = (i) => Widget.EventBox({
  className: 'wsButton',
  onPrimaryClickRelease: () => Hyprland.sendMessage(`dispatch workspace ${i}`),
  child: Widget.Box({
    className: 'wsButtonLabel',
    children: [
      Widget.Label({
        label: `${i}`,
        className: 'wsLabel'
      }),
      Widget.Label({
        label: `${getWorkspaceMonitor(i)}`,
        className: 'wsMonitor'
      })
    ]
  }),
  connections: [
    [Hyprland.active.workspace, (button) => {
      button.toggleClassName('active', Hyprland.active.workspace.id === i)
      button.toggleClassName('wsLeft', getWorkspaceMonitor(i) === 'ᴸ')
      button.toggleClassName('wsCenter', getWorkspaceMonitor(i) === 'ꟲ')
      button.toggleClassName('wsRight', getWorkspaceMonitor(i) === 'ᴿ')
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
          const prevWorkspace = Hyprland.getWorkspace(i)
          const ws = Hyprland.getWorkspace(i + 1)
          const nextWorkspace = Hyprland.getWorkspace(i + 2)

          button.toggleClassName("occupied", ws?.windows > 0)
          button.toggleClassName("occupied-left", !prevWorkspace || prevWorkspace?.windows <= 0)
          button.toggleClassName("occupied-right", !nextWorkspace || nextWorkspace?.windows <= 0)
        })
      }, 'notify::workspaces']
    ]
  })
})


export default Workspaces
