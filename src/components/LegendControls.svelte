<script>
    // Legend control buttons
    import { onMount } from "svelte";
    import Events from "../core/events.js";
    import icons from "../assets/icons.json";
    import { each } from "svelte/internal";
    export let gridId; // gridId
    export let ov; // Overlay
    export let props; // General props
    export let height; // Legend-line height
    let events = Events.instance(props.id);
    $: display = ov.settings.display !== false;
    $: state = display ? "open" : "closed";
    $: eyeStyle = `
      background-image: url(${icons[state + "-eye"]});
      background-size: contain;
      background-repeat: no-repeat;
      margin-top: ${(height - 20) * 0.5 - 3}px;
      /* FIX 'overflow: hidden' changes baseline */
      margin-bottom: -2px;
  `;
    export function update() {
      display = ov.settings.display !== false;
    }
    function onDisplayClick() {
      events.emitSpec("hub", "display-overlay", {
        paneId: gridId,
        ovId: ov.id,
        flag: ov.settings.display === undefined ? false : !ov.settings.display,
      });
    }
    const legendSettings =
      ov.settings.legendSettings !=undefined ? ov.settings.legendSettings : [];
  </script>

  {#if legendSettings.length > 0}
    {#each legendSettings as {id, icon}}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div id={id} class="nvjs-eye" style="background-image: url({icon});
      background-size: contain;
      background-repeat: no-repeat;
      margin-top: ${(height - 20) * 0.5 - 3}px;"/>
    {/each}
  {/if}

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="nvjs-eye"
    style={eyeStyle}
    on:click|stopPropagation={onDisplayClick}
  />

  <style>
    .nvjs-eye {
      width: 20px;
      height: 20px;
      float: right;
      margin-right: 2px;
      margin-left: 7px;
    }
    .nvjs-eye:hover {
      filter: brightness(1.5);
    }
    .nvjs-other-icon {
      width: 20px;
      height: 20px;
      float: right;
      margin-right: 2px;
      margin-left: 7px;
      margin-top: -3px;
    }
    .nvjs-other-icon:hover {
      filter: brightness(1.5);
    }
  </style>
