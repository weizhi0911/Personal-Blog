import React, { useState } from 'react'
import 'antd/dist/antd.css'
import { Upload, Button, Spin, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import '../static/css/Toys.css'

// import axios from 'axios'
import toysPath from '../config/tofsUrl'
// import githubPath from '../config/githubUrl'

function Toys(props) {
  const [isLoading, setIsLoading] = useState(false)
  // const upload = () => {}
  const [uploadProps, setUploadProps] = useState({
    name: 'file',
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    action: toysPath.upload,
    headers: {
      authorization: 'authorization-text'
    },
    onChange (info) {
      console.log('pppp')
      console.log(info)
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    }
  })
  return (
    <div className="toys-div">
      <Spin tip="Loading..." spinning={isLoading}>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Spin>
    </div>
  )
}

export default Toys
