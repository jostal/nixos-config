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
  console.log(CalState.value)
  console.log(CalState.currentDate)
  console.log(CalState.navDate)

  const prevNav = () => Widget.Button({
    child: Widget.Icon(icons.ui.arrow.left)
  })

  const nextNav = () => Widget.Button({
    child: Widget.Icon(icons.ui.arrow.right)
  })

  const monthNav = Widget.CenterBox({
    startWidget: prevNav(),
    centerWidget: Widget.Label({
      label: getMonthString(CalState.navDate.month)
    }),
    endWidget: nextNav()
  })

  const yearNav = Widget.CenterBox({
    startWidget: prevNav(),
    centerWidget: Widget.Label({
      label: CalState.navDate.year.toString()
    }),
    endWidget: nextNav()
  })

  const jumpCurDate = Widget.Button({
    child: Widget.Label({
      label: "Today"
    })
  })

  return Widget.CenterBox({
    startWidget: monthNav,
    centerWidget: yearNav,
    endWidget: jumpCurDate
  })
}

const Weekdays = () => Widget.Box({
  children: weekdays.map(day => Widget.Button({
    child: Widget.Label({
      label: day.substring(0, 3)
    })
  }))
})

// const Days = () => {
//   const daysInMonth = getDaysInMonth(CalState.navDate.month, CalState.navDate.year)
//
//   return Widget.Box({
//     children: [...Array(daysInMonth)].map((_, i) => Widget.Button({
//       child: Widget.Label({
//         label: (i + 1).toString()
//       })
//     }))
//   })
// }

const Days = () => {
  const daysOfMonth = getDaysByWeek(CalState.navDate)
  console.log(daysOfMonth)

  return Widget.Box({
  })
}

export default () => Widget.Box({
  vertical: true,
  children: [
    Header(),
    Weekdays(),
    Days()
  ]
})
