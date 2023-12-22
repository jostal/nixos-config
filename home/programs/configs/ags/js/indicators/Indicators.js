import { Widget, Bluetooth, Audio } from "../imports.js"
import HoverableButton from "../misc/HoverableButton.js"
import HoverRevealer from "../misc/HoverRevealer.js"
import icons from '../icons.js'

const BluetoothDevicesIndicator = () => Widget.Box({
  className: 'bluetoothDevices',
  setup: self => self
    .hook(Bluetooth, box => {
      box.children = Bluetooth.connectedDevices
        .map(({ iconName, name }) => HoverRevealer({
          className: 'bluetoothDevice',
          indicator: Widget.Icon(iconName + '-symbolic'),
          child: Widget.Label(name)
        }))

      box.visible = Bluetooth.connectedDevices.length > 0
    }, 'notify::connected-devices')
})

const AudioIndicator = () => Widget.Icon({
  setup: self => self
    .hook(Audio, icon => {
      if (!Audio.speaker)
        return

      const { muted, low, medium, high } = icons.audio.volume
      if (Audio.speaker.isMuted)
        return icon.icon = muted

      const levels = [[67, high], [34, medium], [1, low], [0, muted]]
      icon.icon = levels.find(([n]) => n <= Audio.speaker.volume * 100)?.[1] || ''
    }, 'speaker-changed')
})

const Indicators = () => HoverableButton({
  className: 'barIndicatorsContainer',
  onClicked: () => { }, // open control center
  child: Widget.Box({
    className: 'barControlCenter',
    children: [
      BluetoothDevicesIndicator(),
      AudioIndicator()
    ]
  })
})

export default Indicators
