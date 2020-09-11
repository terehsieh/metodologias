
Morris.Bar({
    element: 'myfirstchart',
    data: [
      {x: '2016', y: 238},
      {x: '2017', y: 251},
      {x: '2018', y: 299},
      {x: '2019', y: 234.4},
      {x: '2020', y: 335},
    ],
    xkey: 'x',
    ykeys: ['y'],
    labels: ['Y'],
    barColors: function (row, series, type) {
      if (type === 'bar') {
        var red = Math.ceil(255 * row.y / this.ymax);
        return 'rgb(' + red + ',0,0)';
      }
      else {
        return '#000';
      }
    }
  });