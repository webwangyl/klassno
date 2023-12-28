<template>
    <div class="introduce">
        <div class="glass-container">
            <div class="frosted-glass glass-1">
                <p class="page-title">PROFESSION</p>
                <p
                    class="info-text"
                    v-breakup="{ num: 10, classname: 'profession-first' }"
                >
                    I graduated in July 2020. Before graduation, I had practiced
                    in AsiaInfo for about half a year and started my Vue journey
                    here.<br />
                </p>
                <p
                    class="info-text"
                    v-breakup="{ num: 10, classname: 'profession-second' }"
                >
                    The first company to officially work is in Kelan, but it is
                    not suitable for me. It uses Vue and weex technologies and
                    does most mobile projects. In terms of work arrangement, I
                    will do more work on weex. I think that working on weex will
                    affect my future development, so I came to another company,
                    huaun, in May 2021.
                </p>
                <p
                    class="info-text"
                    v-breakup="{ num: 10, classname: 'profession-third' }"
                >
                    This is a start-up company in network security. My
                    colleagues and leaders are very nice. Because is start-up
                    companies, I can independently take charge of the whole Web
                    project, from framework construction to specific business.
                    This is a good training opportunity for me who has just
                    graduated. The technology used here is nuxt, and all
                    projects are on the PC side. Most of them are on the
                    management, and there are also some SaaS side projects, The
                    company's architecture is developing in the direction of
                    cloud nativity. For this reason, I also learned docker and
                    qiankun technologies.Although it can't satisfy my persistent
                    pursuit of cool web, I still like it here.
                </p>
                <div
                    v-if="skipProfession"
                    class="skip-text"
                    @click="skip('profession')"
                >
                    skip
                </div>
                <arrow-button class="button-p" @touch="next"></arrow-button>
            </div>
            <div class="frosted-glass glass-2">
                <p class="page-title">HOBBY</p>
                <p
                    class="info-text"
                    v-breakup="{ num: 10, classname: 'hobby-first' }"
                >
                    Like the music you hear, my favorite game is minecraft.I
                    like its freedom, creativity, expansibility and powerful
                    Redstone Technology(although I am a novice in Redstone).I
                    like to listen to comfortable music, make a cup of tea and
                    enjoy the process of creating something I want in a
                    leisurely afternoon.
                </p>
                <p
                    class="info-text"
                    v-breakup="{ num: 10, classname: 'hobby-second' }"
                >
                    My favorite cartoon is one piece. I have seen it since
                    junior high school and have seen it at least four times.
                    I've been crying for countless times. If my friends have not
                    seen it, they will usually be recommended by me to see it
                    many times. Ha ha.
                </p>
                <p
                    class="info-text"
                    v-breakup="{ num: 10, classname: 'hobby-third' }"
                >
                    On the web, there is no doubt that I like cool, animation,
                    etc. a cool page will stimulate my desire to explore and
                    make me want to complete it myself (most of them will fail
                    haha)
                </p>
                <div v-if="skipHobby" class="skip-text" @click="skip('hobby')">
                    skip
                </div>
                <arrow-button
                    class="button-bp"
                    type="left"
                    @touch="back"
                ></arrow-button>
            </div>
        </div>
        <img class="introduce-bg" src="@/assets/images/introduce.png" alt="" />
    </div>
</template>

<script lang="ts" setup>
import gsap from "gsap";
import { ref, onMounted } from "vue";
import ArrowButton from "@/components/base/arrowButton.vue";

let skipProfession = ref(true);
let skipHobby = ref(true);
let isFirst = false; // 首次播放动画

let profession;
let hobby;

const next = () => {
    gsap.to(".frosted-glass", {
        x:
            "-=" +
            (document.querySelector(".frosted-glass") as HTMLElement)
                .offsetWidth,
        duration: 0.5,
    });
    if (!isFirst) {
        isFirst = true;
        hobby = gsap.timeline({
            scrollTrigger: {
                trigger: ".glass-container",
                scroller: ".main",
                start: "top 60%",
                end: "bottom top",
                toggleActions: "play pause resume pause",
            },
            onComplete: () => (skipHobby.value = false),
        });
        hobby
            .from(
                ".hobby-first",
                {
                    opacity: 0,
                    duration: 0.1,
                    stagger: 0.1,
                },
                "+=.5"
            )
            .from(
                ".hobby-second",
                {
                    opacity: 0,
                    duration: 0.1,
                    stagger: 0.1,
                },
                "+=.2"
            )
            .from(
                ".hobby-third",
                {
                    opacity: 0,
                    duration: 0.1,
                    stagger: 0.1,
                },
                "+=.2"
            );
    }
};

const back = () => {
    gsap.to(".frosted-glass", {
        x:
            "+=" +
            (document.querySelector(".frosted-glass") as HTMLElement)
                .offsetWidth,
        duration: 0.5,
    });
};

const skip = (key: string) => {
    switch (key) {
        case "profession":
            if (profession) profession.timeScale(20);
            break;
        case "hobby":
            if (hobby) hobby.timeScale(20);
            break;
    }
};

const init = () => {
    profession = gsap.timeline({
        scrollTrigger: {
            trigger: ".glass-container",
            scroller: ".main",
            start: "top 60%",
            end: "bottom top",
            toggleActions: "play pause resume pause",
        },
        onComplete: () => (skipProfession.value = false),
    });
    gsap.from(".glass-container", {
        scrollTrigger: {
            trigger: ".glass-container",
            scroller: ".main",
            scrub: 1,
            start: "top bottom",
            end: "bottom 60%",
            toggleActions: "restart pause resume pause",
        },
        x: 200,
        scale: 0.1,
        rotation: 180,
        duration: 1,
    });
    profession
        .from(".profession-first", { opacity: 0, duration: 0.1, stagger: 0.1 })
        .from(
            ".profession-second",
            {
                opacity: 0,
                duration: 0.1,
                stagger: 0.1,
            },
            "+=.2"
        )
        .from(
            ".profession-third",
            {
                opacity: 0,
                duration: 0.1,
                stagger: 0.1,
            },
            "+=.2"
        );
};

onMounted(() => init());
</script>

<style lang="scss" scoped>
.introduce {
    position: relative;
    .introduce-bg {
        position: absolute;
        top: 20%;
        transform: translateY(-50%);
        right: 100px;
        height: 600px;
        animation: slow-translate 10s infinite;
    }
    .glass-container {
        position: absolute;
        width: 800px;
        height: 500px;
        overflow: hidden;
        top: 50%;
        left: 100px;
        display: flex;
        transform: translate(0, -50%);
        box-shadow: 8px 8px 4px 0 #5bbafe;
    }
    .frosted-glass {
        width: 100%;
        height: 500px;
        display: flex;
        flex-shrink: 0;
        flex-direction: column;
        position: relative;
        padding: 12px;
        align-items: center;
        background-image: linear-gradient(161deg, #fdcd9b -20%, #5bbafe 85%);
        background-position: bottom 90%;
        .info-text {
            color: var(--color-inside);
        }
        .button-p {
            position: absolute;
            bottom: 20px;
            right: 20px;
        }
        .button-bp {
            position: absolute;
            bottom: 20px;
            left: 20px;
        }
        .skip-text {
            width: 40px;
            height: 20px;
            border-radius: 10px;
            background-color: var(--color-theme);
            line-height: 20px;
            text-align: center;
            font-weight: 100;
            letter-spacing: 0.5px;
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            color: var(--noice-text);
            cursor: pointer;
        }
    }
}

@media screen and (min-width: 1680px) {
    .introduce-bg {
        right: 10% !important;
    }
}
</style>
