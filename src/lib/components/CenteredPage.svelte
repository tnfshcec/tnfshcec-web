<div class="flex w-full p-4">
  <div class="flex-1">
    <slot name="left" />
  </div>

  <slot />

  <div class="order-last flex-1">
    <slot name="right" />
  </div>
</div>
