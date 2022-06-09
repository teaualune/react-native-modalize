import * as React from 'react';
import { Dimensions, EmitterSubscription, ScaledSize } from 'react-native';
import { isAndroid } from './devices';
import { isBelowRN65 } from './libraries';
import getAndroidScreenHeight from './extra-dimensions';

function getDimensions(window: ScaledSize): ScaledSize {
  return {
    ...window,
    height: isAndroid ? getAndroidScreenHeight() : window.height,
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
