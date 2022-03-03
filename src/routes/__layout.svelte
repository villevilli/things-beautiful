<script lang="ts">
    import { scroll } from '$lib/store';

    import '../app.css';

    let SideMenuOpen = false;
    let sideMenuLocation = 0;

    let menuitems = [
        {href: '/', title: 'Teach'},
        {href: '/visualise', title: 'Visualise'},
    ]
    
    function toggleMenu(){
        SideMenuOpen = !SideMenuOpen;
    }

    $: if(SideMenuOpen){
        sideMenuLocation = 360
    }else{
        sideMenuLocation = 0
    }
    scroll.update
</script>

<div class="navMenu">
    <button class="material-icons" on:click={() => toggleMenu()}>menu</button>
    <p></p>
</div>
<div class="sideMenu" style="--x: {sideMenuLocation}px" >
    <div class="sideMenuTop">
        <h2>Menu</h2>
        <button class="material-icons" on:click={() => toggleMenu()}>close</button>
    </div>
    {#each menuitems as {href, title}}
        <a on:click={() => SideMenuOpen = false} class="menuItem" href={href}>{title} <span class="material-icons">arrow_right</span></a>
    {/each}
</div>

<main class="main" on:scroll={(e) => scroll.set(e.target.scrollTop)}>
    <slot/>
</main>




<style lang="scss">
    *{
        box-sizing: border-box;
    }
    .main{
        height: calc(100% - 60px);
        overflow-y: scroll;
        scroll-padding-top: 50px;
        scroll-snap-type: both mandatory;
        scroll-behavior: smooth;
        &::-webkit-scrollbar {
            width: 8px;
        }

        &::-webkit-scrollbar-track-piece {
            padding: 1px;
            background-color: #0f0f0f;
        }

        &::-webkit-scrollbar-thumb:vertical {
            background-color: #555555;
        }
        &::-webkit-scrollbar-thumb:hover {
            width: 6px;
            background-color: #7a7a7a;
        }
    }


    .material-icons{
        height: 40px;
    }
    .navMenu{
        padding-top: 0;
        box-sizing: border-box;
        padding-bottom: 0;
        padding-left: 20px;
        padding-right: 20px;
        justify-content: space-between;
        align-items: center;
        width: calc(100%);
        height: 60px;
        background-color: rgb(20, 20, 20);
        box-shadow: -0px 1px 6px 6px rgb(15, 15, 15);
        display: flex;
        flex-direction: row;


    }

    .menuItem{
        transition: 0.1s;
        color: white;
        box-sizing: border-box;
        width: calc(100% - 4px);
        padding-left: 20px;
        padding-right: 50px;
        padding-top: 10px;
        padding-bottom: 10px;
        font-size: 20px;
        text-decoration: none;
        margin: 2px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .menuItem:hover{
        transition: 0.1s;
        background-color: rgba(0, 0, 0, 0.4);
    }
    .menuItem:active{
        box-shadow: inset black 0px 0px 6px 2px;
    }
    .menuItem  .material-icons{
        transition: 0.2s;
    }
    .menuItem:hover  .material-icons{
        transition: 0.2s;
        transform: translate(20px);
    }

    .sideMenu{
        z-index: 2000;
        position: fixed;
        box-sizing: border-box;
        top: 0px;
        left: -360px;
        transition: 0.3s;
        height: 100%;
        width: 360px;
        background-color: var(--dark-navbar-color);
        transform: translate(var(--x), 0);
        display: flex;
        flex-direction: column;
        max-width: 80%;
    }
    .sideMenuTop{
        padding-left: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-right: 15px;
    }
    @media screen and (max-width: 900px){
        .navMenu{
            height: 80px;
        }
        .main{
            height: calc(100% - 80px);
        }
    }
</style>
