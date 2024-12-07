import React, { useState } from 'react';
import axios from 'axios';
function Home() {
  const [htmlContent, setHtmlContent] = useState('');
  const [publishUrl, setPublishUrl] = useState('');
  const handlePublish = async () => {
    try {
      // Corrected API request URL (use relative path)
      const response = await axios.post('/api/publish', {
        html: htmlContent,
      });
      if (response.data && response.data.hash) {
        setPublishUrl(`/api/${response.data.hash}`);
      } else {
        console.error('Unexpected response:', response.data);
      }
    } catch (error) {
      console.error('Error publishing content:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <textarea
        value={htmlContent}
        onChange={(e) => setHtmlContent(e.target.value)}
        placeholder="Enter your HTML code here"
      />
      <br />
      <button onClick={handlePublish}>Publish</button>
      {publishUrl && (
        <div>
          <p>Published at:</p>
          <a href={publishUrl} target="_blank" rel="noopener noreferrer">
            {publishUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default Home;
