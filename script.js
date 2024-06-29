const countriesGrid = document.querySelector('.countries-grid')

fetch('https://restcountries.com/v3.1/all')
  .then((resp) => resp.json())
  .then((data) => {
    data.forEach((country) => {
      // console.log(country.borders)

      const countryBox = document.createElement('a')
      countryBox.classList.add('countries-box')

      countryBox.href = `/country.html?name=${country.name.common}`

      const boxContent = `
 <div class="country-flag">
     <img src="${country.flags.svg}" alt="" />
   </div>

   <div class="country-info">
     <h3 class="country">${country.name.common}</h3>
     <div class="population">
       <p>Population :</p>

       <span>${country.population.toLocaleString('en-IN')}</span>
     </div>
     <div class="region">
       <p>Region :</p>

       <span>${country.region}</span>
     </div>
     <div class="capital">
       <p>Capital :</p>

       <span>${country.capital}</span>
     </div>
   </div>
`
      countryBox.innerHTML = boxContent

      countriesGrid.appendChild(countryBox)
    })
  })
