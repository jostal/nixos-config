import { Widget, App, Variable } from "../imports.js";
import Seperator from "../seperator/Seperator.js";

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
      Seperator("•", "0.4em", "0"),
      // Widget.Label({
      //   className: "sep",
      //   label: "•",
      //   hpack: "end",
      // }),
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
