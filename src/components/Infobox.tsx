import './Infobox.css';
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import {TreeLeaf} from "../graphs/TreeNode";

export function Infobox(props: {open: boolean, onClose: () => void, leaf: TreeLeaf | undefined}) {
  const {open, onClose, leaf} = props;
  const localNames = leaf ? Object.entries(leaf.localNames) : [];
  const localNameElements = localNames.map(
    langName => <p key={langName[0]}>
      <span className='local-name-lang'>{langName[0]}</span>:
      <span className='local-name'>{langName[1]}</span>
    </p>
  );
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{leaf?.name}</DialogTitle>
      <DialogContent>
        {localNameElements}
        <a href={leaf?.image.image_url} target='_blank' rel='noreferrer'>
          <img src={leaf?.image.image_url} alt={leaf?.name} className='infobox-image'/>
        </a>
        <small>
          &copy; {leaf?.image.author}, <a href={leaf?.image.license_url}>{leaf?.image.license_string}</a>. <a href={leaf?.image.url}>Source: Wikimedia Commons</a>
        </small>
      </DialogContent>
    </Dialog>
  );
}
