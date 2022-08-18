import {LocalNames as LocalNamesType} from "../graphs/InputTree";

export function LocalNames(props: {localNames: LocalNamesType}) {
  const localNameElements = Object.entries(props.localNames).map(
    langName => <p key={langName[0]}>
      <span className='local-name-lang'>{langName[0]}</span>:
      <span className='local-name'>{langName[1]}</span>
    </p>
  );
  return <>{localNameElements}</>
}
