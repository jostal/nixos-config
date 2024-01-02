import { Widget } from "../../imports.js"
import CalendarState from "./CalendarState.js"
import icons from "../../icons.js"
import { getDaysByWeek, getDaysInMonth, getMonthString, weekdays } from "./CalendarUtils.js"
/*
   CONTAINER
      HEADER
        NAV
      BODY
        WEEKDAYS
        DATES
          DATE
*/

export const CalState = new CalendarState(new Date())

const Header = () => {
  const prevNav = () => Widget.Button({
    className: "arrow",
    child: Widget.Icon(icons.ui.arrow.left)
  })

  const nextNav = () => Widget.Button({
    className: "arrow",
    child: Widget.Icon(icons.ui.arrow.right)
  })

  const monthNav = Widget.CenterBox({
    className: "nav",
    startWidget: prevNav(),
    centerWidget: Widget.Label({
      label: getMonthString(CalState.navDate.month)
    }),
    endWidget: nextNav()
  })

  const yearNav = Widget.CenterBox({
    className: "nav",
    startWidget: prevNav(),
    centerWidget: Widget.Label({
      label: CalState.navDate.year.toString()
    }),
    endWidget: nextNav()
  })

  const jumpCurDate = Widget.Button({
    className: "jumpToday",
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
  children: week.days.map(day => Widget.Button({
    className: `day ${day.isCurrentMonth ? 'currentMonth' : 'otherMonth'} ${day.isToday ? 'today' : ''}`,
    child: Widget.Label({
      label: day.day.toString()
    })
  }))
})

const Days = () => {
  const daysOfMonth = getDaysByWeek(CalState.navDate)
  console.log(daysOfMonth)

  return Widget.Box({
    className: "weeks",
    vertical: true,
    children: daysOfMonth.map((week) => Week(week))
  })
}

export default () => Widget.Box({
  className: "calendarContainer",
  vertical: true,
  children: [
    Header(),
    Weekdays(),
    Days()
  ]
})
