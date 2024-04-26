import MainApi from "@api/MainApi";

const redInnerOverlay = {
  strokeColor: "red",
  strokeWeight: 2,
  strokeOpacity: 0.8,
  fillColor: "red",
  fillOpacity: 0.6,
};
const redOuterOverlay = {
  strokeColor: "red",
  strokeWeight: 2,
  strokeOpacity: 0.4,
  fillColor: "red",
  fillOpacity: 0.2,
};
const yellowInnerOverlay = {
  strokeColor: "yellow",
  strokeWeight: 2,
  strokeOpacity: 0.8,
  fillColor: "yellow",
  fillOpacity: 0.6,
};

const yellowOuterOverlay = {
  strokeColor: "yellow",
  strokeWeight: 2,
  strokeOpacity: 0.4,
  fillColor: "yellow",
  fillOpacity: 0.2,
};

export function addOverlay(map, data, callback) {
  let polygonOption = null;
  if (data.fence_level === 1) {
    if (data.inner_or_outer === 1) {
      polygonOption = redInnerOverlay;
    } else if (data.inner_or_outer === 2) {
      polygonOption = redOuterOverlay;
    }
  } else if (data.fence_level === 2) {
    if (data.inner_or_outer === 1) {
      polygonOption = yellowInnerOverlay;
    } else if (data.inner_or_outer === 2) {
      polygonOption = yellowOuterOverlay;
    }
  }

  let polygon = new BMapGL.Polygon(data.vertexes, polygonOption);
  polygon.addEventListener("click", (event) => {
    callback(data, polygon);
  });
  map.addOverlay(polygon);
}

export function fenceList(map, callback) {
  MainApi.getFenceList({}).then((res) => {
    const data = res.data;

    data.forEach((element) => {
      element.vertexes = element.vertexes.map((item) => {
        return new BMapGL.Point(item.lng, item.lat);
      });
      addOverlay(map, element, callback);
    });
  });
}
