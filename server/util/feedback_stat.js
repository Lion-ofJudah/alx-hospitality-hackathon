export const feedbackStat = (feedbacks) => {
  console.log(feedbacks);
  var foodPositive = 0;
  var foodNegative = 0;
  var spaPositive = 0;
  var spaNegative = 0;
  var activityPositive = 0;
  var activityNegative = 0;
  var waterPositive = 0;
  var waterNegative = 0;
  var gainPositive = 0;
  var gainNegative = 0;
  var roomPositive = 0;
  var roomNegative = 0;
  var transportPositive = 0;
  var transportNegative = 0;
  feedbacks.forEach((feedback) => {
    console.log(feedback);
    if (feedback.positive > feedback.negative) {
      switch (feedback.service) {
        case "food":
          foodPositive++;
          break;
        case "water":
          waterPositive++;
          break;
        case "transport":
          transportPositive++;
          break;
        case "activity":
          activityPositive++;
          break;
        case "gain":
          gainPositive++;
          break;
        case "room":
          roomPositive++;
          break;
        case "spa":
          spaPositive++;
          break;
      }
    } else {
      switch (feedback.service) {
        case "food":
          foodNegative++;
          break;
        case "water":
          waterNegative++;
          break;
        case "transport":
          transportNegative++;
          break;
        case "activity":
          activityNegative++;
          break;
        case "gain":
          gainNegative++;
          break;
        case "room":
          roomNegative++;
          break;
        case "spa":
          spaNegative++;
          break;
      }
    }
  });
  return {
    water: { positive: waterPositive, negative: waterNegative },
    food: {
      positive: foodPositive,
      negative: foodNegative,
    },
    spa: {
      positive: spaPositive,
      negative: spaNegative,
    },
    activity: {
      positive: activityPositive,
      negative: activityNegative,
    },
    gain: {
      positive: gainPositive,
      negative: gainNegative,
    },
    room: {
      positive: roomPositive,
      negative: roomNegative,
    },
    transport: {
      positive: transportPositive,
      negative: transportNegative,
    },
  };
};
