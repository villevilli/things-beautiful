<script lang="ts">
import { onMount } from 'svelte';

    import {spring} from 'svelte/motion';
    let coords = spring({
        x: 50,
        y: 50,
        size:1,
        rot:0,
        r:0,
        g:0,
        b:0
    },{
        stiffness: 0.1,
        damping: 0.1
    });

    let height:number
    let widht:number

    onMount(() => function(){
        height = window.innerHeight
        widht = window.innerWidth
    })

    function randomLocation(){
        coords.set({
            x: Math.random()*height,
            y: Math.random()*widht,
            rot: Math.random()*360,
            size: Math.random()*4+1,
            r: Math.random()*100,
            g: Math.random()*100,
            b: Math.random()*100
        });
    }

    setInterval(randomLocation, 500)
</script>

<svelte:window bind:innerHeight={height} bind:innerWidth={widht} />

<h1 class="spin" 
    style="--x: {$coords.x}px;
    --y: {$coords.y}px;
    --r: {$coords.rot}deg;
    --s: {$coords.size};
    --red: {$coords.r};
    --gre: {$coords.g};
    --blu: {$coords.b};
">
Trolled!!
</h1>

<style>
    .spin{
        transform: translate(var(--x),var(--y)) rotate(var(--r)) scale(var(--s));
        color: rgb(var(--red), var(--gre), var(--blu));
        width: 0px;
    }
</style>