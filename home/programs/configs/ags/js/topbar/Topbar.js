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

const testLabel = () => Widget.Button({
  cursor: 'pointer',
  child: Widget.Label('here')
})

const Right = () => Widget.Box({
  className: 'rightBar',
  orientation: 'horizontal',
  hpack: 'end',
  children: [
    testLabel
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
