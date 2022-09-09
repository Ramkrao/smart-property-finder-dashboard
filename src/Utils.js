
function parseTableData(listings) {

  let parsedListings = [];

  listings.map((row, rowIndex) => {
    let block = {
      Id: rowIndex + 1,
      Address: <div>
          <b>{row.price}</b>
          <br/>
          <a href={row.url} target="_blank">{row.address}</a>
          <br/>
          <img class="Display__icons" src="/bed.png"/> {row.features.bedrooms}
          <img class="Display__icons" src="/bath.png"/> {row.features.bathrooms}
          <img class="Display__icons" src="/car.png"/> {row.features.parkingSpaces}
          <br/>
          LandSize: {row.landsize}
          <br/>
          Type: {row.type}
        </div>,
      MainImage: <img class="Main__image" src={row.mainImage}/>,
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

export {
  parseTableData
}