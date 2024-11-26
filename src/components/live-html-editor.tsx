'use client'

import React, { useState, useEffect, useRef } from 'react'

export default function LiveHtmlEditor() {
  const [html, setHtml] = useState('<h1>Hello, World!</h1>')
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; }
            </style>
          </head>
          <body>${html}</body>
        </html>
      `
    }
  }, [html])

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-4 bg-gray-100">
        <textarea
          className="w-full h-full p-2 font-mono text-sm border border-gray-300 rounded"
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          placeholder="Enter your HTML here..."
        />
      </div>
      <div className="w-1/2 p-4 bg-white">
        <iframe
          ref={iframeRef}
          title="Live Preview"
          className="w-full h-full border-0"
          sandbox="allow-scripts"
        />
      </div>
    </div>
  )
}

