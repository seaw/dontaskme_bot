module.exports = function(robot){
  var who_talk_to_me = [];
  robot.hear(/hi/, function(response){
    response.send('你好我是 Tars 塔斯！');
    if (!who_talk_to_me.indexOf(response.message.user.name) > -1){
      who_talk_to_me.push(response.message.user.name);
    }
  });

  robot.hear(/where is the money?/, function(response){
    response.send('give me my fucking money!!');
    if (!who_talk_to_me.indexOf(response.message.user.name) > -1){
      who_talk_to_me.push(response.message.user.name);
    }
  });

  robot.respond(/who am i/, function(response){
    var sender = response.message.user.name;
    response.send('i dont know? ' + sender + ' ?! am i right??');
    if (!who_talk_to_me.indexOf(response.message.user.name) > -1){
      who_talk_to_me.push(response.message.user.name);
    }
  });

  robot.respond(/who talked to u before/, function(response){
    response.send('orrrr....' + who_talk_to_me.toString());
  });
}

//module.exports = function(robot){
//  robot.respond(/check (.*)/, function(response){
//    var content = response.match[1];
//    if(content.indexOf('http')<0){
//      return response.send('不是一個正確的網址喔，你是不是忘記加 http 呢？');
//    }
//    robot.http(content).get()(function(err, res, body){
//      if(err){
//        return response.send(err);
//      }
//      response.send(res.statusCode+'');
//    })
//  });
//}
