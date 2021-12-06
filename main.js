
function convert(val){
    return (val - 273).toFixed(2)
}

    document.addEventListener('DOMContentLoaded',function(){
    document.querySelector('form').onsubmit=()=>{
        fetch('https://api.openweathermap.org/data/2.5/weather?q='+city.value+'&APPID=bb93d847215cac3fe6f44314feb42030')
        .then(response=>response.json())
        .then(data=>{
           
            var nameval = data['name']
            var descrip = data['weather']['0']['description']
           var icon=data['weather']['0']['icon']
            var tempature = data['main']['temp']
            var hum=data['main']['humidity']
            var wndspd = data['wind']['speed']
           var country=data['sys']['country']
           var parameters = data['weather']['0']['main']

            document.querySelector('#city1').innerHTML=`${nameval},${country}`
            document.querySelector('#temp').innerHTML = `${ convert(tempature)} °C`
            document.querySelector(".icon").src ="https://openweathermap.org/img/wn/" + icon + ".png";
           document.querySelector('#description').innerText = `Conditions: ${descrip}`
            document.querySelector('#humidity').innerHTML=`Humidity: ${hum}%`
            document.querySelector('#wind').innerHTML=`Wind Speed: ${wndspd} km/h`
            
           BackgroundChange(parameters)

        })
     document.querySelector('#city').value='';        //clear out string once submitted
     return false;
        
        
    }
    
});

function getLocation(e) {  //get loc using inbuilt navigation API
    e.preventDefault();
    if (!navigator.geolocation) {
      alert("Browser doesn't support geolocation");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }


  function success(position) {
    latitude = position.coords.latitude,
    longitude = position.coords.longitude;
    console.log(latitude,longitude)
   cityloc(latitude,longitude)
   
  }

  function error() {
    alert('Get current position fail.');
  }
 

  function cityloc(latitude,longitude)
  {
    fetch('http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=bb93d847215cac3fe6f44314feb42030')
    .then(response=>response.json())
    .then(data=>{
        console.log(data['weather']['0']['main'])
        var nameval = data['name']
        var descrip = data['weather']['0']['description']
       var icon=data['weather']['0']['icon']
        var tempature = data['main']['temp']
        var hum=data['main']['humidity']
        var wndspd = data['wind']['speed']
       var country=data['sys']['country']
       var parameters = data['weather']['0']['main']

        document.querySelector('#city1').innerHTML=`${nameval},${country}`
        document.querySelector('#temp').innerHTML = `${ convert(tempature)} °C`
        document.querySelector(".icon").src ="https://openweathermap.org/img/wn/" + icon + ".png";
       document.querySelector('#description').innerText = `Conditions: ${descrip}`
        document.querySelector('#humidity').innerHTML=`Humidity: ${hum}%`
        document.querySelector('#wind').innerHTML=`Wind Speed: ${wndspd} km/h`

        BackgroundChange(parameters)
    })

  }
function BackgroundChange(parameters)
{
  if(parameters == 'Clear')
  {
      document.body.style.backgroundImage="url('./images/clear-sky.jpg')"
  }
  else if(parameters == 'Clouds' )
  {
      document.body.style.backgroundImage="url('./images/broken-clouds.jfif')"
  }
  else if(parameters == 'Rain')
  {
      document.body.style.backgroundImage="url('./images/Rain2.jpg')"
  }
  else if(parameters == 'thunderstorm' )
  {
      document.body.style.backgroundImage="url('./images/thunderstorm.jpg')"
  }
  else if(parameters == 'Haze' || parameters == 'Fog'|| parameters == 'Mist' )
  {
      document.body.style.backgroundImage="url('./images/hazy1.jpg')"
  }
  else if(parameters == 'Snow')
  {
      document.body.style.backgroundImage="url('./images/snow2.jpg')"
  }
  else if(parameters == 'Drizzle')
  {
      document.body.style.backgroundImage="url('./images/drizzle4.jpg')"
  }
   else if(parameters == 'Smoke')
  {
      document.body.style.backgroundImage="url('./images/smoke.jpg')"
  }
}
