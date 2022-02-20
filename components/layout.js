export default function Layout({ children }) {
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