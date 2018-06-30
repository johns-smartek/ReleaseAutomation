const axios = require("axios");

console.log()
const url =
  "https://api.github.com/repos/johns-smartek/node/pulls";
const getLocation = async url => {
  try {


    const response = await axios.get('');
    // console.log(error);

    axios({
        method: 'post',
        url: '/user/12345',
        // data: {
        //   firstName: 'Fred',
        //   lastName: 'Flintstone'
        // }
      });

    
    // const data = response.data;
    // console.log(
    //   `City: ${data.results[0].formatted_address} -`,
    //   `Latitude: ${data.results[0].geometry.location.lat} -`,
    //   `Longitude: ${data.results[0].geometry.location.lng}`
    // );
  } catch (error) {
    console.log(error);
  }
};

const getBasicAuthenticationHash = (user, pass) => Buffer.from(`Basic ${user}:${pass}`).toString('base64');


getLocation(url);