<script setup lang="ts">
import { onMounted } from "vue";
import Experience from "./Experience/Experience";
onMounted(() => {
  // Camvas
  const canvas = document.querySelector(".experience-canvas");
  const experience = new Experience(canvas);
});
</script>

<template>
  <div class="div">画板</div>
  <div class="experience">
    <!-- 画板 -->
    <canvas class="experience-canvas"></canvas>
  </div>
</template>

<style scoped>
.experience {
  position: fixed;
  width: 100vw;
  height: 100vh;
}

.experience-canvas {
  width: 100%;
  height: 100%;
}
</style>
