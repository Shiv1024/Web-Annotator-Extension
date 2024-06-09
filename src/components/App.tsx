import React from 'react';
import '../popup/tailwind.css';

function App() {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Welcome to Web Annotator</h1>
      <ol className="list-decimal list-inside">
        <li className="mb-2">
          <span className="font-semibold">To highlight text:</span> First, choose a color by clicking on the color option. Then, simply click the highlight button in the toolbar and start highlighting your text. Click the button again when you're done.
          <p className="italic text-sm">Quick tip: It's best to avoid highlighting text from different paragraphs or of different sizes at the same time.</p>
        </li>
        <li className="mb-2">
          <span className="font-semibold">To add a note:</span> Click on 'Add Note', pick your preferred font color and style, and begin highlighting. Click the button again to close the note input.
        </li>
        <li className="mb-2">
          <span className="font-semibold">To search annotations:</span> Type in a keyword, like a word, phrase, or sentence. Use the filter to specify if you're searching in highlighted text or notes. You can also sort results by latest, oldest, or date.
        </li>
        <li className="mb-2">
          Use the close button to hide the search results.
        </li>
        <li className="mb-2">
          To save your annotated page, hit the save button and print it out.
        </li>
        <li className="mb-2">
          <span className="font-semibold">Keyboard shortcuts:</span>
          <ul className="list-disc list-inside ml-4">
            <li className="mb-1">Press <kbd className="font-bold bg-gray-200 p-1 rounded">Ctrl</kbd> + <kbd className="font-bold bg-gray-200 p-1 rounded">Shift</kbd> + <kbd className="font-bold bg-gray-200 p-1 rounded">H</kbd> to select a color and start highlighting. Press the same combo to stop.</li>
            <li>Press <kbd className="font-bold bg-gray-200 p-1 rounded">Ctrl</kbd> + <kbd className="font-bold bg-gray-200 p-1 rounded">Shift</kbd> + <kbd className="font-bold bg-gray-200 p-1 rounded">P</kbd> to add a note and submit it with your highlighted text.</li>
          </ul>
        </li>
      </ol>
    </div>
  );
}

export default App;
