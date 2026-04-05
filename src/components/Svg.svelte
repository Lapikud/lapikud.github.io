<script context="module">
  export const VARIANTS = [
    'instagram',
    'facebook',
    'github',
    'connector',
    'connector_2',
    'mirrorV',
    'mirrorH',
    'mirrorVH',
    'mirrorHR',
    'branch',
    'branchH',
    'straight_tiny',
    'straightH',
    'straightHS',
    'connectorHL',
    'straightL_connectorL',
    'straight_connector',
    ];
</script>

<script>
  export let type;
</script>

<!-- Circuitboard connectors-->

{#if type === "connector"}
  <svg viewBox="0 0 182 66" class={$$props.class ?? ''} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 63.5H67.5L102.5 15.5H156" stroke="currentColor" stroke-width="5"/>
    <circle cx="166" cy="15.5" r="10" stroke="currentColor" stroke-width="5"/>
  </svg>

{:else if type === "connector_2"}
  <svg viewBox="0 0 170 37" class={$$props.class ?? ''} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 2.5H67.5L87 27.5H153.5" stroke="currentColor" stroke-width="5"/>
    <circle cx="161" cy="27.5" r="6.5" stroke="currentColor" stroke-width="5"/>
  </svg>

{:else if type === "mirrorV"}
  <svg viewBox="0 0 182 66" class={$$props.class ?? ''} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="scale(1,-1) translate(0,-66)">
      <path d="M0 63.5H67.5L102.5 15.5H156" stroke="currentColor" stroke-width="5"/>
      <circle cx="166" cy="15.5" r="10" stroke="currentColor" stroke-width="5"/>
    </g>
  </svg>

{:else if type === "mirrorH"}
  <svg viewBox="0 0 182 66" class={$$props.class ?? ''} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="scale(-1,1) translate(-182,0)">
      <path d="M0 63.5H67.5L102.5 15.5H156" stroke="currentColor" stroke-width="5"/>
      <circle cx="166" cy="15.5" r="10" stroke="currentColor" stroke-width="5"/>
    </g>
  </svg>

{:else if type === "mirrorHR"}
  <svg viewBox="0 0 66 182" class={$$props.class ?? ''} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M63.5 0V67.5L15.5 102.5V156" stroke="currentColor" stroke-width="5"/>
    <circle cx="15.5" cy="166" r="10" stroke="currentColor" stroke-width="5"/>
  </svg>

{:else if type === "mirrorVH"}
  <svg viewBox="0 0 182 66" class={$$props.class ?? ''} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="scale(-1,-1) translate(-182,-66)">
      <path d="M0 63.5H67.5L102.5 15.5H156" stroke="currentColor" stroke-width="5"/>
      <circle cx="166" cy="15.5" r="10" stroke="currentColor" stroke-width="5"/>
    </g>
  </svg>

{:else if type === "connectorHL"}
  <svg viewBox="0 0 80 380" class={$$props.class ?? ''} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.5 0 V200 L63.5 235 V355" stroke="currentColor" stroke-width="5"/>
    <circle cx="63.5" cy="365" r="10" stroke="currentColor" stroke-width="5"/>
  </svg>

{:else if type === "branch"}
  <svg viewBox="0 0 75 74" class={$$props.class ?? ''} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 31.4784H46L68 1.47842M45.5 30.9784L66.5 63.9784"
          stroke="currentColor"
          stroke-width="5"/>
  </svg>

{:else if type === "branchH"}
  <svg viewBox="0 0 75 74" class={$$props.class ?? ''} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="scale(-1,1) translate(-75,0)">
    <path d="M0 31.4784H46L68 1.47842M45.5 30.9784L66.5 63.9784"
          stroke="currentColor"
          stroke-width="5"/>
    </g>
  </svg>

{:else if type === "straight_tiny"}
  <svg viewBox="0 0 58 18" class={$$props.class ?? ''} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="48.0312" cy="9" r="6.5" stroke="currentColor" stroke-width="5"/>
    <path d="M0.03125 9.5L40.0312 9" stroke="currentColor" stroke-width="5"/>
  </svg>

{:else if type === "straightH"}
  <svg viewBox="0 0 30 150" class={$$props.class ?? ''} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 0 V125" stroke="currentColor" stroke-width="5"/>
    <circle cx="15" cy="135" r="10" stroke="currentColor" stroke-width="5"/>
  </svg>

{:else if type === "straightHS"}
  <svg viewBox="0 0 30 90" class={$$props.class ?? ''} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 0 V65" stroke="currentColor" stroke-width="5"/>
    <circle cx="15" cy="75" r="10" stroke="currentColor" stroke-width="5"/>
  </svg>

{:else if type === "straightL_connectorL"}
  <svg viewBox="0 0 1025 56" class={$$props.class ?? ''} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="789.075" cy="45.7383" r="7.0785" stroke="currentColor" stroke-width="5"/>
    <path d="M0.000976562 46L780.363 45.738" stroke="currentColor" stroke-width="5"/>
    <circle cx="1014.5" cy="9.801" r="7.0785" stroke="currentColor" stroke-width="5"/>
    <path d="M482.521 45.1935L539.149 9.80103H1006.87" stroke="currentColor" stroke-width="5"/>
  </svg>

{:else if type === "straight_connector"}
  <svg viewBox="0 0 391 41" class={$$props.class ?? ''} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="266.005" cy="32" r="6.5" stroke="currentColor" stroke-width="5"/>
    <circle cx="382.005" cy="9" r="6.5" stroke="currentColor" stroke-width="5"/>
    <path d="M0.00485229 32.5L258.005 32" stroke="currentColor" stroke-width="5"/>
    <path d="M193.005 32L217.005 9H373.505" stroke="currentColor" stroke-width="5"/>
  </svg>

<!-- End of circuitboard connectors -->
<!-- Social media icons --> 

{:else if type === "instagram"}
  <svg class="w-8 h-8 {$$props.class ?? ''}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>

{:else if type === "facebook"}

  <svg class="w-8 h-8 {$$props.class ?? ''}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>

{:else if type === "github"}

  <svg class="w-8 h-8 {$$props.class ?? ''}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>

<!-- Social media icons -->

{:else}
  <div>Unknown type: {type}</div>
{/if}