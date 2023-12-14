import { App, Widget } from '../imports.js';
import { RoundedAngleEnd, RoundedCorner } from "../misc/Rounded.js";
import Tray from "../systemTray/Tray.js";
import Clock from "../clock/Clock.js";
import Workspaces from "../workspaces/Workspaces.js";

const Left = () => Widget.EventBox({
  className: 'leftBar',
  child: Widget.Box({
    children: [
      Workspaces(),
      RoundedAngleEnd("topright", { className: "angle" }),
    ]
  })
})

const Center = () => Widget.Box({
  className: 'centerBar',
  orientation: 'horizontal',
  hpack: 'end',
  children: [

  ]
})

const Right = () => Widget.Box({
  className: 'rightBar',
  orientation: 'horizontal',
  hpack: 'end',
  child: Widget.EventBox({
    hpack: 'end',
    child: Widget.Box({
      children: [
        RoundedAngleEnd("topleft", { className: "angle", hexpand: true }),
        Tray(),
        Widget.EventBox({
          child: Widget.Box({
            children: [
              Clock(),
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
