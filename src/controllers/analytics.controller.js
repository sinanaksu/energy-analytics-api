var _ = require("lodash");

exports.usage = async (req, res) => {
        var now = new Date();
        var daysOfYear = [];
        for (var d = new Date(2021, 1, 1); d <= now; d.setDate(d.getDate() + 1)) {
            const day = new Date(d)
            daysOfYear.push(day.toLocaleDateString("en-US") + ',' + _.random(100, 999));
        }

        const data = {
            day: {
                "mw" : _.random(100, 999),
                "hz" : _.random(49, 51),
                "volt" : _.random(360, 380),
                "amper" : _.random(0.29, 0.35).toFixed(2)
            },
            days: daysOfYear

        }

        res.json(data);
  };