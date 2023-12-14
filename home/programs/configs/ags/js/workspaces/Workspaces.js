import Hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js'
import { Widget } from "../imports.js";

const getWorkspaceMonitor = (id) => {
  console.log(id)
  let ws = Hyprland.getWorkspace(id)
  console.log(ws)

  switch (ws.monitor) {
    case "DVI-D-1":
      return "L"
    case "HDMI-A-1":
      return "C"
    case "HDMI-A-2":
      return "R"
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
      button.toggleClassName('wsLeft', getWorkspaceMonitor(i) === 'L')
      button.toggleClassName('wsCenter', getWorkspaceMonitor(i) === 'C')
      button.toggleClassName('wsRight', getWorkspaceMonitor(i) === 'R')
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
