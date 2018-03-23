const attType = [
  {
    name: '上海迪士尼度假区',
    id: 'destination',
    icon: '',
    showTab: false
  },
  {
    name: '周围景点',
    id: 'entertainment-venue',
    icon: '',
    showTab: false
  },

  {
    name: '主题园区',
    id: 'land',
    icon: '',
    showTab: false
  },
  {
    name: '游乐项目',
    id: 'attraction',
    icon: 'attractions',
    showTab: true
  },
  {
    name: '娱乐演出',
    id: 'entertainment',
    icon: 'entertainment',
    showTab: true
  },

  {
    name: '餐饮',
    id: 'restaurant',
    icon: 'dining',
    showTab: true
  },
  {
    name: '商店',
    id: 'merchandisefacility',
    icon: 'in-park-shopping',
    showTab: true
  },
  {
    name: '洗手间',
    id: 'fadsgfad',
    icon: 'restrooms',
    showTab: true
  },
  {
    name: '迪士尼乐拍通',
    id: 'fadsgfad3sadf2',
    icon: 'photo-pass-plus',
    showTab: true
  },
  {
    name: '主题活动',
    id: 'event',
    icon: 'tours-events',
    showTab: true
  },
  {
    name: '游客服务',
    id: 'evenadsfsfdt',
    icon: 'information',
    showTab: true
  },
  {
    name: '酒店',
    id: 'resort',
    icon: 'resorts',
    showTab: true
  },
  {
    name: '休闲活动',
    id: 'playsfd',
    icon: 'disneyland-recreation',
    showTab: true
  },
  {
    name: '主题乐园',
    id: 'theme-park',
    icon: '',
    showTab: false
  }
  // {
  //   name: 'The BOATHOUSE™',
  //   id: 'restaurant',
  //   icon: '',
  //   showTab: false
  // }
]

const attLevelList = [
  {
    id: 'attSoaringOverHorizon;entityType=Attraction;destination=shdr',
    aid: 'attSoaringOverHorizon',
    name: '翱翔•飞越地平线',
    level: 3
  },
  {
    id: 'attRoaringRapids;entityType=Attraction;destination=shdr',
    aid: 'attRoaringRapids',
    name: '雷鸣山漂流',
    level: 3
  },
  {
    id: 'attTronLightcyclePowerRun;entityType=Attraction;destination=shdr',
    aid: 'attTronLightcyclePowerRun',
    name: '创极速光轮',
    level: 3
  },
  {
    id: 'attBuzzLightyearPlanetRescue;entityType=Attraction;destination=shdr',
    aid: 'attBuzzLightyearPlanetRescue',
    name: '巴斯光年星际营救',
    level: 3
  },
  {
    id: 'attSevenDwarfsMineTrain;entityType=Attraction;destination=shdr',
    aid: 'attSevenDwarfsMineTrain',
    name: '七个小矮人矿山车',
    level: 3
  },
  {
    id: 'attAdventuresWinniePooh;entityType=Attraction;destination=shdr',
    aid: 'attAdventuresWinniePooh',
    name: '小熊维尼历险记',
    level: 3
  },
  {
    id: 'attPeterPansFlight;entityType=Attraction;destination=shdr',
    aid: 'attPeterPansFlight',
    name: '小飞侠天空奇遇',
    level: 3
  },
  {
    id: 'attExplorerCanoes;entityType=Attraction;destination=shdr',
    aid: 'attExplorerCanoes',
    name: '探险家独木舟',
    level: 2
  },
  {
    id: 'attJetPacks;entityType=Attraction;destination=shdr',
    aid: 'attJetPacks',
    name: '喷气背包飞行器',
    level: 2
  },
  {
    id: 'attFantasiaCarousel;entityType=Attraction;destination=shdr',
    aid: 'attFantasiaCarousel',
    name: '幻想曲旋转木马',
    level: 2
  },
  {
    id: 'attDumboFlyingElephant;entityType=Attraction;destination=shdr',
    aid: 'attDumboFlyingElephant',
    name: '小飞象',
    level: 2
  },
  {
    id: 'attHunnyPotSpin;entityType=Attraction;destination=shdr',
    aid: 'attHunnyPotSpin',
    name: '旋转疯蜜罐',
    level: 2
  },
  {
    id: 'attOnceUponTimeAdventure;entityType=Attraction;destination=shdr',
    aid: 'attOnceUponTimeAdventure',
    name: '漫游童话时光',
    level: 2
  },
  {
    id: 'attVoyageToCrystalGrotto;entityType=Attraction;destination=shdr',
    aid: 'attVoyageToCrystalGrotto',
    name: '晶彩奇航',
    level: 2
  },
  {
    id: 'attPiratesOfCaribbean;entityType=Attraction;destination=shdr',
    aid: 'attPiratesOfCaribbean',
    name: '加勒比海盗——沉落宝藏之战',
    level: 2
  },
  {
    id: 'attCampDiscovery;entityType=Attraction;destination=shdr',
    aid: 'attCampDiscovery',
    name: '古迹探索营',
    level: 2
  },
  {
    id: 'attAdventuresWinniePooh;entityType=Attraction;destination=shdr',
    aid: 'attAdventuresWinniePooh',
    name: '小熊维尼历险记',
    level: 2
  }
]

exports.attLevelList = attLevelList

exports.attType = attType
// exports.attTypeTab = {
//   list: attType.filter(_ => _.showTab),
//   selectedId: 'attraction',
//   selectedIndex: 0
// }
exports.attsType = attType.filter(_ => _.showTab)

exports.attTypeIcon = (function() {
  const list = []
  attType.forEach(_ => {
    list[_.id] = _.icon
  })
  return list
})()

const landArr = {
  landTomorrowland: '明日世界',
  landGardensOfImagination: '奇想花园',
  landAdventureIsle: '探险岛',
  landFantasyland: '梦幻世界',
  landTreasureCove: '宝藏湾',
  landMickeyAvenue: '米奇大街'
}

exports.landArr = landArr
