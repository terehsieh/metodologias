    // Use Morris.Bar
    Morris.Bar({
        element: 'graph',
        axes: false,
        data: [
          {x: 'Viaje 1', y: 869},
          {x: 'Viaje 2', y: 1000},
          {x: 'Viaje 3', y: 1100},
          {x: 'Viaje 4', y: 340},
          {x: 'Viaje 5', y: 1400}
        ],
        xkey: 'x',
        ykeys: ['y'],
        labels: ['Kilometros']
      });