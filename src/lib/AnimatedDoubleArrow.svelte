<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="48px" viewBox="0 0 24 24" width="48px" fill="#ffffff">
    <g>
        <rect fill="none" height="48" width="48"/>
    </g>
    <g>
        <g class="ArrowGroup">
            <polygon class="Arrow1" points="6,17.59 7.41,19 12,14.42 16.59,19 18,17.59 12,11.59"/>
            <polygon class="Arrow2" points="6,11 7.41,12.41 12,7.83 16.59,12.41 18,11 12,5"/>
        </g>
    </g>
</svg>

<style lang="scss">
svg{
    overflow: visible;
    .ArrowGroup{
        animation: bounce 1.6s ease-in-out infinite;
    }

    polygon{
        &.Arrow2{
            animation: bounce 1.6s -0.3s ease-in-out infinite;
        }
    }
}
@keyframes bounce{
    0%{
        transform: translate(0px, 0px);
    }
    30%{
        transform: translate(0px, -5px);
    }
    60%{
        transform: translate(0px, 0px);
    }
}
</style>