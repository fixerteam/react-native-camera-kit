import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Platform } from 'react-native';
import Camera from './Camera';

const { width, height } = Dimensions.get('window');

export type Props = {
  showFrame: any;
  laserColor: any;
  frameColor: any;
  barCodeTypes: BarCodeType[];
  onReadCode: BarCodeScannedCallback;
};

export enum BarCodeType {
  aztec = 'aztec',
  ean13 = 'ean13',
  ean8 = 'ean8',
  qr = 'qr',
  pdf417 = 'pdf417',
  upc_e = 'upc_e',
  datamatrix = 'datamatrix',
  code39 = 'code39',
  code93 = 'code93',
  itf14 = 'itf14',
  codabar = 'codabar',
  code128 = 'code128',
  upc_a = 'upc_a',
}

export type BarCodeScannerResult = {
  type: string;
  data: string;
};

export type BarCodeScannedEvent = {
  nativeEvent: BarCodeScannerResult;
};

export type BarCodeScannedCallback = (params: BarCodeScannerResult) => void;

const EVENT_THROTTLE_MS = 500;

export default class CameraScreen extends Component<Props> {
  lastEvents: { [key: string]: any } = {};
  lastEventsTimes: { [key: string]: any } = {};

  onObjectDetected = (callback?: BarCodeScannedCallback) => ({ nativeEvent }: BarCodeScannedEvent) => {
    const { type } = nativeEvent;
    if (
      this.lastEvents[type] &&
      this.lastEventsTimes[type] &&
      JSON.stringify(nativeEvent) === this.lastEvents[type] &&
      Date.now() - this.lastEventsTimes[type] < EVENT_THROTTLE_MS
    ) {
      return;
    }

    if (callback) {
      callback(nativeEvent);
      this.lastEventsTimes[type] = new Date();
      this.lastEvents[type] = JSON.stringify(nativeEvent);
    }
  };

  render() {
    const { onReadCode, ...restProps } = this.props;
    return (
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} onReadCode={this.onObjectDetected(onReadCode)} {...restProps} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cameraContainer: {
    ...Platform.select({
      android: {
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
      },
      default: {
        flex: 10,
        flexDirection: 'column',
      },
    }),
  },
  camera: {
    flex: 1,
  },
});
