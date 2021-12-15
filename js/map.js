let vectorSource;
let rasterSource;

function mapMain(){
    map = new ol.Map({
        layers: [new ol.layer.Tile({
            source: new ol.source.OSM()
          })],
        view: new ol.View({
        center: ol.proj.fromLonLat([9, 51]),
        zoom: 6.1
        }),
        target: 'map'
    });

    // Test to show satellite image
    const map2 = new Map({
      layers: [
        new TileLayer({
          preload: Infinity,
          source: new BingMaps({
            key: 'AsEwJhOHurNUkoajF7WZECsheUd7OGCN7gCw-7g-djpZRwoAKswzpUuhSGJPADm2',
            imagerySet: 'Aerial',
          }),
        }),
      ],
      target: 'map1',
      view: view,
    });

    vectorSource = new ol.source.Vector({
        format: new ol.format.GeoJSON()
    });

    rasterSource = new ol.source.ImageWMS({
    })

    const vector = new ol.layer.Vector({
        source: vectorSource
    });

    const raster = new ol.layer.Image({
        source: rasterSource
    });

    map.addLayer(vector);
    map.addLayer(raster);

}