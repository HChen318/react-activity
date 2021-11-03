import { useEffect, useState, useRef } from 'react'
import './style.scss'

/**
 *
 * @param {Array} data - 数据源
 * @param {string} iconName  - 左侧图标
 * @param {number} intervalTime - 间隔时间
 * @param {string} className - 类
 * @returns
 */
let _timer = null

const ScrollTips = ({ data, iconName, intervalTime = 3000, className }) => {
  const [animatiomStyle, setAnimatiomStyle] = useState({})
  const [list, setList] = useState([])
  const scrollBox = useRef(null)

  useEffect(() => {
    let index
    const initHandler = () => {
      clearInterval(_timer)
      index = 1
      setAnimatiomStyle({
        transform: `translateY(0px)`,
        transition: 'none'
      })
    }
    initHandler()

    if (!scrollBox?.current) return
    const scrollBoxHeight = scrollBox.current?.getBoundingClientRect()?.height

    const _data = [...data]

    if (_data.length > 1) {
      _data.push(_data[0])

      _timer = setInterval(() => {
        if (index > _data.length - 2) {
          setAnimatiomStyle({
            transform: `translateY(-${index++ * scrollBoxHeight}px)`,
            transition: 'all 1s'
          })
          index = 1
          setTimeout(() => {
            setAnimatiomStyle({
              transform: `translateY(0px)`,
              transition: 'none'
            })
          }, 1000)
        } else {
          setAnimatiomStyle({
            transform: `translateY(-${index++ * scrollBoxHeight}px)`,
            transition: 'all 1s'
          })
        }
      }, intervalTime)
    }
    setList(_data)
    return () => {
      clearInterval(_timer)
    }
  }, [data])

  if (!data?.length) return null

  return (
    <div
      className={`scroll-tips-box :global(update-srcoll-tips-box) ${className}`}
      ref={scrollBox}
    >
      <div className="scroll-tips-list" style={animatiomStyle}>
        {list.map((item, index) => {
          return (
            <div key={index} className="scroll-tips-li">
              <div className="tips">{item.tips}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ScrollTips
