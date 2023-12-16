import Hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js'
import { Widget, Variable } from "../imports.js";

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

const isOpenWorkspace = (wsId) => {
  const monitor = Hyprland.getMonitor(monId)
  const ws = Hyprland.getWorkspace(wsId)
  let whichMonitor

  switch (monId) {
    case 0:
      whichMonitor = 'center'
      break;
    case 1:
      whichMonitor = 'right'
      break;
    case 2:
      whichMonitor = 'left'
      break;
  }

  if (monitor.activeWorkspace.id === wsId) {
    return whichMonitor
  } else {
    return null
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
        className: 'wsMonitor',
        connections: [
          [Hyprland, self => {
            self.label = `${getWorkspaceMonitor(i)}`
          }, 'notify::workspaces']
        ]
      })
    ]
  }),
  connections: [
    [Hyprland.active.workspace, (button) => {
      button.toggleClassName('active', Hyprland.active.workspace.id === i)
      button.toggleClassName('wsLeft', getWorkspaceMonitor(i) === 'ᴸ')
      button.toggleClassName('wsCenter', getWorkspaceMonitor(i) === 'ꟲ')
      button.toggleClassName('wsRight', getWorkspaceMonitor(i) === 'ᴿ')
    }],
    [Hyprland.active.monitors, (button) => {
      button.toggleClassName('openLeft', isOpenWorkspace(i + 1) === 'left')
      button.toggleClassName('openCenter', isOpenWorkspace(i + 1) === 'center')
      button.toggleClassName('openRight', isOpenWorkspace(i + 1) === 'right')
    }]
  ]
})

const Workspaces = (monitor) => Widget.EventBox({
  child: Widget.Box({
    className: 'wsContainer',
    children: Array.from({ length: 10 }, (_, i) => i + 1).map(i => WorkspaceButton(i, monitor)),
    connections: [
      [Hyprland, (box) => {
        box.children.forEach((button, i) => {
          const prevWorkspace = Hyprland.getWorkspace(i)
          const ws = Hyprland.getWorkspace(i + 1)
          const nextWorkspace = Hyprland.getWorkspace(i + 2)

          const occupied = ws?.windows > 0
          const occupiedLeft = !prevWorkspace || prevWorkspace?.windows <= 0
          const occupiedRight = !nextWorkspace || nextWorkspace?.windows <= 0
          const occupiedBoth = (occupiedLeft && occupiedRight)

          button.toggleClassName("occupied", occupied)
          button.toggleClassName("occupied-left", occupiedLeft && !occupiedBoth)
          button.toggleClassName("occupied-right", occupiedRight && !occupiedBoth)
          button.toggleClassName("occupied-alone", occupiedBoth)
        })
      }, 'notify::workspaces']
    ]
  })
})


export default Workspaces
