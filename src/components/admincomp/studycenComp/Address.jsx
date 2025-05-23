// import { Label } from '@/components/ui/label';
// import React, { useEffect, useState } from 'react';
// import { StateSelect, CitySelect } from 'react-country-state-city';
// import "react-country-state-city/dist/react-country-state-city.css";

// const Address = () => {
//     const [currentState, setCurrentState] = useState(null);
//     const [currentCity, setCurrentCity] = useState(null);
//     useEffect(()=>{
//       console.log(currentState);
//     }, [currentState])
//   return (
//     <div className='grid sm:grid-cols-2 gap-2'>
      

//       <div className='w-full space-y-2'>
//         {/* <Label>State</Label> */}
//         <StateSelect
//         countryid={101}
//         containerClassName="form-group"
//         inputClassName=""
//         onChange={(_state) => setCurrentState(_state)}
//         onTextChange={(_txt) => console.log(_txt)}
//         defaultValue={currentState}
//         placeHolder="Select State"
//       />
//       </div>

//       <div className='w-full space-y-2'>
//       {/* <Label>City</Label> */}
//         <CitySelect
//         countryid={101}
//         stateid={currentState?.id}
//         onChange={(_city) => setCurrentCity(_city)}
//         defaultValue={currentCity}
//         placeHolder="Select City"
//       />
//       </div>
//     </div>
//   );
// };

// export default Address;