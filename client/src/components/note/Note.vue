<template>
  <aside :class="['side-note', `side-note--${type}`]">
    <div class="side-note__icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <template v-if="type === 'info'">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </template>
        <template v-if="type === 'error'">
          <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </template>
        <template v-if="type === 'success'">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </template>
        <template v-if="type === 'warning'">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </template>
      </svg>
    </div>
    <strong class="side-note__title" v-if="title">{{title}}</strong>
    <div class="side-note__body">
      <slot />
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Note',
  props: {
    type: {
      type: String,
      default: 'info' // info, warning, success, error
    },
    title: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
$color-muted: hsl(210deg, 55%, 92%);
$color-info: hsl(245deg, 100%, 60%);
$color-alert-background: hsla(52deg, 100%, 50%, 0.25);
$color-alert: hsl(37deg, 100%, 50%);
$color-success-background: hsla(160deg, 100%, 40%, 0.1);
$color-success: hsl(160deg, 100%, 40%);
$color-error-background: hsla(340deg, 95%, 43%, 0.1);
$color-error: hsl(340deg, 95%, 50%);
$color-background: hsl(0deg, 0%, 100%);
$color-text: hsl(222deg, 22%, 5%);
$color-primary: hsl(245deg, 100%, 60%);

//darkmode variables
// $color-muted: hsl(210deg, 38%, 15%);
// $color-info: hsl(230deg, 92%, 63%);
// $color-alert-background: hsla(38deg, 100%, 50%, 0.1);
// $color-alert: hsl(30deg, 100%, 50%);
// $color-success-background: hsla(160deg, 100%, 40%, 0.1);
// $color-success: hsl(160deg, 100%, 40%);
// $color-error-background: hsla(340deg, 95%, 43%, 0.1);
// $color-error: hsl(340deg, 95%, 60%);
// $color-background: hsl(210deg, 30%, 8%);
// $color-text: hsl(0deg, 0%, 100%);
// $color-primary: hsl(333deg, 100%, 52%);

.side-note {
  position: relative;
  padding-top: 24px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  font-size: 17px;
  margin-top: 48px;
  margin-bottom: 64px;
  border-left: 3px solid;
  border-radius: 6px 6px 6px 3px;
  color: $color-text;

  code {
    position: relative;
    display: inline-block;
    font-size: 0.9em;
    letter-spacing: -0.5px;
    padding: 2px 6px;
    padding: 1px 6px;

    &:after {
      content: "";
      position: absolute;
      top: 0px;
      left: -1px;
      right: -1px;
      bottom: 0px;
      opacity: 0.15;
      border-radius: 3px;
      background-color: #467790;
    }
  }

  a {
    position: relative;
    font-weight: 500;
    color: inherit;
    text-decoration: none;
    transition: color 200ms ease;

    &:after {
      content: "";
      position: absolute;
      left: -2px;
      right: -2px;
      bottom: 0px;
      height: 2px;
      background-color: $color-primary;
      border-radius: 2px;
      transition: transform 200ms ease 150ms, opacity 350ms ease 150ms;
    }

    &:hover, &:focus {
      color: $color-primary;
      &:after {
        transform: translateY(-0.25em);
        opacity: 0;
        transition: transform 200ms ease 0s, opacity 350ms ease 0s;
      }
    }

    @media (min-width: 769px) {
      display: inline-block;
      text-decoration: none;
    }
  }

  &--info {
    background: $color-muted;
    border-color: $color-info;

    .side-note__icon {
      color: $color-info;
    }

    a {
      &:after {
        background-color: $color-info;
      }

      &:hover, &:focus {
        color: $color-info;
      }
    }
  }

  &--warning {
    background: $color-alert-background;
    border-color: $color-alert;

    .side-note__icon {
      color: $color-alert;
      border-radius: 25% 25%;
    }

    a {
      &:after {
        background-color: $color-alert;
      }

      &:hover, &:focus {
        color: $color-alert;
      }
    }
  }

  &--success {
    background: $color-success-background;
    border-color: $color-success;

    .side-note__icon {
      color: $color-success;
    }

    a {
      &:after {
        background-color: $color-success;
      }

      &:hover, &:focus {
        color: $color-success;
      }
    }
  }

  &--error {
    background: $color-error-background;
    border-color: $color-error;

    .side-note__icon {
      color: $color-error;
    }

    a {
      &:after {
        background-color: $color-error;
      }

      &:hover, &:focus {
        color: $color-error;
      }
    }
  }

  @media (min-width: 1150px) {
    margin-left: -32px;
    margin-right: -32px;
  }

  & > *:last-child {
    margin-bottom: 0 !important;
  }

  &__title {
    display: block;
    font-size: 17px;
    margin-bottom: 8px;
  }

  &__body {
    font-size: 17px;
    line-height: 1.6;
    > * {
      margin-bottom: 16px;
    }
  }

  &__icon {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    padding: 8px;
    background: $color-background;
    border-radius: 50%;

    svg {
      display: block;
      //vertical-align: middle;
    }
  }
}

.darkmode {
  .side-note {
    color: $color-text;

    a {
      &:after {
        background-color: $color-primary;
      }

      &:hover, &:focus {
        color: $color-primary;
      }
    }

    &--info {
      background: $color-muted;
      border-color: $color-info;

      .side-note__icon {
        color: $color-info;
      }

      a {
        &:after {
          background-color: $color-info;
        }

        &:hover, &:focus {
          color: $color-info;
        }
      }
    }

    &--warning {
      background: $color-alert-background;
      border-color: $color-alert;

      .side-note__icon {
        color: $color-alert;
      }

      a {
        &:after {
          background-color: $color-alert;
        }

        &:hover, &:focus {
          color: $color-alert;
        }
      }
    }

    &--success {
      background: $color-success-background;
      border-color: $color-success;

      .side-note__icon {
        color: $color-success;
      }

      a {
        &:after {
          background-color: $color-success;
        }

        &:hover, &:focus {
          color: $color-success;
        }
      }
    }

    &--error {
      background: $color-error-background;
      border-color: $color-error;

      .side-note__icon {
        color: $color-error;
      }

      a {
        &:after {
          background-color: $color-error;
        }

        &:hover, &:focus {
          color: $color-error;
        }
      }
    }

    &__icon {
      background: $color-background;
    }
  }
}
</style>