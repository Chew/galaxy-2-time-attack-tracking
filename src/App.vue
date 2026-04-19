<template>
  <div class="container">
    <h1>Super Mario Galaxy 2 Time Tracker</h1>
    <p>
      Enter in the times you get in-game in the boxes below.
      On the right, the "Remaining" will be <span class="yellow">yellow</span> if you haven't entered in everything,
      and will be <span class="red">red</span> if you still need to lower your time,
      or <span class="green">green</span> if you've made it.
    </p>
    <p>
      This is used for tracking the
      <a href="https://retroachievements.org/game/36068" target="_blank">Time Attack subset</a>
      for Super Mario Galaxy 2 on RetroAchievements, as well as the speedrun achievements in the base set.
    </p>

    <div class="buttons">
      <button @click="exportData">Export</button>
      <label class="button">Import <input type="file" hidden @change="importData" /></label>
    </div>

    <h2>Base Set Achievement Tracking</h2>

    <p>
      The base set has several achievements you can earn along the way, too. These are all tracked below.
      Click the title to view them on RetroAchievements.
    </p>

    <label>
      <input type="checkbox" v-model="hideCompleted" />
      Hide Completed
    </label>

    <div class="challenges-grid">
      <template v-for="challenge in challenges" :key="challenge.raId">
        <table v-if="!hideCompleted || challengeRemainingClass(challenge) !== 'green'">
          <caption v-if="challenge.isWorld">
            <h3><a :href="`https://retroachievements.org/achievement/${challenge.raId}`">{{ challenge.name }}</a></h3>
            <p>
              Complete the first mission of all galaxies in World {{ challenge.isWorld }}
              in less than {{ challenge.requiredMins }} mins {{challenge.requiredSecs}} secs,
              excluding the final Galaxy.
            </p>
          </caption>
          <caption v-else>
            <h3><a :href="`https://retroachievements.org/achievement/${challenge.raId}`">{{ challenge.name }}</a></h3>
            <p>
              Complete {{ challenge.missions[0]!.galaxy }} star {{ challenge.missions[0]!.mission }}
              in less than {{ challenge.requiredMins }} mins {{challenge.requiredSecs}} secs.
            </p>
          </caption>
          <thead>
          <tr>
            <th>Total</th>
            <th>Required</th>
            <th>Remaining</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{{ formatMs(challengeTotalTime(challenge)) }}</td>
            <td>{{ formatMs(challengeRequiredTime(challenge)) }}</td>
            <td :class="challengeRemainingClass(challenge)">{{ formatMs(challengeRemainingTime(challenge)) }}</td>
          </tr>
          </tbody>
        </table>
      </template>
    </div>

    <h2>Table and Subset Tracking</h2>

    <p>All your tracking for your missions and the total needed for the subset are listed here.</p>

    <table>
      <thead>
      <tr>
        <th>Galaxy</th>
        <th>Star 1</th>
        <th>Star 2</th>
        <th>Star 3</th>
        <th>Green 1</th>
        <th>Green 2</th>
        <th>Green 3</th>
        <th>Total</th>
        <th>Required</th>
        <th>Remaining</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="g in galaxies" :key="g.name">
        <td class="galaxy">{{ g.name }}</td>

        <td v-for="i in 3" :key="'star' + i">
          <input
              v-if="i <= g.normalStars"
              v-model="g.times['star' + i]"
              placeholder="00:00.000"
              :name="'star' + i"
              pattern="^\d{2}:\d{2}\.\d{2}$"
          />
        </td>
        <td v-for="i in 3" :key="'green' + i">
          <input
              v-if="i <= g.greenStars"
              v-model="g.times['green' + i]"
              placeholder="00:00.000"
              :name="'star' + i"
              pattern="^\d{2}:\d{2}\.\d{2}$"
          />
        </td>

        <td>{{ formatMs(totalTime(g)) }}</td>
        <td>{{ formatMs(g.required) }}</td>
        <td :class="remainingClass(g)">{{ formatMs(remaining(g)) }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {ref, watch, onMounted} from "vue";
import {galaxiesData, type GalaxyState, priorNames} from "./galaxies";
import {challenges, type Challenge} from "@/base.ts";

/* -----------------------------
   CONFIG
------------------------------ */

const STORAGE_KEY = "smg2-galaxy-times";
const HIDE_COMPLETED_KEY = "smg2-hide-completed";

const timeFields = [
  "star1",
  "star2",
  "star3",
  "green1",
  "green2",
  "green3"
];

/* -----------------------------
   STATE
------------------------------ */

const galaxies = ref(
    galaxiesData.map(g => ({
      ...g,
      required: (g.requiredMins * 60 + g.requiredSecs) * 1000,
      times: Object.fromEntries(timeFields.map(f => [f, ""]))
    }))
);

const hideCompleted = ref(false);

const baseRuns = ref(
    challenges
)

/* -----------------------------
   TIME UTILS
------------------------------ */

function parseTime(str: string) {
  if (!str) return 0;

  // Flexible regex to handle missing leading zeros or different separators
  const match = str.match(/^(?:(\d+):)?(\d{1,2})\.(\d{1,3})$/);
  if (!match) {
    // Try simple seconds.ms
    const simpleMatch = str.match(/^(\d{1,2})\.(\d{1,3})$/);
    if (simpleMatch) {
      const [, s, ms] = simpleMatch.map(Number);
      return s! * 1000 + ms!;
    }
    return 0;
  }

  const m = parseInt(match[1] || "0", 10);
  const s = parseInt(match[2]!, 10);
  let msStr = match[3]!;

  const ms = parseInt(msStr.padEnd(3, "0").substring(0, 3), 10);

  return m * 60000 + s * 1000 + ms;
}

function formatMs(ms: number) {
  ms = Math.max(0, Math.floor(ms));

  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const milli = ms % 1000;

  return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}.${String(milli).padStart(3,"0")}`;
}

/* -----------------------------
   CALCULATIONS
------------------------------ */

function totalTime(galaxy: GalaxyState) {
  return timeFields.reduce(
      (sum, f) => sum + parseTime(galaxy.times[f]!),
      0
  );
}

function remaining(galaxy: GalaxyState) {
  return totalTime(galaxy) - galaxy.required;
}

function remainingClass(galaxy: GalaxyState) {
  // Check if any required fields are empty
  for (let i = 1; i <= 3; i++) {
    if (i <= galaxy.normalStars && !galaxy.times['star' + i]) return 'yellow';
    if (i <= galaxy.greenStars && !galaxy.times['green' + i]) return 'yellow';
  }

  return remaining(galaxy) > 0 ? 'red' : 'green';
}

function challengeRequiredTime(challenge: Challenge) {
  return (challenge.requiredMins * 60 + challenge.requiredSecs) * 1000;
}

function challengeTotalTime(challenge: Challenge) {
  let total = 0;
  for (const mission of challenge.missions) {
    const galaxy = galaxies.value.find(g => g.name === mission.galaxy);
    if (galaxy) {
      const timeStr = galaxy.times['star' + mission.mission];
      if (timeStr) {
        total += parseTime(timeStr);
      }
    }
  }
  return total;
}

function challengeRemainingTime(challenge: Challenge) {
  return challengeTotalTime(challenge) - challengeRequiredTime(challenge);
}

function challengeRemainingClass(challenge: Challenge) {
  for (const mission of challenge.missions) {
    const galaxy = galaxies.value.find(g => g.name === mission.galaxy);
    if (!galaxy || !galaxy.times['star' + mission.mission]) return 'yellow';
  }

  return challengeRemainingTime(challenge) > 0 ? 'red' : 'green';
}

/* -----------------------------
   LOCAL STORAGE
------------------------------ */

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(galaxies.value));
  localStorage.setItem(HIDE_COMPLETED_KEY, JSON.stringify(hideCompleted.value));
}

function load() {
  const hideCompletedRaw = localStorage.getItem(HIDE_COMPLETED_KEY);
  if (hideCompletedRaw) {
    try {
      hideCompleted.value = JSON.parse(hideCompletedRaw);
    } catch {}
  }

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const loadedData = JSON.parse(raw);
    if (!Array.isArray(loadedData)) return;

    galaxies.value = galaxiesData.map(g => {
      let loaded = loadedData.find(l => l.name === g.name);
      if (!loaded) {
        const oldName = Object.entries(priorNames).find(([, newName]) => newName === g.name)?.[0];
        if (oldName) {
          loaded = loadedData.find(l => l.name === oldName);
        }
      }

      return {
        ...g,
        required: (g.requiredMins * 60 + g.requiredSecs) * 1000,
        times: (loaded && loaded.times) ? loaded.times : Object.fromEntries(timeFields.map(f => [f, ""]))
      };
    });
  } catch {}
}

watch(galaxies, save, { deep: true });
watch(hideCompleted, save);

onMounted(load);

/* -----------------------------
   IMPORT / EXPORT
------------------------------ */

function exportData() {
  const blob = new Blob(
      [JSON.stringify(galaxies.value, null, 2)],
      { type: "application/json" }
  );

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "smg2-times.json";
  a.click();
}

function importData(e: Event) {
  if (!(e.target instanceof HTMLInputElement)) return;

  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const result = reader.result;
      if (typeof result !== "string") return;

      const loadedData: GalaxyState[] = JSON.parse(result);
      galaxies.value = galaxiesData.map(g => {
        let loaded = loadedData.find(l => l.name === g.name);
        if (!loaded) {
          const oldName = Object.entries(priorNames).find(([, newName]) => newName === g.name)?.[0];
          if (oldName) {
            loaded = loadedData.find(l => l.name === oldName);
          }
        }

        return {
          ...g,
          required: (g.requiredMins * 60 + g.requiredSecs) * 1000,
          times: (loaded && loaded.times) ? loaded.times : Object.fromEntries(timeFields.map(f => [f, ""]))
        };
      });
    } catch (err) {
      console.error("Failed to import JSON", err);
    }
  };
  reader.readAsText(file);
}
</script>
