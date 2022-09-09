import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { WithContext as ReactTags } from 'react-tag-input';
import { Formik } from 'formik'
import * as Yup from 'yup'

import { AnzGrid, AnzRow, AnzCol } from '@anz/grid'
import Section from '@anz/section'
import SelectField from '@anz/select-field'
import Table from '@anz/table'
import Text from '@anz/text'
import AnzTextField from '@anz/text-field'
import Button from '@anz/button'

import { parseTableData } from './Utils'

// import listings from './config/properties.json'
import suburbs from './config/suburbs.json'

import { PropertyTableAppearance, PropertyTableHead, Delimiters } from './Constants';

// Yup Initial values for the form
const initVals = {
    suburbs: '',
    minPrice: '0',
    maxPrice: '500000',
    propertyType: 'unit'
}

// Form fields validation rules
const schema =Yup.object().shape({
  suburbs: Yup.array().min(1, 'Select atleast 1 suburb').required('Select atleast 1 suburb'),
  minPrice: Yup.number().min(0, 'invalid').required("Please enter min price"),
  maxPrice: Yup.number().min(0, 'invalid').required("Please enter max price"),
  propertyType: Yup.string().required("Please select a type")
});

const suggestions = suburbs.map(suburb => {
  return {
    id: suburb.name,
    text: suburb.name
  }
});

const HomeComponent = () => {

  const [tags, setTags] = useState([{id:"dummy",text: "dummy"}]);
  const [listings, setListings] = useState([]);

  const fetchListings = (values) => {
    console.log("Fetching listings")
    axios
      .get("http://localhost:8080/listings", {
        params: {
          payload: values
        }
      })
      .then((res) => {
        setListings(res.data);
      })
  }

  return(
    <Formik
    initialValues={initVals}
    validationSchema={schema}
    onSubmit={(values) => {
      console.log(values);
      fetchListings(values);
    }}
    onReset={() => {setTags([{id:"dummy",text: "dummy"}])}}
  >
  {({ values, errors, touched, handleChange, handleSubmit, handleReset, setFieldValue }) => (<form onSubmit={handleSubmit} onReset={handleReset}>
    <AnzGrid maxWidth='auto' fluid>
      <br/>
      <Section>
        <AnzRow>
          <AnzCol xs={12} md={4} center="xs">
            <Text heading='3'>Suburbs</Text>
          </AnzCol>
          <AnzCol xs={12} md={3} center="xs">
            <Text heading='3'>Price Range</Text>
          </AnzCol>
          <AnzCol xs={12} md={3} center="xs">
            <Text heading='3'>Property Type</Text>
          </AnzCol>
        </AnzRow>
        <AnzRow>
          <AnzCol xs={12} md={4} center="xs">
            {/* reference: https://stackoverflow.com/a/53097401 */}
            <ReactTags
              tags={tags}
              suggestions={suggestions}
              delimiters={Delimiters}
              handleDelete={(i) => setTags(tags.filter((_, index) => index !== i))}
              handleAddition={(tag) => {
                setTags([...tags, tag])
                setFieldValue('suburbs', [...tags, tag].map(t => t.id))
              }}
              inputFieldPosition="bottom"
              autocomplete
              editable
            />
            {errors.suburbs && touched.suburbs ? (
              <p style={{color:'red', fontSize:'12px'}}>{errors.suburbs}</p>
            ) : null}
          </AnzCol>
          <AnzCol xs={12} md={1} center="xs">
            <AnzTextField
              name='minPrice'
              type='number'
              id='minPrice'
              beforeField='$'
              size='small'
              label="Minimum"
              value={values.minPrice}
              onChange={handleChange}
            />
            {errors.minPrice && touched.minPrice ? (
              <p style={{color:'red', fontSize:'12px'}}>{errors.minPrice}</p>
            ) : null}
          </AnzCol>
          <AnzCol></AnzCol>
          <AnzCol xs={12} md={1} center="xs">
            <AnzTextField
              name='maxPrice'
              type='number'
              id='maxPrice'
              size='small'
              beforeField='$'
              label="Maximum"
              value={values.maxPrice}
              onChange={handleChange}
            />
            {errors.maxPrice && touched.maxPrice ? (
              <p style={{color:'red', fontSize:'12px'}}>{errors.maxPrice}</p>
            ) : null}
          </AnzCol>
          <AnzCol></AnzCol>
          <AnzCol xs={12} md={3} center="xs">
          <SelectField
            name='propertyType'
            onChange={(val) => setFieldValue('propertyType', val)}
            id='propertyType'
            label='Select type'
            size='small'
            value={values.propertyType}
            items={[
              {value: 'house', label: 'House'},
              {value: 'townhouse', label: 'Townhouse'},
              {value: 'unit', label: 'Unit'}
            ]} />
            {errors.propertyType && touched.propertyType ? (
              <p style={{color:'red', fontSize:'12px'}}>{errors.propertyType}</p>
            ) : null}
          </AnzCol>
        </AnzRow>
        <AnzRow style={{"marginTop": "32px"}}>
          <AnzCol xs={12} md={2}>
            <Button type='submit' appearance='primary' fullWidth>Submit</Button>
          </AnzCol>
          <AnzCol xs={12} md={2}>
            <Button type='reset' variant='ghost' fullWidth>Clear</Button>
          </AnzCol>
        </AnzRow>
        <br/><br/>
        <Table
          id='property-table'
          data={parseTableData(listings)}
          head={PropertyTableHead}
          appearance={PropertyTableAppearance}
          perPage={10}
          sortedBy='0'
          sortOrder='ascending' />
      </Section>
    </AnzGrid>
    </form>
  )}
  </Formik>
  );
}
export default HomeComponent
