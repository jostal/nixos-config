import { Widget } from "../imports.js"
import PopupWindow from "../misc/PopupWindow.js"
import Gtk from 'gi://Gtk'
const { DateTime } = imports.gi.GLib
import Calendar from "./custom/Calendar.js"


const CalendarWidget = () => Widget.Box({
  className: "calendarContainer",
  child: Widget.Calendar({
    showDayNames: true,
    showHeading: true,
    className: "calendar"
  })
})

const TOP_MARGIN = 6

export default () => PopupWindow({
  name: "calendar",
  anchor: ["top"],
  margins: [TOP_MARGIN, 0, 0, 0],
  child: Widget.Box({
    vertical: true,
    children: [
      Calendar()
    ]
  })
})
