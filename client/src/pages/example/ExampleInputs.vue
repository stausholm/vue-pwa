<template>
  <div>
    <div class="container--content">
      <h1>Examples of form inputs</h1>
      <form-generator :schema="schema" v-model="formData" @success="submitForm">
        dummy submit
      </form-generator>
    </div>
    <p style="margin-top:200px">more height!</p>
    <image-input v-model="dummy" :required="false" label="yoyo" placeholder="placeholder" @file="dummy__file = $event"/>
    <p style="margin-top:200px">more height!</p>
    <file-input accept="image/*,video/*" v-model="dummy2" @file="dummy2__files = $event" :disabled="true"/>
    <p style="margin-top:200px">more height!</p>
    <p style="margin-top:200px">more height!</p>
  </div>
</template>

<script>
import FormGenerator from '@/components/inputs/FormGenerator';

import ImageInput from '@/components/inputs/ImageInput';
import fileInput from '@/components/inputs/FileInput';

export default {
  name: 'ExampleInputs',
  components: {
    FormGenerator, ImageInput, fileInput
  },
  data() {
    return {
      dummy: '',
      dummy__file: null,
      dummy2: '',
      dummy2__files: null,
      formData: {
        email: "bob@bob.dk",
        //password: "neato",
        gender: "Female",
        bio: "yo",
        favoriteFruit: "apple",
        favoriteAnimal: "val1",
        //newsletter: true,
        recentStores: ["val4"],
        recentStores2: ["KFC"],
        //rating: "2"
      },
      schema: [
        {
          fieldType: 'EmailInput',
          name: 'email',
          label: 'Email Address',
          placeholder: 'johndoe@example.com',
          helper: 'your email is your username',
          requiredMessage: 'yoyo this is custom required message',
          //dumb: true,
          //autofocus: true,
          required: false,
          validations: {
            minLength: 20,
            maxLength: {
              value: 30,
              message: 'my custom error message'
            },
            email: {
              message: 'you need valid email'
            }
          }
        },
        {
          fieldType: 'PasswordInput',
          name: 'password',
          label: 'Password',
          //disabled: true
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
          //dumb: true,
          helper: 'Only the best in stores'
        },
        {
          fieldType: 'SelectList',
          name: 'favoriteAnimal',
          label: 'Your favourite animal',
          options: [
            { label: "Horse", value: "val1"}, 
            { label: "Cat", value: "val2"}, 
            { label: "Dog", value: "val3"}, 
            { label: "kiwi", value: "val4"}, 
            { label: "Birb", value: "val5"}
          ],
          //disabled: true
          //dumb: true,
          helper: 'Only the best in stores',
          sortDir: 'asc'
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
          options: [
            {label:"Burger King", value:"val1"}, 
            {label:"KFC", value:"val2"}, 
            {label:"MC Donalds", value:"val3"}, 
            {label:"Dunkin donuts", value:"val4"}, 
            {label:"Sunset Boulevard", value:"val5"}
          ],
          validations: {
            minChecked: 2
          },
          sortDir: 'asc'
        },
        {
          fieldType: 'CheckboxGroup',
          name: 'recentStores2',
          label: 'Recently visited stores but strings',
          helper: 'Check the stores you\'ve visited in the past month',
          options: ["Burger King", "KFC", "MC Donalds", "Dunkin donuts", "Sunset Boulevard"],
          //disabled: true,
          //required: false,
          validations: {
            //minChecked: 2,
            maxChecked: {
              value: 4,
              message: 'select up to 4 stores!'
            }
          }
        },
        {
          fieldType: 'ConfirmInput',
          name: 'passwordConfirm',
          label: 'Confirm password',
          helper: 'bean',
          match: 'password',
          type: 'password'
          //disabled: true
        },
        {
          fieldType: 'SliderInput',
          name: 'rating',
          label: 'Slider rating',
          helper: 'On a scale from 1 to 5, rate this slider',
          min: 1,
          max: 5,
          step: 0.5,
          disabled: false,
          requiredMessage: 'is required you know'
        },
        {
          fieldType: 'NumberInput',
          name: 'age',
          label: 'Your age',
          placeholder: 'not a day older than 30',
          helper: 'Your age is the number of years passed since you were born',
          validations: {
            minValue: {
              value: 18,
              message: 'you must be atleast 18 years old'
            },
            maxValue: 99
          }
        },
        {
          fieldType: 'TextInput',
          name: 'website',
          label: 'Your website',
          placeholder: 'www.google.com',
          helper: 'website helper text',
          required: false,
          validations: {
            url: true,
            maxLength: {
              value: 12,
              message: 'only 12'
            }
          }
        },
        {
          fieldType: 'ImageInput',
          name: 'avatar',
          label: 'Your profile image',
          placeholder: 'Choose an Image',
          helper: 'Image helper text',
          required: true,
          disabled: false,
          validations: {
            maxSize: {
              value:10000,
              message: 'max 10000 bytes yo'
            }
          }
        },
        {
          fieldType: 'FileInput',
          name: 'files',
          label: 'Your attachments',
          helper: 'file input helper text',
          required: true,
          requiredMessage: 'yo you need to add files',
          multiple: true,
          disabled: false,
          maxFiles: 3,
          maxSize: 10000000,
          validFileTypes: [
            'application/pdf',
            'image/svg+xml'
          ]
        },
        {
          fieldType: 'TextInput',
          name: 'custom',
          label: 'Custom validation',
          placeholder: 'it must match the provided regex',
          helper: 'Must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number. Can contain special characters',
          validations: {
            custom: [
              {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                message: 'At least 8 characters, 1 upper- and lowercase letter, and 1 number is required'
              }, 
              {
                value: /abc/,
                message: 'must contain abc'
              }
            ]
          }
        }
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
