export const connectBTDeviceRX = async (eventListener) => {
  let options = {
    acceptAllDevices: true,
    optionalServices: ["6e400001-b5a3-f393-e0a9-e50e24dcca9e"]
  };
  console.log('Requesting Bluetooth Device...');
  let device = await navigator.bluetooth.requestDevice(options);
  let server = await device.gatt.connect();
  let service = await server.getPrimaryService('6e400001-b5a3-f393-e0a9-e50e24dcca9e')
  let characteristic = await service.getCharacteristic('6e400003-b5a3-f393-e0a9-e50e24dcca9e')
  await characteristic.startNotifications()
  await characteristic.addEventListener('characteristicvaluechanged', eventListener);
  console.log('Device connected, listening for events...');
}

export const connectBTDeviceTX = async (eventListener) => {
  let options = {
    acceptAllDevices: true,
    optionalServices: ["6e400001-b5a3-f393-e0a9-e50e24dcca9e"]
  };
  console.log('Requesting Bluetooth Device...');
  let device = await navigator.bluetooth.requestDevice(options);
  let server = await device.gatt.connect();
  let service = await server.getPrimaryService('6e400001-b5a3-f393-e0a9-e50e24dcca9e')
  let characteristic = await service.getCharacteristic('6e400002-b5a3-f393-e0a9-e50e24dcca9e')
  await characteristic.startNotifications()
  await characteristic.addEventListener('characteristicvaluechanged', eventListener);
  console.log('Device connected, listening for events...');
}