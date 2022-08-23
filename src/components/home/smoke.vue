<template>
    <div class="container">
        <div class="circle-area">
            <div class="circle"></div>
            <svg>
                <filter id="wavy">
                    <feTurbulence x="0" y="0" baseFrequency="0.09" numOctaves="5" seed="2">
                        <animate attributeName="baseFrequency" dur="60s" values="0.02;0.05;0.02" repeatCount="indefinite"></animate>
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" scale="30"></feDisplacementMap>
                </filter>
            </svg>
        </div>
        <div class="text-area">
            <slot></slot>
        </div>
    </div>
</template>

<script ></script>

<style lang="scss" scoped>
.container {
    position: relative;
    opacity: 0.4;
    .circle-area {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .circle {
            position: relative;
            width: 800px;
            height: 800px;
            filter: url(#wavy) blur(1px);
        }
        .circle::before {
            content: '';
            position: absolute;
            top: 100px;
            left: 100px;
            right: 100px;
            bottom: 100px;
            border: 20px solid #fff;
            border-radius: 50%;
            box-shadow: 0 0 50px #00f, inset 0 0 50px #00f;
            -webkit-box-reflect: below 10px linear-gradient(transparent, transparent, #0002);
            animation: animate 5s linear infinite;
        }
        .circle::after {
            content: '';
            position: absolute;
            top: 100px;
            left: 100px;
            right: 100px;
            bottom: 100px;
            border: 20px solid #fff;
            border-radius: 50%;
            box-shadow: 0 0 50px #fff, inset 0 0 50px #fff;
            -webkit-box-reflect: below 10px linear-gradient(transparent, transparent, #0002);
        }
    }
    .text-area {
        position: absolute;
        top: calc(50% - 100px);
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
    }
}

@keyframes animate {
    0% {
        box-shadow: 0 0 50px #00f, inset 0 0 50px #00f;
        filter: hue-rotate(0deg);
    }
    20% {
        box-shadow: 0 0 60px #00f, inset 0 0 50px #00f;
    }
    40% {
        box-shadow: 0 0 40px #00f, inset 0 0 50px #00f;
    }
    60% {
        box-shadow: 0 0 80px #00f, inset 0 0 50px #00f;
    }
    80% {
        box-shadow: 0 0 100px #00f, inset 0 0 50px #00f;
    }
    100% {
        box-shadow: 0 0 50px #00f, inset 0 0 50px #00f;
        filter: hue-rotate(360deg);
    }
}
</style>