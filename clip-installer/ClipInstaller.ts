import axios from 'axios';
const fs = require('fs');
const path = require('path');

interface Clip {

  thumbnail: string;
  video: string;
  uploadDate: string;
}

const CORS_PROXY_URL = ''; // dont need bc cors policy doesnt apply. 'https://corsproxy.io/?';  // Route through proxy server to circumvent CORS Same-Origin Policy
const BASE_URL = 'https://xbl.io';
const API_KEY = 'c5b30519-47a9-450b-b2e2-23837ae64562';

const apiService = axios.create({
  baseURL: CORS_PROXY_URL + BASE_URL,
  headers: {
    'X-Authorization': API_KEY,
    'Content-Type': 'application/json',
  },
});

export const getClips = async () => {

  try {

    const response = await apiService.get('/api/v2/dvr/gameclips');

    return response.data;
  }
  catch (error) {

    throw error;
  }
};

const downloadImage = async (url, filepath) => {

  try {

    const response = await axios.get(url, { responseType: 'arraybuffer' });

    if (response.status !== 200) {

      throw new Error(`Failed to download image. Status code: ${response.status}`);
    }

    const imageBuffer = Buffer.from(response.data, 'binary');

    // Write the buffer to a file
    fs.writeFileSync(filepath, imageBuffer);

    return `Image downloaded successfully and saved as ${filepath}`;
  }
  catch (error) {

    throw new Error(`Error downloading image: ${error.message}`);
  }
};

const downloadVideo = async (url, filePath) => {

    try {

      let startTime = Date.now();

      // Fetch the video data
      const response = await axios.get(url, { responseType: 'arraybuffer' });

      let endTime = Date.now();
      let executionTime = endTime-startTime;
      console.log(`axios.get() execution time: ${executionTime} milliseconds`);

      if (response.status !== 200) {
          throw new Error(`Failed to download video. Status code: ${response.status}`);
      }

      // Convert the response data to a Buffer
      const videoBuffer = Buffer.from(response.data);

      startTime = Date.now();

      // Write the buffer to a file
      fs.writeFileSync(filePath, videoBuffer);

      endTime = Date.now();
      executionTime = endTime-startTime;
      console.log(`writeFileSync() execution time: ${executionTime} milliseconds`);

      return `Video downloaded successfully and saved as ${filePath}`;
    }
    catch (error) {

        throw new Error(`Error downloading video: ${error.message}`);
    }
};

const download = async () => {

  const data = await getClips();

  const testClip: Clip = {thumbnail: data.values[0].contentLocators[1].uri, video: data.values[0].contentLocators[0].uri, uploadDate: data.values[0].uploadDate}

  console.log(testClip);

  const videoUrl = testClip.video; // Replace with the URL of the video

  const imageUrl = testClip.thumbnail;

  let outputPath = path.resolve(__dirname, path.relative('/mnt/d/Personal Projects/react-apps/xbox-clips-app/clip-installer', '/mnt/d/xbox-captures')) + '/image.png';

  downloadImage(imageUrl, outputPath)
      .then((message) => console.log(message))
      .catch((error) => console.error(error));

  outputPath = path.resolve(__dirname, path.relative('/mnt/d/Personal Projects/react-apps/xbox-clips-app/clip-installer', '/mnt/d/xbox-captures')) + '/video.mp4';

  downloadVideo(videoUrl, outputPath)
      .then((message) => console.log(message))
      .catch((error) => console.error(error));
}

getClips()
    .then(download)
    .catch((error) => console.log(error));
