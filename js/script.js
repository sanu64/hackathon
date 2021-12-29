"use strict";
let h1_tag = document.createElement("h1");
let h1_text = document.createTextNode("BREWERY LIST");
h1_tag.className = "heading-container";
h1_tag.id = "main";
h1_tag.appendChild(h1_text);
document.body.appendChild(h1_tag);

let first_div = document.createElement("div");
first_div.id = "maincontainer";
first_div.className = "brewerylist";
document.body.appendChild(first_div);

const url = "https://api.openbrewerydb.org/breweries";

async function getData() {
  let breweries;
  try {
    let data = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    breweries = await data.json();
  } catch (err) {
    console.log(err);
  }
  return breweries;
}

async function displayData() {
  let info = await getData();
  console.log(info);
  first_div.innerHTML = "";
  console.log(info);
  info.forEach((element) => {
    let address = `${element.street == null ? "" : element.street},
    ${element.address_2 == null? element.city : element.address_2 + " " + element.city}`;
    first_div.innerHTML += `
        <div class='container'>
        <p class='center title'><b><u> Name</u> : ${element.name}</b></p>
        <div class='info'>
        <p class='para text-start'><b><u> Type</u> :</b> ${element.brewery_type}</p>
        <p class='para text-start'><b><u> Address</u> :</b> ${address}</p>
        <p class='para text-start'><b><u> Phone</u> :</b> ${
          element.phone == null ? "Not Available" : element.phone
        } </p>
        <p class='para text-start'><b><u> Website Url</u> :</b> ${
          element.website_url == null ? "Not Available" : element.website_url
        } </p>
        </div>
        </div>
        `;
  });
}

displayData();