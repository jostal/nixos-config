import { App, Widget } from '../imports.js';
import { RoundedAngleEnd, RoundedCorner } from "../misc/Rounded.js";
import Tray from "../systemTray/Tray.js";
import Clock from "../clock/Clock.js";
import Workspaces from "../workspaces/Workspaces.js";
import FocusedTitle from "../title/FocusedTitle.js";
import Indicators from "../indicators/Indicators.js"

const Left = () => Widget.EventBox({
  className: 'leftBar',
  child: Widget.Box({
    className: 'barBlock',
    hexpand: false,
    hpack: "start",
    children: [
      Workspaces(),
      FocusedTitle(),
      // RoundedAngleEnd("topright", { className: "angle" }),
    ]
  })
})

const Center = () => Widget.Box({
  className: 'centerBar',
  orientation: 'horizontal',
  hpack: 'end',
  children: [
    // RoundedAngleEnd("topleft", { className: "angle", hexpand: true }),
    Clock(),
    // notifs
    // RoundedAngleEnd("topright", { className: "angle", hexpand: true }),
  ]
})

const Right = () => Widget.Box({
  className: 'rightBar',
  orientation: 'horizontal',
  hpack: 'end',
  child: Widget.EventBox({
    hpack: 'end',
    className: 'barBlock',
    child: Widget.Box({
      children: [
        Widget.EventBox({
          onPrimaryClickRelease: () => App.openWindow("controlCenter"),
          onSecondaryClickRelease: () => App.openWindow("appLauncher"),
          child: Widget.Box({
            children: [
              Indicators(),
            ]
          })
        })
      ]
    })
  }),
})

export default monitor => Widget.Window({
  name: `bar${monitor}`,
  className: 'barWindow',
  anchor: ['top', 'left', 'right'],
  exclusivity: 'exclusive',
  monitor,
  hexpand: true,
  child: Widget.CenterBox({
    className: 'bar',
    startWidget: Left(),
    centerWidget: Center(),
    endWidget: Right(),
  })
})
