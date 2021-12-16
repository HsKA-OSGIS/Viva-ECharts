let vectorSource;
let rasterSource;

    vectorSource = new ol.source.Vector({
        format: new ol.format.GeoJSON()
    });

    rasterSource = new ol.source.ImageWMS({
        url:"https://www.imis.bfs.de/ogc/opendata/wms"
    })

    const vector = new ol.layer.Vector({
        source: vectorSource
    });

    const raster = new ol.layer.Image({
        source: rasterSource
    });

    let OSM = new ol.layer.Tile({
            source: new ol.source.OSM()
          })

function mapMain(){
    map = new ol.Map({
        layers: [OSM = new ol.layer.Tile({
            source: new ol.source.OSM()
          })],
        view: new ol.View({
        center: ol.proj.fromLonLat([9, 51]),
        zoom: 6.1
        }),
        target: 'map'
    });

    map.addLayer(vector);
    map.addLayer(raster);
}

function map2(){
    map2 = new ol.Map({
      layers: [
        Satellite = new ol.layer.Tile({
          preload: Infinity,
          source: new ol.source.BingMaps({
            key: 'AsEwJhOHurNUkoajF7WZECsheUd7OGCN7gCw-7g-djpZRwoAKswzpUuhSGJPADm2',
            imagerySet: 'Aerial',
          }),
        }),
      ],
      target: 'map2',
      view: new ol.View({
        center: ol.proj.fromLonLat([9, 51]),
        zoom: 6.1
      })
    });   

    map2.addLayer(vector);
    map2.addLayer(raster);
}