const FIRE_TYPE_VAR = {
  LINE: 'line',
  SPRAY: 'spray',
  METEOR: 'meteor',
  CLUSTER: 'cluster',
  FLOWER: 'flower'
}

const FIRE_TYPE = [
  {
    label: '线性',
    value: FIRE_TYPE_VAR.LINE
  },
  {
    label: '喷射',
    value: FIRE_TYPE_VAR.SPRAY
  },
  {
    label: '线性',
    value: FIRE_TYPE_VAR.LINE
  },
  {
    label: '集束',
    value: FIRE_TYPE_VAR.CLUSTER
  },
  {
    label: '菊花',
    value: FIRE_TYPE_VAR.FLOWER
  }
]

const DATA = [{
  time: 0,
  fire: [{

  }]
}]

export {
  FIRE_TYPE_VAR,
  FIRE_TYPE,
  DATA
}
