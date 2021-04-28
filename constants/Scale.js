import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

//Guideline sizes based on the screen the code was developed on
const guidelineBaseWidth = 485;
const guidelineBaseHeight = 806;

const scale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };
