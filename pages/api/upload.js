import formidable from 'formidable';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'メソッドが許可されていません' });
  }

  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  try {
    await fs.mkdir(uploadDir, { recursive: true });
  } catch (error) {
    console.error('ディレクトリ作成エラー:', error);
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024,
    filter: ({ name, originalFilename }) => originalFilename && name === 'file' && originalFilename.endsWith('.ipa'),
  });

  try {
    const [fields, files] = await form.parse(req);
    const ipaFile = files.file?.[0];
    if (!ipaFile) {
      return res.status(400).json({ error: 'IPAファイルが必要です' });
    }

    const fileName = `${uuidv4()}.ipa`;
    const uploadPath = path.join(uploadDir, fileName);
    const manifestPath = path.join(uploadDir, `${fileName}.plist`);

    await fs.rename(ipaFile.filepath, uploadPath);

    const manifestContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>items</key>
  <array>
    <dict>
      <key>assets</key>
      <array>
        <dict>
          <key>kind</key>
          <string>software-package</string>
          <key>url</key>
          <string>https://ipa-installer-five.vercel.app/uploads/${fileName}</string>
        </dict>
      </array>
      <key>metadata</key>
      <dict>
        <key>bundle-identifier</key>
        <string>com.custom.app</string>
        <key>bundle-version</key>
        <string>1.0</string>
        <key>kind</key>
        <string>software</string>
        <key>title</key>
        <string>カスタムアプリ</string>
      </dict>
    </dict>
  </array>
</dict>
</plist>`;

    await fs.writeFile(manifestPath, manifestContent);

    res.status(200).json({
      manifestUrl: `/uploads/${fileName}.plist`,
    });
  } catch (error) {
    console.error('アップロードエラー:', error);
    res.status(500).json({ error: 'アップロードに失敗しました: ' + error.message });
  }
}
