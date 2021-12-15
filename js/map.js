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