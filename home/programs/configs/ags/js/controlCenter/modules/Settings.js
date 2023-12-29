import { Notifications, Widget } from "../../imports.js"
import AudioContent from "./Audio.js"
import StackState from "../../misc/StackState.js"
import icons from "../../icons.js"
import Menu from "./Menu.js"
import { BluetoothList } from "./Bluetooth.js"
import NotificationList from "./Notifications.js"

export const SettingsState = new StackState("audio")

const SettingsButton = ({ icon, title, ...props }) => Widget.Button({
  child: icon,
  className: "settingsButton",
  ...props,
  onClicked: () => {
    SettingsState.value = title
  }
}).hook(SettingsState, button => {
  button.toggleClassName("active", title === SettingsState.value)
})

const SettingsHeader = () => Widget.Box({
  homogeneous: true,
  className: "settingsHeader",
  children: [
    SettingsButton({
      icon: Widget.Icon()
        .hook(Notifications, self => {
          self.icon = Notifications.notifications.length > 0
            ? icons.notifications.new
            : icons.notifications.notification
        }),
      title: "notifications",
      cursor: "pointer",
    }),
    SettingsButton({
      icon: Widget.Icon(icons.bluetooth.enabled),
      title: "bluetooth",
      cursor: "pointer",
      // tooltipText: "Bluetooth"
    }),
    SettingsButton({
      icon: Widget.Icon(icons.audio.volume.high),
      cursor: "pointer",
      title: "audio",
      // tooltipText: "Audio"
    })
  ]
})

const SettingsPage = content => Widget.Scrollable({
  className: "settingsPage",
  vexpand: true,
  hscroll: "never",
  child: content,
})

const SettingsContent = () => Widget.Stack({
  transition: "slide_left_right",
  items: [
    ["notifications", SettingsPage(
      Menu({
        title: "Notifications",
        iconWidget: Widget.Icon({
          setup: self => self
            .hook(Notifications, self => {
              self.icon = Notifications.notifications.length > 0
                ? icons.notifications.new
                : icons.notifications.notification
            })
        }),
        content: NotificationList(),
        headerChild: Widget.Box({
          hpack: "end",
          children: [
            Widget.Button({
              cursor: "pointer",
              onClicked: () => Notifications.clear(),
              child: Widget.Label("Clear all"),
              setup: self => self
                .hook(Notifications, self => {
                  self.visible = Notifications.notifications.length > 0
                })
            })
          ]
        })
      })
    )
    ],
    ["bluetooth", SettingsPage(
      Menu({
        title: "Bluetooth",
        icon: icons.bluetooth.enabled,
        content: BluetoothList(),
      })
    )],
    ["audio", SettingsPage(
      Menu({
        title: "Audio",
        icon: icons.audio.volume.high,
        content: AudioContent()
      })
    )]
  ],
  setup: self => self
    .hook(SettingsState, () => {
      self.shown = SettingsState.value
    })
})

const Settings = () => {
  const stack = SettingsContent()
  const header = SettingsHeader()
  SettingsState.items = stack.items.map(i => i[0])
  return Widget.EventBox({
    child: Widget.Box({
      vertical: true,
      children: [
        header,
        stack
      ]
    })
  })
}

export default Settings
