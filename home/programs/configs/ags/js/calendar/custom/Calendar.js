import { Widget } from "../../imports.js"
import CalendarState from "./CalendarState.js"
import icons from "../../icons.js"
import { getDaysByWeek, getDaysInMonth, getMonthString, navNextMonth, navNextYear, navPrevMonth, navPrevYear, navToday, weekdays } from "./CalendarUtils.js"

export const CalState = new CalendarState(new Date())

const Header = () => {
  const prevNav = (type) => Widget.Button({
    onPrimaryClickRelease: () => {
      if (type === "month")
        navPrevMonth()
      if (type === "year")
        navPrevYear()
    },
    className: "arrow",
    cursor: "pointer",
    hpack: "start",
    child: Widget.Icon(icons.ui.arrow.left)
  })

  const nextNav = (type) => Widget.Button({
    className: "arrow",
    cursor: "pointer",
    onPrimaryClickRelease: () => {
      if (type === "month")
        navNextMonth()
      if (type === "year")
        navNextYear()
    },
    hpack: "end",
    child: Widget.Icon(icons.ui.arrow.right)
  })

  const monthNav = Widget.CenterBox({
    className: "nav month",
    startWidget: prevNav("month"),
    centerWidget: Widget.Label({})
      .hook(CalState, self => {
        self.label = getMonthString(CalState.navDate.month)
      }, 'changed'),
    endWidget: nextNav("month")
  })

  const yearNav = Widget.CenterBox({
    className: "nav year",
    startWidget: prevNav("year"),
    centerWidget: Widget.Label()
      .hook(CalState, self => {
        self.label = CalState.navDate.year.toString()
      }, 'changed'),
    endWidget: nextNav("year")
  })

  const jumpCurDate = Widget.Button({
    cursor: "pointer",
    className: "jumpToday",
    onPrimaryClickRelease: () => navToday(),
    hpack: "end",
    child: Widget.Label({
      label: "Today"
    })
  })

  return Widget.CenterBox({
    className: "navContainer",
    startWidget: monthNav,
    centerWidget: yearNav,
    endWidget: jumpCurDate
  })
}

const Weekdays = () => Widget.Box({
  homogeneous: true,
  className: "weekdays",
  children: weekdays.map(day => Widget.Button({
    child: Widget.Label({
      label: day.substring(0, 3)
    })
  }))
})

const Week = (week) => Widget.Box({
  className: "weekRow",
  homogeneous: true,
  children: week.days.map(day => Widget.Box({
    className: "dayContainer",
    children: [
      Widget.Button({
        className: `day ${day.isCurrentMonth ? 'currentMonth' : 'otherMonth'} ${day.isToday ? 'today' : ''}`,
        child: Widget.Label({
          label: day.day.toString()
        })
      })
    ]
  }))
})

const Days = () => Widget.Box({
  className: "weeks",
  vertical: true,
})
  .hook(CalState, self => {
    const daysOfMonth = getDaysByWeek(CalState.navDate)
    self.children = daysOfMonth.map((week) => Week(week))
  }, 'changed')

export default () => Widget.Box({
  className: "calendarContainer",
  vertical: true,
  children: [
    Header(),
    Weekdays(),
    Days()
  ]
})
