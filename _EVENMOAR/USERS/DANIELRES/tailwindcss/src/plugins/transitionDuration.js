import createUtilityPlugin from '../util/createUtilityPlugin'

export default function() {
  return createUtilityPlugin('transitionDuration', [['duration', ['transitionDuration']]])
}
