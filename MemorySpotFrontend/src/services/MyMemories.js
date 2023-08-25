const getMyMemories = async () => {
    // const response = await fetch('/api/memories'); // replace with your API endpoint
    // const data = await response.json();
  
    const MyMemories = [
      {
        owner: 'Mudit',
        lat: '51.1188540',
        lng: '-113.9391065',
        title: 'Chacha ki mast pani puri',
        description: 'mast pani puri che',
        address: 'Pani puri chowk',
        radius: 26,
      },
      ...data,
    ];
  
    return MyMemories;
  };
  
  export default getMyMemories;
  