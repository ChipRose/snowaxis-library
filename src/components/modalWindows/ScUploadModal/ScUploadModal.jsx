import React, { useState } from 'react'
import { SnowList, SnowListItem, SnowTypography } from '../../../adapter'
import { ScConfirmationAlert } from '../../modalWindows'
import styled from 'styled-components'

const FileInputView = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  clip: rect(0 0 0 0);
  overflow: hidden;
  &:focus-visible ~ * {
    outline: 1px solid #000000;
  }
`

const FileInputLableView = styled.label`
  ${({ theme }) => `
    padding: ${theme.indent.secondary};
    border: ${theme.border.decorative};
    border-radius: ${theme.borderRadius.secondary};
  `}
  ${({ theme, isfile }) =>
    isfile ? `border-color: ${theme.mainPalette.grey.main}` : ''};
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  cursor: pointer;
`

const UploadErrorItemView = styled(SnowListItem)`
  color: ${({ theme }) => theme.mainPalette.warning.secondary};
  position: relative;
  ::before {
    content: '';
    position: absolute;
    left: 4px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${({ theme }) => theme.mainPalette.warning.secondary};
  }
`

/**
 *
 * @param modalTitle - Dialog Title
 * @param fileParamName - Param Name in upload request
 * @param useUploadCmd - Uploading Cmd Hook takes a file to upload and on Upload callback as params
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

export const ScUploadModal = ({
  open = false,
  onClose = () => null,
  title = 'Import file',
  fileParamName = '',
  uploadFn = () => null,
  ...props
}) => {
  const [filename, setFilename] = useState('')
  const [messages, setMessages] = useState([])
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const uploadCmd = uploadFn(file)

  const inputChange = (evt) => {
    const fd = new FormData()
    const input = evt.target

    fd.append(fileParamName, input.files[0])

    if (input.value) {
      setFilename(input.files[0].name)
      setFile(fd)
    } else {
      setFilename('')
      setFile(null)
    }
  }

  const reset = () => {
    setFile(null)
    setFilename('')
    setMessages([])
  }

  const cancel = () => {
    reset()
    onClose()
  }
  const responseHandler = (res) => {
    if (!res) return // if uploader doesnt return any - do nothing

    res.data?.messages
      ? setMessages(res.data.messages)
      : setMessages([
          { type: 'error', message: 'No response data from server' }
        ])
  }

  const upload = () => {
    setLoading(true)
    file &&
      uploadCmd((r) => {
        setLoading(false)
        responseHandler(r)
      })
  }

  return (
    <ScConfirmationAlert
      isIconExist={false}
      open={open}
      loading={loading}
      onClose={cancel}
      labelForConfirmBtn={'Upload'}
      onConfirm={upload}
      confirmProps={{ disabled: Boolean(!filename || filename.length === 0) }}
      message={{
        title: `${title} ${fileParamName ? ` - ${fileParamName}` : ''}`,
        syncText: 'Uploading',
        content: (
          <>
            <form>
              <FileInputLableView htmlFor="csvInput" isfile={Boolean(filename)}>
                <SnowTypography component="span" variant="body1">
                  {filename ? filename : 'Drop .csv file here'}
                </SnowTypography>
              </FileInputLableView>
              <FileInputView
                id="csvInput"
                onChange={inputChange}
                type="file"
                accept=".csv"
              />
            </form>
            {messages?.length ? (
              <SnowList>
                {messages.map((msg, i) => (
                  <>
                    {
                      <UploadErrorItemView aria-label={msg.type} key={i}>
                        {msg.text ? msg.text : 'Something went wrong'}
                      </UploadErrorItemView>
                    }
                  </>
                ))}
              </SnowList>
            ) : null}
          </>
        )
      }}
    />
  )
}

export default ScUploadModal
