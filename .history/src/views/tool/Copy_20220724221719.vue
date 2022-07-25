<div id="app"></div>

<template id="t">
  <div class="container">
    <input type="text" v-model="message" />
    <button
      type="button"
      v-clipboard:copy="message"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
    >Copy!</button>
  </div>
</template>

<script>
export default{
    data: function() {
    return {
        message: "Copy These Text"
    };
    },
    methods: {
    onCopy: function(e) {
        alert("You just copied: " + e.text);
    },
    onError: function(e) {
        alert("Failed to copy texts");
    }
    }
}


</script>