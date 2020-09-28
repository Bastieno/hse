export const getSelectionRange = () => {
  const selection = window.getSelection();
  if (selection.rangeCount === 0) return null;
  return selection.getRangeAt(0);
};

export const getSelectionCoords = selectionRange => {
  const editorBounds = document
    .getElementById('RichEditor-root')
    .getBoundingClientRect();
  const rangeBounds = selectionRange.getBoundingClientRect();
  const rangeWidth = rangeBounds.right - rangeBounds.left;

  // 398px is width of inline toolbar
  const offsetLeft =
    rangeBounds.left - editorBounds.left + rangeWidth / 2 - 398 / 2;

  // 56px is height of inline toolbar
  const offsetTop = rangeBounds.top - editorBounds.top + 56 / 2;

  return { offsetLeft, offsetTop };
};
