<script>
  export let href = "";
  export let variant = "default"; // 'default' | 'animated' | 'animated-neutral' | 'glass' | 'blur'
  export let className = "";

  const variantClasses = {
    default: "card-default",
    animated: "card-animated",
    "animated-neutral": "card-animated-neutral",
    glass: "card-glass",
    blur: "card-blur",
  };
</script>

{#if href}
  <a {href} class={`card ${variantClasses[variant]} ${className}`}>
    <slot />
  </a>
{:else}
  <div class={`card ${variantClasses[variant]} ${className}`}>
    <slot />
  </div>
{/if}

<style>
  .card {
    position: relative;
    padding: var(--space-5);
    border-radius: var(--radius-lg);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: block;
    text-decoration: none;
    color: inherit;
  }

  .card:hover {
    transform: translateY(-4px);
  }

  a.card:hover {
    text-decoration: none;
  }

  .card-default {
    background: var(--white);
    border: 2px solid var(--gray-200);
  }

  .card-default:hover {
    transform: none;
  }

  .card-animated {
    background: transparent;
    border: 2px solid var(--gray-200);
  }

  .card-animated:hover {
    border-color: var(--orange);
    background: var(--gray-50);
  }

  .card-animated-neutral {
    background: transparent;
    border: 2px solid var(--gray-200);
  }

  .card-animated-neutral:hover {
    background: var(--gray-50);
  }

  .card-glass {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.12);
  }

  .card-glass:hover {
    transform: none;
  }

  .card-blur {
    background: rgba(255, 255, 255, 0.68);
    backdrop-filter: blur(18px) saturate(160%);
    -webkit-backdrop-filter: blur(18px) saturate(160%);
    border: 1px solid rgba(255, 255, 255, 0.55);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
    isolation: isolate;
  }

  .card-blur::before {
    content: "";
    position: absolute;
    inset: -12px;
    border-radius: calc(var(--radius-lg) + 12px);
    background: radial-gradient(
      120% 120% at 50% 50%,
      rgba(245, 245, 245, 0.95) 45%,
      rgba(245, 245, 245, 0.55) 65%,
      rgba(245, 245, 245, 0) 82%
    );
    filter: blur(10px);
    pointer-events: none;
    z-index: -1;
  }

  .card-blur:hover {
    background: rgba(255, 255, 255, 0.78);
  }

  @media (max-width: 768px) {
    .card {
      padding: var(--space-4);
    }
  }
</style>
