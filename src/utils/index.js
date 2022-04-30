export const isAndroid = () => {
  if (/android/i.test(navigator.userAgent)) {
    return true;
  }
  return false;
};

export const isIOS = () => {
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    return true;
  }
  return false;
};
