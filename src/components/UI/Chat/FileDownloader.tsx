'use client'

import axios from 'axios'
import { File } from 'lucide-react'
import React, { useState } from 'react'

import ProgressBar from '@/components/UI/Chat/ProgressBar'

interface props {
  filename: string
  getFile: (name: string) => any
  date: string
}

const FileDownloader = ({ filename, getFile, date }: props) => {
  const [downloadProgress, setDownloadProgress] = useState(0)

  const downloadFile = () => {
    axios({
      url: `http://localhost:4444/api/message/file/${filename}`,
      method: 'GET',
      responseType: 'blob',
      onDownloadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )

          setDownloadProgress(percentage)
        }
      }
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
        link.remove()
      })
      .catch((error) => {
        console.error('Ошибка при загрузке файла', error)
      })
  }

  return (
    <div className={'relative flex items-center'}>
      <button
        onClick={downloadFile}
        className={'flex items-center justify-start'}
      >
        <div>
          <ProgressBar
            percentage={downloadProgress}
            circleWidth={50}
            className={''}
          />
        </div>
        <span className={'text-start ml-2  break-words'}>{filename}</span>
      </button>
      <div className={'text-ultra-sm italic '}>{date}</div>
    </div>
  )
}
export default FileDownloader
