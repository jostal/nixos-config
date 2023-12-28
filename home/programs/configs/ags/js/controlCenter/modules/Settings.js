import { Bluetooth, Widget } from "../../imports.js"
import AudioContent from "./Audio.js"
import StackState from "../../misc/StackState.js"
import icons from "../../icons.js"
import Menu from "./Menu.js"
import BluetoothList from "./Bluetooth.js"

export const SettingsState = new StackState("audio")

const SettingsButton = ({ icon, title, ...props }) => Widget.Button({
  child: Widget.Icon(icon),
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
      icon: icons.bluetooth.enabled,
      title: "bluetooth",
      tooltipText: "Bluetooth"
    }),
    SettingsButton({
      icon: icons.audio.volume.high,
      title: "audio",
      tooltipText: "Audio"
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
    ["bluetooth", SettingsPage(
      Menu({
        title: "Bluetooth",
        icon: icons.bluetooth.enabled,
        content: BluetoothList(),
        headerChild: Widget.Switch()
          .hook(Bluetooth, sw => {
            if (sw.active !== Bluetooth.enabled)
              sw.active = Bluetooth.enabled
          })
          .on("notify::active", ({ active }) => {
            if (active !== Bluetooth.enabled)
              Bluetooth.enabled = active
          })
      })
    )],
    ["audio", SettingsPage(
      Menu({
        title: "Audio",
        icon: icons.audio.volume.high,
        content: AudioContent()
      })
    )]
  ]
})

const Settings = () => {
  const stack = SettingsContent()
  const header = SettingsHeader()
  SettingsState.items = stack.items.map(i => i[0])
  return Widget.Box({
    vertical: true,
    children: [
      header,
      stack
    ]
  })
}

export default Settings
