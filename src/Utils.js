import ImageScroller from 'react-image-scroller';

function parseTableData(listings) {

  let parsedListings = [];

  listings.map((row, rowIndex) => {
    let block = {
      Id: rowIndex + 1,
      Address: <div>
          <b>{row.price}</b>
          <br/>
          <a href={row.url} rel="noreferrer" target="_blank">{row.address}</a>
          <br/>
          <img alt="bed icon" class="Display__icons" src="/bed.png"/> {row.features.bedrooms}
          <img alt="bath icon" class="Display__icons" src="/bath.png"/> {row.features.bathrooms}
          <img alt="car icon" class="Display__icons" src="/car.png"/> {row.features.parkingSpaces}
          <br/>
          LandSize: {row.landsize}
          <br/>
          Type: {row.type}
        </div>,
      Images: getImagesList(row.mainImage, row.images),
      School: <div>
          <h3>Primary School</h3>
            <b>{row.primarySchool.school}</b><br/>
            {getAdditionlInfo(row, "primary")}
          <h3>Secondary School</h3>
            <b>{row.secondarySchool.school}</b><br/>
            {getAdditionlInfo(row, "secondary")}
        </div>
    }
    parsedListings.push(block);
  })
  return parsedListings
}

function getAdditionlInfo(row, type) {
  if (type === "primary" && row.primarySchool.HyperLinkPostcode) {
    return (<div>
      Postcode: {row.primarySchool.HyperLinkPostcode}<br/>
      Score: {row.primarySchool.HyperLinkOverall}<br/>
      Percentile: {row.primarySchool.LabelPercentile}<br/>
      Enrolments: {row.primarySchool.TotalEnrolments}<br/>
      Sector: {row.primarySchool.Sector}<br/>
      ICSEA: {row.primarySchool.ICSEA}
    </div>)
  } else if (type === "secondary" && row.primarySchool.HyperLinkPostcode) {
    return (<div>
      Postcode: {row.secondarySchool.HyperLinkPostcode}<br/>
      Score: {row.secondarySchool.HyperLinkOverall}<br/>
      Percentile: {row.secondarySchool.LabelPercentile}<br/>
      Enrolments: {row.secondarySchool.TotalEnrolments}<br/>
      Sector: {row.secondarySchool.Sector}<br/>
      ICSEA: {row.secondarySchool.ICSEA}
    </div>)
  }
}

function getImagesList(main, images) {
  return (
    <div class="Scroller__image">
    <ImageScroller>
      <img src={main} class="Main__image" alt="main property" />
      {images.map((image, index) => {
        return (<img src={image} class="Main__image" alt={index} />)
      })}
    </ImageScroller>
    </div>
  )
}

export {
  parseTableData
}