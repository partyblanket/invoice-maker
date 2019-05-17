import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import { saveSettings } from '../utils/actions';


const activeItems = ['name', 'company', 'addressLineOne', 'addressLineTwo', 'postcode', 'city', 'phone','nextSale', 'logo']

const views = {
  general: ['name', 'company', 'addressLineOne', 'addressLineTwo', 'postcode', 'city', 'phone','nextSale'],
  templates: ['logo']
}

const settingsItems = {
  name: {title: 'Name', type: 'string'},
  company: {title: 'Company', type:'string'},
  addressLineOne: {title: 'Address Line 1', type:'string'},
  addressLineTwo: {title: 'Address Line 2', type:'string'},
  postcode: {title: 'Postcode', type:'string'},
  city: {title: 'City', type:'string'},
  phone: {title: 'Phone Number', type:'string'},
  vat: {title: 'VAT rates', type:'arrayOfString'},
  nextSale: {title: 'Next invoice #', type: 'number'},
  logo: {title: 'Logo (URL)', type: 'string'},
}

function Settings(props) {
  const [localSettings, setLocalSettings] = useState({name: props.name, addressLineOne: props.addressLineOne, addressLineTwo: props.addressLineTwo, postcode: props.postcode, city: props.city, phone: props.phone, company: props.company, vat: props.vat, nextSale: props.nextSale})

  const handleChange = (e) => {
    setLocalSettings({...localSettings, [e.target.name]: e.target.value}); 
  }

  const [view, setView] = useState('general')

  // useEffect(() => {
  //   setLocalSettings()
  // }, [])

  return (
    <div id='settings'>
      <div id='category'>
        <div className='button' onClick={() => setView('general')}>General</div>
        <div className='button' onClick={() => setView('templates')}>Templates</div>
      </div>
      <div id='items'>
        {views[view].map(el => (<div key={el}>
          <div>{settingsItems[el].title}</div><input type='text' name={el} value={localSettings[el] || ''} onChange={handleChange}></input>
        </div>))}
        <div className='button save' onClick={() => props.dispatch(saveSettings(props.userid, localSettings))}>SAVE</div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    userid: state._id,
    name: state.name,
    company: state.company,
    addressLineOne: state.addressLineOne,
    addressLineTwo: state.addressLineTwo,
    postcode: state.postcode,
    city: state.city,
    phone: state.phone,
    vat: state.vat,
    nextSale: state.nextSale,
    logo: state.logo,
    
  };
};

export default connect(mapStateToProps)(Settings);