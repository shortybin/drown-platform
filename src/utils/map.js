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
  strokeColor: "#FF8C00",
  strokeWeight: 2,
  strokeOpacity: 0.8,
  fillColor: "#FF8C00",
  fillOpacity: 0.6,
};

const yellowOuterOverlay = {
  strokeColor: "#FF8C00",
  strokeWeight: 2,
  strokeOpacity: 0.4,
  fillColor: "#FF8C00",
  fillOpacity: 0.2,
};

const blueInnerOverlay = {
  strokeColor: "#8B3A3A",
  strokeWeight: 2,
  strokeOpacity: 0.8,
  fillColor: "#8B3A3A",
  fillOpacity: 0.6,
};

const blueOuterOverlay = {
  strokeColor: "#8B3A3A",
  strokeWeight: 2,
  strokeOpacity: 0.4,
  fillColor: "#8B3A3A",
  fillOpacity: 0.2,
};

export function addOverlay(map, data, callback) {
  let polygonOption = null;
  if (data.fence_level === 1) {
    if (data.inner_or_outer === 1) {
      polygonOption = blueInnerOverlay;
    } else if (data.inner_or_outer === 2) {
      polygonOption = blueOuterOverlay;
    }
  } else if (data.fence_level === 2) {
    if (data.inner_or_outer === 1) {
      polygonOption = yellowInnerOverlay;
    } else if (data.inner_or_outer === 2) {
      polygonOption = yellowOuterOverlay;
    }
  } else if (data.fence_level === 3) {
    if (data.inner_or_outer === 1) {
      polygonOption = redInnerOverlay;
    } else if (data.inner_or_outer === 2) {
      polygonOption = redOuterOverlay;
    }
  }

  let polygon = new BMapGL.Polygon(data.vertexes, polygonOption);
  if (callback) {
    polygon.addEventListener("click", (event) => {
      callback(data, polygon);
    });
  }
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
