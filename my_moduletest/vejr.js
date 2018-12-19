
function GetWeather(req, res){
    request({
      method: 'GET',
      uri: 'https://vejr.eu/api.php?location=Copenhagen&degree=C ',
      headers: {'Authorization': 'Bearer ' + 'TOKEN HERE'}
    }, function (error, response, body){
      if(!error && response.statusCode == 200){
        res.json(body);
      }
    })
  })

    exports.GetWeather = GetWeather;