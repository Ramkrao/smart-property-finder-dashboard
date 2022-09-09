const PropertyTableHead = [
  {title: 'Id', sortable: true},
  {title: 'Address'},
  {title: 'Main Image'},
  {title: 'School'},
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