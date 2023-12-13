import { Widget, App, Variable } from "../imports.js";

const timeVar = Variable('', {
  poll: [1000, [`date`, "+%H:%M:%S"]]
})
const dateVar = Variable('', {
  poll: [5000, [`date`, "+%a %Y-%m-%d"]]
})

const Clock = () => Widget.EventBox({
  child: Widget.Box({
    className: 'clockContainer',
    vertical: true,
    children: [
      Widget.Label({
        className: 'clockDate',
        hpack: 'end',
        binds: [
          ["label", dateVar]
        ]
      }),
      Widget.Label({
        className: 'clockTime',
        hpack: "end",
        binds: [
          ["label", timeVar]
        ]
      })
    ]
  })
})

export default Clock;
