import './Infobox.css';
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import {TreeLeaf} from "../graphs/TreeNode";

export function Infobox(props: {open: boolean, onClose: () => void, leaf: TreeLeaf | undefined}) {
  const {open, onClose, leaf} = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{leaf?.name}</DialogTitle>
      <DialogContent>
        <a href={leaf?.url} target='_blank' rel='noreferrer'>
          <img src={leaf?.url} alt={leaf?.name} className='infobox-image'/>
        </a>
      </DialogContent>
    </Dialog>
  );
}
