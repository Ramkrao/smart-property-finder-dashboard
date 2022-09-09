const PropertyTableHead = [
  {title: 'Id', sortable: true},
  {title: 'Property Details'},
  {title: 'Images'},
  {title: 'Schools'},
]

const PropertyTableAppearance={
  fullWidth: true,
  highlightHeader: true,
  stripeBody: true,
  highlightFooter: true,
  headerTopBorderColor: 'green',
  columnTextAlign: ['left', 'left'],
  cellSizing: 'condensed',
  rowSpacing: '0px',
  columnDivider: false,
  rowDivider: false
}

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const Delimiters = [KeyCodes.comma, KeyCodes.enter];

export {
  PropertyTableAppearance,
  PropertyTableHead,
  Delimiters
}