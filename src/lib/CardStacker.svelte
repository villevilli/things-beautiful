<script lang="ts">
	import '@interactjs/auto-start';
	import '@interactjs/actions/drag';
	import interact from '@interactjs/interact';
	import { onMount, createEventDispatcher, onDestroy, afterUpdate } from "svelte";
	import { fade } from "svelte/transition";

	import Card from "$lib/Card.svelte";

	const dispatch = createEventDispatcher();

	let draggable = interact(".draggable");
	let currentThing = 'Loading';
	let cardContainer;
	let progress = 0
	let questions = [];
	let cards: any[] = [];

	function AnotherThing(){
		fetch('/api/randomThing')
			.then(response => response.json()
			.then(data => {
				currentThing = data.name
			}));
	}

	AnotherThing();

	fetch('/api/questions')
		.then(response => response.json()
		.then(data => {
			questions = Object.values(data)[0]
			/*questions = [
				{
				"id": 1,
				"question": "Does it bring joy to someone?"
				}
			]*/
		}));

	onMount(() => {
		draggable.draggable({
			ignoreFrom: '.containerButton',
			listeners: {
				start(event) {
					const target = event.target;
					const targetid = target.id;
					const card = cards[targetid];

					card.startMoving();
				},
				move(event) {
					const target = event.target;
					const targetid = target.id;
					const card = cards[targetid];
					card.moveBy(event.dx, event.dy);
				},
				end(event) {
					const target = event.target;
					const targetid = target.id;
					const card = cards[targetid];

					card.stopMoving(event.velocity);
					card.setCoords(0, 0);
				},
			},
		});
	});

	onDestroy(() => {
		draggable = null;
	});

	function undo() {
		let toBringBack: number;
		try {
			toBringBack = Number(cardContainer.lastElementChild.id) + 1;
		} catch {
			toBringBack = 0;
		}

		cards[toBringBack].comeBack();
	}

	function close() {
		dispatch("close");
	}

	function submitQuestions() {
		for (let i = 0; i < questions.length; i++) {
			const element = questions[i];

			let url = 'http://espoonkopsu.fi:8020/data/teach/?thing='+currentThing+'&question=1&answer='+element.id
			let xhr = new XMLHttpRequest();
			xhr.open('POST', url, true)
			xhr.send()
		}
	}

	function reset() {
		submitQuestions();
		close();
	}

	afterUpdate(() => {
		progress = questions.length-cardContainer.childElementCount
	})
</script>

<div transition:fade class="overlay center">
		<div class="cardContainer" >
			<div class="cards" bind:this={cardContainer}>
				<div class="card">
					<h1>Questions Done!</h1>
					<button on:click={reset}>Submit</button>
				</div>

				{#each questions as { question,answer }, i}
					<Card bind:answer={answer} bind:this={cards[i]} thing={currentThing} {question} id={i} />
				{/each}
			</div>
			<progress value={progress} max={questions.length}></progress>
		</div>

	<div class="footer">
		<button class="close button material-icons" on:click={close}>close</button>
		<button class="undo button material-icons" on:click={() => undo()}>undo</button>
	</div>
</div>

<style lang="scss">
	@mixin progress-filled-content(){
		border-radius: 10px;
		background: linear-gradient(90deg,rgb(247,0,190) 0%, rgb(0,212,255) 100%);
		background-size: 300px;
		border: none;
		transition: 1s;
	}

	.card {
		border: none;
		background: rgb(247,0,190);
		background: linear-gradient(152deg, rgba(247,0,190,1) 0%, rgba(0,212,255,1) 100%);
		border-radius: 20px;
		padding: 30px;
        width: 60%;
        position: fixed;
		aspect-ratio: 1;
		max-width: 300px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		button{
			border-radius: 4px;
			font-size: 32px;
			border: white solid 2px;
			background-color: rgb(0, 165, 69);
			padding: 5px 25px;
			box-shadow: white 0px 0px 6px;
			transition: 200ms;
			&:hover{
				transition: 200ms;
				padding: 10px 35px;
				background-color: rgb(0, 207, 86);
			}
			&:active{
				transition: 200ms;
				box-shadow: inset rgb(90, 90, 90) 0px 0px 6px;
			}
		}
	}

	.cardContainer {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	order: 2;
	width: 100%;
	height: 100%;
	transition: 1s;
		progress{
			border-radius: 10px;
			background-color: rgb(46, 46, 46);
			box-shadow: inset 0px 0px 3px rgb(15, 15, 15);
			border: none;
			width: 300px;
			&::-moz-progress-bar{
				@include progress-filled-content();
			}
			&::-webkit-progress-value{
				@include progress-filled-content();
			}
		}
		.cards{
			justify-content: center;
			align-content: center;
			display: flex;

			width: 100%;
			height: 380px;
		}
	}

	.overlay {
		z-index: 300;
		top: 0px;
		left: 0px;
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
	}
	.footer {
		order: 1;
		justify-content: space-between;
		align-items: center;
		width: 80px;
		height: calc(100% - 40px);
		background-color: var(--dark-navbar-color);
		box-shadow: -0px 1px 6px 6px rgb(15, 15, 15);
		display: flex;
		flex-direction: column;
		padding-bottom: 20px;
		padding-top: 20px;
	}

	.button {
		margin: 0;
		font-size: 38px;
		color: white;
		background: none;
		border: none;
		padding: 0;
	}
	.button:hover {
		margin: 0;
		font-size: 38px;
		color: white;
		background: none;
		border: none;
		padding: 0;
	}
	.button:active {
		background: none;
		transform: translate(3px, 3px);
	}

	.undo:hover {
		animation: spin 0.3s reverse ease-in-out 1;
	}

	.close:hover {
		animation: spin 0.3s ease-in-out 1;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	.center {
		margin: 0px;
		align-items: center;
		justify-content: space-between;
		height: 100%;
		width: 100%;
		flex-grow: 200;
		display: flex;
		flex-direction: row;
	}
	@media screen and (max-width: 900px) {
		.cardContainer {
			width: 70%;
			grid-template-columns: 95%;
		}
		.center {
			margin: 0px;
			align-items: center;
			justify-content: center;
			height: 100%;
			display: flex;
			flex-direction: column;
		}
		.footer {
			order: 3;
			padding-top: 0;
			padding-bottom: 0;
			padding-left: 20px;
			padding-right: 20px;
			justify-content: space-between;
			align-items: center;
			width: calc(100% - 40px);
			height: 80px;
			box-shadow: -0px 1px 6px 6px rgb(15, 15, 15);
			display: flex;
			flex-direction: row-reverse;
		}
	}
</style>
