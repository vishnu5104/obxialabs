import { useState } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
export default function Home() {
  const [htmlContent, setHtmlContent] = useState('');
  const [publishUrl, setPublishUrl] = useState('');

  const handlePublish = async () => {
    try {
      const response = await axios.post('http://localhost:5000/publish', {
        html: htmlContent,
      });
      console.log('Response:', response.data);
      if (response.data && response.data.hash) {
        setPublishUrl(`http://localhost:5000/${response.data.hash}`);
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
      <Button onClick={handlePublish}>Publish</Button>
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
