import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  getActivityInfoAPI,
  getLoteryChanceAPI,
  getWinPrizeListAPI,
  getPrizeResultAPI,
} from "./request";
import LuckyGrid from "./components/LuckyGrid";
import ScrollTips from "./components/ScrollTips";

import "./style.scss";

function BigTurntable() {
  const [winPrizeList, setWinPrizeList] = useState([]);
  const [activityInfo, setActivityInfo] = useState({});
  const [sysTime, setSysTime] = useState(null);
  const [loteryChance, setLoteryChance] = useState(0);
  const [rewardList, setRewardList] = useState([]);
  const [currentPrize, setCurrentPrize] = useState(null);
  let LuckyDom = useRef();
  let language = useRef("in");

  useEffect(() => {
    getActivityInfo();
    getWinPrizeList();
    getLoteryChance();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function getActivityInfo() {
    const res = await getActivityInfoAPI({});
    const { data, success, sysTime } = res;
    if (!success) return console.log("err");
    if (data?.rewardList && Array.isArray(data.rewardList)) {
      const arr = data.rewardList
        .sort((a, b) => a - b)
        .map((ele, i) => {
          let seq = i;
          switch (i) {
            case 3:
              seq = 7;
              break;
            case 4:
              seq = 3;
              break;
            case 5:
              seq = 6;
              break;
            case 6:
              seq = 5;
              break;
            case 7:
              seq = 4;
              break;
            default:
              break;
          }
          return {
            ...ele,
            img: language.current === "en" ? ele.imageEnLink : ele.imageIdLink,
            name: language.current === "en" ? ele.nameEn : ele.nameId,
            seq,
          };
        });
      setRewardList(arr);
    }
    setActivityInfo(data?.activityTurn || {});
    setSysTime(sysTime);
  }

  // 机会
  async function getLoteryChance() {
    const res = await getLoteryChanceAPI({});
    const { data, success } = res;
    if (!success) return console.log("err");
    setLoteryChance(data || 0);
  }

  // 轮播
  async function getWinPrizeList() {
    const response = await getWinPrizeListAPI({});
    const { data, success } = response;
    if (!success) return console.log("err");
    if (data && Array.isArray(data)) {
      const arr = data.map((ele) => {
        return {
          tips: `${ele.phoneNumber} ${
            language.current === "en" ? "has won" : "telah memenangkan"
          } ${language.current === "en" ? ele.rewardNameEn : ele.rewardNameId}`,
        };
      });
      setWinPrizeList(arr);
    }
  }

  // 1未开始 2开始 3 结束
  const isActivityDuring = useMemo(() => {
    if (sysTime) {
      if (sysTime < activityInfo.startTime) {
        return 1;
      } else if (
        sysTime >= activityInfo.startTime &&
        sysTime < activityInfo.endTime &&
        activityInfo.status === 1
      ) {
        return 2;
      } else if (sysTime > activityInfo.endTime && activityInfo.status === 3) {
        return 3;
      }
    } else {
      return false;
    }
  }, [activityInfo, sysTime]);

  const luckyStart = async () => {
    if (isActivityDuring === 1 || isActivityDuring === 3) {
      console.log(isActivityDuring === 1 ? "活动未开始" : "活动已结束");
      LuckyDom.current.reset();
      return;
    }

    if (loteryChance <= 0) {
      LuckyDom.current.reset();
      return console.log("无抽奖机会啦，快去做任务吧");
    }
    const res = await getPrizeResultAPI({});
    const { data, success } = res;
    if (success) {
      const currentPrize = rewardList.find(
        (ele) => ele.id === data?.rewardRelationId
      );
      setCurrentPrize(currentPrize);
      LuckyDom.current.stop(currentPrize?.seq);
    } else {
      LuckyDom.current.reset();
      console.log("err");
    }
  };

  const luckEnd = () => {
    console.log('-===中奖了')
    // if (!currentPrize) return;
  };

  return (
    <>
      <div className="bigTurn">
        <div className="bigTurn-table">
          <div className="my-rewards">
            <img src={require("./img/gift.png").default} alt="" />
            <span>我的奖品</span>
          </div>
          <div className="rule" onClick={() => {}}>
            规则
          </div>
          <div className="subject">
            <img src={require("./img/mascot.png").default} alt="" />
          </div>
          <LuckyGrid
            ref={LuckyDom}
            rewardList={rewardList}
            onStart={() => luckyStart()}
            onEnd={() => luckEnd()}
          >
            <div className="chance">
              你有{loteryChance}抽奖机会
              <span
                onClick={() => {
                  getLoteryChance();
                }}
              >
                刷新
              </span>
            </div>
          </LuckyGrid>
          <div className="luck-footer">
            <div className="tips-warrper">
              {!!winPrizeList.length && <ScrollTips data={winPrizeList} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BigTurntable;
