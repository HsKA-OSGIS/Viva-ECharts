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
        url:"https://www.imis.bfs.de/ogc/opendata/wms"
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

function mapTest(){
    map2 = new ol.Map({
        layers: [new ol.layer.Tile({
            source: new ol.source.OSM()
          })],
        view: new ol.View({
        center: ol.proj.fromLonLat([9, 51]),
        zoom: 6.1
        }),
        target: 'map2'
    });
}