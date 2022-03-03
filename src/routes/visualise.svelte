<script lang="ts">
	import { Network } from "vis-network";
	import { DataSet, DataView, createNewDataPipeFrom} from "vis-data"
	import "vis-network/styles/vis-network.css";
	import { onMount } from "svelte";
	import Loading from '$lib/loading.svelte'
	import { scale } from 'svelte/transition'

	let visualisationContainer
	let nodes = new DataSet()
	let edges = new DataSet()
	let networkData
	let selection
	let network
	let nawNetwork
	let allConnectedNodes = []

	let navNetworkContainer
	let navNetworkData = {}
	let navContainerNodes = new DataView(nodes, {
		filter: function(item){
			try {
				let nodes = allConnectedNodes;
				
				for (let i = 0; i < nodes.length; i++) {			
					let node = nodes[i];
					const nodeid = node;
					
					if (item.id == nodeid) {
						return(true)
				}
			}
			} catch (error){}
		},
		fields: ['label','id']
	})
	let navContainerEdges = new DataView(edges, {
		filter: function(item){
			try {
				for (let i = 0; i < selection.edges.length; i++) {
					const edgeid = selection.edges[i];
					if (item.id == edgeid) {
						return(true)
				}
			}
			} catch (error){}
		},
		fields: ['from','to']
	})

	let isStabilising = true

	navContainerNodes.on('*', function(){
		console.log(navContainerNodes.get())
	})

	const options = {
		layout: {
			improvedLayout:false
		},
		physics:{
			stabilization: {

			},
		},
		nodes:{
			color:{
				border:'white',
				background:'#fc3ca2',

			},
			chosen:{
				node: function(values, id, selected, hovering) {
					values.size = 2;
					values.shadow = true;
					values.shadowColor = 'rgb(255,0,0)'
					values.shadowX = 0;
					values.shadowY = 0;
					values.borderColor = 'red';
					values.color = '#fc3cec';
					values.Size = 20;
				}
			}
		},
		edges:{
			chosen:{
				edge: function(values, id, selected, hovering){
					values.color = 'red';
					values.width = '2'
				}
			}
		}
	};

	function networkClick(eventId){
		let connectedNodes = network.getConnectedNodes(eventId)
		allConnectedNodes = []

		connectedNodes.push(eventId)
		network.selectNodes(connectedNodes)

		selection = network.getSelection()

		for (let i = 1; i < 2; i++) {
            for (let j = 0; j < connectedNodes.length; j++) {
              allConnectedNodes = allConnectedNodes.concat(
                network.getConnectedNodes(connectedNodes[j])
              );
            }
        }

		for(let i = 0; i<selection.nodes.length; i++){
			let node = selection.nodes[i]
		}

		for(let i = 0; i<selection.edges.length; i++){
			let edge = selection.edges[i]
		}

		network.fit({
			nodes: connectedNodes,
			animation: true
		})

		navContainerNodes.refresh();
		navContainerEdges.refresh();


		nawNetwork.setData({
			nodes: navContainerNodes.get(),
			edges: navContainerEdges.get()
		})

		nawNetwork.selectNodes([eventId])
	}

	onMount(() => {
		fetch('/api/networkData')
		.then(response => response.json()
		.then(data => {
			nodes.update(data.things)
			edges.update(data.links)

			networkData = {
				nodes: nodes,
				edges: edges
			}
			network = new Network(visualisationContainer, networkData, options);
			nawNetwork = new Network(navNetworkContainer, navNetworkData, options)

			network.on("stabilizationIterationsDone", function (){
				isStabilising = false;
			});

			network.on("click", function(event){

				if (event.nodes.length > 0){
					let eventNode = event.nodes[0]

					networkClick(eventNode)
				}
			});

			nawNetwork.on("click", function(event){
				if (event.nodes.length > 0){
					let eventNode = event.nodes[0]

					networkClick(eventNode)
				}
			})
		}));
	})
</script>

{#if isStabilising}
	<div transition:scale class="loading">
		<Loading/>
	</div>
{/if}
<div class="networkContainer">
	<div class="network" bind:this={visualisationContainer}></div>
	<div class="nawNetwork" bind:this={navNetworkContainer}></div>
</div>


<style lang="scss">
	*{
		box-sizing: border-box;
	}
	.networkContainer{
		display: flex;
		width: 100%;
		height: 100%;
	}
	.network{
		width: 50%;
		height: 100%;
	}
	.nawNetwork{
		width: 50%;
		height: 100%;
		border: solid rgb(10, 10, 10) 1px;
		background-color: var(--dark-bg-color);
		border-radius: 5px;
		box-shadow: rgb(48, 48, 48) 0px 0px 5px 0px;
	}
	.loading{
		transform: translate(0,-60px);
		width: 100%;
		height: 100%;
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	@media (max-aspect-ratio: 1/1){
		.networkContainer{
			flex-direction: column;
		}
		.nawNetwork{
			width: 100%;
			height: 50%;
		}
		.network{
			width: 100%;
			height: 50%;
		}
	}
</style>