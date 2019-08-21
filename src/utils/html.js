export const stripParagraphTags = html => {
  return html.replace(/<\/?p[^>]*>/g, ``);
};

export const validateNode = node => {
  return (
    node && node.childMarkdownRemark && node.childMarkdownRemark.html !== ``
  );
};
