const redOverlay= {strokeColor:"red", strokeWeight:2, strokeOpacity:0.5}
const yellowOverlay= {strokeColor:"yellow", strokeWeight:2, strokeOpacity:0.5}

function addOverlay(map,data){
    var polygon = new BMapGL.Polygon(data.getPath(), {strokeColor:"red", strokeWeight:2, strokeOpacity:0.5});
    map.addOverlay(polygon);  
}