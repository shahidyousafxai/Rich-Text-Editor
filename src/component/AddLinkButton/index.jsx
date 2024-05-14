import { useSlate } from "slate-react";
import { Button } from "../EditorComponents";
import { insertLink, isLinkActive } from "../../utils/utilityFunction";

const AddLinkButton = ({icon}) => {
  const editor = useSlate()
  return (
    <Button
      active={isLinkActive(editor)}
      onMouseDown={event => {
        event.preventDefault()
        const url = window.prompt('Enter the URL of the link:')
        if (!url) return
        insertLink(editor, url)
      }}
    >
      <div title={'Link'} style={{ width: '20px', height: '20px' }}>{icon}</div>
    </Button>
  )
};

export default AddLinkButton;