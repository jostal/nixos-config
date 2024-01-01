import { Widget, App, Variable } from "../imports.js";
import Seperator from "../seperator/Seperator.js";

const timeVar = Variable('', {
  poll: [1000, [`date`, "+%H:%M"]]
})
const dateVar = Variable('', {
  poll: [5000, [`date`, "+%a %d %b"]]
})

const Clock = () => Widget.EventBox({
  cursor: "pointer",
  onPrimaryClick: () => App.toggleWindow("calendar"),
  child: Widget.Box({
    className: 'clockContainer',
    children: [
      Widget.Label({
        className: 'clockDate',
        hpack: 'end',
        binds: [
          ["label", dateVar]
        ]
      }),
      Seperator("•", "0.4em", "0"),
      Widget.Label({
        className: 'clockTime',
        hpack: "end",
        binds: [
          ["label", timeVar]
        ]
      }),
    ]
  })
})

export default Clock;
