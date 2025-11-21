<!--
A simple presentational container that renders a `div` with the `card` class.
-->

<script>
  export let className = "";
  export let background = "var(--off-white)";
</script>

<div class={`card ${className}`} style="background: {background}">
  <slot />
</div>
