import Head from 'next/head';
import Link from 'next/link';
import AppCard from '../components/AppCard';
import SearchBar from '../components/SearchBar';
import UploadForm from '../components/UploadForm';
import '../styles/globals.css';

const apps = [
  {
    id: 'tsumtsum',
    name: 'ツムツム',
    icon: '/apps/tsumtsum-icon.png',
    description: 'ディズニーの人気パズルゲーム！',
    manifestUrl: '/apps/tsumtsum.plist',
  },
  {
    id: 'esign',
    name: 'eSign',
    icon: '/apps/esign-icon.png',
    description: 'アプリ署名ツール',
    manifestUrl: '/apps/esign.plist',
  },
  {
    id: 'ksign',
    name: 'kSign',
    icon: '/apps/ksign-icon.png',
    description: 'カスタムアプリ署名ツール',
    manifestUrl: '/apps/ksign.plist',
  },
];

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>ウェブアプリストア</title>
        <meta name="description" content="App Store風にiOSアプリをインストール" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center">ウェブアプリストア</h1>
        <SearchBar />
      </header>

      <main>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">注目のアプリ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {apps.map((app) => (
              <Link href={`/app/${app.id}`} key={app.id} passHref>
                <AppCard
                  name={app.name}
                  icon={app.icon}
                  description={app.description}
                />
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">カスタムIPAをアップロード</h2>
          <UploadForm />
        </section>
      </main>
    </div>
  );
}
