<script lang="ts">
    import { onMount } from 'svelte';
    import { load } from '@app/logic/main';
    let canvas: HTMLCanvasElement;

    let windowWidth: number;
    let windowHeight: number;

    onMount(() => {
        canvas.width = windowWidth;
        canvas.height = windowHeight;
        load(canvas);
    });
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />

<div id="container">
    <canvas bind:this={canvas} id="canvas" />
</div>

<style lang="scss">
    @import './home.scss';
</style>
