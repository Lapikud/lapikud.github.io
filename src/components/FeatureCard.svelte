<script>
  export let title = "";
  export let description = "";
  export let icon = null;
  export let href = "";
  export let variant = "default"; // 'default' | 'elevated' | 'bordered' | 'glass'
  export let iconColor = "var(--orange)";
  export let className = "";

  const variantClasses = {
    default: "card-default",
    elevated: "card-elevated",
    bordered: "card-bordered",
    glass: "card-glass",
  };
</script>

{#if href}
  <a {href} class={`feature-card ${variantClasses[variant]} ${className}`}>
    {#if icon}
      <div class="feature-icon" style="color: {iconColor}">
        <svelte:component this={icon} size={32} strokeWidth={1.5} />
      </div>
    {/if}
    {#if title}
      <h3 class="feature-title">{title}</h3>
    {/if}
    {#if description}
      <p class="feature-description">{description}</p>
    {/if}
    <div class="feature-content">
      <slot />
    </div>
  </a>
{:else}
  <div class={`feature-card ${variantClasses[variant]} ${className}`}>
    {#if icon}
      <div class="feature-icon" style="color: {iconColor}">
        <svelte:component this={icon} size={32} strokeWidth={1.5} />
      </div>
    {/if}
    {#if title}
      <h3 class="feature-title">{title}</h3>
    {/if}
    {#if description}
      <p class="feature-description">{description}</p>
    {/if}
    <div class="feature-content">
      <slot />
    </div>
  </div>
{/if}

<style>
  .feature-card {
    position: relative;
    padding: var(--space-5);
    border-radius: var(--radius-lg);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: block;
    text-decoration: none;
    color: inherit;
  }

  .feature-card:hover {
    transform: translateY(-4px);
  }

  a.feature-card:hover {
    text-decoration: none;
  }

  .card-default {
    background: var(--white);
    border: 1px solid var(--gray-200);
  }

  .card-default:hover {
    box-shadow: var(--shadow-2);
    border-color: var(--orange);
  }

  .card-elevated {
    background: var(--white);
    box-shadow: var(--shadow-2);
    border: 1px solid transparent;
  }

  .card-elevated:hover {
    box-shadow: var(--shadow-3);
    border-color: var(--orange);
  }

  .card-bordered {
    background: transparent;
    border: 2px solid var(--gray-200);
  }

  .card-bordered:hover {
    border-color: var(--orange);
    background: var(--gray-50);
  }

  .card-glass {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .card-glass:hover {
    background: rgba(255, 255, 255, 0.9);
    box-shadow: var(--shadow-glow);
  }

  .feature-icon {
    margin-bottom: var(--space-3);
    display: inline-flex;
  }

  .feature-title {
    font-size: var(--fs-xl);
    font-weight: 700;
    margin-bottom: var(--space-2);
    color: var(--black);
  }

  .feature-description {
    color: var(--gray-800);
    line-height: 1.6;
    margin-bottom: var(--space-3);
  }

  .feature-content {
    margin-top: var(--space-3);
  }

  @media (max-width: 768px) {
    .feature-card {
      padding: var(--space-4);
    }

    .feature-title {
      font-size: var(--fs-lg);
    }
  }
</style>
