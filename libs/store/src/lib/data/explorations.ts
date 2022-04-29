import { Exploration } from "../Exploration";

const BASE_MULTIPLIER = 2;
export type ExplorationKey =
  | "E1"
  | "E2"
  | "E3"
  | "E4"
  | "E5"
  | "E6"
  | "E7"
  | "E8"
  | "E9"
  | "E10"
  | "E11"
  | "E12"
  | "E13"
  | "E14"
  | "E15"
  | "E16"
  | "E18"
  | "E19"
  | "E20"
  | "E21"
  | "C1"
  | "C2"
  | "F1"
  | "F2"
  | "F3"
  | "F4"
  | "F5"
  | "F6"
  | "F7"
  | "F8"
  | "F9"
  | "S1"
  | "S2"
  | "S3"
  | "S4"
  | "S5"
  | "S6"
  | "S7"
  | "T1"
  | "T2"
  | "T3"
  | "T4"
  | "T5"
  | "T6"
  | "T7"
  | "G1"
  | "G2";

export const explorations: Exploration[] = [
  {
    key: "E1",
    name: "Explore the area",
    description:
      "My home hasn't changed, but everything past 500 feet is shrouded in dust.",
    message:
      "Something is really messed up with the area around here. Looks like desert haze, but... I can see other places in it?",
    drain: {
      food: 1,
      water: 2,
    },
    train: {
      perception: 1.1,
      endurance: 2,
    },
    time: 400_000,
    timeMultiplier: BASE_MULTIPLIER,
    requirements: {},
  },
  {
    key: "T1",
    name: "Watch haze",
    description:
      "These hazy areas seem random, but maybe if I watch them for long enough, they'll start to make sense.",
    message: `I'm definitely looking at different time periods through these. Some of these go back thousands of years. I'm calling these "time holes" until I think of a better name.`,
    drain: {
      food: 1,
      water: 1,
    },
    train: {
      perception: 2.2,
      patience: 2.1,
    },
    time: 600_000,
    timeMultiplier: BASE_MULTIPLIER,
    requirements: {
      action: "E1",
    },
  },
  {
    key: "T2",
    name: "Watch smaller time holes",
    description:
      "I'm not ready to jump into a time hole, but watching from a distance couldn't hurt, right?",
    message: `Hey! I saw another Barry in one of the holes and called out, and he seemed to notice. It looks like I could influence the past, at least with very short messages. Maybe I'll start with "more water."`,
    drain: {
      food: 1,
      water: 1,
    },
    train: {
      patience: 3,
    },
    time: 800_000,
    timeMultiplier: BASE_MULTIPLIER,
    requirements: {
      action: "T1",
    },
  },
  {
    key: "E2",
    name: "Edge of Property",
    description:
      "I'm going to walk the perimeter of my land to see if there's an opening.",
    message:
      "The way to town seems pretty clear. Strangest thing, though... I swear the sun was in the east when I left, and it's only been an hour.",
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      endurance: 2.5,
    },
    time: 1_000_000,
    timeMultiplier: BASE_MULTIPLIER,
    requirements: {
      action: "T2",
    },
  },
  {
    key: "T3",
    name: "Figure out lost time",
    description:
      "Time passes more slowly when I'm closer to a time hole, which makes the rest of the world move faster. I could find out how close I can get, and tell Past Barry about this.",
    message: `For now, I could safely get time to pass about 5X as fast. That'll be better than watching radishes grow.`,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      perception: 1.9,
    },
    time: 1_000_000,
    timeMultiplier: BASE_MULTIPLIER,
    requirements: {
      action: "E2",
    },
  },
  {
    key: "E3",
    name: "Explore outside home",
    description:
      "Guess it's time to head into what's left of town. This could be a very long trip.",
    message: `No one around. It's pretty dead, but there are a few buildings which could have something worth using.`,
    drain: {
      food: 2,
      water: 2,
    },
    timeMultiplier: BASE_MULTIPLIER,
    train: {
      endurance: 3,
    },
    time: 10_000_000,
    requirements: {
      action: "T3",
    },
  },
  {
    key: "E4",
    name: "Explore school ruins",
    description:
      "There's a school nearby, though there isn't much left of it. This might get me some good info for Past Barry.",
    message: `Hey, there's an old #7291 generator here! I can't believe they still use these. It's not working, but I could fix it if I had the parts.`,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      perception: 2.1,
      endurance: 1.7,
    },
    time: 1_000_000,
    timeMultiplier: BASE_MULTIPLIER,
    requirements: {
      action: "E3",
    },
    removed: "E8",
  },
  {
    key: "F1",
    name: "Look for gas generator parts",
    description:
      "Someone took this generator apart. I'm going to need some M8 bolts and a socket to match.",
    message: `It's reassembled, but still won't start. Maybe there's a troubleshooting guide around here.`,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      perception: 1.5,
      tech: 3,
    },
    time: 1_000_000,
    timeMultiplier: BASE_MULTIPLIER,
    requirements: {
      action: "E4",
    },
    removed: "E8",
  },
  {
    key: "F2",
    name: "Look for instructions",
    description:
      "There's got to be an instruction manual around here somewhere.",
    message: `Hours later, I gave up, and finally found it taped to the bottom of the generator. Someone's laughing right now.`,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      perception: 3.3,
      endurance: 1.5,
    },
    time: 1_000_000,
    timeMultiplier: BASE_MULTIPLIER,
    requirements: {
      action: "F1",
    },
    removed: "E8",
  },
  {
    key: "F3",
    name: "Fix the gas generator",
    description: "This is going to be a lot of trial and error.",
    message: `It's running! The lights are on. Time to see what else powered up. There isn't much that'll run off this.`,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      tech: 2,
      patience: 1,
    },
    time: 1_000_000,
    timeMultiplier: BASE_MULTIPLIER,
    requirements: {
      action: "F2",
    },
    removed: "E8",
  },
  {
    key: "T5",
    name: "Figure out computer",
    description:
      "A computer booted up, but there's no keyboard, mouse, touchscreen... anything? I feel really dumb right now.",
    message: `Turns out it's like focusing on one of those Magic Eye images - just defocus, and the computer takes over. I bet I can use this technique to shove much more information into Past Barry's head.`,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      tech: 2,
      patience: 1,
    },
    time: 1_000_000,
    timeMultiplier: BASE_MULTIPLIER,
    requirements: {
      action: "F3",
    },
    removed: "E8",
  },
  {
    key: "F5",
    name: "Find more useful information",
    description:
      "Now that I can communicate with Past Barry, I should see what else is on here.",
    message: `Here we go. I found a method of compressing food into smaller containers. That should help out with preservation.`,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      tech: 2,
      endurance: 2,
    },
    time: 1_000_000,
    timeMultiplier: BASE_MULTIPLIER,
    requirements: {
      action: "T5",
    },
    removed: "E8",
  },
  {
    key: "E5",
    name: "Explore power plant",
    description:
      "I found the ruins of what looks like a power plant. Maybe I can find something to help out Past Barry.",
    message: ``,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      perception: 2,
      endurance: 2,
    },
    time: 1_000_000,
    timeMultiplier: BASE_MULTIPLIER,
    requirements: {
      action: "E3",
    },
    removed: "E8",
  },
  {
    key: "S2",
    name: "Pry open the door",
    description:
      "The building's in surprisingly good condition... meaning I'll need to break in.",
    message: ``,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      strength: 2,
    },
    time: 1_000_000,
    timeMultiplier: BASE_MULTIPLIER,
    requirements: {
      action: "E5",
    },
    removed: "E8",
  },
  {
    key: "E7",
    name: "Search for a usable generator",
    description:
      "Most of the plant doesn't look functional, but maybe I can find something usable.",
    message: `Found a "Mr Fusion" in pretty good condition. Guess I should feed it?`,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      perception: 2,
    },
    time: 1_000_000,
    timeMultiplier: BASE_MULTIPLIER,
    requirements: {
      action: "S2",
    },
    removed: "E8",
  },
  {
    key: "G1",
    name: "Generate power",
    description:
      "I can generate power by feeding this thing my resources. I'll start with any junk or money I have, since I don't think there's much use for those here.",
    message: `Mr. Fusion just coughed up the last of what I gave it and let off some smoke. I think it's generated its last.`,
    drain: {
      food: 1,
      water: 1,
    },
    train: {
      patience: 2,
    },
    time: 10_000_000,
    timeMultiplier: BASE_MULTIPLIER,
    requirements: {
      action: "E7",
    },
    generates: {
      power: 2,
    },
  },
  {
    key: "E6",
    name: "Explore big time holes",
    description:
      "There are a bunch of bigger time holes near a sewage treatment plant (which thankfully hasn't run for a long time). I might be able to send larger items through these - maybe even travel?",
    message: `There's a really interesting time hole up some stairs, but I'll have to move some wreckage out of the way to get to it.`,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      perception: 2,
      endurance: 2,
    },
    time: 1_000_000,
    timeMultiplier: BASE_MULTIPLIER,
    requirements: {
      action: "E3",
    },
    removed: "E8",
  },
  {
    key: "S1",
    name: "Move wreckage",
    description:
      "Get to the big time hole by moving heavy things. Here we go, Strong Barry.",
    message: `I'm exhausted and never want to lift heavy things again, but I can get to the time hole now.`,
    drain: {
      food: 3,
      water: 4,
    },
    train: {
      strength: 3,
    },
    time: 1_000_000,
    timeMultiplier: BASE_MULTIPLIER,
    requirements: {
      action: "E6",
    },
    removed: "E8",
  },
  {
    key: "T4",
    name: "Convince yourself",
    description:
      "Hey! I saw myself from just a day a ago! This time hole seems to fight me a lot less. I think I could have a conversation with myself.",
    message: `After a lot of arguing with Past Barry, we agreed to jump in and swap places when the time comes. I have no idea what'll happen to him, but that sounds like Future Barry problems, not mine.`,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      patience: 2,
    },
    time: 1_000_000,
    timeMultiplier: BASE_MULTIPLIER,
    requirements: {
      action: "S1",
    },
    removed: "E8",
  },
  {
    key: "E12",
    name: "Search around for anything else",
    description:
      "This is a treatment plant. There should be something useful here for, you know, water.",
    message: `Here we go! One unused carbon nanotube filter. This would have been really useful back in the day. With enough power, I should be able to send this back to Past Barry.`,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      patience: 2,
    },
    time: 1_000_000,
    timeMultiplier: BASE_MULTIPLIER,
    requirements: {
      action: "T4",
    },
    removed: "E8",
  },
  {
    key: "E14",
    name: "Search car lot",
    description:
      "There are hundreds of cars in a lot nearby. Most are wrecks by now, but maybe I can find a working one.",
    message: `There's a promising RIMC coupe left on blocks with decent tires. Windows are smashed, battery's dead, fuel cell's empty. I'm not fixing the windows.`,
    drain: {
      food: 2,
      water: 3,
    },
    train: {
      endurance: 2,
    },
    time: 1_000_000,
    timeMultiplier: BASE_MULTIPLIER,
    requirements: {
      action: "E3",
    },
  },
  {
    key: "E15",
    name: "Replace fuel cell",
    description:
      "Lot of work, but it'll be easier to replace this cell than find a fueling station.",
    message: `Found a half-full cell in a nearby car, and with a lot of effort, got it installed. I just have to deal with that battery now.`,
    drain: {
      food: 2,
      water: 3,
    },
    train: {
      strength: 3,
      tech: 3,
    },
    time: 1_000_000,
    timeMultiplier: BASE_MULTIPLIER,
    requirements: {
      action: "E14",
    },
  },
  {
    key: "E16",
    name: "Start the car",
    description:
      "There's no chance I'll find a live battery here. Best I can do is push it down the nearest hill and hope it starts on the way down.",
    message:
      "I had to push the car a half-mile, but it started before I crashed into a fence! This thing is in rough shape, but I hope it'll make it to the next town.",
    drain: {
      food: 2,
      water: 3,
    },
    train: {
      strength: 2.5,
    },
    time: 2_000_000,
    timeMultiplier: BASE_MULTIPLIER,
    requirements: {
      action: "E15",
    },
  },
  {
    key: "E8",
    name: "Keep moving",
    description:
      "Head out to the light industrial zone. This will be a long drive. If I have anything to do here first, I should do it.",
    message: `Rough trip, but I'm finally glad I lived near a tech hub. Lots of places to explore here.`,
    drain: {
      food: 1,
      water: 1,
    },
    train: {
      tech: 2,
      patience: 1.5,
    },
    timeMultiplier: 15,
    time: 200_000_000,
    requirements: {
      action: "E16",
    },
  },
  {
    key: "E9",
    name: "Explore factory",
    description: "A factory! Factory HAS to mean automation, right?",
    message: ``,
    drain: {
      food: 1,
      water: 1,
    },
    train: {
      perception: 2,
      tech: 1.5,
    },
    timeMultiplier: BASE_MULTIPLIER * 2,
    time: 40_000_000,
    requirements: {
      action: "E8",
    },
  },
  {
    key: "S3",
    name: "Climb to second floor",
    description:
      "There's a room that looks intact on the second floor, but I'll have to pile things up to reach it.",
    message: `There's a whole stockpile of smartphone-looking things, and nearly every battery on every one of these is dead. Maybe one of them is still alive.`,
    drain: {
      food: 1,
      water: 1,
    },
    train: {
      strength: 4,
    },
    timeMultiplier: BASE_MULTIPLIER * 2,
    time: 40_000_000,
    requirements: {
      action: "E9",
    },
  },
  {
    key: "F4",
    name: "Find a working smartphone thing",
    description:
      "One of thigns things has to still have a working battery. Hope I don't have anything else to do today.",
    message: `Found one! This is way beyond a smartphone - it could purchase just about anything in the world in one tap. Future people were even more into buying stuff than we were. I'll send one of these to Past Barry right away.`,
    drain: {
      food: 1,
      water: 2,
    },
    train: {
      patience: 2.5,
      tech: 2,
    },
    timeMultiplier: BASE_MULTIPLIER * 2,
    time: 40_000_000,
    requirements: {
      action: "S3",
    },
  },
  {
    key: "T7",
    name: "Duplicate the smartphone thing",
    description:
      "You know what? I want one of these. I bet if I find myself in a time hole, I could trick myself into giving me a second phone thing.",
    message: `Ha! It worked! Barry from 5 minutes ago tossed me the same phone. I just have to make sure I do the same thing for him back then.`,
    drain: {
      food: 1,
      water: 2,
    },
    train: {
      patience: 2.5,
      tech: 2,
    },
    timeMultiplier: BASE_MULTIPLIER * 2,
    time: 40_000_000,
    requirements: {
      action: "F4",
    },
  },
  {
    key: "E19",
    name: "Look around for anything else",
    description:
      "It's a factory! They make stuff! Come on, there has to be something of use here.",
    message: `Found something - a compact condensate capture system. This can pull water right out of the air instead of waiting for rainfall. Past Barry would have loved this. It's too bad the air's too dry for it to be of any use here.`,
    drain: {
      food: 1,
      water: 2,
    },
    train: {
      patience: 2,
      tech: 2.1,
    },
    timeMultiplier: BASE_MULTIPLIER * 2,
    time: 40_000_000,
    requirements: {
      action: "F4",
    },
  },
  {
    key: "E10",
    name: "Explore arcology",
    description:
      "There's a huge skyscraper here, bigger than anything we ever had. Bet they have all kinds of great agriculture advancements here, at least.",
    message: `Oh man, everything is huge here! Especially the weeds. This could take a while.`,
    drain: {
      food: 4,
      water: 2,
    },
    train: {
      endurance: 1.4,
      perception: 3,
    },
    timeMultiplier: BASE_MULTIPLIER,
    time: 20_000_000,
    requirements: {
      action: "E8",
    },
  },
  {
    key: "E20",
    name: "Explore datacenter",
    description:
      "There's a small building that says it's a datacenter, but it looks so small. I should check it out.",
    message: `This is a datacenter! Everything's just gotten so tiny.`,
    drain: {
      food: 4,
      water: 2,
    },
    train: {
      endurance: 2,
      perception: 2.1,
    },
    timeMultiplier: BASE_MULTIPLIER,
    time: 20_000_000,
    requirements: {
      action: "E8",
    },
  },
  {
    key: "E21",
    name: "Find a working server",
    description:
      "Power's still on here somehow, but most of the servers are gone or burned out.",
    message: `I found four that look promising, but each one is missing something. Maybe I could put them together into one working server.`,
    drain: {
      food: 4,
      water: 2,
    },
    train: {
      patience: 2,
      perception: 1.9,
    },
    timeMultiplier: BASE_MULTIPLIER,
    time: 20_000_000,
    requirements: {
      action: "E20",
    },
  },
  {
    key: "F9",
    name: "Make a Frankenserver",
    description: "Mash together parts from dead servers, then jolt it to life.",
    message: `It's alive! It's ALIVE! Even better... it looks like it's already set to archive the Internet, even server-side code somehow. If Barry had this, he could make his own Letsy.`,
    drain: {
      food: 4,
      water: 2,
    },
    train: {
      endurance: 1.4,
      perception: 3,
    },
    timeMultiplier: BASE_MULTIPLIER,
    time: 20_000_000,
    requirements: {
      action: "E21",
    },
  },
  {
    key: "S4",
    name: "Hack through weeds",
    description:
      "The weeds here are as tall as trees. Better get hacking. The machete kind.",
    message: `I got to a flight of stairs, and the higher levels look much clearer.`,
    drain: {
      food: 4,
      water: 4,
    },
    train: {
      strength: 3,
    },
    timeMultiplier: BASE_MULTIPLIER,
    time: 20_000_000,
    requirements: {
      action: "E10",
    },
  },
  {
    key: "S5",
    name: "Climb the stairs",
    description:
      "There's nothing interesting on the first level. Maybe there's something intact up the stairs?",
    message: `After 200 flights up the stairs, I reached the rooftop gardens... there's a small bag called "Fluxed Phyto-Gro" up here. Claims it's got What Plants Crave. I should send this stuff to Past Barry.`,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      strength: 2.4,
      endurance: 1.6,
    },
    time: 20_000_000,
    timeMultiplier: BASE_MULTIPLIER,
    requirements: {
      action: "S4",
    },
  },
  {
    key: "S6",
    name: "Break into the power room",
    description:
      "These arcologies are supposed to be completely self-contained, so there must be a power room here.",
    message: `Found it, and the lock was no match for a crowbar and a lot of persistence. And hey! Another Mr. Fusion!`,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      strength: 2,
      tech: 2.1,
    },
    time: 20_000_000,
    timeMultiplier: BASE_MULTIPLIER,
    requirements: {
      action: "S5",
    },
  },
  {
    key: "G2",
    name: "Generate power",
    description:
      "It's another Mr. Fusion, but this one's in better shape. Same deal, I'll start with any junk or money and move on to the rest.",
    message: `It lasted longer this time, but *poof* it goes. This is way too advanced for me to fix.`,
    drain: {
      food: 1,
      water: 1,
    },
    train: {
      patience: 2,
    },
    time: 10_000_000,
    timeMultiplier: BASE_MULTIPLIER,
    requirements: {
      action: "S6",
    },
    generates: {
      power: 4,
    },
  },
  {
    key: "E11",
    name: "Travel to next city",
    description:
      "Things are bad here, but are they this bad everywhere? I'll take the car as long as it'll go, and walk the rest of the way. This could be the longest trip so far.",
    message: `Things are this bad everywhere. I didn't meet anyone.`,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      patience: 1,
      endurance: 1,
      strength: 1,
      tech: 1,
      perception: 1,
    },
    timeMultiplier: 20,
    time: 1_600_000_000,
    requirements: {
      action: "E8",
    },
  },
  {
    key: "E18",
    name: "Walk to source of time holes",
    description:
      "The city's in the same condition as the last one, but there's something new here. There's a place, looks like a campus building... it's almost surrounded by that haze. I'm going to see why that is.",
    message: ``,
    drain: {
      food: 1,
      water: 1,
    },
    train: {
      patience: 1.5,
      endurance: 1.5,
      strength: 1.5,
      tech: 1.5,
      perception: 1.5,
    },
    timeMultiplier: BASE_MULTIPLIER,
    time: 20_000_000,
    requirements: {
      action: "E11",
    },
  },
  {
    key: "S7",
    name: "Break in",
    description: "",
    message: "",
    drain: {
      food: 1,
      water: 1,
    },
    train: {
      patience: 1.5,
      endurance: 1.5,
      strength: 1.5,
      tech: 1.5,
      perception: 1.5,
    },
    timeMultiplier: BASE_MULTIPLIER,
    time: 20_000_000,
    requirements: {
      action: "E18",
    },
  },
  {
    key: "S7",
    name: "Walk downstairs",
    description:
      "Something in the basement is calling to me. There are a lot of stairs.",
    message:
      "I lost count, 20 flights of stairs? There's a machine here. I don't know what it does, but I can somehow feel this was responsible.",
    drain: {
      food: 1,
      water: 1,
    },
    train: {
      patience: 1.5,
      endurance: 1.5,
      strength: 1.5,
      tech: 1.5,
      perception: 1.5,
    },
    timeMultiplier: BASE_MULTIPLIER,
    time: 20_000_000,
    requirements: {
      action: "S7",
    },
  },
  {
    key: "F6",
    name: "Get information off computers",
    description:
      "This building is still powered, which is strange. I should get any information I can off the computers running here.",
    message: `This is it. Whatever they were doing here? This is the source of all my problems. It looks like once they created the first time hole, they tried to fix the problem by collapsing the anomaly in on itself, but it just caused it to multiply out of control.`,
    drain: {
      food: 2,
      water: 2,
    },
    train: {
      patience: 1.5,
      endurance: 1.5,
      strength: 1.5,
      tech: 1.5,
      perception: 1.5,
    },
    timeMultiplier: BASE_MULTIPLIER,
    time: 20_000_000,
    requirements: {
      action: "S7",
    },
  },
  {
    key: "F7",
    name: "Fix the problem",
    description:
      "As far as I can tell, they were on the right track, but they just didn't try hard enough. This console doesn't look that complicated, why not just get rid of the first time hole? Maybe that'll make the rest go away?",
    message: `Oh god oh god oh god that didn't fix it at all. It's worse, it's so much worse. It's fracturing worse than ever, I can see all the other Barrys I switched with. I think that time itself might be... angry.`,
    drain: {
      food: 1,
      water: 1,
    },
    train: {
      patience: 1.5,
      endurance: 1.5,
      strength: 1.5,
      tech: 1.5,
      perception: 1.5,
    },
    timeMultiplier: BASE_MULTIPLIER,
    time: 20_000_000,
    requirements: {
      action: "F6",
    },
  },
  {
    key: "F8",
    name: "Fix the problem harder",
    description:
      "Just keep trying to collapse these things. Something has to work.",
    message: `One of the Barrys just stepped through. Now all of the Barrys have stepped through. I don't think I'm going to fix this.`,
    drain: {
      food: 1,
      water: 1,
    },
    train: {
      patience: 1.5,
      endurance: 1.5,
      strength: 1.5,
      tech: 1.5,
      perception: 1.5,
    },
    timeMultiplier: BASE_MULTIPLIER,
    time: 20_000_000,
    requirements: {
      action: "F7",
    },
  },
  {
    key: "T6",
    name: "Converge timelines",
    description: "I guess I should say hi to the other Barrys.",
    message: "",
    drain: {},
    train: {
      perception: 1.5,
    },
    timeMultiplier: 1,
    time: 100,
    requirements: {
      action: "F8",
    },
  },
];

export const findExploration = (key: ExplorationKey) => {
  const found = explorations.find((action) => action.key === key);
  if (!found) {
    throw new Error(`Could not find an action with key: ${key}`);
  }
  return found;
};
