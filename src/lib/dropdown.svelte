<script>
    // Creates variable for dropdown menu state
    let isDropDownOpen = $state(false);

    import ArrowDownWideNarrow from "lucide-svelte/icons/arrow-down-wide-narrow";

    // Set button name and allow children elements via props
    let { children, name } = $props();

    // Function to toggle/handle dropdown menu state
    const dropDownClick = () => {
        isDropDownOpen = !isDropDownOpen;
    };

    // Function to handle dropdown focus loss
    const handleDropdownFocusLoss = ({ relatedTarget, currentTarget }) => {
        if (
            relatedTarget instanceof HTMLElement &&
            currentTarget.contains(relatedTarget)
        )
            return;
        isDropDownOpen = false;
    };
</script>

<div onfocusout={handleDropdownFocusLoss}>
    <button
        type="button"
        onclick={dropDownClick}
        class="w-auto hover:ring-1 hover:ring-black/5 pl-4 pr-3 py-2 bg-white hover:bg-[#ffa80d] cursor-pointer rounded-md flex flex-row"
        aria-expanded="true"
        aria-haspopup="true"
        style:background-color={isDropDownOpen ? "rgb(100% 65.88% 5.1%)" : ""}
        >{name}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-5 ml-2 mt-1 transition-all"
            style:transform={isDropDownOpen ? "rotate(180deg)" : ""}
            >>
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
        </svg>
    </button>
    <div
        class="absolute mt-2 rounded-md shadow-lg bg-white ring-1 ring-black/5 overflow-hidden"
        style:visibility={isDropDownOpen ? "visible" : "hidden"}
    >
        {@render children?.()}
    </div>
</div>
