<template>
  <div class="multi-query-container">
    <div class="placeholder-card">
      <div class="card-icon">🌟</div>
      <h3>多属查询</h3>
      <p>多属性克制关系查询功能开发中...</p>
      <p class="coming-soon">即将推出</p>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.multi-query-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-card {
  background: white;
  border-radius: 16px;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  max-width: 500px;
}

.card-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.placeholder-card h3 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.placeholder-card p {
  color: #666;
  margin-bottom: 0.5rem;
}

.coming-soon {
  font-weight: 600;
  color: #3b82f6;
  margin-top: 1rem;
}
</style>
