import { Widget, App, Variable } from "../imports.js";

const timeVar = Variable('', {
  poll: [1000, [`date`, "+%H:%M"]]
})
const dateVar = Variable('', {
  poll: [5000, [`date`, "+%a, %d-%m"]]
})

const Clock = () => Widget.EventBox({
  child: Widget.Box({
    className: 'clockContainer',
    children: [
      Widget.Label({
        className: 'clockTime',
        hpack: "end",
        binds: [
          ["label", timeVar]
        ]
      }),
      Widget.Label({
        className: 'clockDate',
        hpack: 'end',
        binds: [
          ["label", dateVar]
        ]
      }),
    ]
  })
})

export default Clock;
