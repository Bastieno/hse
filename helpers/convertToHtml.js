import { convertToHTML } from 'draft-convert';

export const styleToHTML = style => {
  switch (style) {
    case 'ITALIC':
      return <em className="italic" />;
    case 'BOLD':
      return <strong className="bold" />;
    case 'UNDERLINE':
      return <u className="underline" />;
    default:
      return null;
  }
};

export const entityToHTML = (entity, text) => {
  if (entity.type === 'LINK') {
    return (
      <a className="link" href={entity.data.url} target="_blank">
        {text}
      </a>
    );
  }
  return text;
};

export const options = {
  styleToHTML,
  entityToHTML
};

const converterFunction = convertToHTML(options);

export default contentState => converterFunction(contentState);
