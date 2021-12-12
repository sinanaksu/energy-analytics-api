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
  };

  res.json(data);
};

exports.heatmap = async (req, res) => {
  const now = new Date();
  const day7 = new Date();
  day7.setDate(day7.getDate() - 6);
  var daysOfYear = [];
  for (const d = day7; d <= now; d.setDate(d.getDate() + 1)) {
    for (var h = 0; h < 24; h++) {
      var kw = 0;
      if (h <= 8) {
        kw = _.random(200, 230);
      }
      if (h > 8 && h <= 10) {
        kw = _.random(230, 280);
      }
      if (h > 10 && h <= 12) {
        kw = _.random(280, 300);
      }
      if (h > 12 && h <= 14) {
        kw = _.random(300, 320);
      }
      if (h > 14 && h <= 16) {
        kw = _.random(320, 340);
      }
      if (h > 16 && h <= 18) {
        kw = _.random(320, 300);
      }
      if (h > 18 && h <= 20) {
        kw = _.random(230, 280);
      }
      if (h > 20) {
        kw = _.random(200, 230);
      }
      daysOfYear.push([
        d.getFullYear() + "-" + (d.getUTCMonth() + 1) + "-" + d.getDate(),
        h,
        kw,
      ]);
    }
  }
  res.json(daysOfYear);
};
