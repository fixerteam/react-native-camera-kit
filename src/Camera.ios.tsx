import React from 'react';
import * as _ from 'lodash';
import { requireNativeComponent, NativeModules, processColor } from 'react-native';

const { CKCameraManager } = NativeModules;
const NativeCamera = requireNativeComponent('CKCamera');

function Camera(props, ref) {
  const nativeRef = React.useRef();

  React.useImperativeHandle(ref, () => ({
    requestDeviceCameraAuthorization: async () => {
      return await CKCameraManager.checkDeviceCameraAuthorizationStatus();
    },
    checkDeviceCameraAuthorizationStatus: async () => {
      return await CKCameraManager.checkDeviceCameraAuthorizationStatus();
    },
  }));

  const transformedProps = _.cloneDeep(props);
  _.update(transformedProps, 'frameColor', (c) => processColor(c));
  _.update(transformedProps, 'laserColor', (c) => processColor(c));

  return <NativeCamera ref={nativeRef} {...transformedProps} />;
}

Camera.defaultProps = {
  resetFocusTimeout: 0,
  resetFocusWhenMotionDetected: true,
  saveToCameraRoll: false,
};

export default React.forwardRef(Camera);
