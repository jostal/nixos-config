import { App, Widget, Applications, Utils } from "../imports.js";
import icons from "../icons.js";
import PopupWindow from "../misc/PopupWindow.js";
import { Fzf } from "../../node_modules/fzf/dist/fzf.es.js"
import Gtk from "gi://Gtk"
import HoverableButton from "../misc/HoverableButton.js";

const WINDOW_NAME = "appLauncher"

const AppIcon = app => {
  const icon = app.icon_name && Utils.lookUpIcon(app.icon_name)
    ? app.icon_name
    : "image-missing"
  return Widget.Icon({
    className: "appIcon",
    icon: icon
  })
}

const AppButton = app => HoverableButton({
  onClicked: () => {
    app.launch()
    App.closeWindow(WINDOW_NAME)
  },
  attribute: {
    "app": app
  },
  tooltipText: app.description,
  className: "appButton",
  child: Widget.Box({
    children: [
      AppIcon(app),
      Widget.Box({
        vertical: true,
        children: [
          Widget.Label({
            xalign: 0,
            maxWidthChars: 28,
            truncate: "end",
            useMarkup: true,
            label: app.name,
            className: "appName"
          }),
          Widget.Label({
            xalign: 0,
            maxWidthChars: 40,
            truncate: "end",
            label: app.description,
            className: "appDescription"
          })
        ]
      })
    ]
  })
})
  .on("focus-in-event", self => {
    self.toggleClassName("focused", true)
  })
  .on("focus-out-event", self => {
    self.toggleClassName("focused", false)
  })

const fzf = new Fzf(Applications.list.map(AppButton), {
  selector: item => item.attribute.app.name,
  tiebreakers: [(a, b) => b.item.attribute.app._frequency - a.item.attribute.app._frequency]
})

function searchApps(text, results) {
  results.children.forEach(c => results.remove(c))
  const fzfResults = fzf.find(text)
  const context = results.get_style_context()
  const color = context.get_color(Gtk.StateFlags.NORMAL)
  const hexcolor = "#" + (color.red * 0xff).toString(16).padStart(2, "0")
    + (color.green * 0xff).toString(16).padStart(2, "0")
    + (color.blue * 0xff).toString(16).padStart(2, "0")
  fzfResults.forEach(entry => {
    const nameChars = entry.item.attribute.app.name.normalize().split("")
    entry.item.child.children[1].children[0].label = nameChars.map((char, i) => {
      if (entry.positions.has(i)) {
        return `<span foreground="${hexcolor}">${char}</span>`
      } else {
        return char
      }
    }).join("")
  })
  results.children = fzfResults.map(e => e.item)
}

const SearchBox = () => {
  const results = Widget.Box({
    vertical: true,
    vexpand: true,
    className: "searchResults"
  })
  const entry = Widget.Entry({
    className: "searchEntry",
    primaryIconName: icons.apps.search,
  }).on("notify::text", entry => searchApps(entry.text || "", results))
    .hook(App, (app, name, visible) => {
      if (name !== WINDOW_NAME || !visible)
        return

      entry.text = ""
      entry.grab_focus()
    }, "window-toggled")

  return Widget.Box({
    vertical: true,
    className: "appLauncher",
    children: [
      entry,
      Widget.Separator({}),
      Widget.Scrollable({
        className: "searchScroll",
        child: results
      })
    ]
  })
}

export default () => PopupWindow({
  focusable: true,
  name: WINDOW_NAME,
  child: SearchBox()
})
