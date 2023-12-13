import { App, Widget } from '../imports.js';

const testLabel = Widget.Label({
  label: 'example content'
})

export default monitor => Widget.Window({
  name: `bar${monitor}`,
  anchor: ['top', 'left', 'right'],
  exclusivity: 'exclusive',
  monitor,
  child: Widget.Box({
    className: 'bar',
    children: [
      testLabel,
    ]
  })
})
