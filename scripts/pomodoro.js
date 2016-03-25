"use strict"
var Conversation = require('hubot-conversation');
var serviceKey = 'pomodoro';
var fs = require('fs');
var isBrainLoad = false;

module.exports = function (robot) {
  var switchBoard = new Conversation(robot);

  robot.respond(/backup :tomato:/i, function (response) {
    checkBrain(robot);
    backupData(robot);
    console.log('backup');
  });

  robot.respond(/:tomato:/i, function (response) {
    checkBrain(robot);
    var userName = response.message.user.name;
    var count = getBrainCount(robot, userName);
    if (count === 0) {
      response.reply('you don`t hv any :tomato: so far');
    } else {
      response.reply('your :tomato: is ' + count + ' now ');
    }
  });

  robot.respond(/did (.*)/i, function (response) {
    checkBrain(robot);
    var userName = response.message.user.name;
    var tomatoCount = getBrainCount(robot, userName);
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
      updateBrain(robot, userName, tomatoCount)
      response.reply('Your :tomato: is ' + tomatoCount + ' now ');
    }
  });

  robot.respond(/add :tomato:/, function (msg) {
    var dialog = switchBoard.startDialog(msg);
    msg.reply('Sure, What is the item name?');
    dialog.addChoice(/(.*)/i, function (msg2) {
      var itemName = msg2.match[1];
      msg2.reply('OK How many :tomato: to ' + itemName);
      dialog.addChoice(/([0-9]+)/i, function (msg3) {
        var tomatos = parseInt(msg3.match[1], 10);
        msg2.reply('So ' + itemName + '= :tomato: X ' + tomatos + '! Right?');
        dialog.addChoice(/yes/i, function (msg4) {
          msg4.reply('OK !! will save it ');
        });
        dialog.addChoice(/no/i, function (msg5) {
          msg5.reply('OK !! will leave it! Bye ');
        });
      });

    });


  });
}


function updateBrain(robot, userName, count) {
  var sourceData = robot.brain.get(serviceKey);
  if (sourceData === null) {
    sourceData = {};
  }
  sourceData[userName] = {count: count};

  console.log(JSON.stringify(sourceData));
  console.log('before:' + userName + ' update \n' + JSON.stringify(robot.brain.get(serviceKey)));
  robot.brain.set(serviceKey, sourceData);
  console.log('after:' + userName + ' update \n' + JSON.stringify(robot.brain.get(serviceKey)));

  backupData(robot);
}

function getBrainCount(robot, userName) {
  console.log('' + userName + ' GET count \n' + JSON.stringify(robot.brain.get(serviceKey)));
  var tomatoData = robot.brain.get(serviceKey);
  if (!tomatoData || !tomatoData[userName]) {
    return 0;
  }
  return tomatoData[userName].count;
}

function checkBrain(robot) {
  if (!isBrainLoad) {
    var content = fs.readFileSync(process.env.BRAIN_BACKUP);
    console.log(JSON.parse(content));
    robot.brain.set(serviceKey, JSON.parse(content));
    isBrainLoad = true;
  }
}

function backupData(robot) {
  var tomatoData = robot.brain.get(serviceKey);
  fs.writeFile(process.env.BRAIN_BACKUP, JSON.stringify(tomatoData), function (err) {
    if (err) return console.log(err);
    console.log('backuped');
  });
}
