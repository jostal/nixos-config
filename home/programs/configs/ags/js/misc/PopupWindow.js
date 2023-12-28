import { Widget, App, Utils } from "../imports.js";

export default ({
  transition = "slide_down",
  transition_duration = 500,
  onOpen = () => { },
  onClose = () => { },

  name,
  child,
  visible = false,
  layer = 'overlay',
  close_on_unfocus = 'released',
  ...props
}) => {
  const window = Widget.Window({
    name,
    layer,
    visible: false,
    focusable: true,
    popup: true,
    ...props,
    attribute: {
      get_child: () => window.child.children[0].child,
      set_child: (new_child) => {
        window.child.children[0].child = new_child
        window.child.children[0].show_all()
      },
      // close_on_unfocus
    },
    setup: () => {
      // open window on startup if visible
      const id = App.connect('config-parsed', () => {
        if (visible)
          App.openWindow(String(name))
        App.disconnect(id)
      })
    },
    // Need to wrap revealer inside a box to allocate space even when not revealed
    child: Widget.Box({
      css: `
        min-height: 1px;
        min-width: 1px;
        padding: 1px;
      `,
      child: Widget.Revealer({
        transition,
        transition_duration,
        setup: (self) => {
          self.hook(App, (_, currentName, isOpen) => {
            if (currentName === name) {
              self.reveal_child = isOpen

              if (isOpen) {
                onOpen(window)
              } else {
                Utils.timeout(Number(transition_duration), () => {
                  onClose(window)
                })
              }
            }
          })
        },
        child: child || Box()
      })
    })
  })

  return window
}
