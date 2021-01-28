<template>
  <div>
    <div class="container--content">
      <h1>Example Notes / alert</h1>

      <br>
      <br>
      <button @click="test = !test">test: {{test}}</button>
      <button @click="test = 10">test 10</button>
      <button @click="test = test + 1">test++</button>
      <button @click="test = test - 1">test--</button>

      <note dismissable hideIcon v-model="test" v-if="test" transition="fade">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quas rem exercitationem eius vero! Distinctio, iure quo? Magnam minus earum illo tempora aliquam ea, ad tempore debitis repellendus, et suscipit!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci iure expedita provident aut hic cum ad molestias cumque maxime. Adipisci dolore dolorum iusto facilis ab aliquid cumque amet quis velit?</p>
      </note>
      <note type="info" title="down the rabbit hole">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci iure expedita provident aut hic cum ad molestias cumque maxime. Adipisci dolore dolorum iusto facilis ab aliquid cumque amet quis velit?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quas rem exercitationem eius vero! Distinctio, iure quo? <code>Magnam minus earum</code> illo tempora aliquam ea, ad tempore debitis repellendus, et suscipit!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero ex deleniti <a href="#">asperiores beatae expedita</a> alias numquam quod doloremque corporis velit voluptatibus facilis obcaecati quo atque, quisquam maxime reiciendis cumque magni.Fugit dignissimos odit nemo rerum molestias fuga quae magni nam beatae. Iusto eius nemo dolor neque rem molestias. Libero, ex animi! Necessitatibus, architecto quisquam vel deleniti repudiandae dolorum consequatur dignissimos?</p>
        <template slot="expanded">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur consectetur debitis et eaque eos, aliquam amet minima repudiandae nemo autem facilis explicabo obcaecati quas fugit. Quo, nihil. Hic, blanditiis ad.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur consectetur debitis et eaque eos, aliquam amet minima repudiandae nemo autem facilis explicabo obcaecati quas fugit. Quo, nihil. Hic, blanditiis ad.</p>
        </template>
      </note>
      <note type="warning" title="down the rabbit hole">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci iure expedita provident aut hic cum ad molestias cumque maxime. Adipisci dolore dolorum iusto facilis ab aliquid cumque amet quis velit?</p>
        <code>asdasdh asjdgh adgh </code>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quas rem exercitationem eius vero! Distinctio, iure quo? <code>Magnam minus earum</code> illo tempora aliquam ea, ad tempore debitis repellendus, et suscipit!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero ex deleniti <a href="#">asperiores beatae expedita</a> alias numquam quod doloremque corporis velit voluptatibus facilis obcaecati quo atque, quisquam maxime reiciendis cumque magni.Fugit dignissimos odit nemo rerum molestias fuga quae magni nam beatae. Iusto eius nemo dolor neque rem molestias. Libero, ex animi! Necessitatibus, architecto quisquam vel deleniti repudiandae dolorum consequatur dignissimos?</p>
      </note>
      <note type="success" title="down the rabbit hole">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci iure expedita provident aut hic cum ad molestias cumque maxime. Adipisci dolore dolorum iusto facilis ab aliquid cumque amet quis velit?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quas rem exercitationem eius vero! Distinctio, iure quo? <code>Magnam minus earum</code> illo tempora aliquam ea, ad tempore debitis repellendus, et suscipit!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero ex deleniti <a href="#">asperiores beatae expedita</a> alias numquam quod doloremque corporis velit voluptatibus facilis obcaecati quo atque, quisquam maxime reiciendis cumque magni.Fugit dignissimos odit nemo rerum molestias fuga quae magni nam beatae. Iusto eius nemo dolor neque rem molestias. Libero, ex animi! Necessitatibus, architecto quisquam vel deleniti repudiandae dolorum consequatur dignissimos?</p>
      </note>
      <note type="error" title="down the rabbit hole">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci iure expedita provident aut hic cum ad molestias cumque maxime. Adipisci dolore dolorum iusto facilis ab aliquid cumque amet quis velit?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quas rem exercitationem eius vero! Distinctio, iure quo? <code>Magnam minus earum</code> illo tempora aliquam ea, ad tempore debitis repellendus, et suscipit!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero ex deleniti <a href="#">asperiores beatae expedita</a> alias numquam quod doloremque corporis velit voluptatibus facilis obcaecati quo atque, quisquam maxime reiciendis cumque magni.Fugit dignissimos odit nemo rerum molestias fuga quae magni nam beatae. Iusto eius nemo dolor neque rem molestias. Libero, ex animi! Necessitatibus, architecto quisquam vel deleniti repudiandae dolorum consequatur dignissimos?</p>
      </note>
    </div>
  </div>
</template>

<script>
import Note from '@/components/note/Note';

export default {
  name: 'ExampleNotes',
  components: {
    Note
  },
  data() {
    return {
      test: false
    }
  }
}
</script>
