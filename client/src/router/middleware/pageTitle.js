export default function handlePageTitle(to, fallback) {
  // https://alligator.io/vuejs/vue-router-modify-head/
  // title
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  // If a route with a title was found, set the document (page) title to that value.
  //if(nearestWithTitle) document.title = nearestWithTitle.meta.title;
  document.title = nearestWithTitle ? nearestWithTitle.meta.title : fallback;
}