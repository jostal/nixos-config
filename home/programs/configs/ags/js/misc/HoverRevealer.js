import { Widget, Utils } from "../imports.js";

export default ({
  indicator,
  child,
  direction = 'left',
  duration = 300,
  ...rest
}) => {
  let open = false
  const vertical = direction === "down" || direction === "up"
  const posStart = direction === "down" || direction === "right"
  const posEnd = direction === "up" || direction === "left"

  const revealer = Widget.Revealer({
    transition: `slide_${direction}`,
    transition_duration: duration,
    child,
  })

  const eventbox = Widget.EventBox({
    ...rest,
    onHover: () => {
      if (open)
        return

      revealer.reveal_child = true
      Utils.timeout(duration, () => open = true)
    },
    onHoverLost: () => {
      if (!open)
        return

      revealer.reveal_child = false
      open = false
    },
    child: Widget.Box({
      vertical,
      children: [
        posStart && indicator,
        revealer,
        posEnd && indicator
      ]
    })
  })


  return Widget.Box({
    children: [eventbox]
  })
}
