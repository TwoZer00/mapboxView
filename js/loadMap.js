const accesToken = 'pk.eyJ1IjoidHdvemVyMDAiLCJhIjoiY2s2NGRoamZ4MGphczNrcXA1NWw4dzN5MyJ9.-KxY1BPMApriPjGoMevTWg';
const mapStyles  = ['mapbox://styles/mapbox/light-v10', 'mapbox://styles/mapbox/dark-v10'];

mapboxgl.accessToken  = accesToken;

let map = new mapboxgl.Map({
            container: 'map', // container ID
            center: [-122.420679, 37.772537], // starting position [lng, lat]
            zoom: 2, // starting zoom,
            dragRotate:false,
            touchZoomRotate:false,
            style: window.matchMedia('(prefers-color-scheme: dark)').matches ? mapStyles[1]:mapStyles[0], // style URL or style object
        });
window.matchMedia('(prefers-color-scheme: dark)').matches ? setDarkMode():setLightMode();
map.on('click');
function addNewSource(data){
    map.addSource('cases',{
        type:'geojson',
        data: data,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });
    map.addLayer({
        id: 'a',
        type: 'circle',
        source: 'cases',
        filter: ['has', 'point_count'],
        paint: {
        // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
        // with three steps to implement three types of circles:
        //   * Blue, 20px circles when point count is less than 100
        //   * Yellow, 30px circles when point count is between 100 and 750
        //   * Pink, 40px circles when point count is greater than or equal to 750
        'circle-color': [
        'step',
        ['get', 'point_count'],
        '#854642',
        100,
        '#8F3935',
        750,
        '#EB291E'
        ],
        'circle-radius': [
        'step',
        ['get', 'point_count'],
        20,
        100,
        30,
        750,
        40
        ]
        }
    });    
    map.addLayer({
        id: 'b',
        type: 'symbol',
        source: 'cases',
        filter: ['has', 'point_count'],
        layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
        }
    });    
    map.addLayer({
        id: 'c',
        type: 'circle',
        source: 'cases',
        filter: ['!', ['has', 'point_count']],
        paint: {
        'circle-color': '#DE0D02',
        'circle-radius': 4,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff'
        }
    });
}

map.on('zoomend', () => {
    modal.hide();
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
        map.setStyle(mapStyles[1]);
        setDarkMode();
        if(temp){
            if(map.getSource('cases')){
                map.getSource('cases').setData(temp);
            }
            else{
                addNewSource(temp);
            }  
        }
        
    } else {
        map.setStyle(mapStyles[0]);
        setLightMode();
        if(temp){
            if(map.getSource('cases')){
                map.getSource('cases').setData(temp);
            }
            else{
                addNewSource(temp);
            }
        }
    }
});