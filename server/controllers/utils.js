exports.calculateTotalDistance = (coordsArray) => {
  let totalDistanceInKm;
  for (let i = 0; i < coordsArray.length; i++) {
    let lat1 = coordsArray[i][1];
    let lon1 = coordsArray[i][0];
    let lat2 = coordsArray[i + 1][1];
    let lon2 = coordsArray[i + 1][0];
    var R = 6371; // Radius of the earth in km
    var dLat = _deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = _deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(_deg2rad(lat1)) * Math.cos(_deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    totalDistanceInKm += d;
  }
  return totalDistanceInKm;
}

const _deg2rad = (deg) => {
  return deg * (Math.PI / 180)
}