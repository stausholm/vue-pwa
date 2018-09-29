<template>
  <div>
    <div class="container--content">
      <h1>Examples of form inputs</h1>
      <form-generator :schema="schema" v-model="formData" @success="submitForm">
        dummy submit
      </form-generator>
    </div>
    <p style="margin-top:200px">more height!</p>
    <p style="margin-top:200px">more height!</p>
    <p style="margin-top:200px">more height!</p>
    <p style="margin-top:200px">more height!</p>
  </div>
</template>

<script>
import FormGenerator from '@/components/inputs/FormGenerator';

export default {
  name: 'ExampleInputs',
  components: {
    FormGenerator
  },
  data() {
    return {
      formData: {
        email: "bob@bob.dk",
        //password: "neato",
        gender: "Female",
        bio: "yo",
        favoriteFruit: "apple",
        //newsletter: true,
        recentStores: ["KFC"],
        //rating: "2"
      },
      schema: [
        {
          fieldType: 'EmailInput',
          name: 'email',
          label: 'Email Address',
          placeholder: 'johndoe@example.com',
          helper: 'your email is your username',
          //dumb: true,
          //autofocus: true,
          validations: {
            minLength: 20,
            maxLength: {
              value: 30,
              message: 'my custom error message'
            }
          }
        },
        {
          fieldType: 'PasswordInput',
          name: 'password',
          label: 'Password',
          disabled: true
        },
        {
          fieldType: 'RadioGroup',
          name: 'gender',
          label: 'Your gender',
          options: ["Male", "Female", "Bean"],
          //disabled: true
        },
        {
          fieldType: 'TextArea',
          name: 'bio',
          label: 'Bio',
          disabled: true
        },
        {
          fieldType: 'SelectList',
          name: 'favoriteFruit',
          label: 'Your favourite fruit',
          options: ["banana", "pear", "apple", "kiwi", "watermelon"],
          //disabled: true
          dumb: true,
          helper: 'Only the best in stores'
        },
        {
          fieldType: 'Checkbox',
          name: 'newsletter',
          label: 'Sign up for newsletter?',
          //disabled: true
        },
        {
          fieldType: 'CheckboxGroup',
          name: 'recentStores',
          label: 'Recently visited stores',
          helper: 'Check the stores you\'ve visited in the past month',
          options: ["Burger King", "KFC", "MC Donalds"],
          //disabled: true,
          validations: {
            minChecked: 2,
            maxChecked: {
              value: 4,
              message: 'custom maxChecked error message'
            }
          }
        },
        //{
          //fieldType: 'PasswordWithConfirm'
        //},
        // {
        //   fieldType: 'SliderInput',
        //   name: 'rating',
        //   label: 'Slider rating',
        //   helper: 'On a scale from 1 to 5, rate this slider',
        //   min: 1,
        //   max: 5,
        //   step: 0.5
        // }
      ],
    }
  },
  methods: {
    submitForm() {
      console.log('WOOH!', this.formData)
    }
  }
}
</script>
