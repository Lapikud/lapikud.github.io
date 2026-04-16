<!-- DO NOT TOUCH THIS FILE AT ANY COST -->
<!-- unless the router is broken 👉👈 -->

<script>
  export function routeTo(path) {
    window.history.pushState({}, "", path);
    window.scrollTo(0, 0);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  let { routes } = $props();

  let currentPath = $state(window.location.pathname);
  let CurrentComponent = $derived(routes[currentPath] || routes["/"]);

  function navigate(path) {
    window.history.pushState({}, "", path);
    window.scrollTo(0, 0);
    currentPath = path;
  }

  // Handle back/forward buttons
  $effect(() => {
    const handlePopState = () => {
      currentPath = window.location.pathname;
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  });

  // Intercept link clicks
  $effect(() => {
    const handleClick = (e) => {
      if (
        e.target.tagName === "A" &&
        e.target.getAttribute("href")?.startsWith("/")
      ) {
        e.preventDefault();
        navigate(e.target.getAttribute("href"));
      }
    };

    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  });
</script>

{#if CurrentComponent}
  <CurrentComponent />
{/if}
