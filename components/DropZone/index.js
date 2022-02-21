import { useState, useEffect } from 'react'
import { DocumentDownloadIcon } from '@heroicons/react/outline'
import Papa from 'papaparse'
import { guessBank, transformHeader } from '../../lib/transaction-files'

export default function DropZone({ children }) {
  const [isVisible, setVisible] = useState(false)
  const [lastTarget, setLastTarget] = useState(null)

  function dragEnterHandler(event) {
    setLastTarget(event.target)

    setVisible(true)
  }

  function dragLeaveHandler(event) {
    event.preventDefault()

    if (event.target === document || event.target === lastTarget) {
      setVisible(false)
    }
  }

  function dragOverHandler(event) {
    event.preventDefault()
  }

  function dropHandler(event) {
    event.preventDefault()

    if (event.dataTransfer.files.length !== 1) {
      // TODO: throw error
      console.error('DataTransfer does not contain any files')
      return
    }

    const file = event.dataTransfer.files[0]
    if (file.type !== 'text/csv') {
      // TODO: throw error
      console.error('File is not of type text/csv')
      return
    }

    const reader = new FileReader()
    reader.onload = function (event) {
      try {
        const bankName = guessBank(event.target.result)

        if (bankName === false) {
          throw 'Bank unknown'
        }
      } catch (error) {
        // TODO: throw error
        console.error('Bank is unsupported or could not be identified', error)
        return
      }

      Papa.parse(event.target.result, {
        header: true,
        transformHeader: function (header, index) {
          return transformHeader(header)
        },
        skipEmptyLines: true,
        complete: function (results, file) {
          console.log('Parsing complete:', results, file)
        },
        error: function (err, file, inputElem, reason) {
          // TODO: throw error
          console.error(
            'Error while parsing the file',
            err,
            file,
            inputElem,
            reason
          )
        },
      })
    }
    reader.readAsText(file)

    setVisible(false)
  }

  useEffect(() => {
    window.addEventListener('dragenter', dragEnterHandler)
    return () => window.removeEventListener('dragenter', dragEnterHandler)
  })

  useEffect(() => {
    window.addEventListener('dragleave', dragLeaveHandler)
    return () => window.removeEventListener('dragleave', dragLeaveHandler)
  })

  useEffect(() => {
    window.addEventListener('dragover', dragOverHandler)
    return () => window.removeEventListener('dragover', dragOverHandler)
  })

  useEffect(() => {
    window.addEventListener('drop', dropHandler)
    return () => window.removeEventListener('drop', dropHandler)
  })

  return (
    <>
      {children}
      <div
        className={
          'absolute w-full h-full top-0 left-0 z-50 bg-neutral-900 text-white text-2xl font-semibold transition-opacity duration-400' +
          (!isVisible ? ' invisible opacity-0' : '')
        }
      >
        <div className="w-[calc(100vw-10rem)] h-[calc(100vh-10rem)] mt-20 ml-20 rounded-3xl border-dashed border-4 border-neutral-600">
          <div className="flex justify-center items-center h-full">
            <div
              className={
                'inline-flex items-center transition-transform duration-400' +
                (!isVisible ? ' scale-75' : '')
              }
            >
              <DocumentDownloadIcon className="inline-block h-8 w-8 mr-1" />
              <span className="uppercase">Drop .csv</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
