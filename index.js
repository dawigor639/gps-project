const axios = require('axios');

const getData = async () => {
    try {
        const resp = await axios.get("https://gpsproject.pl/coordinates");
        return resp.data;
    } catch (err) {
        console.error(err);
    }
};

const postData = async () => {
    try {
        const resp = await axios.post("https://gpsproject.pl/coordinates");
        return resp.data;
    } catch (err) {
        console.error(err);
    }
};

//interval (ms)
var interval = 15000;
var params = {lat: 49.80404, lng: 9.96233};

//function that changes coordinates 
function changeCoordinate(latitude,longitude,timeStamp,shift) {
    const json = {"position": {"latitude":latitude+shift,"longitude":longitude+shift},"timeStamp":timeStamp};
    return json;
}

//cyclic function 
function intervalFunc(shift) {
    //generating coordinate (adding to third position after coma)
    console.log(changeCoordinate(params.lat,params.lng,Date.now(),shift)); 
    params.lat+=shift;
    params.lng+=shift;
     }

//calling async getData and time printing
//getData().then(resp => {console.log("Response: "+JSON.stringify(resp)); console.log("Time: " + Date.now());  });
postData().then(resp => {console.log("Response: "+JSON.stringify(resp)); console.log("Time: " + Date.now());  });
//calling cyclic function
setInterval(intervalFunc,interval,0.003);