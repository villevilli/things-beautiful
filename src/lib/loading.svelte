<script lang="ts">

</script>

<svg height="150" width="150">
    <circle id="one" cx="20" cy="50" r="10" fill="white"/>
    <circle id="two" cx="50" cy="50" r="10" fill="white"/>
    <circle id="three" cx="80" cy="50" r="10" fill="white"/>
</svg>

<style lang="scss">
    @keyframes hop {
        0% {
            transform: translate(0px, 20px);
        }
        30% {
            transform: translate(0px, -20px) scale(1.3);
        }
        60%{
            transform: translate(0px, 0px);
        }
        100%{
            transform: translate(0px, 20px);
        }
    }
    @keyframes spin{
        from{
            transform: rotate(0deg);
        }
        to{
            transform: rotate(360deg);
        }
    }

    svg{

        animation: spin 2s ease-in-out infinite;

        circle{
            animation: hop 2s ease-in-out infinite;
            
            &#one{
                animation-delay: -1.333s;
            }
            &#two{
                animation-delay: -0.666s;
            }
            &#three{
                animation-delay: 0s;
            }
        }

    }
    

</style>