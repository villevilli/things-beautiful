<script lang="ts">
    import AnimatedDoubleArrow from "$lib/AnimatedDoubleArrow.svelte";
    import CardStacker from "$lib/CardStacker.svelte";
    import { onMount } from "svelte";
    import { scroll } from "$lib/store";


    let m = { x: 0, y: 0 };
    let contentScrollY
    let mainDiv
    let showCards = false;

    function getCards(){
        showCards = true;
    }

    scroll.subscribe( value => {
        contentScrollY = value;
    });

    function handleMouseMove(event) {
		m.x = event.clientX;
		m.y = event.clientY;
	}

    $: if(contentScrollY <= 0){
        try{
            window.location.href = '#';
        }catch{}
    }
</script>

<svelte:head>
	<meta name="description" content="Things, a project about associating things to questions.">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="Things">
    <meta name="twitter:description" content="Things, a project about associating things to questions.">
</svelte:head>

<svelte:body on:mousemove={handleMouseMove} />

<div class="center main" bind:this={mainDiv}>
    <section style="--y-offset: {contentScrollY/1.4}px">
        <div class="front" >
            <div class="frontContainer">
                <h1>Things!</h1>
                <button class="getThing" on:click={() => getCards()}>Teach!</button>
            </div>
            
        </div>
        <a href="#main-content" class="material-icons expandSymbol"><AnimatedDoubleArrow/></a>
    </section>


    <section class="main content" id="main-content">
        <article class="article">
            <h1>Lorem Ipsum</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat. Pulvinar etiam non quam lacus. Sed nisi lacus sed viverra tellus in hac habitasse platea. Facilisi nullam vehicula ipsum a. Sed enim ut sem viverra aliquet. Mus mauris vitae ultricies leo integer malesuada nunc vel. Elit at imperdiet dui accumsan sit amet. Quis blandit turpis cursus in hac habitasse platea dictumst. Vitae nunc sed velit dignissim sodales. Nisi vitae suscipit tellus mauris a diam maecenas sed. Arcu cursus vitae congue mauris. Non diam phasellus vestibulum lorem sed risus ultricies tristique. Vulputate sapien nec sagittis aliquam malesuada bibendum. Purus sit amet luctus venenatis lectus magna. Sodales neque sodales ut etiam sit. Habitasse platea dictumst quisque sagittis purus. A pellentesque sit amet porttitor eget. Eget velit aliquet sagittis id consectetur purus ut faucibus. Porta nibh venenatis cras sed felis eget.
            </p>
            <p>
                Adipiscing diam donec adipiscing tristique. Fames ac turpis egestas maecenas pharetra convallis. Eget sit amet tellus cras adipiscing. Nulla pharetra diam sit amet. Vel facilisis volutpat est velit egestas. Quisque sagittis purus sit amet volutpat consequat mauris nunc. Quam lacus suspendisse faucibus interdum. Duis ut diam quam nulla porttitor massa id. Phasellus faucibus scelerisque eleifend donec. Ipsum dolor sit amet consectetur. Sit amet nisl purus in mollis nunc. Ultrices neque ornare aenean euismod elementum nisi quis. Quis commodo odio aenean sed adipiscing diam. Sem et tortor consequat id porta nibh venenatis. Suspendisse in est ante in nibh mauris cursus. Orci sagittis eu volutpat odio facilisis mauris. A lacus vestibulum sed arcu non odio euismod. Egestas purus viverra accumsan in nisl nisi scelerisque. Hac habitasse platea dictumst quisque sagittis purus sit. Eu ultrices vitae auctor eu augue. 
            </p>
            <p>
                Id ornare arcu odio ut sem nulla. Mattis pellentesque id nibh tortor id aliquet lectus. Nibh tortor id aliquet lectus. Cras tincidunt lobortis feugiat vivamus at. Viverra mauris in aliquam sem. Pretium fusce id velit ut tortor pretium viverra. Malesuada fames ac turpis egestas sed tempus urna et. Amet cursus sit amet dictum sit. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum. Morbi tempus iaculis urna id volutpat lacus. Aliquam vestibulum morbi blandit cursus risus at ultrices mi. Vulputate mi sit amet mauris commodo quis. Dignissim enim sit amet venenatis urna. Lacus luctus accumsan tortor posuere ac. Erat pellentesque adipiscing commodo elit at imperdiet dui accumsan.
            </p>
        </article>
    </section>

</div>

{#if showCards}
    <CardStacker on:close={() => showCards = false}/>
{/if}

<style>
    *{
        box-sizing: border-box;
        position: relative;
    }

    section{
        scroll-snap-align: start;
        scroll-padding: 0;
    }

    .front{
        transition: 1s;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        height: calc(100vh - 160px);
        position: relative;
    }
    .frontContainer{
        padding-bottom: 200px;
        z-index: 1;
        transform: translate(0, var(--y-offset));
    }

    .center{
        text-align: center;
    }
    .article{
        border-radius: 50% 50% / 80px;
        box-shadow: rgb(44, 44, 44) 0px 0px 10px 0px;
        padding: 40px;
        z-index: 3;
        z-index: 200;
        min-height: 200vh;
        background-color: var(--dark-bg-color);
    }
    .getThing{
        min-height: 60px;
        min-width: 180px;
        transition: 0.2s;
        border-radius: 4px;
        font-size: 2rem;
        font-weight: 600;
        background: rgb(247,0,190);
		background: linear-gradient(152deg, rgba(247,0,190,1) 0%, rgba(0,212,255,1) 100%);
        background-size: 200%;
        padding: 6px;
        animation: gradientAnimation 5s ease infinite;
        box-shadow:  0px 0px 10px 5px rgb(85, 85, 85);
        text-shadow: 0px 0px 5px rgb(0, 0, 0);
    }
    .getThing:hover{
        transition: 0.2s;
        padding: 10px;
    }
    .getThing:active{
        font-size: 1.8rem;
        transition: 0.2s;
        box-shadow: inset 0px 0px 10px 5px rgb(85, 85, 85);
    }

    .expandSymbol{
        color: white;
        font-style: normal;
        transform: translate(0px, calc(-200px - var(--y-offset)));
        text-decoration: none;
    }

    @keyframes gradientAnimation{
        0%{background-position:0% 52%}
        50%{background-position:100% 49%}
        100%{background-position:0% 52%}
    }
</style>
