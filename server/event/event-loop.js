setImmediate(()=> console.log("[阶段3.immediate] immediate 回调1"))
setImmediate(()=> console.log("[阶段3.immediate] immediate 回调2"))
setImmediate(()=> console.log("[阶段3.immediate] immediate 回调3"))

setTimeout(()=> console.log("[阶段1...定时器] 定时器 回调1"), 0)
setTimeout(()=> {
  console.log("[阶段1...定时器] 定时器 回调2")
  process.nextTick(()=>{
    console.log("[...待切入下一阶段] 定时器 回调2 nextTick 回调5")
  })
}, 0)
setTimeout(()=> console.log("[阶段1...定时器] 定时器 回调3"), 0)
setTimeout(()=> console.log("[阶段1...定时器] 定时器 回调4"), 0)

process.nextTick(()=>{
  console.log("[...待切入下一阶段] nextTick 回调1")
})
process.nextTick(()=>{
  console.log("[...待切入下一阶段] nextTick 回调2")
  process.nextTick(()=>{
    console.log("[...待切入下一阶段] nextTick 回调4")
  })
})
process.nextTick(()=>{
  console.log("[...待切入下一阶段] nextTick 回调3")
})