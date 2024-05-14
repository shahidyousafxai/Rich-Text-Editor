import React, { useCallback, useMemo } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, Slate } from 'slate-react'
import {
  createEditor,
  Descendant,
} from 'slate'
import { withHistory } from 'slate-history'
import Leaf from '../Leaf'
import { Toolbar } from '../EditorComponents';
import BlockButton from "../BlockButton"
import MarkButton from "../MarkButton"
import { Element, toggleMark } from '../../utils/utilityFunction';
import {
  Bold,
  BoldOne,
  BoldTwo,
  CenterAlign,
  Code,
  Image,
  Italic,
  Justify,
  LeftAlign,
  Link,
  OrderList,
  Quote,
  RightAlign,
  Underline,
  UnorderList,
  Video,
} from "../../assets/icons"

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const TextEditor = () => {
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Toolbar>
        <MarkButton format="bold" icon={<Bold/>} />
        <MarkButton format="italic" icon={<Italic/>} />
        <MarkButton format="underline" icon={<Underline/>} />
        <MarkButton format="code" icon={<Code/>} />
        <BlockButton format="heading-one" icon={<BoldOne/>} />
        <BlockButton format="heading-two" icon={<BoldTwo/>} />
        <BlockButton format="block-quote" icon={<Quote/>} />
        <BlockButton format="numbered-list" icon={<OrderList/>} />
        <BlockButton format="bulleted-list" icon={<UnorderList/>} />
        <BlockButton format="left" icon={<LeftAlign/>} />
        <BlockButton format="center" icon={<CenterAlign/>}/>
        <BlockButton format="right" icon={<RightAlign/>} />
        <BlockButton format="justify" icon={<Justify/>} />
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={event => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault()
              const mark = HOTKEYS[hotkey]
              toggleMark(editor, mark)
            }
          }
        }}
      />
    </Slate>
  )
}


const initialValue = [
  {
    type: 'paragraph',
    children: [
      { text: '' },
    ],
  },
]

export default TextEditor