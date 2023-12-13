import { App, Widget } from '../imports.js';

const Left = () => Widget.Box({
  className: 'leftBar',
  orientation: 'horizontal',
  hpack: 'start',
  hexpand: true,
  children: [

  ]
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
  children: [

  ],
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
