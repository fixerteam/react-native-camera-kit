import React, { useEffect, useState } from 'react';
import { Text, View, PermissionsAndroid } from 'react-native';
import { CameraScreen } from '../../src';
import { BarCodeScannedCallback, BarCodeType } from '../../src/CameraScreen';

const askCameraPermission = async () => {
  const status = await PermissionsAndroid.request('android.permission.CAMERA');
  return status === 'granted';
};

const App = () => {
  const [barcodeType, setBarcodeType] = useState('');
  const [barcodeValue, setBarcodeValue] = useState('');
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  const handleBarcodeRead: BarCodeScannedCallback = ({ type, data }) => {
    setBarcodeType(type);
    setBarcodeValue(data);
  };

  useEffect(() => {
    askCameraPermission().then(setIsPermissionGranted);
  }, []);

  const result = `${barcodeType} ${barcodeValue}`;

  return isPermissionGranted ? (
    <>
      <CameraScreen
        showFrame
        laserColor='red'
        frameColor='white'
        onReadCode={handleBarcodeRead}
        barCodeTypes={[BarCodeType.qr, BarCodeType.ean13, BarCodeType.ean8, BarCodeType.upc_a, BarCodeType.upc_e]}
      />
      <View style={{ alignItems: 'center', backgroundColor: 'white' }}>
        <Text style={{ fontSize: 20, color: 'black' }}>{result}</Text>
      </View>
    </>
  ) : (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      <Text style={{ fontSize: 20, color: 'black', textAlign: 'center' }}>
        Требуется выдать разрешение для доступа к камере
      </Text>
    </View>
  );
};

export default App;
