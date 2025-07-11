import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const ipaFile = req.body.file; // 実際にはフォームデータから取得（例: formidableを使用）
    const fileName = `${uuidv4()}.ipa`;
    const uploadPath = path.join(process.cwd(), 'public', 'uploads', fileName);
    const manifestPath = path.join(process.cwd(), 'public', 'uploads', `${fileName}.plist`);

    // IPAファイルを保存（実際にはフォームデータ処理が必要）
    fs.writeFileSync(uploadPath, ipaFile);

    // マニフェストファイルの生成
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
          <string>https://your-vercel-domain.com/uploads/${fileName}</string>
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
        <string>Custom App</string>
      </dict>
    </dict>
  </array>
</dict>
</plist>`;

    fs.writeFileSync(manifestPath, manifestContent);

    res.status(200).json({
      manifestUrl: `/uploads/${fileName}.plist`,
    });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
