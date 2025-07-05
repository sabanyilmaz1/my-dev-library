"use client";

// JSON Viewer Component
export const JsonViewer = ({ data }: { data: unknown }) => {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
  };

  const formatJsonString = (obj: unknown): string => {
    return JSON.stringify(obj, null, 2);
  };

  const syntaxHighlight = (json: string) => {
    json = json
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      function (match) {
        let cls = "text-blue-600";
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "text-purple-600 font-semibold";
          } else {
            cls = "text-green-600";
          }
        } else if (/true|false/.test(match)) {
          cls = "text-orange-500 font-semibold";
        } else if (/null/.test(match)) {
          cls = "text-red-500 font-semibold";
        } else if (/\d/.test(match)) {
          cls = "text-blue-500";
        }
        return '<span class="' + cls + '">' + match + "</span>";
      }
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="ml-4 text-sm font-medium text-gray-700">
              JSON Response
            </span>
          </div>
          <button
            onClick={handleCopyToClipboard}
            className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-1"
            aria-label="Copy JSON to clipboard"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span>Copy</span>
          </button>
        </div>

        {/* JSON Content */}
        <div className="p-6">
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-hidden text-sm leading-relaxed border whitespace-pre-wrap break-words">
            <code
              className="break-words"
              dangerouslySetInnerHTML={{
                __html: syntaxHighlight(formatJsonString(data)),
              }}
            />
          </pre>
        </div>

        {/* Footer Stats */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Size: {JSON.stringify(data).length} characters</span>
            <span>Lines: {formatJsonString(data).split("\n").length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
