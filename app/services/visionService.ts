import axios from 'axios';

interface VisionRetrieveData {
  userEmail: string;
}
interface VisionUpdateData {
  isVisionEnabled: boolean;
  userEmail: string;
  visionFiles: {
    id: string;
    visionId: string;
    name: string;
    type: string;
    url: string;
  }[];
}

const updateVision = async ({
  isVisionEnabled,
  userEmail,
  visionFiles,
}: VisionUpdateData): Promise<any> => {
  try {
    const response = await axios.post('/api/vision/update', {
      isVisionEnabled,
      userEmail,
      visionFiles,
    });
    return response.data;
  } catch (error) {
    console.error('Unexpected error:', error);
    throw error;
  }
};

const retrieveVision = async ({
  userEmail,
}: VisionRetrieveData): Promise<any> => {
  try {
    const response = await axios.get(`/api/vision/retrieve/`, {
      headers: { userEmail: userEmail },
    });

    return response.data;
  } catch (error) {
    console.error('Unexpected error:', error);
    throw error;
  }
};

const deleteVisionFile = async ({ file }: { file: string }): Promise<any> => {
  try {
    const response = await axios.post('/api/vision/delete-file', {
      file,
    });
    return response.data;
  } catch (error) {
    console.error('Unexpected error:', error);
    throw error;
  }
};

const addVisionUrl = async (
  file: { name: string; type: string; url: string },
  userEmail: string
): Promise<Response | undefined> => {
  try {
    const formData = new FormData();
    formData.append(
      'file',
      new Blob([JSON.stringify(file)], { type: 'application/json' })
    );
    formData.append('userEmail', userEmail);

    const fileUploadResponse = await fetch('/api/vision/add-url', {
      method: 'POST',
      body: formData,
    });
    return fileUploadResponse;
  } catch (error) {
    console.error('Failed to upload file:', error);
  }
};

export { updateVision, retrieveVision, deleteVisionFile, addVisionUrl };
