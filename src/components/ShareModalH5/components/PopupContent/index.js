import React, { memo } from "react";
import { list, listTwo } from "../../const";
import "./style.scss";

const PopupContent = ({ handleCancel, onShare, showListTwo = true }) => {
  const ShareItem = ({ item }) => {
    const handleShare = () => {
      onShare(item.name);
    };
    return (
      <div
        key={item.name}
        className="share-modal-main-item"
        onClick={handleShare}
      >
        <img src={item.img} alt="" />
        <div>{item.zhName ? item.zhName : item.name}</div>
      </div>
    );
  };

  return (
    <div className="share-modal-main">
      <div className="share-modal-main-list-one">
        <img src={require('../../img/bg@2x.png')} alt="" />
        <div className="share-modal-main-list-inner">
          {list.map((item) => {
            return <ShareItem item={item} key={item.name} />;
          })}
        </div>
      </div>

      {showListTwo ? (
        <div className="share-modal-main-list-two">
          <div className="share-modal-main-list-inner">
            {listTwo.map((item) => {
              return <ShareItem item={item} key={item.name} />;
            })}
          </div>
        </div>
      ) : null}

      <div className="share-modal-main-close">
        <div className="close-inner" onClick={handleCancel}>
          取消
        </div>
      </div>
    </div>
  );
};

export default memo(PopupContent);
