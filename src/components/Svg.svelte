<script>
  export let type; // "connector", "mirrorV", "mirrorH", "mirrorVH", "branch"
  export let className = "";
</script>

{#if type === "connector"}
  <svg viewBox="0 0 182 66" class={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 63.5H67.5L102.5 15.5H156" stroke="currentColor" stroke-width="5"/>
    <circle cx="166" cy="15.5" r="10" stroke="currentColor" stroke-width="5"/>
  </svg>

{:else if type === "mirrorV"}
  <svg viewBox="0 0 182 66" class={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="scale(1,-1) translate(0,-66)">
      <path d="M0 63.5H67.5L102.5 15.5H156" stroke="currentColor" stroke-width="5"/>
      <circle cx="166" cy="15.5" r="10" stroke="currentColor" stroke-width="5"/>
    </g>
  </svg>

{:else if type === "mirrorH"}
  <svg viewBox="0 0 182 66" class={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="scale(-1,1) translate(-182,0)">
      <path d="M0 63.5H67.5L102.5 15.5H156" stroke="currentColor" stroke-width="5"/>
      <circle cx="166" cy="15.5" r="10" stroke="currentColor" stroke-width="5"/>
    </g>
  </svg>

{:else if type === "mirrorVH"}
  <svg viewBox="0 0 182 66" class={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="scale(-1,-1) translate(-182,-66)">
      <path d="M0 63.5H67.5L102.5 15.5H156" stroke="currentColor" stroke-width="5"/>
      <circle cx="166" cy="15.5" r="10" stroke="currentColor" stroke-width="5"/>
    </g>
  </svg>

{:else if type === "branch"}
  <svg viewBox="0 0 75 74" class={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 31.4784H46L68 1.47842M45.5 30.9784L66.5 63.9784"
          stroke="currentColor"
          stroke-width="5"/>
  </svg>

{:else if type === "branchH"}
  <svg viewBox="0 0 75 74" class={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="scale(-1,1) translate(-75,0)">
    <path d="M0 31.4784H46L68 1.47842M45.5 30.9784L66.5 63.9784"
          stroke="currentColor"
          stroke-width="5"/>
    </g>
  </svg>

{:else}
  <div>Unknown type: {type}</div>
{/if}