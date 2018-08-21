const FIRE_TYPE_VAR = {
  LINE: 'line',
  SPRAY: 'spray',
  METEOR: 'meteor',
  CLUSTER: 'cluster',
  FLOWER: 'flower'
}

const FIRE_TYPE = [{
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

const FIRE_POSITION = [{
  label: '城堡中央',
  value: 'A1'
},
{
  label: '城堡左侧',
  value: 'A2'
},
{
  label: '城堡右侧',
  value: 'A3'
},
{
  label: '左侧',
  value: 'B1'
},
{
  label: '右侧',
  value: 'B2'
},
{
  label: '背部',
  value: 'C1'
}
]

const DATA = [{
  time: 0,
  fire: [{
    type: FIRE_TYPE_VAR.LINE,
    position: 'B1',
    color: 'white'
  },
  {
    type: FIRE_TYPE_VAR.LINE,
    position: 'B2',
    color: 'white'
  }
  ]
},
{
  time: 1323,
  fire: [{
    type: FIRE_TYPE_VAR.SPRAY,
    position: 'C1',
    num: 2
  },
  {
    type: FIRE_TYPE_VAR.SPRAY,
    position: 'C2'
  },
  {
    type: FIRE_TYPE_VAR.SPRAY,
    position: 'C3'
  }
  ]
},
{
  time: 2512,
  fire: [{
    type: FIRE_TYPE_VAR.SPRAY,
    position: 'B1',
    num: 2
  },
  {
    type: FIRE_TYPE_VAR.SPRAY,
    position: 'B2'
  }
  ]
},
{
  time: 2574,
  fire: [{
    type: FIRE_TYPE_VAR.SPRAY,
    position: 'B1',
    num: 2
  },
  {
    type: FIRE_TYPE_VAR.SPRAY,
    position: 'B2'
  }
  ]
},
{
  time: 2644,
  fire: [{
    type: FIRE_TYPE_VAR.SPRAY,
    position: 'B1',
    num: 2
  },
  {
    type: FIRE_TYPE_VAR.SPRAY,
    position: 'B2'
  }
  ]
},
{
  time: 2721,
  fire: [{
    type: FIRE_TYPE_VAR.SPRAY,
    position: 'B1',
    num: 2
  },
  {
    type: FIRE_TYPE_VAR.SPRAY,
    position: 'B2'
  }
  ]
}
]

export {
  FIRE_TYPE_VAR,
  FIRE_TYPE,
  DATA,
  FIRE_POSITION
}
