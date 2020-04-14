<template>
    <div class="etapa" @click="toggleShowTramit">
        <div class="periodoEtapaTramit">
            {{ etapa.periodo }}
        </div>
        <div class="label anterior">
            {{ etapa.number }}
            <span>{{ etapa.title }}</span>
        </div>
        <div class="content" :class="showTramitacao ? 'open' : 'close'">
            <div class="subtitle">
                <p>
                    {{ etapa.subtitle }}
                </p>
            </div>
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Tramitacao',
    data () {
        return {
            showTramitacao: false
        }
    },
    props: {
        etapa: {
            type: Object,
            required: true
        }
    },
    methods: {
        toggleShowTramit () {
            this.showTramitacao = !this.showTramitacao
        }
    },
}
</script>

<style lang="scss" scoped>
.etapa {
    border-top-width: 0.25em;
    border-top-style: solid;
    position: relative;
    display: flex;
    flex-direction: column;

    &:hover {
        cursor: pointer;
    }

    .periodoEtapaTramit {
        color: rgba(0, 0, 0, 0.2);
        text-transform: uppercase;
        position: absolute;
        right: 0;
        line-height: 16px;
        font-size: 10px;
    }

    .label {
        border: 0;
        overflow: hidden;
        color: rgba(0, 0, 0, 0.4);
        display: flex;
        flex-direction: row;
        position: relative;
        line-height: 4.5em;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        &:active {
            background: #ececec;
        }

        span {
            font-weight: 700;
            text-transform: uppercase;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 0 4px;
            max-width: calc(100% - 48px);
        }
    }
    .anterior::after {
        font-family: "Material Icons";
        font-size: 24px;
        content: "check_box";
        position: absolute;
        right: 0;
    }
    .atual {
        color: #333333;
    }
    .atual::after {
        font-family: "Material Icons";
        font-size: 24px;
        content: "indeterminate_check_box";
        position: absolute;
        right: 0;
    }
    .posterior::after {
        font-family: "Material Icons";
        font-size: 24px;
        content: "check_box_outline_blank";
        position: absolute;
        right: 0;
    }    

    .tramitTransit-enter,
    .tramitTransit-leave-to {
        max-height: 0;
        opacity: 0;
        transition: all 0.2s ease-in;
        margin: 0;
        padding: 0;
    }
    .tramitTransit-enter-to,
    .tramitTransit-leave {
        max-height: 150em;
        transition: all 0.2s ease-in;
    }
    .tramitTransit-enter-active,
    .tramitTransit-leave-active {
        transition: all 0.2s ease-in;
    }

    .subtitle {
        p {
            margin: 0 0 24px 0;
            font-size: 13px;
            line-height: 1.6;
            font-weight: 1000;
            color: #333333;
        }
    }
}
.open {
    display: block;
}
.close {
    display: none;
}
</style>