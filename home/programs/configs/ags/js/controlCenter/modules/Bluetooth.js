import { Widget, Bluetooth } from "../../imports.js"

export const BluetoothList = () => Widget.Box({
  hexpand: true,
  vertical: true
})
  .hook(Bluetooth, box => {
    box.children = Bluetooth.devices.map(device => Widget.Box({
      hexpand: false,
      children: [
        Widget.Icon(device.iconName + '-symbolic'),
        Widget.Label(device.name),
        Widget.Label({
          label: `${device.battery_percentage}%`,
        })
          .bind('visible', device, 'battery_percentage', p => p > 0),
        Widget.Box({ hexpand: true }),
        device.connecting ? Widget.Spinner({
          active: true
        }) : Widget.Switch({
          active: device.connected,
        })
          .hook(device, sw => {
            sw.toggleClassName("active", device.connected)
          })
          .on("notify::active", sw => {
            const active = sw.active
            if (active !== device.connected)
              device.setConnection(active)
          })
      ]
    }))
  })
