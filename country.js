const countryName = new URLSearchParams(window.location.search).get('name')

const wrapper = document.querySelector('.wrapper')

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((resp) => resp.json())
  .then(([country]) => {
    // console.log(country.borders)
    let currencyText = ''
    let languagesText = ''
    if (country.currencies) {
      currencyText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(', ')
    }

    if (country.languages) {
      languagesText = Object.values(country.languages)
        .map((language) => language)
        .join(', ')
    }

    let borderCountry = ''

    if (country.borders) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((resp) => resp.json())
          .then(([border]) => {
            borderCountry = border.name.common
            console.log(borderCountry)
          })
      })
    }

    const countryInfoHTML = `
<div class="image">
          <img src="${country.flags.svg}" alt="" />
        </div>
        <div>
          <h2>${country.name.common}</h2>
          <div class="country-info">
            <div>
              <p><b> Native Name :</b> ${
                Object.values(country.name.nativeName)[0].common
              }</p>
              <p><b> Population :</b> ${country.population.toLocaleString(
                'en-IN'
              )}</p>
              <p><b> Region :</b> ${country.region}</p>
              <p><b>Sub Region :</b> ${country.subregion}</p>
              <p><b> Capital :</b> ${country.capital}</p>
            </div>
            <div>
              <p><b> Top Level Domain :</b>  ${country.tld}</p>
              <p><b>Currencies :</b>  ${currencyText}</p>
              <p><b> Languages :</b>  ${languagesText}</p>
            </div>
          </div>

          <div class="border-countries">
            <p><b>Border Countries: </b></p>
            <a href=""><button>${borderCountry}</button></a>
            <a href=""><button>France</button></a>
            <a href=""><button>France</button></a>
          </div>
        </div>
`

    wrapper.innerHTML = countryInfoHTML
  })
