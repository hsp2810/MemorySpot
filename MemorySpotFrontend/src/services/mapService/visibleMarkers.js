export const fetchVisibleMarkers = (map, markers) => {
  const bounds = map.getBounds();

  // filter the markers based on whether they are within the bounds of the visible map
  const visibleMarkers = markers.filter(marker =>
    bounds.contains(marker.getLngLat())
  );

  // create an array with the information of the visible markers
  const visibleMarkerInfo = visibleMarkers.map(marker => {
    const memory = marker.getPopup().options.memory;
    return {
      _id: memory._id,
      memoryfile: memory.memoryfile,
      title: memory.title,
      caption: memory.caption,
      address: memory.address,
      owner: memory.owner,
      uploadedDate: memory.uploadedDate,
      longitude: memory.longitude,
      latitude: memory.latitude,
    };
  });
  return visibleMarkerInfo;
};
