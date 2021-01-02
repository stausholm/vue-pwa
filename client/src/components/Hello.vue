<script>
/**
TODO:

posts page

connect search to posts

alt der hedder listAdvanced

styles i: 
search.vue

image grayscale filter could also benefit from brightness(0.9)

darkmode styles

Update to Vue 2.6: and update slot syntax usage
*/
</script>

position sticky on table headers <th>
https://csslayout.io/patterns/sticky-table-headers/
https://csslayout.io/patterns/sticky-table-column/


custom component formgenerator field type. It takes a function that returns the component

forms:
make it clean and dry


organization chart:
horizontal view: https://codepen.io/ricardo_fahham/pen/RRPMQR
treeview for mobile: https://codepen.io/siiron/pen/aLkdE



:root {
  --bgColor: #ffffff;
  --textColor: #000000;
  --linkColor: var(--textColor);
}

@media (prefers-color-scheme: dark) {
  :root {
    --bgColor: #000000;
    --textColor: #ffffff;
  }
}


html {
  background: var(--bgColor);
  color: var(--textColor);
}


