<template>
  <div class="themes">
    <div class="arrow arrow--un-clicked" @click="openCloseThemes($event)"></div>
    <div class="switcher switcher--close">
      <input class="switcher__radio switcher__radio--light"
             type="radio"
             name="color-theme"
             value="light"
             aria-label="Светлая" @click="switchTheme($event)">
      <input class="switcher__radio switcher__radio--auto"
             type="radio"
             name="color-theme"
             value="auto"
             aria-label="Автоматическкая" @click="switchTheme($event)" checked>
      <input class="switcher__radio switcher__radio--dark"
             type="radio"
             name="color-theme"
             value="dark"
             aria-label="Темная" @click="switchTheme($event)">
      <div class="switcher__status"></div>
    </div>
  </div>
</template>

<script>
import debounce from "lodash/debounce";

export default {
  name: "ThemeSwitcher",
  data() {
    return {
      arrow: '.arrow',
      switcher: '.switcher',
      switcherRadioLight: '.switcher__radio--light',
      switcherRadioAuto: '.switcher__radio--auto',
      switcherRadioDark: '.switcher__radio--dark'
    }
  },
  methods: {
    openCloseThemes(event) {
      let arrow = document.querySelector(`${this.arrow}`);
      let switcher = document.querySelector(`${this.switcher}`);
      arrow.className = arrow.className.split(' ')[0];
      switcher.className = switcher.className.split(' ')[0];
      if (!this.arrowFlag && event.type !== 'scroll') {
        arrow.className += ' arrow--clicked';
        switcher.className += ' switcher--open';
        this.arrowFlag = !this.arrowFlag;
      }
      else if (this.arrowFlag || event.type === 'scroll') {
        arrow.className += ' arrow--un-clicked';
        switcher.className += ' switcher--close';
        this.arrowFlag = !this.arrowFlag;
      }
    },
    switchTheme(event) {
      if (this.eventValue !== event.target.value) {
        this.eventValue = event.target.value;
        if (localStorage.getItem('color-theme')) {
          if (event.target.value === 'auto') {
            localStorage.removeItem('color-theme');
            document.documentElement.setAttribute('data-theme', 'auto');
            return;
          }
          localStorage.setItem('color-theme', event.target.value);
          document.documentElement.setAttribute('data-theme', event.target.value);
        }
        else {
          localStorage.setItem('color-theme', event.target.value);
          document.documentElement.setAttribute('data-theme', event.target.value);
        }
      }
    }
  },
  mounted() {
    this.handleDebouncedScroll = debounce(this.openCloseThemes, 1);
    window.addEventListener('scroll', this.handleDebouncedScroll);
    if (localStorage.getItem('color-theme') === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      document.querySelector(`${this.switcherRadioLight}`).checked = 'checked';
    }
    else if (localStorage.getItem('color-theme') === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.querySelector(`${this.switcherRadioDark}`).checked = 'checked';
    }
    else {
      document.documentElement.setAttribute('data-theme', 'auto');
      document.querySelector(`${this.switcherRadioAuto}`).checked = 'checked';
    }
  }
}
</script>

<style>
:root {
  --invert-1: invert(100%);
  --invert-2: invert(0);
}

@media (prefers-color-scheme: dark) {
    :root {
      --invert-1: invert(0);
      --invert-2: invert(100%);
    }
  }

  [data-theme="light"] {
    --invert-1: invert(100%);
    --invert-2: invert(0);
  }

  [data-theme="dark"] {
    --invert-1: invert(0);
    --invert-2: invert(100%);
  }

  .themes {
    width: 100px;
    height: 38px;
  }

  .arrow {
    display: none;
    width: 36px;
    height: 36px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 24px;
    background-image: url('../assets/icons/arrow.svg');
    transform: rotate(90deg);
  }

  .arrow--un-clicked {
    margin-left: 0;
  }

  .arrow--clicked {
    margin-left: 0;
  }

  .switcher {
    position: relative;
    margin: 0;
    padding: 2px;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border: none;
    transition: 0.3s;
  }

  .switcher--close {
    margin-left: 0;
    opacity: 1;
  }

  .switcher--open {
    margin-left: 0;
    opacity: 1;
  }

  .switcher__legend {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .switcher__radio {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
    width: 32px;
    height: 32px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 24px;
    filter: var(--invert-2);
    transition: filter 0.3s ease-in;
  }

  .switcher__radio:focus {
    outline: none;
  }

  .switcher__radio--light {
    background-image: url('../assets/icons/light.svg');
  }

  .switcher__radio--auto {
    background-image: url('../assets/icons/auto.svg');
  }

  .switcher__radio--dark {
    background-image: url('../assets/icons/dark.svg');
  }

  .switcher__status {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100px;
    height: 36px;
    z-index: -1;
    box-shadow: 0 0 0 2px black;
    border-radius: 18px;
    background-color: honeydew;
    background-repeat: no-repeat;
    background-image: url('../assets/icons/status.svg');
    background-size: 32px;
    background-position: center;
    transition: background-position 0.3s ease-in, filter 0.3s ease-in;
  }

  .switcher__radio--light:checked ~ .switcher__status {
    background-position: left 2px center;
  }

  .switcher__radio--auto:checked ~ .switcher__status {
    background-position: center center;
  }

  .switcher__radio--dark:checked ~ .switcher__status {
    background-position: right 2px center;
  }

  .arrow {
    filter: var(--invert-2);
  }

  .switcher__radio {
    filter: var(--invert-2);
  }

  .switcher__radio:checked {
    filter: var(--invert-1);
  }

  .switcher__status {
    filter: var(--invert-2);
  }

  @media screen and (max-width: 720px) {
    .themes {
      width: 92px;
      height: 32px;
    }

    .switcher {
      padding: 0;
    }

    .switcher__radio {
      width: 30px;
      height: 30px;
      background-size: 22px;
    }

    .switcher__status {
      width: 91px;
      height: 30px;
      background-size: 26px;
    }
  }

  @media screen and (max-width: 515px) {
    .themes {
      display: block;
      width: 0;
    }

    .arrow {
      display: block;
      position: fixed;
      z-index: 1;
      top: calc(90% - 22px);
      left: 0;
      transition: 0.3s;
    }

    .arrow--un-clicked {
      margin-left: 0;
    }

    .arrow--clicked {
      margin-left: 50px;
    }

    .switcher {
      position: fixed;
      opacity: 0;
      z-index: 1;
      top: calc(90% - 50px);
      left: -38px;
      grid-template-columns: 1fr;
    }

    .switcher--close {
      margin-left: 0;
      opacity: 0;
    }

    .switcher--open {
      margin-left: 50px;
      opacity: 1;
    }

    .switcher__radio--light:checked ~ .switcher__status {
      background-position: top 2px center;
    }

    .switcher__radio--auto:checked ~ .switcher__status {
      background-position: center center;
    }

    .switcher__radio--dark:checked ~ .switcher__status {
      background-position: bottom 2px center;
    }

    .switcher__status {
      width: 30px;
      height: 90px;
      background-size: 26px;
    }
  }
</style>
