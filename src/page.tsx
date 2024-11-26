import LiveHtmlEditor from './components/live-html-editor';

export default function Page() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Live HTML Editor</h1>
      <LiveHtmlEditor />
    </div>
  );
}
