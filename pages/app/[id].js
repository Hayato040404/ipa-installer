import Head from 'next/head';
import { useRouter } from 'next/router';

const apps = {
  tsumtsum: {
    name: 'ツムツム',
    icon: '/apps/tsumtsum-icon.png',
    description: 'ディズニーの人気パズルゲーム！可愛いツムを繋げてスコアを競おう。',
    manifestUrl: '/apps/tsumtsum.plist',
  },
  esign: {
    name: 'eSign',
    icon: '/apps/esign-icon.png',
    description: 'iOSアプリを簡単に署名してインストールできるツール。',
    manifestUrl: '/apps/esign.plist',
  },
  ksign: {
    name: 'kSign',
    icon: '/apps/ksign-icon.png',
    description: 'カスタム署名ツールで、柔軟なアプリ管理を実現。',
    manifestUrl: '/apps/ksign.plist',
  },
};

export default function AppDetail() {
  const router = useRouter();
  const { id } = router.query;
  const app = apps[id];

  if (!app) {
    return <div className="container mx-auto p-4">アプリが見つかりません</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>{app.name} - ウェブアプリストア</title>
        <meta name="description" content={app.description} />
      </Head>

      <div className="flex flex-col md:flex-row gap-8">
        <img src={app.icon} alt={app.name} className="w-32 h-32 rounded-xl" />
        <div>
          <h1 className="text-3xl font-bold">{app.name}</h1>
          <p className="text-gray-600 mt-2">{app.description}</p>
          <a
            href={`itms-services://?action=download-manifest&url=https://ipa-installer-five.vercel.app${app.manifestUrl}`}
            className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            インストール
          </a>
        </div>
      </div>
    </div>
  );
}
