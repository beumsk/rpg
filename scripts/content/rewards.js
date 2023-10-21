function randomRewards(from) {
  let rewardItems = items.filter((x) => x.lvl <= currentMap.lvl && x.src.includes('reward'));
  let item = rewardItems[rand(rewardItems.length)];

  let rewardStuff = stuff.filter(
    (x) => x.lvl === currentMap.lvl && x.src.includes('reward') && !stuffRewarded.includes(x)
  );
  let stuf = rewardStuff[rand(rewardStuff.length)];

  let rewardObj;
  if (from === 'chest') {
    // make it less interesting than map?
    rewardObj = {
      item,
      itemQtt: Math.floor((currentMap.lvl * 2) / item.price) || 1,
      stuf,
      gems: currentMap.lvl * 2,
    };
  } else if (from === 'map') {
    rewardObj = {
      item,
      itemQtt: Math.floor((currentMap.lvl * 2) / item.price) || 1,
      stuf,
      gems: currentMap.lvl * 2,
    };
  } else if (from === 'world') {
    // extra scroll when finishing world and/or map?
    rewardObj = { stuf };
  }

  return rewardObj;
}
