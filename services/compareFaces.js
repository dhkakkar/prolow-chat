const faceapi = require('face-api.js');

// Load the models required for face detection and feature extraction
const loadModels = async() => {
    await faceapi.nets.ssdMobilenetv1.loadFromDisk('/faceRecognitionModels');
    await faceapi.nets.faceLandmark68Net.loadFromDisk('/faceRecognitionModels');
    await faceapi.nets.faceRecognitionNet.loadFromDisk('/faceRecognitionModels');
}

// Read the image data from the file
const getImageData = async(file) => {
    const image = await faceapi.fetchImage(file);
    return image;
}

// Extract the face descriptors from an image
const getFaceDescriptors = async(image) => {
    const options = new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 });
    const results = await faceapi.detectAllFaces(image, options)
        .withFaceLandmarks()
        .withFaceDescriptors();
    return results;
}

// Compare two face descriptors and return a similarity score
const compareFaces = (face1, face2) => {
    const distance = faceapi.round(
        faceapi.euclideanDistance(face1, face2)
    );
    return distance;
}

// Main function to perform face comparison
const compareFacesInPercentage = async(file1, file2) => {
    await loadModels();
    const image1 = await getImageData(file1);
    const image2 = await getImageData(file2);
    const faces1 = await getFaceDescriptors(image1);
    const faces2 = await getFaceDescriptors(image2);
    if (faces1.length === 0 || faces2.length === 0) {
    console.log('No faces found in one or both images');
    return;
    }
    const face1 = faces1[0].descriptor;
    const face2 = faces2[0].descriptor;
    const distance = compareFaces(face1, face2);
    const similarity = 100 - distance * 100;
    console.log(`Similarity: ${similarity.toFixed(2)}%`);
}

module.exports = { compareFacesInPercentage }
