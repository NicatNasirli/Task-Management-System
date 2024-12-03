document.getElementById('loadData').addEventListener('click', async () => {
    const apiDataDiv = document.getElementById('apiData');
    apiDataDiv.innerHTML = 'Loading...';
  
    try {
      const response = await fetch('https://your-backend-api.com/endpoint');
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
  
      // Show the API data
      apiDataDiv.innerHTML = JSON.stringify(data, null, 2);
    } catch (error) {
      apiDataDiv.innerHTML = 'Error fetching data: ' + error.message;
    }
  });
  