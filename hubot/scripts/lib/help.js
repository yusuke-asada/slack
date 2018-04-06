module.exports = function(msg) {

	var Con = require('./constants');
	var con = new Con();

	con.fs.readFile('/work/Git/slack/hubot/scripts/lib/README.txt', 'utf8', function(err, text) {

		if(err) {

			msg.send('ヘルプの出力でエラーが発生しました。');
			return;
		}
		msg.send(text);
	});
};
