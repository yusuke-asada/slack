module.exports = (robot) ->

	robot.hear /redmine (-l|--list)/, (msg) ->

		List = require("./lib/list")
		list = new List msg

	robot.hear /redmine (-o|--open)/, (msg) ->

		Open = require("./lib/open")
		open = new Open msg

	robot.hear /redmine (-c|--close) [0-9]{3}/, (msg) ->

		Close = require("./lib/close")
		close = new Close msg

	robot.hear /redmine (-u|--update) [0-9]{3}/, (msg) ->

		Update = require("./lib/update")
		update = new Update msg

	robot.hear /redmine (-h|--help)/, (msg) ->

		Help = require("./lib/help")
		help = new Help msg

	robot.hear /redmine (-m|--merged) (MP[0-9]{2}-[0-9]{4}-[0-9]{3}|MS[0-9]{2}-[0-9]{4}-[0-9]{3})/, (msg) ->

		Merged = require("./lib/merged")
		merged = new Merged msg

	robot.hear /redmine (-ml|--mergedlist)/, (msg) ->

		Merged = require("./lib/merged_list")
		merged = new Merged msg

	robot.hear /aoi hello/, (msg) ->

		msg.send('お疲れ様です！今日も一日頑張りましょう！！')

