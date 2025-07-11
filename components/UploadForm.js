import { useState } from 'react';

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [manifestUrl, setManifestUrl] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.manifestUrl) {
        setManifestUrl(data.manifestUrl);
      } else {
        console.error('マニフェストURLが返されませんでした:', data);
      }
    } catch (error) {
      console.error('アップロード失敗:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border rounded-lg p-4">
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".ipa"
          onChange={handleFileChange}
          className="mb-4"
        />
        <button
          type="submit"
          disabled={uploading}
          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-400"
        >
          {uploading ? 'アップロード中...' : 'IPAをアップロード'}
        </button>
      </form>
      {manifestUrl && (
        <a
          href={`itms-services://?action=download-manifest&url=https://ipa-installer-five.vercel.app${manifestUrl}`}
          className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
        >
          カスタムアプリをインストール
        </a>
      )}
    </div>
  );
}
