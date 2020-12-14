import { Dimensions, Platform, StatusBar } from "react-native";

const DEVICE_HEIGHT = Dimensions.get("screen").height;

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const { height, width } = Dimensions.get("window");

export const isIPhoneX = () =>
  Platform.OS === "ios" && !Platform.isPad && !Platform.isTVOS
    ? (width === X_WIDTH && height === X_HEIGHT) ||
      (width === XSMAX_WIDTH && height === XSMAX_HEIGHT)
    : false;

export const StatusBarHeight = Platform.select({
  ios: { top: isIPhoneX() ? 44 : 20 },
  android: {
    top: StatusBar.currentHeight,
    height: height /*- StatusBar.currentHeight*/,
  },
  default: { top: 0 },
});
