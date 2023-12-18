import HoverableButton from "../misc/HoverableButton.js"
import icons from '../../icons.js'

const AudioIndicator = () => Widget.Icon({
  setup: self => self
    .hook(Audio, icon => {
      if (!Audio.speaker)
        return

      const { muted, low, medium, high } = icons.audio.volume
    })
})

const Indicators = () => HoverableButton({
  className: 'barIndicatorsContainer',
  onClicked: () => { }, // open control center
  child: Widget.Box({
    className: 'barControlCenter',
    children: [

    ]
  })
})

export default Indicators
