<template>
  <div class='question'>
    {{ question }}
  </div>
</template>

<script>
export default {
  props: {
    question: Object
  },
  mounted() {
    console.log('question')
    console.log(this.question)
  }
}
</script>

<style>
.question {
  min-height: 200px;
}
</style>
