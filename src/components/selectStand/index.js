let SelectStand = Vue.component('select-stand', {
    template: `<label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" :for="index" @click="$emit(\'input\', stand.config)">
        <input type="radio" :id="index" class="mdl-radio__button" name="options" :value="stand.config" :checked="index===0">
          <span class="mdl-radio__label">{{stand.name}}</span>
        </label>`,
    props: ['stand', 'activeStand', 'index'],
})
