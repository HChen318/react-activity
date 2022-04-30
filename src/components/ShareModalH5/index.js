import React, { memo, useCallback, useState } from "react";
import { Popup, Toast } from "antd-mobile";
import { isAndroid, isIOS } from "@/utils";
import PopupContent from "./components/PopupContent";
import {
  WhatsApp,
  Telegram,
  Instagram,
  Facebook,
  Messenger,
  Twitter,
  Line,
  SMS,
  CopyLink,
} from "./const";

import "./style.scss";

const ShareModal = (props) => {
  const {
    shareData = {},
    contentType,
    isHideCreatPoster = true,
    modalVisible,
    handleCancelCallBack,
    handleShareCallBack,
  } = props;

  const [hasCreatPoster, setHasCreatPoster] = useState(false); // 是否生成了海报

  // copy
  const handleCopyLink = useCallback(() => {
    let { link, title, content } = shareData;
    let con = title || content;
    const str = con ? `${con}\n${link}` : link;

    const createInput = document.createElement("textarea");
    createInput.value = str;
    document.body.appendChild(createInput);
    createInput.select();
    document.execCommand("Copy");
    createInput.remove();
    Toast.show({
      content: "链接已复制在粘贴板",
    });
  }, [shareData]);

  const shareFn = useCallback(
    (type, link, content, bitmap) => {
      const text = content + "\n" + link;
      const encodeText =
        encodeURIComponent(content) + encodeURIComponent("\n" + link);

      switch (type) {
        case WhatsApp:
          window.location =
            "whatsapp://send?text=" + encodeText + "&via=lopscoop";
          break;
        case Facebook:
          // location = `fb://post?message=helloworld` schema???
          window.location = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(
            link
          )}&quote=${encodeURIComponent(content)}`;
          break;
        case Messenger:
          // content???
          window.location =
            "fb-messenger://share/?link=" + encodeURIComponent(link);
          break;
        case SMS:
          if (isAndroid()) {
            window.location = `sms:${""}?body=${text}`;
          } else if (isIOS()) {
            window.location = `sms:${""}&body=${text}`;
          }
          break;
        case Telegram:
          window.location = "tg://msg?text=" + encodeText;
          break;
        case Twitter:
          window.location = "twitter://messages/compose?text=" + text;
          break;
        // Not realized
        case Instagram:
          // getInsShareImg()
          break;
        case Line:
          break;
        case CopyLink:
          handleCopyLink();
          break;
        default:
      }
      handleCancelCallBack(false);
    },
    [handleCopyLink, shareData]
  );

  const onShare = useCallback(
    async (type) => {
      let { link, content } = shareData;
      handleShareCallBack && handleShareCallBack(type);
      shareFn(type, link, content);
    },
    [shareData, shareFn]
  );

  const handleCancel = useCallback(() => {
    setHasCreatPoster(false);
    handleCancelCallBack && handleCancelCallBack();
  }, [contentType, shareData, hasCreatPoster]);

  return (
    <Popup
      title={"Share"}
      visible={modalVisible}
      onClose={handleCancel}
      className="share-modal-H5"
    >
      <PopupContent
        handleCancel={handleCancel}
        onShare={onShare}
        isHideCreatPoster={isHideCreatPoster}
      />
    </Popup>
  );
};

export default memo(ShareModal);
