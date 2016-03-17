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

  robot.respond(/count/i, function(response){
    var count = robot.brain.get('count');
    count++;
    robot.brain.set({count:count});
    response.send('new count = ' + count);
  });

  robot.respond(/mark my word/i, function(response){
    robot.brain.set({word:'5566forthewin'});
    response.send('5566forthewin');
  });
}
