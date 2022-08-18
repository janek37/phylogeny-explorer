import './Infobox.css';
import {Dialog, DialogContent, DialogTitle, useMediaQuery, useTheme} from "@mui/material";
import {TreeLeaf} from "../graphs/TreeNode";
import {LocalNames} from "./LocalNames";

export function Infobox(props: {open: boolean, onClose: () => void, leaf: TreeLeaf | undefined}) {
  const {open, onClose, leaf} = props;
  const localNameElements = leaf && <LocalNames localNames={leaf.localNames}/>;
  const knownForElements = leaf && leaf.knownFor.map((knownForItem, i) =>
    <LocalNames key={i} localNames={knownForItem.local_names}/>
  );
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen}>
      <DialogTitle>{leaf?.name}</DialogTitle>
      <DialogContent>
        {localNameElements}
        {knownForElements && knownForElements.length > 0 && <h4>Known for:</h4>}
        {knownForElements}
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
