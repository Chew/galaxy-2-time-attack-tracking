export interface Galaxy {
  name: string;
  normalStars: number;
  greenStars: number;
  requiredMins: number;
  requiredSecs: number;
}

export interface GalaxyState extends Galaxy {
  required: number;
  times: {
    [k: string]: string;
  };
}

export const galaxiesData: Galaxy[] = [
    // WORLD 1
  { name: "Sky Station Galaxy", normalStars: 3, greenStars: 3, requiredMins: 5, requiredSecs: 20 },
  { name: "Yoshi Star Galaxy", normalStars: 3, greenStars: 3, requiredMins: 5, requiredSecs: 0 },
  { name: "Spin-Dig Galaxy", normalStars: 3, greenStars: 3, requiredMins: 6, requiredSecs: 30 },
  { name: "Fluffy Bluff Galaxy", normalStars: 3, greenStars: 3, requiredMins: 4, requiredSecs: 50 },
  { name: "Flip-Swap Galaxy", normalStars: 2, greenStars: 2, requiredMins: 2, requiredSecs: 15 },
  { name: "Rightside Down Galaxy", normalStars: 2, greenStars: 2, requiredMins: 4, requiredSecs: 20 },
  { name: "Bowser Jr.'s Fiery Flotilla", normalStars: 2, greenStars: 2, requiredMins: 2, requiredSecs: 50 },
    // WORLD 2
  { name: "Puzzle Plank Galaxy", normalStars: 3, greenStars: 3, requiredMins: 4, requiredSecs: 30 },
  { name: "Hightail Falls Galaxy", normalStars: 3, greenStars: 3, requiredMins: 6, requiredSecs: 30 },
  { name: "Boulder Bowl Galaxy", normalStars: 3, greenStars: 3, requiredMins: 4, requiredSecs: 0 },
  { name: "Cosmic Cove Galaxy", normalStars: 3, greenStars: 3, requiredMins: 9, requiredSecs: 30 },
  { name: "Wild Glide Galaxy", normalStars: 2, greenStars: 2, requiredMins: 4, requiredSecs: 50 },
  { name: "Honeybloom Galaxy", normalStars: 2, greenStars: 2, requiredMins: 4, requiredSecs: 20 },
  { name: "Bowser's Lava Lair", normalStars: 2, greenStars: 2, requiredMins: 6, requiredSecs: 45 },
    // WORLD 3
  { name: "Tall Trunk Galaxy", normalStars: 3, greenStars: 3, requiredMins: 6, requiredSecs: 40 },
  { name: "Cloudy Court Galaxy", normalStars: 3, greenStars: 3, requiredMins: 4, requiredSecs: 30 },
  { name: "Haunty Halls Galaxy", normalStars: 3, greenStars: 3, requiredMins: 4, requiredSecs: 0 },
  { name: "Freezy Flake Galaxy", normalStars: 3, greenStars: 3, requiredMins: 6, requiredSecs: 20 },
  { name: "Rolling Masterpiece Galaxy", normalStars: 2, greenStars: 2, requiredMins: 5, requiredSecs: 10 },
  { name: "Beat Block Galaxy", normalStars: 2, greenStars: 2, requiredMins: 2, requiredSecs: 0 },
  { name: "Bowser Jr.'s Fearsome Fleet", normalStars: 2, greenStars: 2, requiredMins: 4, requiredSecs: 0 },
    // WORLD 4
  { name: "Supermassive Galaxy", normalStars: 3, greenStars: 3, requiredMins: 5, requiredSecs: 15 },
  { name: "Flipsville Galaxy", normalStars: 3, greenStars: 3, requiredMins: 4, requiredSecs: 30 },
  { name: "Starshine Beach Galaxy", normalStars: 3, greenStars: 3, requiredMins: 5, requiredSecs: 0 },
  { name: "Chompworks Galaxy", normalStars: 3, greenStars: 3, requiredMins: 5, requiredSecs: 20 },
  { name: "Sweet Mystery Galaxy", normalStars: 2, greenStars: 2, requiredMins: 2, requiredSecs: 10 },
  { name: "Honeyhop Galaxy", normalStars: 2, greenStars: 2, requiredMins: 5, requiredSecs: 30 },
  { name: "Bowser's Gravity Gauntlet", normalStars: 2, greenStars: 2, requiredMins: 4, requiredSecs: 30 },
    // WORLD 5
  { name: "Space Storm Galaxy", normalStars: 3, greenStars: 3, requiredMins: 4, requiredSecs: 0 },
  { name: "Slipsand Galaxy", normalStars: 3, greenStars: 3, requiredMins: 9, requiredSecs: 20 },
  { name: "Shiverburn Galaxy", normalStars: 3, greenStars: 3, requiredMins: 5, requiredSecs: 20 },
  { name: "Boo Moon Galaxy", normalStars: 3, greenStars: 3, requiredMins: 7, requiredSecs: 15 },
  { name: "Upside Dizzy Galaxy", normalStars: 2, greenStars: 2, requiredMins: 2, requiredSecs: 20 },
  { name: "Fleet Glide Galaxy", normalStars: 2, greenStars: 2, requiredMins: 4, requiredSecs: 0 },
  { name: "Bowser Jr.'s Boom Bunker", normalStars: 2, greenStars: 2, requiredMins: 4, requiredSecs: 50 },
    // WORLD 6
  { name: "Melty Monster Galaxy", normalStars: 3, greenStars: 3, requiredMins: 5, requiredSecs: 25 },
  { name: "Clockwork Ruins Galaxy", normalStars: 3, greenStars: 3, requiredMins: 6, requiredSecs: 0 },
  { name: "Throwback Galaxy", normalStars: 3, greenStars: 3, requiredMins: 3, requiredSecs: 55 },
  { name: "Battle Belt Galaxy", normalStars: 3, greenStars: 3, requiredMins: 11, requiredSecs: 0 },
  { name: "Flash Black Galaxy", normalStars: 2, greenStars: 2, requiredMins: 3, requiredSecs: 10 },
  { name: "Slimy Spring Galaxy", normalStars: 2, greenStars: 2, requiredMins: 7, requiredSecs: 30 },
  { name: "Bowser's Galaxy Generator", normalStars: 2, greenStars: 2, requiredMins: 9, requiredSecs: 15 },
    // WORLD S
  { name: "Mario Squared Galaxy", normalStars: 2, greenStars: 2, requiredMins: 2, requiredSecs: 5 },
  { name: "Rolling Coaster Galaxy", normalStars: 2, greenStars: 2, requiredMins: 4, requiredSecs: 10 },
  { name: "Twisty Trials Galaxy", normalStars: 2, greenStars: 2, requiredMins: 2, requiredSecs: 5 },
  { name: "Stone Cyclone Galaxy", normalStars: 2, greenStars: 2, requiredMins: 1, requiredSecs: 20 },
  { name: "Boss Blitz Galaxy", normalStars: 2, greenStars: 2, requiredMins: 10, requiredSecs: 30 },
  { name: "Flip-Out Galaxy", normalStars: 2, greenStars: 2, requiredMins: 3, requiredSecs: 45 },
  { name: "Grandmaster Galaxy", normalStars: 2, greenStars: 0, requiredMins: 5, requiredSecs: 20 },
];

// legacy
export const priorNames = {
  "Flip-Switch Galaxy": "Flip-Swap Galaxy",
  "Cloud Flower Galaxy": "Cloudy Court Galaxy",
}
