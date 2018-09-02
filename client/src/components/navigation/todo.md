- Make back button go back, or to home
- conditional toolbar layout, based on route meta value
- computed property in navigation component, that's a list of all routes with 'showInNav' and allowed for the user group
- Store current searchterm in vuex

## notes
inkluder toolbar på hver page, og lad knapperne være et slot med search og account som default

hvordan så stadig have toolbar på alle sider som default?
hav toolbar i app, og de pages der vil overwrite dem, inkluder toolbar der
gmail har instant swap af ikoner, så ingen animation udover backbutton

fixed position bliver et problem hvis toolbar gemmes på page, og ikke app


## notes 2
Hav en navigation wrapper med alt logik som alle navs skal have (hideOnScroll etc.), og inde i den, have et slot til nav overwrites. Brug den sådan i app.vue:
```
<app-nav>
  <component :is="navigationLayout"></component>
</app-nav>

computed: {
  navigationLayout() {
    return this.$route.meta.layout;
  }
}
```

How is this animatable?
keep hamburger in main nav to keep it possible to be animated?

Store currently viewed recipe in vuex, and pass that one along as a prop to an edit page. Or just open the edit page, and in there reference vuex store. This is to prevent additional call to db, as it's really just the same exact data. 

Include sidebar inside navigation component

## notes 3
If toolbar is fixed, then target first element inside <main> and add padding-top to it, instead of current solution where a margin is added