import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle
} from 'react'
import classnames from 'classnames'
import './style.scss'

/**
 *
 * @param {Array} rewardList - 源数据
 * @param {Function} onStart - 开始
 * @param {Function} onEnd - 结束
 * @param {string} initSpeed - 初始化速度
 * @param {string} initCycle - 初始化圈数
 * @returns
 */
const LuckyGrid = forwardRef((props, ref) => {
  const {
    rewardList,
    onStart,
    onEnd,
    children,
    initSpeed = 100,
    initCycle = 13,
    languageCode
  } = props
  const [clickStatus, setClickStatus] = useState(false)
  const [index, setIndex] = useState(-1)
  const [list, setList] = useState([])
  const [cycle, setCycle] = useState(initCycle)
  const speed = useRef(initSpeed) // 初始化速度
  const prize = useRef(-1)
  const timer = useRef(null)
  const times = useRef(0)
  const indexTem_ = useRef(-1)

  useImperativeHandle(ref, () => ({
    stop,
    reset
  }))

  useEffect(() => {
    if (rewardList.length) {
      const middleClick = {
        name: '',
        img: require('./img/GO.png').default
      }
      const temp = rewardList.slice()
      temp.splice(4, 0, middleClick)
      setList(temp)
    }
    return () => {
      clearTimeout(timer.current)
      timer.current = null
    }
  }, [rewardList])

  const Go = () => {
    setClickStatus(true)
    if (clickStatus) {
      return false
    } else {
      onStart && onStart()
    }
  }

  const stop = val => {
    prize.current = val
    roll()
  }

  const reset = () => {
    setClickStatus(false)
  }

  const roll = () => {
    indexTem_.current += 1
    times.current += 1
    setIndex(indexTem_.current)
    if (indexTem_.current > rewardList.length - 1) {
      setIndex(0)
      indexTem_.current = 0
    }
    if (times.current > cycle + 10 && prize.current === indexTem_.current) {
      clearTimeout(timer.current)
      prize.current = -1
      times.current = 0
      speed.current = 100
      setClickStatus(false)
      // 等待active停止后结束
      setTimeout(() => {
        onEnd && onEnd()
      }, 100)
    } else {
      if (times.current < cycle) {
        speed.current -= 10
      } else {
        if (
          times.current > cycle + 10 &&
          ((prize.current === 0 && indexTem_.current === 7) ||
            prize.current === indexTem_.current + 1)
        ) {
          speed.current += 110
        } else {
          speed.current += 20
        }
      }
      if (speed.current < 40) {
        speed.current = 40
      }
      timer.current = setTimeout(roll, speed.current)
    }
  }

  return (
    <div className="lottery">
      <div className="top">{children}</div>
      <div className="lottery-wrapper">
        <ul>
          {list.map((ele, i) => {
            return (
              <li className={classnames(i === 4 ? 'btn' : '')} key={i}>
                {i === 4 ? (
                  <p onClick={() => Go()}>
                    <img src={ele.img} alt="" />
                  </p>
                ) : (
                  <p>
                    {ele.seq === index ? (
                      <img
                        className="hight-light"
                        src={require('./img/highlight.png').default}
                        alt=""
                      />
                    ) : null}
                    <img src={ele.img} alt="" />
                  </p>
                )}
              </li>
            )
          })}
        </ul>
      </div>
      <div className="decorate">
        <img src={require('./img/decorate.png').default} alt="" />
      </div>
    </div>
  )
})

export default LuckyGrid
