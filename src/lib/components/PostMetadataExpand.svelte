<!-- Copied & edited from SkeletonUI -->
<!-- https://github.com/skeletonlabs/skeleton/blob/master/packages/skeleton/src/lib/components/Accordion/AccordionItem.svelte -->

<script lang="ts">
  let id = "1234";
  let open = true;
  let disabled = false;

  // Change open behavior based on auto-collapse mode
  function setActive(): void {
    // Toggle Item on click
    open = !open;
  }
</script>

<div class="accordion-item {$$props.class ?? ''}" data-testid="accordion-item">
  <!-- Control -->
  <button
    type="button"
    class="accordion-control text-left w-full flex items-center space-x-4 py-2 px-4 hover:bg-primary-hover-token rounded-container-token"
    id="accordion-control-{id}"
    on:click={setActive}
    on:click
    on:keydown
    on:keyup
    on:keypress
    aria-expanded={open}
    aria-controls="accordion-panel-{id}"
    {disabled}
  >
    <!-- Lead -->
    {#if $$slots.lead}
      <div class="accordion-lead">
        <slot name="lead" />
      </div>
    {/if}
    <!-- Summary -->
    <div class="accordion-summary flex-1">
      <slot name="summary">(summary)</slot>
    </div>
    <!-- Caret -->
    <div
      class="accordion-summary-caret fill-current w-3 transition-transform duration-[200ms]
             {open ? 'rotate-180' : ''}"
    >
      <!-- SVG Caret -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path
          d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
        />
      </svg>
    </div>
  </button>
  <!-- Panel -->
  <!-- TODO: transition is bad -->
  <div
    class="accordion-panel overflow-hidden transition-[max-height] duration-[200ms] rounded-container-token
           {!open ? 'max-h-0' : 'max-h-[9999px]'}"
    id="accordion-panel-{id}"
    role="region"
    aria-hidden={!open}
    aria-labelledby="accordion-control-{id}"
  >
    <div class="py-2 px-4">
      <slot name="content">(content)</slot>
    </div>
  </div>
</div>
