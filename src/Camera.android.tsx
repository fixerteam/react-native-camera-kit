import React from 'react';
import _ from 'lodash';
import { requireNativeComponent, NativeModules, processColor } from 'react-native';

const { RNCameraKitModule } = NativeModules;
const NativeCamera = requireNativeComponent('CKCameraManager');

function Camera(props, ref) {
  const nativeRef = React.useRef();

  React.useImperativeHandle(ref, () => ({
    requestDeviceCameraAuthorization: async () => {
      return await RNCameraKitModule.requestDeviceCameraAuthorization();
    },
  }));

  const transformedProps = _.cloneDeep(props);
  _.update(transformedProps, 'frameColor', (c) => processColor(c));
  _.update(transformedProps, 'laserColor', (c) => processColor(c));

  return <NativeCamera ref={nativeRef} {...transformedProps} />;
}

export default React.forwardRef(Camera);
