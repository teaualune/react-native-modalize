import * as React from 'react';
import { Dimensions, EmitterSubscription, ScaledSize } from 'react-native';
import {
  getRealWindowHeight,
  getSoftMenuBarHeight,
  isSoftMenuBarEnabled,
} from 'react-native-extra-dimensions-android';

import { isAndroid, isBelowRN65 } from './devices';

export function getDimensions(window: ScaledSize) {
  return {
    width: window.width,
    height: isAndroid
      ? (
        getRealWindowHeight() - (isSoftMenuBarEnabled() ? getSoftMenuBarHeight() : 0)
      )
      : window.height,
  };
}

export const useDimensions = (): ScaledSize => {
  const [dimensions, setDimensions] = React.useState(getDimensions(Dimensions.get('window')));

  const onChange = ({ window }: { window: ScaledSize }): void => {
    setDimensions(getDimensions(window));
  };

  React.useEffect(() => {
    let dimensionChangeListener: EmitterSubscription | null = null;

    if (isBelowRN65) {
      Dimensions.addEventListener('change', onChange);
    } else {
      dimensionChangeListener = Dimensions.addEventListener('change', onChange);
    }

    return () => {
      if (isBelowRN65) {
        Dimensions.removeEventListener('change', onChange);
      } else {
        dimensionChangeListener?.remove();
      }
    };
  }, []);

  return dimensions;
};
