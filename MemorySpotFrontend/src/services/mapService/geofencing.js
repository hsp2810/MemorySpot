export const addCircles = (map, center, radius) => {
  console.log('Now adding the cirle on all the memories');
  const layerId = `circle-${center[0]}-${center[1]}`;

  // Remove existing layer with the same ID, if it exists
  if (map.getLayer(layerId)) {
    map.removeLayer(layerId);
  }

  // Remove existing source with the same ID, if it exists
  if (map.getSource(layerId)) {
    map.removeSource(layerId);
  }
  map.addLayer({
    id: layerId,
    type: 'circle',
    source: {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: center,
        },
        properties: {},
      },
    },
    paint: {
      'circle-radius': radius,
      'circle-color': '#89CFF0',
      'circle-opacity': 0.8,
    },
  });
};
