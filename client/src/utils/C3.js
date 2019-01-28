export const C3Speed = {
  axis: {
    x: {
      tick: {
        count: 1,
        fit: true
      },
      label: 'Time'
    },
    y: {
      label: 'Speed (mph)',
      max: 10
    }
  },
  liveAxis: {
    x: {
      tick: {
        count: 0,
        culling:{
          max:0
        },
      },
      label: 'Time'
    },
    y: {
      label: 'Speed (mph)',
      max: 5
    }
  },
  size:{
    width:250,
    height:250
  },

}

export const C3Altitude = {
  axis: {
    x: {
      tick: {
        count: 1,
        fit: true
      },
      label: 'Time'
    },
    y: {
      label: 'Altitude (m)'
    }
  },
}

export const C3Past = {
  size:{
    height:200,
    width:200
  }
}

export const C3TotalDistance = {

}