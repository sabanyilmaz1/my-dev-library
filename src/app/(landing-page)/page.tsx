import { generateDataForYoutubeCultureBook } from "@/lib/gemini";
import { JsonViewer } from "./json";

export default async function Home() {
  //calculate the time to generate the data
  const start = performance.now();
  const response = await generateDataForYoutubeCultureBook();
  const end = performance.now();
  const time = end - start;

  // Format time for display
  const formatTime = (timeInMs: number) => {
    const seconds = Math.round(timeInMs / 1000);
    if (seconds < 60) {
      return `${seconds}s`;
    } else {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return remainingSeconds > 0
        ? `${minutes}min ${remainingSeconds}s`
        : `${minutes}min`;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            YouTube Culture Book
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            Generated data for your YouTube culture book analysis
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Généré en {formatTime(time)}
          </div>
        </div>

        {/* JSON Viewer */}
        <JsonViewer data={response} />
      </div>
    </main>
  );
}
