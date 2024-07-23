import { Dimensions } from "react-native";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const ICONS = {
  logo: require("./assets/media/logo.png"),
  show: require("./assets/media/show.png"),
  hide: require("./assets/media/hide.png"),
  lock: require("./assets/media/lock.png"),
  mail: require("./assets/media/mail.png"),
  user: require("./assets/media/user.png"),
  facebook: require("./assets/media/facebook.png"),
  google: require("./assets/media/google.png"),
  home: require("./assets/media/home.png"),
  search: require("./assets/media/search.png"),
  notification: require("./assets/media/notification.png"),
  profile: require("./assets/media/profile.png"),
};

const THEME = {
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
};

export { ICONS, THEME };
