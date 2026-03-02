<template>
  <div class="container">
    <h2>Super Mario Galaxy 2 Time Tracker</h2>

    <div class="buttons">
      <button @click="exportData">Export JSON</button>
      <label class="button">Import JSON <input type="file" hidden @change="importData" /></label>
    </div>

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
        <td>{{ formatMs(remaining(g)) }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {ref, watch, onMounted, type Ref} from "vue";
import {galaxiesData, type GalaxyState} from "./galaxies";

/* -----------------------------
   CONFIG
------------------------------ */

const STORAGE_KEY = "smg2-galaxy-times";

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
  return galaxy.required - totalTime(galaxy);
}

/* -----------------------------
   LOCAL STORAGE
------------------------------ */

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(galaxies.value));
}

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const loadedData = JSON.parse(raw);
    if (!Array.isArray(loadedData)) return;

    galaxies.value = galaxiesData.map(g => {
      const loaded = loadedData.find(l => l.name === g.name);
      return {
        ...g,
        required: (g.requiredMins * 60 + g.requiredSecs) * 1000,
        times: (loaded && loaded.times) ? loaded.times : Object.fromEntries(timeFields.map(f => [f, ""]))
      };
    });
  } catch {}
}

watch(galaxies, save, { deep: true });

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
  reader.onload = ev => {
    try {
      const result = reader.result;
      if (typeof result !== "string") return;

      const loadedData: GalaxyState[] = JSON.parse(result);
      galaxies.value = galaxiesData.map(g => {
        const loaded = loadedData.find(l => l.name === g.name);
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
