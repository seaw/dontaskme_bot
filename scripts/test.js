module.exports = function(robot){
  robot.respond(/check (.*)/, function(response){
    var content = response.match[1];
    if(content.indexOf('http')<0){
      return response.send('不是一個正確的網址喔，你是不是忘記加 http 呢？');
    }
    robot.http(content).get()(function(err, res, body){
      if(err){
        return response.send(err);
      }
      response.send(res.statusCode+'');
    })
  });
}
