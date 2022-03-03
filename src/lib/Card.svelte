<script lang="ts">	
    import { fly, scale } from 'svelte/transition';
	import { spring } from 'svelte/motion';
	import { sineIn } from 'svelte/easing'

    export let thing;
    export let question;
	export let id;
	export let answer;

	export function moveBy(x:number,y:number) {
		location = { x : location.x + x, y: location.y +y};
		coords.set({ x: location.x, y: location.y });
	}
	export function setCoords(x:number, y:number) {
		location = { x : x, y : y};
		coords.set({ x: location.x, y: location.y });
	}
	export function startMoving(){
		coords.stiffness = 1
		coords.damping = 1
		coords.precision = 1
	}
	export function stopMoving(velocity){
		coords.damping = 0.2
		coords.stiffness = 0.07
		coords.precision =  0.01

		if(Math.abs(velocity.x) > 120){
			goAway(velocity.x, velocity.y)
		}
	}
	export function comeBack(){
		visible = true;
	}
	
	let moving = false;
	let location = { x: 0, y: 0}
	let exitSpeed = { x: 0, y: 0}
	let visible = true; 

	let coords = spring({ x: 0, y: 0 },{
		damping : 0.5,
		stiffness : 0.1
	});

    function goAway(xSpeed:number, ySpeed:number = 0,thisAnswer){
        if (thisAnswer != undefined) {
			answer = thisAnswer
		} else if(xSpeed > 0){
			answer = 'yes'
		}
		else{
			answer = 'no'
		}
		exitSpeed = {x: xSpeed, y: ySpeed}
		visible = false
    }

	function swipeAway(node, params){
		const existingTransform = getComputedStyle(node).transform.replace('none', '');
		return{
			css: (t,u) => `
				transform: ${existingTransform} translate(${params.x/2*u}px, ${params.y/2*u}px) rotate(${params.x/12*u}deg) scale(${t/5+0.725});
				opacity: ${t};
				`
		};
	}

</script>

{#if visible}

	<div class="card draggable"
		out:swipeAway="{{
			duration: 500,
			x : exitSpeed.x,
			y : exitSpeed.y,
			opacity : 0,
		}}"	
		in:scale
		id="{id}"
		style="--x: {$coords.x}px; --y: {$coords.y}px; --rotation: {$coords.x/8}deg;"
	>
		<div class="card_content">
			<h1 class="cardTitle">{thing}</h1>
			<p class="cardText">{question}</p>
			<div class="buttonContainer MaterialIcons">
				<button on:click={() => goAway(-400,100)} class="containerButton no material-icons">close</button>
				<button on:click={() => goAway(0,3000,'maybe')} class="containerButton maybe">?</button>			
				<button on:click={() => goAway(400,100)} class="containerButton yes material-icons">done</button>
			</div>    
		</div>
	</div>

{/if}

<style>
	.cardTitle {
		font-size: 38px;
		margin: 0px;
		top: 0px;
	}
	.cardText {
		font-size: 24px;
		margin: 0px;
		margin-top: 8px;
		top: 20%;
		position: relative;
	}
	.card {
		border: none;
		background: rgb(247,0,190);
		background: linear-gradient(152deg, rgba(247,0,190,1) 0%, rgba(0,212,255,1) 100%);
		border-radius: 20px;
		padding: 30px;
        width: 60%;
        position: fixed;
		transform: translate(var(--x),var(--y)) rotate(var(--rotation));
		aspect-ratio: 1;
		max-width: 300px;
	}
	.draggable {
		-ms-touch-action: none;
		touch-action: none;
		user-select: none;
		
	}
	.card_content {
		height: 100%;
		text-align: center;
	}
	.buttonContainer {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		width: 100%;
		height: 20%;
		bottom: 10px;
		left: 0%;
	}
	.containerButton {
		margin: 10px;
		border: none;
		font-size: 2rem;
		border-radius: 50%;
		transition: all 0.2s;
		height: 100%;
		aspect-ratio: 1;
	}

	.yes {
		background-color:rgb(37, 255, 37);
		transition: all 0.2s;
	}
	.yes:hover {
		background-color: rgb(255, 103, 103);
	}
	.yes:active {
		box-shadow: inset 2px 2px 6px  black;
	}

	.no {
		background-color:rgb(255, 71, 71);
	}
	.no:hover {
		background-color:rgb(255, 118, 118);
	}
	.no:active {
		box-shadow: inset -2px 2px 6px  black;
	}


	.maybe {
		background-color:rgb(48, 190, 255);
	}
	.maybe:hover {
		background-color: rgb(104, 207, 255);
	}
	.maybe:active{
		box-shadow: inset 0px 2px 6px  black;
	}

</style>