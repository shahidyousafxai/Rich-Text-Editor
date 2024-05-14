import React, { useCallback, useMemo, useState } from 'react'
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
import AddLinkButton from '../AddLinkButton'

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

  const [value, setValue] = useState([])
  
  // console.log("---------", value)

  const styleClasses = (child) => {
    return {
      ...(child?.bold ? { fontWeight: 'bold' } : {}),
      ...(child?.italic ? { fontStyle: 'italic' } : {}),
      ...(child?.underline ? { textDecoration: 'underline' } : {}),
      ...(child?.italic ? { fontStyle: 'italic' } : {}),
    }
  }

  const alignClasses = (node) => {
    return {
      ...(node?.align === 'center' ? { textAlign: 'center' } : {}),
      ...(node?.align === 'left' ? { textAlign: 'left' } : {}),
      ...(node?.align === 'right' ? { textAlign: 'right' } : {}),
      ...(node?.align === 'justify' ? { textAlign: 'justify' } : {}),
    }
  }
  
  const serialize = node => {
    switch (node?.type) {
      case 'block-quote':
        return <blockquote style={alignClasses(node)}>{node?.children?.map((child, i) => <span key={i} style={styleClasses(child)}>{child?.text}</span>)}</blockquote>
      case 'paragraph':
        return <p style={alignClasses(node)}>{node?.children?.map((child, i) => child.code ? <code key={i}>{child?.text}</code> : <span key={i} style={styleClasses(child)}>{child?.text}</span>)}</p>
      case 'link':
        return <a href={node?.url} style={{}}>{node?.children?.map((child, i) => child.code ? <code key={i}>{child?.text}</code> : <span key={i} style={styleClasses(child)}>{child?.text}</span>)}</a>
      case 'numbered-list':
        return <ol>
          {node?.children?.map((child, i) => serialize(child))}
        </ol>
      case 'bulleted-list':
        return <ul>
          {node?.children?.map((child, i) => serialize(child))}
        </ul>
      case 'list-item':
        return node?.children?.map((child, i) => <li key={i}>{child?.text}</li>)
      case 'heading-one':
        return <h1 style={alignClasses(node)}>{node?.children?.map((child, i) => <h1 key={i}>{child?.text}</h1>)}</h1>
      case 'heading-two':
        return <h2 style={alignClasses(node)}>{node?.children?.map((child, i) => <h2 key={i}>{child?.text}</h2>)}</h2>
      default:
        return "default"
    }
  }

  return (
    <>
    <Slate editor={editor} initialValue={initialValue} value={value}
      onChange={value => setValue(value)}>
      <Toolbar>
        <MarkButton format="bold" icon={<Bold />} />
        <MarkButton format="italic" icon={<Italic />} />
        <MarkButton format="underline" icon={<Underline />} />
        <MarkButton format="code" icon={<Code />} />
        <BlockButton format="heading-one" icon={<BoldOne />} />
        <BlockButton format="heading-two" icon={<BoldTwo />} />
        <BlockButton format="block-quote" icon={<Quote />} />
        <AddLinkButton icon={<Link />} />
        <BlockButton format="numbered-list" icon={<OrderList />} />
        <BlockButton format="bulleted-list" icon={<UnorderList />} />
        <BlockButton format="left" icon={<LeftAlign />} />
        <BlockButton format="center" icon={<CenterAlign />} />
        <BlockButton format="right" icon={<RightAlign />} />
        <BlockButton format="justify" icon={<Justify />} />
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

    <div style={{display: "flex", flexDirection: "column"}}>
        {React.Children.toArray(value?.map((node) => {
          return (
            serialize(node)
          )
        }))}
    </div>
    </>
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