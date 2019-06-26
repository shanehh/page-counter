const beforeDawnTimestamp = (cases) => {
  // 获得凌晨 timestamp: new Date().setHours(0, 0, 0, 0)
  let ts = new Date().setHours(0, 0, 0, 0)
  const daySpan = 86400000
  switch (cases) {
    case 'yesterday':
      ts -= daySpan
      break
    case 'tomorrow':
      ts += daySpan
      break
    default:
      break
  }
  return ts
}

const { log, dir } = console

export { log, dir, beforeDawnTimestamp }
