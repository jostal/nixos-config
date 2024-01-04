import Hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js'
import { Widget } from "../imports.js";

const getWorkspaceMonitor = (id) => {
  let ws = Hyprland.getWorkspace(id)

  switch (ws?.monitor) {
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

const isOpenWorkspace = (wsId) => {
  const ws = Hyprland.getWorkspace(wsId)
  const monId = ws?.monitorID
  const monitor = Hyprland.getMonitor(monId)
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

  if (monitor?.activeWorkspace.id === wsId) {
    return whichMonitor
  } else {
    return null
  }
}

const label = (i) => Widget.Label({
  label: `${i}`,
  hpack: "center",
  hexpand: true,
  // vexpand: false,
  className: 'wsLabel',
  setup: self => self
    .hook(Hyprland, label => {
      const ws = Hyprland.getWorkspace(i)
      label.label = ws?.windows > 0 ? `${i}` : " "
    }, 'notify::workspaces')
    .hook(Hyprland.active.workspace, label => {
      label.toggleClassName('active', Hyprland.active.workspace.id === i)
    })
})

const WorkspaceButton = (i) => Widget.Overlay({
  className: "buttonOverlay",
  child: Widget.EventBox({
    className: 'wsButton',
    // hpack: "fill",
    hexpand: true,
    // vexpand: false,
    onPrimaryClickRelease: () => Hyprland.sendMessage(`dispatch workspace ${i}`),
    setup: self => self
      .hook(Hyprland.active.workspace, (button) => {
        button.toggleClassName('active', Hyprland.active.workspace.id === i)
        button.toggleClassName('wsLeft', getWorkspaceMonitor(i) === 'L')
        button.toggleClassName('wsCenter', getWorkspaceMonitor(i) === 'C')
        button.toggleClassName('wsRight', getWorkspaceMonitor(i) === 'R')
      })
      .hook(Hyprland, (button) => {
        button.toggleClassName('openLeft', isOpenWorkspace(i) === 'left')
        button.toggleClassName('openCenter', isOpenWorkspace(i) === 'center')
        button.toggleClassName('openRight', isOpenWorkspace(i) === 'right')
      }, 'notify::monitors')
  }),
  overlays: [
    label(i)
  ],
})
const Workspaces = (monitor) => Widget.Box({
  child: Widget.Box({
    className: 'wsContainer',
    hpack: "center",
    hexpand: true,
    children: Array.from({ length: 10 }, (_, i) => i + 1).map(i =>
      Widget.Box({
        hexpand: true,
        hpack: "center",
        className: 'wsButtonContainer',
        setup: self => self
          .hook(Hyprland.active.workspace, box => {
            box.toggleClassName('active', Hyprland.active.workspace.id === i)
          })
          .hook(Hyprland, box => {
            const ws = Hyprland.getWorkspace(i)
            box.toggleClassName("occupied", ws?.windows > 0)
          }, 'notify::workspaces'),
        children: [
          WorkspaceButton(i)
        ]
      })
    ),
  })
})


export default Workspaces
