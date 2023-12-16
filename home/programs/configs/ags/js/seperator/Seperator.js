import { Widget } from "../imports.js";

const Seperator = (sep, horMargins, vertMargins) => Widget.Label({
  className: 'sep',
  label: sep,
  css: `
    margin-left: ${horMargins};
    margin-right: ${horMargins};
    margin-top: ${vertMargins};
    margin-bottom: ${vertMargins}
  `
})

export default Seperator
