const lineChart = (xAxisScaleDomain) => ({
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": {
      "url": "http://99bd-213-58-177-174.ngrok.io/data"
    },
    "transform": [
      {
        "filter": "datum.type !== 'RF Strength'"
      }
    ],
    "vconcat": [
      {
        "hconcat": [
          {
            "description": "brush chart for specifying timeframe",
            "width": 400,
            "height": 60,
            "mark": {
              "type": "line",
              "color": "#282828",
              "interpolate": "monotone"
            },
            "transform": [
              {
                "filter": "datum.type !== 'humidity'"
              }
            ],
            "params": [
              {
                "name": "brush",
                "select": {
                  "type": "interval",
                  "encodings": [
                    "x"
                  ]
                }
              }
            ],
            "encoding": {
              "size": {
                "value": 1
              },
              "x": {
                "field": "ts",
                "type": "temporal",
                "axis": {
                  "labels": false,
                  "grid": false,
                  "title": ""
                }
              },
              "y": {
                "field": "value",
                "type": "quantitative",
                "axis": {
                  "labels": false,
                  "grid": false,
                  "title": ""
                }
              }
            }
          }
        ]
      },
      {
        "layer": [
          {
            "mark": {
              "description": "Overlay with gradient for temperature breach",
              "type": "line",
              "fillOpacity": 0.5,
              "color": "#FF0000"
            },
            "transform": [
              {
                "filter": "datum.value >= 25.01"
              },
              {
                "calculate": "25",
                "as": "baseline"
              },
              {
                "filter": "datum.type !== 'humidity'"
              }
            ],
            "encoding": {
              "size": {
                "value": 1
              },
              "x": {
                "field": "ts",
                "type": "temporal",
                "scale": {
                  "domain": {
                    "param": "brush"
                  }
                }
              },
              "y": {
                "field": "value",
                "type": "quantitative"
              },
              "y2": {
                "field": "baseline"
              }
            }
          },
          {
            "description": "Chart for the temperature",
            "width": 1000,
            "mark": {
              "type": "line",
              "color": "#282828",
              "interpolate": "monotone"
            },
            "strokeWidth": 0.5,
            "transform": [
              {
                "filter": "datum.type !== 'humidity'"
              }
            ],
            "encoding": {
              "size": {
                "value": 1
              },
              "x": {
                "field": "ts",
                "type": "temporal",
                "scale": {
                  "domain": xAxisScaleDomain
                }
              },
              "y": {
                "field": "value",
                "type": "quantitative",
                "axis": {
                  "title": "temperature"
                }
              },
              "tooltip": [
                {
                  "field": "ts",
                  "type": "temporal",
                  "title": "Date"
                },
                {
                  "field": "value",
                  "type": "quantitative",
                  "title": "Temperature"
                }
              ]
            }
          }
        ]
      },
      {
        "description": "Chart for humidity",
        "width": 1000,
        "height": 100,
        "mark": {
          "type": "line",
          "color": "#282828",
          "interpolate": "monotone"
        },
        "transform": [
          {
            "filter": "datum.type !== 'temperature'"
          }
        ],
        "encoding": {
          "size": {
            "value": 1
          },
          "x": {
            "field": "ts",
            "type": "temporal",
            "scale": {
              "domain": {
                "param": "brush"
              }
            },
            "axis": {
              "grid": false,
              "title": ""
            }
          },
          "y": {
            "field": "value",
            "type": "quantitative",
            "axis": {
              "title": "humidity"
            }
          },
          "tooltip": [
            {
              "field": "ts",
              "type": "temporal",
              "title": "Date"
            },
            {
              "field": "value",
              "type": "quantitative",
              "title": "Humidity"
            }
          ]
        }
      }
    ]
  }
)
  export default {
    lineChart
}