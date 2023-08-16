const validation = (form) => {
  console.log(form);
  let errors = {};
  if (!form.name) errors.name = "Write a name";
  else if (form.name.length < 3) errors.name = "Write at least 3 letters";
  else if (form.name.length > 50) errors.name = "Write up to 50 letters";

  const {principal, secundaria} = form.image;
  if(principal === "" && secundaria === "") errors.image = "Primary and secondary images as required";

  if (!form.price) errors.price = "Insert a price";
  else if (form.price < 100 || form.price > 100000)
    errors.price = "The price must be between 100 and 10000";
  else if (isNaN(form.price)) errors.price = "Should be number";

  if(form.principal === "") errors.image = "Image is required";
  if(form.secundaria === "") errors.image = "Image is required";

  if (!form.description) errors.description = "You must write a description";
  else if (form.description.lenght < 10 || form.description.lenght > 400)
    errors.description = "The description must have between 10 and 400 caracters";

  if (!form.brand) errors.brand = "Write a brand";
  else if (form.brand.lenght < 3 || form.brand.lenght > 20)
    errors.brand = "The brand name must have between 3 and 20 caracters";

    if (form.stock.s.blanco < 0) errors.stock = 'The value cannot be negative.'
  if (form.stock.s.negro < 0) errors.stock = 'The value cannot be negative.'
  if (form.stock.s.gris < 0) errors.stock = 'The value cannot be negative.'

  if (form.stock.m.blanco < 0) errors.stock = 'The value cannot be negative.'
  if (form.stock.m.negro < 0) errors.stock = 'The value cannot be negative.'
  if (form.stock.m.gris < 0) errors.stock = 'The value cannot be negative.'

  if (form.stock.l.blanco < 0) errors.stock = 'The value cannot be negative.'
  if (form.stock.l.negro < 0) errors.stock = 'The value cannot be negative.'
  if (form.stock.l.gris < 0) errors.stock = 'The value cannot be negative.'

  if (form.stock.xl.blanco < 0) errors.stock = 'The value cannot be negative.'
  if (form.stock.xl.negro < 0) errors.stock = 'The value cannot be negative.'
  if (form.stock.xl.gris < 0) errors.stock = 'The value cannot be negative.'


if (isNaN(form.stock.s.blanco) || form.stock.s.blanco.includes('-') || form.stock.s.blanco.includes('+') || form.stock.s.blanco.includes('e')) errors.stock = "Should be a positive integer";
if (isNaN(form.stock.s.negro) || form.stock.s.negro.includes('-') || form.stock.s.negro.includes('+') || form.stock.s.negro.includes('e')) errors.stock = "Should be a positive integer";
if (isNaN(form.stock.s.gris) || form.stock.s.gris.includes('-') || form.stock.s.gris.includes('+') || form.stock.s.gris.includes('e')) errors.stock = "Should be a positive integer";

if (isNaN(form.stock.m.blanco) || form.stock.m.blanco.includes('-') || form.stock.m.blanco.includes('+') || form.stock.m.blanco.includes('e')) errors.stock = "Should be a positive integer";
if (isNaN(form.stock.m.negro) || form.stock.m.negro.includes('-') || form.stock.m.negro.includes('+') || form.stock.m.negro.includes('e')) errors.stock = "Should be a positive integer";
if (isNaN(form.stock.m.gris) || form.stock.m.gris.includes('-') || form.stock.m.gris.includes('+') || form.stock.m.gris.includes('e')) errors.stock = "Should be a positive integer";

if (isNaN(form.stock.l.blanco) || form.stock.l.blanco.includes('-') || form.stock.l.blanco.includes('+') || form.stock.l.blanco.includes('e')) errors.stock = "Should be a positive integer";
if (isNaN(form.stock.l.negro) || form.stock.l.negro.includes('-') || form.stock.l.negro.includes('+') || form.stock.l.negro.includes('e')) errors.stock = "Should be a positive integer";
if (isNaN(form.stock.l.gris) || form.stock.l.gris.includes('-') || form.stock.l.gris.includes('+') || form.stock.l.gris.includes('e')) errors.stock = "Should be a positive integer";

if (isNaN(form.stock.xl.blanco) || form.stock.xl.blanco.includes('-') || form.stock.xl.blanco.includes('+') || form.stock.xl.blanco.includes('e')) errors.stock = "Should be a positive integer";
if (isNaN(form.stock.xl.negro) || form.stock.xl.negro.includes('-') || form.stock.xl.negro.includes('+') || form.stock.xl.negro.includes('e')) errors.stock = "Should be a positive integer";
if (isNaN(form.stock.xl.gris) || form.stock.xl.gris.includes('-') || form.stock.xl.gris.includes('+') || form.stock.xl.gris.includes('e')) errors.stock = "Should be a positive integer";

  if((form.stock.s.blanco + form.stock.s.negro + form.stock.s.gris + form.stock.m.blanco + form.stock.m.negro + form.stock.m.gris + form.stock.l.blanco + form.stock.l.negro + form.stock.l.gris + form.stock.xl.blanco + form.stock.xl.negro + form.stock.xl.gris) < 1) errors.stock = "You must enter at least one value in the stock input fields."

  return errors;
};


export default validation;


// const validation = (form) => {
//   console.log(form);
//   let errors = {};
//   if (!form.name) errors.name = "Write a name";
//   else if (form.name.length < 3) errors.name = "Write at least 3 letters";
//   else if (form.name.length > 50) errors.name = "Write up to 50 letters";

//   const {principal, secundaria} = form.image;
//   if(principal === "") errors.image = "Image Principal and is required";
//   if(secundaria === "") errors.image = "Image Principal and is required";
  
//   if (!form.price) errors.price = "Insert a price";
//   if (form.price < 100 || form.price > 100000)
//     errors.price = "The price must be between 100 and 10000";
//   if (isNaN(form.price)) errors.price = "Should be number";

//   if(form.principal === "") errors.image = "Image is required";
//   if(form.secundaria === "") errors.image = "Image is required";

//   if (!form.description) errors.description = "You must write a description";
//   else if (form.description.lenght < 10 || form.description.lenght > 400)
//     errors.description = "The description must have between 10 and 400 caracters";

//   if (!form.brand) errors.brand = "Write a brand";
//   else if (form.brand.lenght < 3 || form.brand.lenght > 20)
//     errors.brand = "The brand name must have between 3 and 20 caracters";

//   if (form.stock.s.blanco < 0) errors.stock = 'The value cannot be negative.'
//   if (form.stock.s.negro < 0) errors.stock = 'The value cannot be negative.'
//   if (form.stock.s.gris < 0) errors.stock = 'The value cannot be negative.'

//   if (form.stock.m.blanco < 0) errors.stock = 'The value cannot be negative.'
//   if (form.stock.m.negro < 0) errors.stock = 'The value cannot be negative.'
//   if (form.stock.m.gris < 0) errors.stock = 'The value cannot be negative.'

//   if (form.stock.l.blanco < 0) errors.stock = 'The value cannot be negative.'
//   if (form.stock.l.negro < 0) errors.stock = 'The value cannot be negative.'
//   if (form.stock.l.gris < 0) errors.stock = 'The value cannot be negative.'

//   if (form.stock.xl.blanco < 0) errors.stock = 'The value cannot be negative.'
//   if (form.stock.xl.negro < 0) errors.stock = 'The value cannot be negative.'
//   if (form.stock.xl.gris < 0) errors.stock = 'The value cannot be negative.'


// if (isNaN(form.stock.s.blanco) || form.stock.s.blanco.includes('-') || form.stock.s.blanco.includes('+') || form.stock.s.blanco.includes('e')) errors.stock = "Should be a positive integer";
// if (isNaN(form.stock.s.negro) || form.stock.s.negro.includes('-') || form.stock.s.negro.includes('+') || form.stock.s.negro.includes('e')) errors.stock = "Should be a positive integer";
// if (isNaN(form.stock.s.gris) || form.stock.s.gris.includes('-') || form.stock.s.gris.includes('+') || form.stock.s.gris.includes('e')) errors.stock = "Should be a positive integer";

// if (isNaN(form.stock.m.blanco) || form.stock.m.blanco.includes('-') || form.stock.m.blanco.includes('+') || form.stock.m.blanco.includes('e')) errors.stock = "Should be a positive integer";
// if (isNaN(form.stock.m.negro) || form.stock.m.negro.includes('-') || form.stock.m.negro.includes('+') || form.stock.m.negro.includes('e')) errors.stock = "Should be a positive integer";
// if (isNaN(form.stock.m.gris) || form.stock.m.gris.includes('-') || form.stock.m.gris.includes('+') || form.stock.m.gris.includes('e')) errors.stock = "Should be a positive integer";

// if (isNaN(form.stock.l.blanco) || form.stock.l.blanco.includes('-') || form.stock.l.blanco.includes('+') || form.stock.l.blanco.includes('e')) errors.stock = "Should be a positive integer";
// if (isNaN(form.stock.l.negro) || form.stock.l.negro.includes('-') || form.stock.l.negro.includes('+') || form.stock.l.negro.includes('e')) errors.stock = "Should be a positive integer";
// if (isNaN(form.stock.l.gris) || form.stock.l.gris.includes('-') || form.stock.l.gris.includes('+') || form.stock.l.gris.includes('e')) errors.stock = "Should be a positive integer";

// if (isNaN(form.stock.xl.blanco) || form.stock.xl.blanco.includes('-') || form.stock.xl.blanco.includes('+') || form.stock.xl.blanco.includes('e')) errors.stock = "Should be a positive integer";
// if (isNaN(form.stock.xl.negro) || form.stock.xl.negro.includes('-') || form.stock.xl.negro.includes('+') || form.stock.xl.negro.includes('e')) errors.stock = "Should be a positive integer";
// if (isNaN(form.stock.xl.gris) || form.stock.xl.gris.includes('-') || form.stock.xl.gris.includes('+') || form.stock.xl.gris.includes('e')) errors.stock = "Should be a positive integer";

//   if((form.stock.s.blanco + form.stock.s.negro + form.stock.s.gris + form.stock.m.blanco + form.stock.m.negro + form.stock.m.gris + form.stock.l.blanco + form.stock.l.negro + form.stock.l.gris + form.stock.xl.blanco + form.stock.xl.negro + form.stock.xl.gris) < 1) errors.stock = "You must enter at least one value in the stock input fields."
  
//   return errors;
// };


// export default validation;

// const validation = (form) => {
//   console.log(form);
//   let errors = {};
//   if (!form.name) errors.name = "Write a name";
//   else if (form.name.length < 3) errors.name = "Write at least 3 letters";
//   else if (form.name.length > 50) errors.name = "Write up to 50 letters";

//   const {principal, secundaria} = form.image;
//   if(principal === "" || secundaria === "") errors.image = "Image Principal is required";

//   if (!form.price) errors.price = "Insert a price";
//   else if (form.price < 100 || form.price > 100000)
//     errors.price = "The price must be between 100 and 10000";
//   else if (isNaN(form.price)) errors.price = "Should be number";

//   if(form.principal === "") errors.image = "Image is required";
//   if(form.secundaria === "") errors.image = "Image is required";

//   if (!form.description) errors.description = "You must write a description";
//   else if (form.description.lenght < 10 || form.description.lenght > 400)
//     errors.description = "The description must have between 10 and 400 caracters";

//   if (!form.brand) errors.brand = "Write a brand";
//   else if (form.brand.lenght < 3 || form.brand.lenght > 20)
//     errors.brand = "The brand name must have between 3 and 20 caracters";


//   // if(form.stock.s.blanco < 1 && form.stock.s.negro < 1 || form.stock.s.gris < 1) errors.stock = "The stock cannot be 0";
   
//   // if((form.stock.s.blanco + form.stock.s.negro + form.stock.s.gris) +
//   // (form.stock.m.blanco + form.stock.m.negro + form.stock.m.gris) +
//   // (form.stock.l.blanco + form.stock.l.negro + form.stock.l.gris) + 
//   // (form.stock.xl.blanco + form.stock.xl.negro + form.stock.xl.gris)
//   // < 0) errors.stock = "The stock cannot be 0"

//   return errors;
// };


// export default validation;
