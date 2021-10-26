import {
  getRealWindowHeight,
  getSoftMenuBarHeight,
  isSoftMenuBarEnabled,
} from 'react-native-extra-dimensions-android';

export default function getAndroidScreenHeight(): number {
  return getRealWindowHeight() - (isSoftMenuBarEnabled() ? getSoftMenuBarHeight() : 0);
}
