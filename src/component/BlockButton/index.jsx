import React from 'react'
import { Button, Icon } from '../EditorComponents'
import { useSlate } from 'slate-react';
import { isBlockActive, toggleBlock } from '../../utils/utilityFunction';

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();

  const LIST_TYPES = ['numbered-list', 'bulleted-list']
  const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
      )}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      <div title={format} style={{ width: '20px', height: '20px' }}>{icon}</div>
    </Button>
  )
}

export default BlockButton;