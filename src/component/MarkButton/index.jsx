import React from 'react'
import { Button, Icon } from '../EditorComponents'
import { isMarkActive, toggleMark } from '../../utils/utilityFunction'
import { useSlate } from 'slate-react'

const MarkButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <div title={format} style={{ width: '20px', height: '20px' }}>{icon}</div>
    </Button>
  )
}
export default MarkButton;