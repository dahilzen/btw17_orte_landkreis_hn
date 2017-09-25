function setInitialMapZoom() {

    var viewportWidth = window.innerWidth;
    //    var center = [49.1397278, 9.219251];
    var mapZoom;

    if (viewportWidth < [800]) {
        mapZoom = [10];
    } else {
        mapZoom = [10];
    }

    return mapZoom;
};

function main() {

    var polygon;

    /*    var map_object = L.map('map', {
            zoomControl: false,
            attributionControl: false,
            legends: false,
            layer_selector: false,
        }).setView([49.2285040, 9.1571390], 10);*/

    var map_object = L.map('map', {
        center: [49.1688290, 9.2025340],
        zoom: setInitialMapZoom(),
        minZoom: 9,
        maxZoom: 12,
        zoomControl: false,
        attributionControl: false,
        legends: false,
        layer_selector: false,
    });

    // Zoomfunktion komplett deaktivieren
    /*    map_object.touchZoom.disable();
        map_object.doubleClickZoom.disable();
        map_object.scrollWheelZoom.disable();
        map_object.keyboard.disable();*/

    var sublayers = [];

    // Leeren TileLayer hinzufügen

    L.tileLayer('', {
        attribution: 'Code: <a href="https://www.twitter.com/dahilzen">David Hilzendegen</a> | Daten: <a href="http://www.statistik-bw.de/">Statistisches Landesamt</a>, Auskunft der Gemeinden'
    }).addTo(map_object);

    // cartodb createLayer
    cartodb.createLayer(map_object, 'https://dahilzen.carto.com/api/v2/viz/0d8e4518-9714-4019-8364-18e565984bd2/viz.json', {
            legends: false,
            cartodb_logo: false,
            mobile_layout: true,
            force_mobile: $(window).width() < 620,
            loaderControl: false,
        })
        .addTo(map_object)
        .on('done', function(layer) {
            // set interaction of the CartoDB layer (allow you to click on it)
            layer.setInteraction(true);

            // add sublayers & change the query for the first layer  
            var subLayerOptions = {
                sql: "SELECT * FROM hn_orte_2_merge",
                cartocss: '#hn_orte_2_merge{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:1;line-opacity:1}#hn_orte_2_merge [cdu_zweit<=50.6]{polygon-fill:#000;polygon-opacity:1}#hn_orte_2_merge [cdu_zweit<=38]{polygon-fill:#000;polygon-opacity:.8}#hn_orte_2_merge [cdu_zweit<=34.8]{polygon-fill:#000;polygon-opacity:.6}#hn_orte_2_merge [cdu_zweit<=31.9]{polygon-fill:#000;polygon-opacity:.4}#hn_orte_2_merge [cdu_zweit<=28.8]{polygon-fill:#000;polygon-opacity:.2}'
            }

            var sublayer = layer.getSubLayer(0);

            sublayer.infowindow.set('template', $('#infowindow_template').html());

            sublayer.set(subLayerOptions);

            sublayers.push(sublayer);

            //we define the queries that will be performed when we click on the buttons, by modifying the SQL of our layer
            var LayerActions = {
                cdu: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM hn_orte_2_merge",
                        cartocss: '#hn_orte_2_merge{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:1;line-opacity:1}#hn_orte_2_merge [cdu_zweit<=50.6]{polygon-fill:#000;polygon-opacity:1}#hn_orte_2_merge [cdu_zweit<=38]{polygon-fill:#000;polygon-opacity:.8}#hn_orte_2_merge [cdu_zweit<=34.8]{polygon-fill:#000;polygon-opacity:.6}#hn_orte_2_merge [cdu_zweit<=31.9]{polygon-fill:#000;polygon-opacity:.4}#hn_orte_2_merge [cdu_zweit<=28.8]{polygon-fill:#000;polygon-opacity:.2}'
                    });
                    return true;
                },
                spd: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM hn_orte_2_merge",
                        cartocss: '#hn_orte_2_merge{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:1;line-opacity:1}#hn_orte_2_merge [spd_zweit<=23.1]{polygon-fill:#eb0000;polygon-opacity:1}#hn_orte_2_merge [spd_zweit<=19.5]{polygon-fill:#eb0000;polygon-opacity:.8}#hn_orte_2_merge [spd_zweit<=17.5]{polygon-fill:#eb0000;polygon-opacity:.6}#hn_orte_2_merge [spd_zweit<=15.7]{polygon-fill:#eb0000;polygon-opacity:.4}#hn_orte_2_merge [spd_zweit<=13.7]{polygon-fill:#eb0000;polygon-opacity:.2}'
                    });
                    return true;
                },
                gruene: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM hn_orte_2_merge",
                        cartocss: '#hn_orte_2_merge{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:1;line-opacity:1}#hn_orte_2_merge [gruene_zweit<=19]{polygon-fill:#5cb813;polygon-opacity:1}#hn_orte_2_merge [gruene_zweit<=12.6]{polygon-fill:#5cb813;polygon-opacity:.8}#hn_orte_2_merge [gruene_zweit<=10.8]{polygon-fill:#5cb813;polygon-opacity:.6}#hn_orte_2_merge [gruene_zweit<=9.3]{polygon-fill:#5cb813;polygon-opacity:.4}#hn_orte_2_merge [gruene_zweit<=7.5]{polygon-fill:#5cb813;polygon-opacity:.2}'
                    });
                    return true;
                },
                linke: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM hn_orte_2_merge",
                        cartocss: '#hn_orte_2_merge{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:1;line-opacity:1}#hn_orte_2_merge [linke_zweit<=10.6]{polygon-fill:#540fc6;polygon-opacity:1}#hn_orte_2_merge [linke_zweit<=6.8]{polygon-fill:#540fc6;polygon-opacity:.8}#hn_orte_2_merge [linke_zweit<=5.7]{polygon-fill:#540fc6;polygon-opacity:.6}#hn_orte_2_merge [linke_zweit<=4.6]{polygon-fill:#540fc6;polygon-opacity:.4}#hn_orte_2_merge [linke_zweit<=3.6]{polygon-fill:#540fc6;polygon-opacity:.2}'
                    });
                    return true;
                },
                fdp: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM hn_orte_2_merge",
                        cartocss: '#hn_orte_2_merge{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:1;line-opacity:1}#hn_orte_2_merge [fdp_zweit<=23.6]{polygon-fill:#ecbd00;polygon-opacity:1}#hn_orte_2_merge [fdp_zweit<=16.2]{polygon-fill:#ecbd00;polygon-opacity:.8}#hn_orte_2_merge [fdp_zweit<=14.2]{polygon-fill:#ecbd00;polygon-opacity:.6}#hn_orte_2_merge [fdp_zweit<=12.4]{polygon-fill:#ecbd00;polygon-opacity:.4}#hn_orte_2_merge [fdp_zweit<=10.2]{polygon-fill:#ecbd00;polygon-opacity:.2}'
                    });
                    return true;
                },
                afd: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM hn_orte_2_merge",
                        cartocss: '#hn_orte_2_merge{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:.5;line-opacity:1}#hn_orte_2_merge [afd_zweit<=36.8]{polygon-fill:#00baff;polygon-opacity:1}#hn_orte_2_merge [afd_zweit<=20.45]{polygon-fill:#00baff;polygon-opacity:.8}#hn_orte_2_merge [afd_zweit<=17.95]{polygon-fill:#00baff;polygon-opacity:.6}#hn_orte_2_merge [afd_zweit<=15.3]{polygon-fill:#00baff;polygon-opacity:.4}#hn_orte_2_merge [afd_zweit<=13.1]{polygon-fill:#00baff;polygon-opacity:.2}'
                    });
                    return true;
                },
            }

            $('.button').click(function() {
                $('.button').removeClass('selected');
                $(this).addClass('selected');
                //this gets the id of the different buttons and calls to LayerActions which responds according to the selected id
                LayerActions[$(this).attr('id')]();
            });

            $('#selector').change(function() {
                LayerActions[$(this).val()]();
            });

            // when the CartoDB layer is clicked...
            layer.on('featureClick', function(e, latlng, pos, data) {
                // data1 stores the cartodb_id value of the selected polygon
                data1 = data.cartodb_id;

                // if Leaflet polygon is added on the map, remove it
                if (map_object.hasLayer(polygon)) {
                    map_object.removeLayer(polygon)
                    console.log("removed")
                }

                // use SQL API to extract the attribute values from the selected polygons
                var sql = new cartodb.SQL({
                    user: 'dahilzen'
                });
                // select the attribute tables to extract from CartoDB table
                sql.execute("SELECT ST_asGeoJSON(the_geom) as geom FROM hn_orte_2_merge WHERE cartodb_id IN (" + data1 + ")")
                    .done(function(data) {

                        var geom = data.rows[0].geom;
                        polygon = L.geoJson(JSON.parse(geom), {
                            style: {
                                color: "#fff", // color of stroke line
                                weight: 5, // width of stroke line
                                //fillColor: "blue", // define color of polygon
                                fill: true // set polygon
                            }

                        });
                        // add leaflet polygon on the map
                        map_object.addLayer(polygon);

                    });

            });

        });

}

window.onload = main;