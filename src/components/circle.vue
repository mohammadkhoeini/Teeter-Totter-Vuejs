<template>
  <div
    class="shape circle"
    v-bind:style="{height: this.$store.state.circle.weight * 10 + 'px' ,
            width: this.$store.state.circle.weight * 10 + 'px',
            left: 'calc( ' + (50-  this.$store.state.circle.position * 10 )+  '% - ' + this.$store.state.circle.weight * 10 +'px )' }"
  ></div>
</template>
<script>
export default {};
</script>
<style scoped>
.circle {
  border-radius: 100%;
  bottom: 10px;
  background: red;
}
</style>