
function descr(aqi){
  if(aqi==1)
  {
     document.querySelector('#des').innerHTML=`Description: Good`
     document.body.style.backgroundImage='linear-gradient(to bottom right, rgb(152, 251, 152), yellow)';
}
  else if(aqi==2)
  {
     document.querySelector('#des').innerHTML=`Description: Fair`
     document.body.style.backgroundImage='linear-gradient(to bottom right, rgb(60, 179, 113), yellow)';
  }
  else if(aqi==3)
  {
     document.querySelector('#des').innerHTML=`Description: Moderate`
     document.body.style.backgroundImage='linear-gradient(to bottom right, rgb(46, 139, 87), yellow)';
  }
  else if(aqi==4)
  {
     document.querySelector('#des').innerHTML=`Description: Poor`
     document.body.style.backgroundImage='linear-gradient(to bottom right, rgb(255, 140, 0), yellow)';
  }
  else if(aqi==5)
  {
     document.querySelector('#des').innerHTML=`Description: Very Poor`
     document.body.style.backgroundImage='linear-gradient(to bottom right, rgb(255, 69, 0), yellow)';
  }
}

function getLocation(e) {  //get loc using inbuilt navigation API
  e.preventDefault();
  if (!navigator.geolocation) {
    alert("Browser doesn't support geolocation");
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}
function geo(e){ //get lat and lan using geocoding api
  e.preventDefault();
  const city=document.querySelector('#city')
  fetch('http://api.openweathermap.org/geo/1.0/direct?q='+city.value+'&appid=bb93d847215cac3fe6f44314feb42030')
  .then(response=>response.json())
  .then(data=>{
    var name1= data[0]['name']
    var country=data[0]['country']
     lat=data[0]['lat']
     lon=data[0]['lon']
    cityloc(lat,lon)

    document.querySelector('#city1').innerHTML=`${name1},${country}`
  })
  
}
function cityloc(latitude,longitude){ //use that data to fetch aqi
  fetch('http://api.openweathermap.org/data/2.5/air_pollution?lat='+latitude+'&lon='+longitude+'&appid=bb93d847215cac3fe6f44314feb42030')
  .then(response=>response.json())
  .then(data=>{
    console.log(data['list'][0]['components']['pm2_5']);
       var aq=data['list'][0]['main']['aqi']
       var pm=data['list'][0]['components']['pm2_5']
        var co=data['list'][0]['components']['co']
        var so2=data['list'][0]['components']['so2']
        var no=data['list'][0]['components']['no']
       document.querySelector('#aqi').innerHTML=`AQI: ${aq}`
       document.querySelector('#comp').innerHTML =`pm 2.5: ${pm}`
       descr(aq)
       document.querySelector('#co').innerHTML =`CO: ${co}μg/m3`
       document.querySelector('#so2').innerHTML =`SO2: ${so2}μg/m3`
       document.querySelector('#no').innerHTML =`NO: ${no}μg/m3`
         
      })
      document.querySelector('#city').value='';        //clear out string once submitted
     
}
function success(position) {
      latitude = position.coords.latitude,
      longitude = position.coords.longitude;
     cityloc(latitude,longitude)
     getCity(latitude,longitude)
  }

    function error() {
      alert('Get current position fail.');
    }
   
    function getCity(latitude,longitude)
    {
      fetch('http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=bb93d847215cac3fe6f44314feb42030')
    .then(response=>response.json())
    .then(data=>{
      var nameval = data['name']
      var country=data['sys']['country']
      document.querySelector('#city1').innerHTML=`${nameval},${country}`
    })
    }

