interface Mission {
    galaxy: string;
    mission: number; // 1, 2, 3 for stars
}

export interface Challenge {
    name: string;
    raId: number;
    isWorld?: number | string;
    missions: Mission[],
    requiredMins: number;
    requiredSecs: number;
}

export const challenges: Challenge[] = [
    /// IL Speedruns
    {
        name: "Rapid Digger",
        raId: 562036,
        missions: [{
            galaxy: "Spin-Dig Galaxy",
            mission: 2
        }],
        requiredMins: 2,
        requiredSecs: 0
    },
    {
        name: "Quick Rise to the Top",
        raId: 562052,
        missions: [{
            galaxy: "Cosmic Cove Galaxy",
            mission: 1
        }],
        requiredMins: 1,
        requiredSecs: 20
    },
    {
        name: "Dizzy, but Tumbling Directly to the Goal",
        raId: 562747,
        missions: [{
            galaxy: "Upside Dizzy Galaxy",
            mission: 1
        }],
        requiredMins: 1,
        requiredSecs: 15
    },
    {
        name: "Desert Rush",
        raId: 562756,
        missions: [{
            galaxy: "Tall Trunk Galaxy",
            mission: 2
        }],
        requiredMins: 0,
        requiredSecs: 40,
    },
    {
        name: "Clones Can't Catch Up",
        raId: 562773,
        missions: [{
            galaxy: "Flip-Out Galaxy",
            mission: 2
        }],
        requiredMins: 1,
        requiredSecs: 45
    },
    /// World Speedruns
    // World 1
    {
        name: "The Speedstar Begins",
        raId: 561987,
        isWorld: 1,
        missions: [{
            galaxy: "Sky Station Galaxy",
            mission: 1
        }, {
            galaxy: "Yoshi Star Galaxy",
            mission: 1
        }, {
            galaxy: "Spin-Dig Galaxy",
            mission: 1
        }, {
            galaxy: "Fluffy Bluff Galaxy",
            mission: 1,
        }, {
            galaxy: "Flip-Swap Galaxy",
            mission: 1,
        },  {
            galaxy: "Rightside Down Galaxy",
            mission: 1
        }],
        requiredMins: 12,
        requiredSecs: 0
    },
    // World 2
    {
        name: "Speedstar Shooting Through",
        raId: 561988,
        isWorld: 2,
        missions: [{
            galaxy: "Puzzle Plank Galaxy",
            mission: 1
        }, {
            galaxy: "Hightail Falls Galaxy",
            mission: 1
        }, {
            galaxy: "Boulder Bowl Galaxy",
            mission: 1
        }, {
            galaxy: "Cosmic Cove Galaxy",
            mission: 1
        }, {
            galaxy: "Wild Glide Galaxy",
            mission: 1
        }, {
            galaxy: "Honeybloom Galaxy",
            mission: 1
        }],
        requiredMins: 12,
        requiredSecs: 0
    },
    // World 3
    {
        name: "The Speedstar Reaches Far",
        raId: 561989,
        isWorld: 3,
        missions: [{
            galaxy: "Tall Trunk Galaxy",
            mission: 1
        }, {
            galaxy: "Cloudy Court Galaxy",
            mission: 1
        }, {
            galaxy: "Haunty Halls Galaxy",
            mission: 1
        }, {
            galaxy: "Freezy Flake Galaxy",
            mission: 1
        }, {
            galaxy: "Rolling Masterpiece Galaxy",
            mission: 1
        }, {
            galaxy: "Beat Block Galaxy",
            mission: 1
        }],
        requiredMins: 10,
        requiredSecs: 0
    },
    // World 4
    {
        name: "Cosmic Speedstar",
        raId: 561990,
        isWorld: 4,
        missions: [{
            galaxy: "Supermassive Galaxy",
            mission: 1
        }, {
            galaxy: "Flipsville Galaxy",
            mission: 1
        }, {
            galaxy: "Starshine Beach Galaxy",
            mission: 1
        }, {
            galaxy: "Chompworks Galaxy",
            mission: 1
        }, {
            galaxy: "Sweet Mystery Galaxy",
            mission: 1
        }, {
            galaxy: "Honeyhop Galaxy",
            mission: 1
        }],
        requiredMins: 13,
        requiredSecs: 0
    },
    // World 5
    {
        name: "Easy Trials for the Speedstar",
        raId: 561991,
        isWorld: 5,
        missions: [{
            galaxy: "Space Storm Galaxy",
            mission: 1
        }, {
            galaxy: "Slipsand Galaxy",
            mission: 1
        }, {
            galaxy: "Shiverburn Galaxy",
            mission: 1
        }, {
            galaxy: "Boo Moon Galaxy",
            mission: 1
        }, {
            galaxy: "Upside Dizzy Galaxy",
            mission: 1
        }, {
            galaxy: "Fleet Glide Galaxy",
            mission: 1
        }],
        requiredMins: 13,
        requiredSecs: 0
    },
    // World 6
    {
        name: "Speedstar with Eyes on the Prize",
        raId: 561992,
        isWorld: 6,
        missions: [{
            galaxy: "Melty Monster Galaxy",
            mission: 1
        }, {
            galaxy: "Clockwork Ruins Galaxy",
            mission: 1
        }, {
            galaxy: "Throwback Galaxy",
            mission: 1
        }, {
            galaxy: "Battle Belt Galaxy",
            mission: 1
        }, {
            galaxy: "Flash Black Galaxy",
            mission: 1
        }, {
            galaxy: "Slimy Spring Galaxy",
            mission: 1
        }],
        requiredMins: 14,
        requiredSecs: 0
    },
    // World S
    {
        name: "A Final Challenge for the Speedstar",
        raId: 561993,
        isWorld: "S",
        missions: [{
            galaxy: "Mario Squared Galaxy",
            mission: 1
        }, {
            galaxy: "Rolling Coaster Galaxy",
            mission: 1
        }, {
            galaxy: "Twisty Trials Galaxy",
            mission: 1
        }, {
            galaxy: "Stone Cyclone Galaxy",
            mission: 1
        }, {
            galaxy: "Boss Blitz Galaxy",
            mission: 1
        }, {
            galaxy: "Flip-Out Galaxy",
            mission: 1
        }],
        requiredMins: 11,
        requiredSecs: 0
    }
]
