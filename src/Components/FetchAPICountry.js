import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import Card from './SummaryCard';
import AppTheme from '../Colors';
import ThemeContext from '../Context/ThemeContext';
import Footer from './Footer';

const FetchCountryStats = () => {
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];

  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState(0);

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  async function fetchData() {
    fetch('https://api.covid19api.com/summary', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setStats(result);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const countrySelected = (event) => {
    setCountry(event.target.value);
  };

  if (loading) {
    return (
      <div style={{ color: `${currentTheme.textColor}` }}>
        <Helmet
          bodyAttributes={{
            style: `background-color : ${currentTheme.backgroundColor}`,
          }}
        />
        <div
          className='d-flex justify-content-center'
          style={{ marginTop: '250px' }}
        >
          <h1>
            <strong>Loading</strong>&nbsp;&nbsp;
          </h1>
          <div
            className='spinner-border'
            role='status'
            style={{ width: '40px', height: '40px' }}
          ></div>
        </div>
        <p className='font-weight-light d-flex justify-content-center'>
          If it takes too long please reload the page.
        </p>
      </div>
    );
  } else {
    const cname = stats.Countries;
    const ctitle = cname[country].Country;
    const countries = stats.Countries;
    let countryNames = [];
    for (var i = 0; i < countries.length; i++) {
      countryNames.push(countries[i].Country);
    }
    const fatality =
      (cname[country].TotalDeaths / cname[country].TotalConfirmed) * 100;
    const fatalityPercent = fatality.toFixed(2);
    const recovery =
      (cname[country].TotalRecovered / cname[country].TotalConfirmed) * 100;
    const recoveryPercent = recovery.toFixed(2);
    const str = stats.Date;
    var date = str.substring(0, 10);
    var time = str.substring(11, 19);
    var activeCases =
      cname[country].TotalConfirmed -
      cname[country].TotalDeaths -
      cname[country].TotalRecovered;
    return (
      <div>
        <div
          className='input-group mx-auto mt-5'
          style={{ justifyContent: 'center' }}
        >
          <form className='form-inline'>
            <div className='input-group-prepend'>
              <label className='input-group-text'>Select Country</label>
            </div>
            <select
              onChange={countrySelected}
              className='custom-select'
              id='inputGroupSelect01'
            >
              {/* <option>Choose Country to Display Data...</option> */}
              {countryNames.map((name, index) => {
                return (
                  <option value={index} key={index}>
                    {name}
                  </option>
                );
              })}
            </select>
          </form>
        </div>
        <Helmet
          bodyAttributes={{
            style: `background-color : ${currentTheme.backgroundColor}`,
          }}
        />
        <Card
          title={ctitle + ' Coronavirus Stats Summary'}
          active={activeCases}
          newconf={cname[country].NewConfirmed}
          totalconf={cname[country].TotalConfirmed}
          newdeath={cname[country].NewDeaths}
          totaldeath={cname[country].TotalDeaths}
          newrecov={cname[country].NewRecovered}
          totalrecov={cname[country].TotalRecovered}
          fatalityRate={fatalityPercent}
          recoveryRate={recoveryPercent}
          date={date}
          time={time}
          chartTitle={ctitle + ' Coronavirus Stats Chart'}
          button='Check Global Data'
          link='/'
        />
        <div>
          <Footer />
        </div>
      </div>
    );
  }
};

export default FetchCountryStats;
