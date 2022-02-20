import React, { useState, useEffect } from 'react'
import { DocumentDownloadIcon } from '@heroicons/react/outline'

export default function DropZone({ children }) {
  let [isVisible, setVisible] = useState(false);
  const [lastTarget, setLastTarget] = useState(null);

  function dragEnterHandler(event) {
    setLastTarget(event.target);

    setVisible(true);
  }

  function dragLeaveHandler(event) {
    event.preventDefault();

    if (event.target === document || event.target === lastTarget) {
      setVisible(false);
    }
  }

  function dragOverHandler(event) {
    event.preventDefault();
  }

  function dropHandler(event) {
    event.preventDefault();

    if (event.dataTransfer.files.length !== 1) {
      // TODO: throw error
      return;
    }

    const file = event.dataTransfer.files[0];
    if (file.type !== 'text/csv') {
      // TODO: throw error
      return;
    }

    // TODO: Handle upload
    console.log(file);

    setVisible(false);
  }

  useEffect(() => {
    window.addEventListener('dragenter', dragEnterHandler);
    return () => window.removeEventListener('dragenter', dragEnterHandler);
  });

  useEffect(() => {
    window.addEventListener('dragleave', dragLeaveHandler);
    return () => window.removeEventListener('dragleave', dragLeaveHandler);
  });

  useEffect(() => {
    window.addEventListener('dragover', dragOverHandler);
    return () => window.removeEventListener('dragover', dragOverHandler);
  });

  useEffect(() => {
    window.addEventListener('drop', dropHandler);
    return () => window.removeEventListener('drop', dropHandler);
  });

  return (
    <>
      <div className={'absolute w-full h-full top-0 left-0 z-50 bg-neutral-900 text-white text-2xl font-semibold transition-opacity duration-400' + (!isVisible ? ' invisible opacity-0' : '')}>
        <div className="w-[calc(100vw-10rem)] h-[calc(100vh-10rem)] mt-20 ml-20 rounded-3xl border-dashed border-4 border-neutral-600">
          <div className="flex justify-center items-center h-full">
            <div className={'inline-flex items-center transition-transform duration-400' + (!isVisible ? ' scale-75' : '')}>
              <DocumentDownloadIcon className="inline-block h-8 w-8 mr-1" />
              <span className="uppercase">Drop .csv</span>
            </div>
          </div>
        </div>
      </div>
      {children}
    </>
  )
}