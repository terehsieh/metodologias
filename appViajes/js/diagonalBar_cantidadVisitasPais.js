    /* data stolen from http://howmanyleft.co.uk/vehicle/jaguar_'e'_type */
    var day_data = [
        {"period": "Brasil", "visitado": 3},
        {"period": "China", "visitado": 1},
        {"period": "Italia", "visitado": 1},
        {"period": "Japon", "visitado": 1},
        {"period": "Rusia", "visitado": 1},
        {"period": "Suiza", "visitado": 1},
        {"period": "USA", "visitado": 2},
      ];
      Morris.Bar({
        element: 'graph',
        data: day_data,
        xkey: 'period',
        ykeys: ['visitado'],
        labels: ['Visitado'],
        xLabelAngle: 60
      });