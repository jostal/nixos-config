import { App, Widget, Bluetooth, Audio, Network, Notifications } from "../imports.js"
import HoverableButton from "../misc/HoverableButton.js"
import HoverRevealer from "../misc/HoverRevealer.js"
import icons from '../icons.js'
import Seperator from "../seperator/Seperator.js"
import { SettingsState } from "../controlCenter/modules/Settings.js"

const NetworkIndicator = () => Widget.EventBox({
  onHover: (box) => box.toggleClassName("hover", true),
  onHoverLost: (box) => box.toggleClassName("hover", false),
  child: Widget.Icon({
    className: 'networkIndicator indicator',
    setup: self => self
      .hook(Network, self => {
        const icon = Network[Network.primary || 'wifi']?.iconName
        self.icon = icon || ''
        self.visible = icon
      })
  })
})

const NotificationIndicator = () => Widget.EventBox({
  onPrimaryClick: (box) => {
    SettingsState.value = "notifications"
    box.toggleClassName("hover", false)
  },
  onHover: (box) => box.toggleClassName("hover", true),
  onHoverLost: (box) => box.toggleClassName("hover", false),
  child: Widget.Icon({
    className: 'notificationIndicator indicator',
    icon: icons.notifications.new,
    setup: self => self
      .hook(Notifications, self => {
        self.visible = Notifications.notifications.length > 0
        self.tooltipText = `${Notifications.notifications.length}`
      })
  })
})

const BluetoothIndicator = () => Widget.EventBox({
  onPrimaryClick: (box) => {
    SettingsState.value = "bluetooth"
    box.toggleClassName("hover", false)
  },
  onHover: (box) => box.toggleClassName("hover", true),
  onHoverLost: (box) => box.toggleClassName("hover", false),
  child: Widget.Icon({
    className: "bluetoothIndicator indicator",
    icon: icons.bluetooth.enabled,
    setup: self => self
      .hook(Bluetooth, self => {
        self.visible = Bluetooth.connectedDevices.length > 0
        self.tooltipText = `${Bluetooth.connectedDevices.length}`
      })
  })
})

const AudioIndicator = () => Widget.EventBox({
  onPrimaryClick: (box) => {
    SettingsState.value = "audio"
    box.toggleClassName("hover", false)
  },
  onHover: (box) => box.toggleClassName("hover", true),
  onHoverLost: (box) => box.toggleClassName("hover", false),
  child: Widget.Icon({
    className: "audioIndicator indicator",
    tooltipText: "Audio",
    setup: self => self
      .hook(Audio, icon => {
        if (!Audio.speaker)
          return

        icon.tooltipText = `${Math.floor(Audio.speaker.volume * 100)}%`

        const { muted, low, medium, high } = icons.audio.volume
        if (Audio.speaker.isMuted)
          return icon.icon = muted

        const levels = [[67, high], [34, medium], [1, low], [0, muted]]
        icon.icon = levels.find(([n]) => n <= Audio.speaker.volume * 100)?.[1] || ''
      }, 'speaker-changed')
  })
})

const Indicators = () => HoverableButton({
  className: 'barIndicatorsContainer',
  onClicked: () => { App.toggleWindow('controlCenter') },
  child: Widget.Box({
    // spacing: 8,
    className: 'barControlCenter',
  })
    .hook(Bluetooth, box => {
      box.children = [
        NotificationIndicator(),
        BluetoothIndicator(),
        AudioIndicator(),
        NetworkIndicator()
      ]
    }, 'notify::connected-devices')
}).hook(App, (btn, win, visible) => {
  btn.toggleClassName('active', win === 'controlCenter' && visible)
})

export default Indicators
