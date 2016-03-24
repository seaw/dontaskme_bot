module.exports = function (robot) {
  var serviceKey = 'pomodoro';

  robot.respond(/:tomato:/i, function (response) {
    var userName = response.message.user.name;
    var tomatoData = robot.brain.get(serviceKey);
    if (!tomatoData || !tomatoData[userName] || tomatoData[userName].count === 0) {
      var data = {};
      data[userName] = {count: 0};
      robot.brain.set(serviceKey, data);
      response.reply('you don`t hv any :tomato: so far');
    }else{
      var tomatoCount = tomatoData[userName].count || 0;
      response.reply('your :tomato: is ' + tomatoCount + ' now ');
    }
  });

  robot.respond(/did (.*)/i, function (response) {
    var userName = response.message.user.name;
    var tomatoData = robot.brain.get(serviceKey);
    if (!tomatoData || !tomatoData[userName]) {
      var data = {};
      data[userName] = {count: 0};
      robot.brain.set(serviceKey, data);
    }
    var tomatoCount = tomatoData[userName].count;
    var itemName = response.match[1];
    var newTomato = 0;
    switch (itemName) {
      case 'gym':
        newTomato = 3;
        break;
      default:
    }
    tomatoCount = tomatoCount + newTomato;
    if (newTomato === 0) {
      response.send('not in list sorry!');
    } else {
      tomatoData[userName].count = tomatoCount;
      robot.brain.set(serviceKey, tomatoData);
      response.reply('Your :tomato: is ' + tomatoCount + ' now ');
    }
  });
}
